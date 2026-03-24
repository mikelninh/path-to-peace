// ============================================
// CHAT WIDGET — Floating AI Q&A Interface
// ============================================
//
// This component creates:
// 1. A floating bubble button (bottom-right)
// 2. An expandable chat panel with messages
// 3. Streaming connection to the /api/v1/chat/stream endpoint
//
// GRACEFUL DEGRADATION:
// When the AI backend is unavailable (e.g. on GitHub Pages),
// the widget switches to "Quick Answers" mode — pre-written
// Q&A cards organized by site section. No broken UI.
//
// DESIGN DECISION: Vanilla JS, no framework
// Matches the rest of the site. The chat widget is self-contained —
// it injects its own HTML and manages its own state.

import { quickAnswers, sectionCategoryMap } from '../data/quick-answers.js';
import { icon } from './icons.js';

// API base URL — points to the backend server
const API_BASE = window.PEACE_API_URL || 'http://localhost:3001';

// Suggested questions for first-time users (AI mode)
const SUGGESTIONS = [
  "Why is there war in Sudan?",
  "How did the Northern Ireland conflict end?",
  "What are the root causes of most wars?",
  "Which conflicts are closest to a peace agreement?",
];

// State
let isOpen = false;
let isLoading = false;
let messages = []; // { role: 'user'|'assistant', content: string, sources?: [] }
let aiReady = false;
let qaMode = false; // true when AI is unavailable

/**
 * Initialize the chat widget.
 * Call this once from main.js on page load.
 */
export function initChatWidget() {
  injectHTML();
  bindEvents();
  checkAIStatus();
  scheduleBubblePulse();
}

// ============================================
// Determine the current site section
// ============================================
function getCurrentSection() {
  const hash = window.location.hash.slice(1) || '/';

  // Check for exact matches first
  if (sectionCategoryMap[hash]) return sectionCategoryMap[hash];

  // Check prefix matches (e.g. /conflict/sudan -> current)
  if (hash.startsWith('/conflict/')) return 'current';
  if (hash.startsWith('/lesson/') || hash.startsWith('/module/') || hash.startsWith('/quiz/')) return 'historical';
  if (hash.startsWith('/brief/')) return 'current';
  if (hash.startsWith('/simulate')) return 'patterns';

  return 'current'; // default
}

/**
 * Get quick answers sorted by relevance to current section.
 * Section-relevant answers come first, then the rest.
 */
function getSortedQuickAnswers() {
  const section = getCurrentSection();
  const relevant = [];
  const other = [];

  for (const qa of quickAnswers) {
    if (qa.category === section) {
      relevant.push(qa);
    } else {
      other.push(qa);
    }
  }

  return [...relevant, ...other];
}

