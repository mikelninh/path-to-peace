// ============================================
// EMBEDDING SERVICE — The "Search by Meaning" Engine
// ============================================
//
// This service does two things:
//
// 1. EMBED: Convert text into a vector (list of numbers) using OpenAI
//    "The Sudan civil war began in April 2023" → [0.023, -0.156, 0.891, ...]
//
// 2. SEARCH: Given a question, find the most similar stored texts
//    by comparing their vectors using "cosine similarity"
//
// COSINE SIMILARITY explained:
// Imagine two arrows pointing from the center of a circle.
// If they point in the same direction → similarity = 1.0 (identical meaning)
// If they point in opposite directions → similarity = -1.0 (opposite meaning)
// If they're perpendicular → similarity = 0.0 (unrelated)
//
// The math: cos(angle) = (A · B) / (|A| × |B|)
// Don't worry about the formula — the intuition is what matters.

import OpenAI from 'openai';
import { getDb } from '../db/connection.js';

// ============================================
// Initialize OpenAI client
// ============================================
// DESIGN DECISION: Lazy initialization
// We don't create the client until it's needed.
// This means the server can start even without an API key
// (other features still work, just not the chatbot).

let openaiClient = null;

function getOpenAI() {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not set. Add it to server/.env');
    }
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

// ============================================
// STEP 1: Create embeddings for a piece of text
// ============================================
// This calls OpenAI's API to convert text into a vector.
// The model "text-embedding-3-small" returns 1536 numbers per text.
// It costs $0.02 per 1M tokens (~$0.00002 per conflict summary).

export async function createEmbedding(text) {
  const openai = getOpenAI();

  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });

  // The response contains the vector (array of 1536 floats)
  return response.data[0].embedding;
}

// ============================================
// STEP 2: Store embeddings in the database
// ============================================
// We create a table to hold the embeddings alongside metadata
// about what text they represent.
//
// DESIGN DECISION: Store embeddings in SQLite
// For 15 conflicts × ~5 chunks each = ~75 vectors, SQLite is fine.
// At 10,000+ vectors, you'd want a dedicated vector database
// (Pinecone, pgvector, Chroma). But for learning, SQLite works.

