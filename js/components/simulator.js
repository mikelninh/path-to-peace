// ============================================
// Conflict Resolution Simulator
// ============================================

import { navigate } from '../router.js';

export async function renderSimulator(id, container) {
  if (!container) return;

  const { simulations } = await import('../data/simulations.js');

  // If no ID, show scenario selection
  if (!id || id === 'select') {
    renderSelection(container, simulations);
    return;
  }

  const sim = simulations.find(s => s.id === id);
  if (!sim) {
    container.innerHTML = '<div class="sim-page"><p>Simulation not found.</p><a href="#/simulate/select">← Back to simulations</a></div>';
    return;
  }

  let currentNodeId = 'start';
  let history = [];
  let totalScore = 0;

  function render() {
    const node = sim.nodes.find(n => n.id === currentNodeId);
    if (!node) return;

    if (node.isEnding) {
      renderEnding(node);
      return;
    }

    const progress = Math.min(100, (history.length / 6) * 100);

    container.innerHTML = `
      <div class="sim-page">
        <div class="sim-top-bar">
          <a href="#/simulate/select" class="detail-back-link">← All Simulations</a>
          <span class="sim-step-count">Decision ${history.length + 1}</span>
        </div>

        <div class="sim-progress-bar">
          <div class="sim-progress-fill" style="width: ${progress}%; background: ${sim.color};"></div>
        </div>

        <div class="sim-header">
          <span class="sim-icon" style="background: ${sim.color}15; color: ${sim.color};">${sim.icon}</span>
          <h1>${sim.title}</h1>
        </div>

        <div class="sim-narrative">
          ${formatNarrative(node.text)}
        </div>

        <div class="sim-choices">
          <h3>What do you do?</h3>
          ${node.choices.map((choice, i) => `
            <button class="sim-choice" data-next="${choice.next}" data-score="${choice.score || 0}">
              <span class="sim-choice-letter">${String.fromCharCode(65 + i)}</span>
              <span class="sim-choice-text">${choice.text}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.sim-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        const next = btn.dataset.next;
        const score = parseInt(btn.dataset.score) || 0;
        history.push({ nodeId: currentNodeId, choice: btn.querySelector('.sim-choice-text').textContent });
        totalScore += score;
        currentNodeId = next;
        render();
        window.scrollTo(0, 0);
      });
    });

    window.scrollTo(0, 0);
  }

  function renderEnding(node) {
    const outcomeConfig = {
      'success': { color: '#2ecc71', label: 'Peace Achieved', icon: '🕊️' },
      'partial': { color: '#f1c40f', label: 'Partial Success', icon: '⚖️' },
      'failure': { color: '#e74c3c', label: 'Negotiations Failed', icon: '💔' },
    };
    const outcome = outcomeConfig[node.outcome] || outcomeConfig.partial;

    container.innerHTML = `
      <div class="sim-page">
        <div class="sim-top-bar">
          <a href="#/simulate/select" class="detail-back-link">← All Simulations</a>
        </div>

        <div class="sim-ending">
          <div class="sim-ending-icon" style="background: ${outcome.color}15;">${outcome.icon}</div>
          <h1 class="sim-ending-title" style="color: ${outcome.color};">${outcome.label}</h1>

          <div class="sim-ending-narrative">
            ${formatNarrative(node.text)}
          </div>

          <div class="sim-ending-score">
            <div class="sim-score-circle" style="border-color: ${outcome.color};">
              <span style="color: ${outcome.color};">${node.score || totalScore}</span>
            </div>
            <p>Diplomacy Score</p>
          </div>

          <!-- Real World Parallel -->
          <div class="sim-real-world">
            <h3>📚 What Happened in the Real World</h3>
            <p>${node.realWorldParallel}</p>
          </div>

          <!-- Decisions Made -->
          <div class="sim-history">
            <h3>Your Decisions</h3>
            ${history.map((h, i) => `
              <div class="sim-history-item">
                <span class="sim-history-num">${i + 1}</span>
                <span>${h.choice}</span>
              </div>
            `).join('')}
          </div>

          <div class="sim-ending-actions">
            <button class="btn btn-primary sim-retry">Try Again</button>
            <a href="#/simulate/select" class="btn btn-secondary">Other Simulations</a>
          </div>
        </div>
      </div>
    `;

    const retryBtn = container.querySelector('.sim-retry');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        currentNodeId = 'start';
        history = [];
        totalScore = 0;
        render();
      });
    }

    window.scrollTo(0, 0);
  }

  render();
}

function renderSelection(container, simulations) {
  container.innerHTML = `
    <div class="sim-page">
      <div class="sim-back">
        <a href="#/" class="detail-back-link">← Back to home</a>
      </div>

      <div class="sim-select-hero">
        <h1>Conflict Resolution Simulator</h1>
        <p>Step into the shoes of a peace mediator. Make real decisions, face real consequences, and learn why building peace is humanity's most complex — and most important — challenge.</p>
      </div>

      <div class="sim-select-grid">
        ${simulations.map(s => `
          <div class="sim-select-card" data-id="${s.id}">
            <div class="sim-select-icon" style="background: ${s.color}15; color: ${s.color};">${s.icon}</div>
            <h2>${s.title}</h2>
            <p class="sim-select-subtitle">${s.subtitle}</p>
            <p class="sim-select-based">${s.basedOn}</p>
            <div class="sim-select-meta">
              <span>${s.nodes.length} decision points</span>
              <span>Multiple endings</span>
            </div>
            <button class="btn btn-primary sim-start-btn" style="background: ${s.color};">Begin Simulation →</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.sim-start-btn').forEach(btn => {
    const card = btn.closest('.sim-select-card');
    btn.addEventListener('click', () => navigate('/simulate/' + card.dataset.id));
  });

  window.scrollTo(0, 0);
}

function formatNarrative(text) {
  return text.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('');
}
