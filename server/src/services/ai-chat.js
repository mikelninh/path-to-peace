// ============================================
// AI CHAT SERVICE — Generate Answers with Claude
// ============================================
//
// This is the "Generate" part of RAG:
// 1. We already RETRIEVED relevant chunks (embeddings.js)
// 2. Now we AUGMENT the prompt with those chunks
// 3. And ask Claude to GENERATE an answer
//
// DESIGN DECISION: System prompt engineering
// The system prompt is crucial — it tells Claude:
// - What it is (a peace education assistant)
// - What data it has (the chunks we retrieved)
// - What it should NOT do (make things up, take sides)
// - How to format responses (cite sources, stay balanced)
//
// This is called "prompt engineering" and it's one of the
// most important skills in AI engineering.

import Anthropic from '@anthropic-ai/sdk';
import { searchSimilar } from './embeddings.js';

let anthropicClient = null;

function getAnthropic() {
  if (!anthropicClient) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not set. Add it to server/.env');
    }
    anthropicClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return anthropicClient;
}

// ============================================
// The System Prompt — Defines Claude's Behavior
// ============================================
// DESIGN DECISION: Why so detailed?
// AI models follow instructions better when the instructions are
// specific. Vague prompts = vague answers. Detailed prompts = consistent,
// useful answers. Every line here prevents a specific failure mode.

const SYSTEM_PROMPT = `You are the AI assistant for "The Path to Peace," an educational resource about world conflicts. Your role is to help students, teachers, and citizens understand conflicts and paths to peace.

CRITICAL RULES:
1. ONLY answer based on the provided context data. If the context doesn't contain information to answer the question, say so honestly.
2. NEVER fabricate facts, statistics, or events not in the context.
3. Be balanced and neutral — present multiple perspectives without taking sides.
4. Cite which conflict or section your information comes from.
5. When discussing casualties or suffering, be respectful and human-centered.
6. If asked about topics outside conflict/peace education, politely redirect.
7. Keep answers concise but thorough — aim for 2-4 paragraphs.
8. End with a brief note pointing the user to relevant sections of the website for more detail.

TONE: Educational, empathetic, balanced, honest about complexity and uncertainty.`;

// ============================================
// Main Function: Answer a User's Question
// ============================================
// This is the function the API route calls.
// It orchestrates the full RAG pipeline.

export async function answerQuestion(question, conversationHistory = []) {
  // STEP 1: Retrieve relevant context
  // Search our embeddings for the chunks most related to the question
  const relevantChunks = await searchSimilar(question, 5);

  if (relevantChunks.length === 0) {
    return {
      answer: "I don't have enough data loaded to answer questions yet. Please ask the site administrator to build the embedding index.",
      sources: [],
      tokensUsed: 0,
    };
  }

  // STEP 2: Build the context string
  // We format the retrieved chunks into a clear structure for Claude.
  // DESIGN DECISION: Explicit source labeling
  // By labeling each chunk with [Source: conflict-name], we make it
  // easy for Claude to cite sources, and for us to verify accuracy.
  const contextParts = relevantChunks.map((chunk, i) => {
    const label = chunk.sourceType === 'historical'
      ? `Historical: ${chunk.sourceId}`
      : `Current Conflict: ${chunk.sourceId}`;
    return `[Source ${i + 1}: ${label}]\n${chunk.content}`;
  });

  const context = contextParts.join('\n\n---\n\n');

  // STEP 3: Build the messages array
  // Claude uses a conversation format: system prompt + messages.
  // We include conversation history so follow-up questions work.
  //
  // DESIGN DECISION: Limit conversation history
  // Each message costs tokens. We keep the last 6 messages (3 turns)
  // to balance context and cost.
  const recentHistory = conversationHistory.slice(-6);

  const messages = [
    ...recentHistory,
    {
      role: 'user',
      content: `Based on the following verified conflict data, please answer my question.

CONTEXT DATA:
${context}

MY QUESTION: ${question}

Remember: Only use information from the context data above. Cite your sources.`,
    },
  ];

  // STEP 4: Call Claude
  const client = getAnthropic();

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  });

  // STEP 5: Extract the answer and metadata
  const answer = response.content[0].text;

  // Calculate token usage (for cost tracking)
  const tokensUsed = {
    input: response.usage.input_tokens,
    output: response.usage.output_tokens,
    estimatedCost: (
      (response.usage.input_tokens * 0.003 / 1000) +
      (response.usage.output_tokens * 0.015 / 1000)
    ).toFixed(4),
  };

  // STEP 6: Return structured response
  return {
    answer,
    sources: relevantChunks.map(c => ({
      type: c.sourceType,
      id: c.sourceId,
      relevance: Math.round(c.similarity * 100) + '%',
    })),
    tokensUsed,
  };
}

// ============================================
// Streaming Version (for better UX)
// ============================================
// DESIGN DECISION: Streaming vs. non-streaming
// Non-streaming: User waits 3-5 seconds, then sees the full answer.
// Streaming: Words appear one by one as Claude generates them.
// Streaming feels much faster even though the total time is the same.
// It's like watching someone type vs. waiting for a letter to arrive.

export async function answerQuestionStream(question, conversationHistory = [], onChunk) {
  const relevantChunks = await searchSimilar(question, 5);

  if (relevantChunks.length === 0) {
    onChunk("I don't have enough data loaded to answer questions yet.");
    return { sources: [], tokensUsed: 0 };
  }

  const contextParts = relevantChunks.map((chunk, i) => {
    const label = chunk.sourceType === 'historical'
      ? `Historical: ${chunk.sourceId}`
      : `Current Conflict: ${chunk.sourceId}`;
    return `[Source ${i + 1}: ${label}]\n${chunk.content}`;
  });

  const context = contextParts.join('\n\n---\n\n');
  const recentHistory = conversationHistory.slice(-6);

  const messages = [
    ...recentHistory,
    {
      role: 'user',
      content: `Based on the following verified conflict data, please answer my question.

CONTEXT DATA:
${context}

MY QUESTION: ${question}

Remember: Only use information from the context data above. Cite your sources.`,
    },
  ];

  const client = getAnthropic();

  // stream: true returns an async iterator instead of waiting for the full response
  const stream = client.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  });

  // Process each chunk as it arrives
  stream.on('text', (text) => {
    onChunk(text);
  });

  // Wait for the stream to finish and get final message
  const finalMessage = await stream.finalMessage();

  return {
    sources: relevantChunks.map(c => ({
      type: c.sourceType,
      id: c.sourceId,
      relevance: Math.round(c.similarity * 100) + '%',
    })),
    tokensUsed: {
      input: finalMessage.usage.input_tokens,
      output: finalMessage.usage.output_tokens,
    },
  };
}
