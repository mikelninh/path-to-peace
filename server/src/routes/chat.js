// ============================================
// CHAT ROUTE — AI-Powered Q&A Endpoint
// ============================================
//
// Two endpoints:
// POST /api/v1/chat           → Get a full answer (simple)
// POST /api/v1/chat/stream    → Get a streaming answer (better UX)
//
// DESIGN DECISION: POST not GET
// We use POST because:
// 1. Questions can be long (GET has URL length limits)
// 2. We send conversation history in the body
// 3. POST semantically means "process this data" vs GET's "retrieve data"

import { Router } from 'express';
import { answerQuestion, answerQuestionStream } from '../services/ai-chat.js';
import { buildEmbeddingIndex, ensureEmbeddingsTable } from '../services/embeddings.js';
import { ApiError } from '../middleware/errors.js';
import { getDb } from '../db/connection.js';

const router = Router();

// ============================================
// POST /api/v1/chat — Ask a question
// ============================================
router.post('/', async (req, res) => {
  const { question, history = [] } = req.body;

  if (!question || typeof question !== 'string' || question.trim().length < 3) {
    throw new ApiError(400, 'Please provide a question (at least 3 characters)');
  }

  if (question.length > 500) {
    throw new ApiError(400, 'Question is too long (max 500 characters)');
  }

  // Check if embeddings exist
  try {
    const db = getDb();
    ensureEmbeddingsTable();
    const count = db.prepare('SELECT COUNT(*) as count FROM embeddings').get();
    if (count.count === 0) {
      throw new ApiError(503, 'The AI knowledge base has not been built yet. Run: npm run ai:build-index');
    }
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(503, 'AI features are not available: ' + err.message);
  }

  try {
    const result = await answerQuestion(question, history);

    res.json({
      data: {
        answer: result.answer,
        sources: result.sources,
      },
      meta: {
        tokensUsed: result.tokensUsed,
        model: 'claude-sonnet-4-20250514',
      }
    });
  } catch (err) {
    if (err.message?.includes('API_KEY')) {
      throw new ApiError(503, 'AI features are not configured. API keys are missing.');
    }
    throw err;
  }
});

// ============================================
// POST /api/v1/chat/stream — Streaming answer
// ============================================
// DESIGN DECISION: Server-Sent Events (SSE)
// For streaming, we use SSE — a simple protocol where the server
// sends events to the client over a long-lived HTTP connection.
// The client reads chunks as they arrive and updates the UI.
//
// Alternative: WebSockets (bidirectional, more complex, overkill for this)
// SSE is perfect for "server pushes data to client" which is exactly
// what streaming AI responses are.

router.post('/stream', async (req, res) => {
  const { question, history = [] } = req.body;

  if (!question || typeof question !== 'string' || question.trim().length < 3) {
    throw new ApiError(400, 'Please provide a question (at least 3 characters)');
  }

  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const result = await answerQuestionStream(
      question,
      history,
      (chunk) => {
        // Send each text chunk as an SSE event
        // Format: data: {"text": "chunk"}\n\n
        res.write(`data: ${JSON.stringify({ type: 'text', text: chunk })}\n\n`);
      }
    );

    // Send final event with sources and metadata
    res.write(`data: ${JSON.stringify({
      type: 'done',
      sources: result.sources,
      tokensUsed: result.tokensUsed,
    })}\n\n`);

    res.end();
  } catch (err) {
    res.write(`data: ${JSON.stringify({ type: 'error', message: err.message })}\n\n`);
    res.end();
  }
});

// ============================================
// POST /api/v1/chat/build-index — Build embeddings
// ============================================
// Admin endpoint to create/rebuild the embedding index.
// This calls OpenAI's API for each chunk, so it takes a minute
// and costs a few cents.
//
// DESIGN DECISION: Separate endpoint, not automatic
// Building embeddings on every server start would be slow and expensive.
// We do it explicitly when data changes.

router.post('/build-index', async (req, res) => {
  try {
    console.log('[AI] Building embedding index...');
    const count = await buildEmbeddingIndex();
    res.json({
      data: {
        message: `Successfully built embedding index with ${count} chunks`,
        chunks: count,
      }
    });
  } catch (err) {
    if (err.message?.includes('API_KEY')) {
      throw new ApiError(503, 'Cannot build index: OPENAI_API_KEY is not set');
    }
    throw err;
  }
});

// ============================================
// GET /api/v1/chat/status — Check AI readiness
// ============================================
router.get('/status', (req, res) => {
  const status = {
    embeddingsConfigured: !!process.env.OPENAI_API_KEY,
    generationConfigured: !!process.env.ANTHROPIC_API_KEY,
    ready: false,
    embeddingCount: 0,
  };

  try {
    const db = getDb();
    ensureEmbeddingsTable();
    const count = db.prepare('SELECT COUNT(*) as count FROM embeddings').get();
    status.embeddingCount = count.count;
    status.ready = status.embeddingsConfigured && status.generationConfigured && count.count > 0;
  } catch {
    // Table might not exist yet
  }

  res.json({ data: status });
});

export default router;
