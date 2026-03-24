// ============================================
// CHAT WIDGET — Floating AI Q&A Interface
// ============================================
//
// This component creates:
// 1. A floating bubble button (bottom-right)
// 2. An expandable chat panel with messages
// 3. Streaming connection to the /api/v1/chat/stream endpoint
//
// DESIGN DECISION: Vanilla JS, no framework
// Matches the rest of the site. The chat widget is self-contained —
// it injects its own HTML and manages its own state.

// API base URL — points to the backend server
const API_BASE = window.PEACE_API_URL || 'http://localhost:3001';

// Suggested questions for first-time users
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

/**
 * Initialize the chat widget.
 * Call this once from main.js on page load.
 */
export function initChatWidget() {
  injectHTML();
  bindEvents();
  checkAIStatus();
}

// ============================================
// Inject the HTML structure
// ============================================
function injectHTML() {
  const container = document.createElement('div');
  container.id = 'chat-widget';
  container.innerHTML = `
    <button class="chat-bubble" id="chat-bubble" aria-label="Ask AI about conflicts">
      <span class="chat-bubble-icon">💬</span>
    </button>

    <div class="chat-panel" id="chat-panel">
      <div class="chat-header">
        <div class="chat-header-icon">☮</div>
        <div class="chat-header-text">
          <h4>Ask About Any Conflict</h4>
          <p>AI-powered answers from verified data</p>
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

      <div class="chat-input-area">
        <textarea
          class="chat-input"
          id="chat-input"
          placeholder="Ask a question..."
          rows="1"
        ></textarea>
        <button class="chat-send" id="chat-send" disabled aria-label="Send">
          ▶
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
  bubbleIcon.textContent = isOpen ? '✕' : '💬';

  if (isOpen) {
    setTimeout(() => {
      document.getElementById('chat-input').focus();
    }, 300);
  }
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
      : 'AI not configured — answers unavailable';
  } catch {
    statusDot.className = 'chat-header-status offline';
    statusDot.title = 'Cannot reach AI server';
    aiReady = false;
  }
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
  const avatarEmoji = role === 'user' ? '👤' : '☮';

  const msgEl = document.createElement('div');
  msgEl.className = `chat-msg ${role}`;
  msgEl.innerHTML = `
    <div class="chat-msg-avatar">${avatarEmoji}</div>
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
    <div class="chat-msg-avatar">☮</div>
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