// ============================================
// Inject the HTML structure
// ============================================
function injectHTML() {
  const container = document.createElement('div');
  container.id = 'chat-widget';
  container.innerHTML = `
    <button class="chat-bubble" id="chat-bubble" aria-label="Ask about conflicts">
      <span class="chat-bubble-icon"><svg class="icon"><use href="#icon-help"/></svg></span>
    </button>

    <div class="chat-panel" id="chat-panel">
      <div class="chat-header">
        <div class="chat-header-icon"><svg class="icon"><use href="#icon-peace"/></svg></div>
        <div class="chat-header-text">
          <h4>Ask About Any Conflict</h4>
          <p id="chat-header-subtitle">AI-powered answers from verified data</p>
        </div>
        <div class="chat-header-status" id="chat-status" title="Checking AI status..."></div>
      </div>

      <div class="chat-messages" id="chat-messages">
        <div class="chat-welcome" id="chat-welcome">
          <p>Ask me anything about world conflicts, peace processes, or what history teaches us.</p>
          <div class="chat-suggestions" id="chat-suggestions">
            ${SUGGESTIONS.map(q =>
              `<button class="chat-suggestion" data-question="${q}">${q}</button>`
            ).join('')}
          </div>
        </div>
      </div>

      <div class="chat-input-area" id="chat-input-area">
        <textarea
          class="chat-input"
          id="chat-input"
          placeholder="Ask a question..."
          rows="1"
        ></textarea>
        <button class="chat-send" id="chat-send" disabled aria-label="Send">
          <svg class="icon"><use href="#icon-arrow-right"/></svg>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(container);
}

// ============================================
// Bind event listeners
// ============================================
function bindEvents() {
  const bubble = document.getElementById('chat-bubble');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const suggestions = document.getElementById('chat-suggestions');

  // Toggle panel
  bubble.addEventListener('click', togglePanel);

  // Send on button click
  sendBtn.addEventListener('click', sendMessage);

  // Send on Enter (Shift+Enter for new line)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Enable/disable send button based on input
  input.addEventListener('input', () => {
    sendBtn.disabled = !input.value.trim() || isLoading;
    // Auto-resize textarea
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 80) + 'px';
  });

  // Suggestion clicks
  suggestions.addEventListener('click', (e) => {
    const btn = e.target.closest('.chat-suggestion');
    if (btn) {
      const question = btn.dataset.question;
      input.value = question;
      sendBtn.disabled = false;
      sendMessage();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      togglePanel();
    }
  });
}

// ============================================
// Toggle the chat panel open/closed
// ============================================
function togglePanel() {
  isOpen = !isOpen;
  const panel = document.getElementById('chat-panel');
  const bubble = document.getElementById('chat-bubble');
  const bubbleIcon = bubble.querySelector('.chat-bubble-icon');

  panel.classList.toggle('open', isOpen);
  bubble.classList.toggle('open', isOpen);

  bubbleIcon.innerHTML = isOpen
    ? '<svg class="icon"><use href="#icon-close"/></svg>'
    : '<svg class="icon"><use href="#icon-help"/></svg>';

  if (isOpen && !qaMode) {
    setTimeout(() => {
      document.getElementById('chat-input').focus();
    }, 300);
  }

  // In QA mode, refresh the answers when opening (section may have changed)
  if (isOpen && qaMode) {
    renderQuickAnswers();
  }
}

// ============================================
// 30-second delayed pulse animation
// ============================================
function scheduleBubblePulse() {
  setTimeout(() => {
    const bubble = document.getElementById('chat-bubble');
    if (bubble && !isOpen) {
      bubble.classList.add('chat-bubble-pulse');
      // Remove after animation completes (one cycle)
      bubble.addEventListener('animationend', () => {
        bubble.classList.remove('chat-bubble-pulse');
      }, { once: true });
    }
  }, 30000);
}

// ============================================
// Check if the AI backend is available
// ============================================
async function checkAIStatus() {
  const statusDot = document.getElementById('chat-status');

  try {
    const res = await fetch(`${API_BASE}/api/v1/chat/status`);
    const data = await res.json();

    aiReady = data.data?.ready || false;
    statusDot.className = `chat-header-status ${aiReady ? '' : 'offline'}`;
    statusDot.title = aiReady
      ? `AI ready (${data.data.embeddingCount} data chunks indexed)`
      : 'AI not configured — using quick answers';

    if (!aiReady) {
      switchToQAMode();
    }
  } catch {
    statusDot.className = 'chat-header-status offline';
    statusDot.title = 'AI unavailable — using quick answers';
    aiReady = false;
    switchToQAMode();
  }
}

// ============================================
// Switch to Quick Answers mode (no AI)
// ============================================
function switchToQAMode() {
  qaMode = true;

  // Update subtitle
  const subtitle = document.getElementById('chat-header-subtitle');
  subtitle.textContent = 'Quick answers from verified data';

  // Hide the text input area
  const inputArea = document.getElementById('chat-input-area');
  inputArea.style.display = 'none';

  // Replace the welcome/messages area with quick answers
  renderQuickAnswers();
}

function renderQuickAnswers() {
  const container = document.getElementById('chat-messages');
  const sorted = getSortedQuickAnswers();

  container.innerHTML = `
    <div class="chat-qa-mode">
      <p class="chat-offline-note">
        <svg class="icon" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;opacity:0.6"><use href="#icon-help"/></svg>
        AI chat available when running locally
      </p>
      ${sorted.map((qa, i) => `
        <div class="chat-qa-item" data-qa-index="${i}">
          <button class="chat-qa-question" aria-expanded="false">${qa.question}</button>
          <div class="chat-qa-answer">
            <p>${qa.answer}</p>
            <a href="${qa.link}" class="chat-qa-link">${qa.linkText} &rarr;</a>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Bind click handlers for expandable cards
  container.querySelectorAll('.chat-qa-item').forEach(item => {
    const btn = item.querySelector('.chat-qa-question');
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      // Close all others
      container.querySelectorAll('.chat-qa-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.chat-qa-question').setAttribute('aria-expanded', 'false');
      });
      // Toggle clicked
      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ============================================
// Send a message and get a streaming response
// ============================================
async function sendMessage() {
  const input = document.getElementById('chat-input');
  const question = input.value.trim();

  if (!question || isLoading) return;

  // Hide welcome state
  const welcome = document.getElementById('chat-welcome');
  if (welcome) welcome.style.display = 'none';

  // Add user message
  addMessage('user', question);
  input.value = '';
  input.style.height = 'auto';
  document.getElementById('chat-send').disabled = true;

  // Show typing indicator
  isLoading = true;
  const typingEl = showTyping();

  // Build conversation history for context
  const history = messages.slice(0, -1).map(m => ({
    role: m.role,
    content: m.content,
  }));

  try {
    // DESIGN DECISION: Use fetch + ReadableStream for SSE
    // The built-in EventSource API only supports GET requests.
    // We need POST (to send the question in the body), so we
    // use fetch with a readable stream instead.
    const response = await fetch(`${API_BASE}/api/v1/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'Failed to get response');
    }

    // Remove typing indicator and add assistant message placeholder
    typingEl.remove();
    const msgEl = addMessage('assistant', '');
    const bodyEl = msgEl.querySelector('.chat-msg-body');

    // Read the streaming response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    let sources = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      // SSE format: "data: {...}\n\n"
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;

        try {
          const data = JSON.parse(line.slice(6));

          if (data.type === 'text') {
            fullText += data.text;
            bodyEl.innerHTML = formatMarkdown(fullText);
            scrollToBottom();
          }

          if (data.type === 'done') {
            sources = data.sources || [];
          }

          if (data.type === 'error') {
            throw new Error(data.message);
          }
        } catch (parseErr) {
          // Skip malformed SSE lines
          if (parseErr.message !== data?.message) continue;
          throw parseErr;
        }
      }
    }

    // Update the stored message with final text
    messages[messages.length - 1].content = fullText;
    messages[messages.length - 1].sources = sources;

    // Add source citations
    if (sources.length > 0) {
      const sourcesHTML = `
        <div class="chat-sources">
          ${sources.map(s =>
            `<a href="#/conflict/${s.id}" class="chat-source-tag" title="${s.relevance} relevant">${s.id}</a>`
          ).join('')}
        </div>
      `;
      bodyEl.innerHTML += sourcesHTML;
    }

  } catch (err) {
    typingEl.remove();
    addError(err.message || 'Something went wrong. Please try again.');
  } finally {
    isLoading = false;
    document.getElementById('chat-send').disabled = !input.value.trim();
    scrollToBottom();
  }
}