export function ensureEmbeddingsTable() {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS embeddings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_type TEXT NOT NULL,
      source_id TEXT NOT NULL,
      chunk_index INTEGER DEFAULT 0,
      content TEXT NOT NULL,
      embedding BLOB NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_embeddings_source
      ON embeddings(source_type, source_id);
  `);
}

// ============================================
// STEP 3: Build the embedding index
// ============================================
// This processes ALL your conflict data and creates embeddings.
// You run this ONCE (or when data changes), not on every query.
//
// We "chunk" each conflict into meaningful pieces:
// - Summary chunk: name + summary + causes
// - Detail chunk: why + resources + what it's about
// - Resolution chunk: path to resolution + impact
// - Events chunk: key timeline events
//
// DESIGN DECISION: Why chunk instead of embedding the whole thing?
// Embeddings work better with focused text (~200-500 words).
// A 2000-word conflict entry has many topics mixed together.
// Chunking lets us retrieve just the relevant part.

export async function buildEmbeddingIndex() {
  const db = getDb();
  ensureEmbeddingsTable();

  // Clear existing embeddings (for rebuild)
  db.exec('DELETE FROM embeddings');

  const conflicts = db.prepare('SELECT * FROM conflicts').all();
  const causes = db.prepare('SELECT * FROM conflict_causes').all();
  const events = db.prepare('SELECT * FROM key_events ORDER BY event_date').all();

  const insertEmbedding = db.prepare(`
    INSERT INTO embeddings (source_type, source_id, chunk_index, content, embedding)
    VALUES (@source_type, @source_id, @chunk_index, @content, @embedding)
  `);

  let totalChunks = 0;

  for (const conflict of conflicts) {
    const conflictCauses = causes
      .filter(c => c.conflict_id === conflict.id)
      .map(c => c.cause);

    const conflictEvents = events
      .filter(e => e.conflict_id === conflict.id);

    // CHUNK 1: Overview (what is this conflict?)
    const overviewText = [
      `Conflict: ${conflict.name}`,
      `Region: ${conflict.region}`,
      `Type: ${conflict.type} | Severity: ${conflict.severity}`,
      `Started: ${conflict.started || 'Unknown'}`,
      `Casualties: ${conflict.casualties || 'Unknown'}`,
      `Displaced: ${conflict.displaced || 'Unknown'}`,
      `Root causes: ${conflictCauses.join(', ')}`,
      `Summary: ${conflict.summary || ''}`,
    ].filter(Boolean).join('\n');

    // CHUNK 2: Analysis (why is this happening?)
    const analysisText = [
      `Conflict: ${conflict.name}`,
      `Who is fighting:`,
      `  Side A: ${conflict.who_side_a || 'Unknown'}`,
      `  Side B: ${conflict.who_side_b || 'Unknown'}`,
      `Why: ${conflict.why || ''}`,
      `Resources at stake: ${conflict.resources || ''}`,
      `What this is really about: ${conflict.what_about || ''}`,
    ].filter(Boolean).join('\n');

    // CHUNK 3: Resolution & Impact
    const resolutionText = [
      `Conflict: ${conflict.name}`,
      `Path to resolution: ${conflict.path_to_resolution || ''}`,
      `Global impact: ${conflict.impact || ''}`,
    ].filter(Boolean).join('\n');

    // CHUNK 4: Timeline (if there are events)
    let timelineText = null;
    if (conflictEvents.length > 0) {
      timelineText = [
        `Key events in the ${conflict.name}:`,
        ...conflictEvents.map(e =>
          `${e.event_date}: ${e.title} [${e.type}]`
        )
      ].join('\n');
    }

    // Create embeddings for each chunk
    const chunks = [
      { text: overviewText, index: 0 },
      { text: analysisText, index: 1 },
      { text: resolutionText, index: 2 },
    ];

    if (timelineText) {
      chunks.push({ text: timelineText, index: 3 });
    }

    for (const chunk of chunks) {
      try {
        const embedding = await createEmbedding(chunk.text);

        // DESIGN DECISION: Store vectors as BLOBs
        // SQLite doesn't have a vector type. We convert the float array
        // to a binary Buffer for compact storage. A 1536-float vector
        // takes 6KB as text but only 3KB as binary.
        const buffer = Buffer.from(new Float32Array(embedding).buffer);

        insertEmbedding.run({
          source_type: 'conflict',
          source_id: conflict.id,
          chunk_index: chunk.index,
          content: chunk.text,
          embedding: buffer,
        });

        totalChunks++;
        process.stdout.write(`\r[EMBED] Processing: ${totalChunks} chunks...`);
      } catch (err) {
        console.error(`\n[EMBED] Failed to embed chunk for ${conflict.id}:`, err.message);
      }
    }
  }

  // Also embed historical conflicts (shorter, just one chunk each)
  const historical = db.prepare('SELECT * FROM historical_conflicts').all();
  for (const h of historical) {
    const text = [
      `Historical conflict: ${h.name}`,
      `Period: ${h.period || 'Unknown'}`,
      `Summary: ${h.summary || ''}`,
      `How it ended: ${h.how_it_ended || ''}`,
      `Lesson learned: ${h.lesson_learned || ''}`,
    ].filter(Boolean).join('\n');

    try {
      const embedding = await createEmbedding(text);
      const buffer = Buffer.from(new Float32Array(embedding).buffer);

      insertEmbedding.run({
        source_type: 'historical',
        source_id: h.id || h.name,
        chunk_index: 0,
        content: text,
        embedding: buffer,
      });
      totalChunks++;
      process.stdout.write(`\r[EMBED] Processing: ${totalChunks} chunks...`);
    } catch (err) {
      console.error(`\n[EMBED] Failed to embed historical ${h.name}:`, err.message);
    }
  }

  console.log(`\n[EMBED] Done! Created ${totalChunks} embeddings.`);
  return totalChunks;
}

// ============================================
// STEP 4: Search — Find relevant chunks for a question
// ============================================
// This is where the magic happens:
// 1. Convert the user's question into a vector
// 2. Compare it against ALL stored vectors
// 3. Return the top N most similar chunks
//
// DESIGN DECISION: Brute-force search
// With ~75 vectors, we compare against ALL of them every time.
// This takes <1ms. At 100,000+ vectors, you'd need an approximate
// nearest neighbor (ANN) algorithm or a vector database.

export async function searchSimilar(query, topK = 5) {
  const db = getDb();

  // Convert the question to a vector
  const queryEmbedding = await createEmbedding(query);

  // Load all stored embeddings
  const rows = db.prepare('SELECT * FROM embeddings').all();

  if (rows.length === 0) {
    return [];
  }

  // Compare the question vector against each stored vector
  const scored = rows.map(row => {
    // Convert BLOB back to float array
    const storedEmbedding = Array.from(new Float32Array(row.embedding.buffer));

    // Calculate cosine similarity
    const similarity = cosineSimilarity(queryEmbedding, storedEmbedding);

    return {
      sourceType: row.source_type,
      sourceId: row.source_id,
      chunkIndex: row.chunk_index,
      content: row.content,
      similarity,
    };
  });

  // Sort by similarity (highest first) and return top K
  scored.sort((a, b) => b.similarity - a.similarity);
  return scored.slice(0, topK);
}

// ============================================
// Cosine Similarity — The Core Math
// ============================================
// This measures how similar two vectors are.
// Returns a number between -1 and 1.
// 1.0 = identical direction (same meaning)
// 0.0 = unrelated
// -1.0 = opposite meaning
//
// The formula: sum(a[i] * b[i]) / (magnitude(a) * magnitude(b))

function cosineSimilarity(a, b) {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) return 0;

  return dotProduct / (magnitudeA * magnitudeB);
}