// ============================================
// UI Helpers
// ============================================

function addMessage(role, content) {
  const container = document.getElementById('chat-messages');
  const avatarIcon = role === 'user' ? 'people' : 'peace';

  const msgEl = document.createElement('div');
  msgEl.className = `chat-msg ${role}`;
  msgEl.innerHTML = `
    <div class="chat-msg-avatar"><svg class="icon"><use href="#icon-${avatarIcon}"/></svg></div>
    <div class="chat-msg-body">
      ${content ? formatMarkdown(content) : '<p></p>'}
    </div>
  `;

  container.appendChild(msgEl);
  messages.push({ role, content });
  scrollToBottom();
  return msgEl;
}

function showTyping() {
  const container = document.getElementById('chat-messages');
  const el = document.createElement('div');
  el.className = 'chat-msg assistant';
  el.innerHTML = `
    <div class="chat-msg-avatar"><svg class="icon"><use href="#icon-peace"/></svg></div>
    <div class="chat-msg-body">
      <div class="chat-typing">
        <div class="chat-typing-dot"></div>
        <div class="chat-typing-dot"></div>
        <div class="chat-typing-dot"></div>
      </div>
    </div>
  `;
  container.appendChild(el);
  scrollToBottom();
  return el;
}

function addError(message) {
  const container = document.getElementById('chat-messages');
  const el = document.createElement('div');
  el.className = 'chat-error';
  el.textContent = message;
  container.appendChild(el);
  scrollToBottom();
}

function scrollToBottom() {
  const container = document.getElementById('chat-messages');
  container.scrollTop = container.scrollHeight;
}

/**
 * Basic markdown formatting for AI responses.
 * Converts **bold**, line breaks, and bullet points.
 */
function formatMarkdown(text) {
  return text
    .split('\n\n')
    .map(para => {
      // Convert markdown bold
      para = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Convert inline code
      para = para.replace(/`(.*?)`/g, '<code>$1</code>');

      // Check if it's a bullet list
      const lines = para.split('\n');
      if (lines.every(l => l.match(/^[-*]\s/) || l.trim() === '')) {
        const items = lines
          .filter(l => l.match(/^[-*]\s/))
          .map(l => `<li>${l.replace(/^[-*]\s/, '')}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }

      return `<p>${para.replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
}
