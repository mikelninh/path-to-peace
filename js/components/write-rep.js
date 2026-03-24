// ============================================
// Write to Your Representative
// ============================================

export function renderWriteRep(container, currentConflicts) {
  if (!container) return;

  let selectedConflict = null;
  let selectedConcern = null;
  let letterData = null;

  async function loadData() {
    const { concernTypes, conflictFacts, generateLetter } = await import('../data/letter-templates.js');
    return { concernTypes, conflictFacts, generateLetter };
  }

  async function render() {
    const { concernTypes, conflictFacts, generateLetter } = await loadData();

    container.innerHTML = `
      <div class="write-page">
        <div class="write-back">
          <a href="#/" class="detail-back-link">← Back to home</a>
        </div>

        <div class="write-hero">
          <div class="write-hero-icon">📣</div>
          <h1>Write to Your Representative</h1>
          <p>Your elected officials work for you. Use this tool to generate an informed, fact-based letter about a specific conflict. Politicians respond to pressure — every letter matters.</p>
        </div>

        <!-- Step 1: Choose Conflict -->
        <div class="write-step">
          <div class="write-step-number">1</div>
          <div class="write-step-content">
            <h2>Choose a Conflict</h2>
            <p>Which conflict do you want to write about?</p>
            <div class="write-conflict-grid">
              ${currentConflicts.map(c => `
                <button class="write-conflict-btn ${selectedConflict === c.id ? 'selected' : ''}" data-id="${c.id}">
                  <span class="write-conflict-name">${c.name}</span>
                  <span class="write-conflict-region">${c.region}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Step 2: Choose Concern -->
        <div class="write-step ${!selectedConflict ? 'write-step-disabled' : ''}">
          <div class="write-step-number">2</div>
          <div class="write-step-content">
            <h2>What's Your Concern?</h2>
            <p>Select the issue you want to raise with your representative.</p>
            <div class="write-concern-grid">
              ${concernTypes.map(ct => `
                <button class="write-concern-btn ${selectedConcern === ct.id ? 'selected' : ''}" data-id="${ct.id}" ${!selectedConflict ? 'disabled' : ''}>
                  <span class="write-concern-icon">${ct.icon}</span>
                  <span class="write-concern-label">${ct.label}</span>
                  <span class="write-concern-desc">${ct.desc}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Step 3: Letter Preview -->
        <div class="write-step ${!selectedConflict || !selectedConcern ? 'write-step-disabled' : ''}">
          <div class="write-step-number">3</div>
          <div class="write-step-content">
            <h2>Your Letter</h2>
            <p>Edit the letter below, then copy it or open your email client to send it.</p>
            <div class="write-letter-container">
              <textarea class="write-letter-text" id="letter-textarea" rows="16" ${!selectedConflict || !selectedConcern ? 'disabled' : ''}>${selectedConflict && selectedConcern ? generateLetter(selectedConflict, selectedConcern) : 'Select a conflict and concern above to generate your letter...'}</textarea>
              <div class="write-letter-actions">
                <button class="btn btn-primary write-copy-btn" ${!selectedConflict || !selectedConcern ? 'disabled' : ''}>
                  📋 Copy to Clipboard
                </button>
                <button class="btn btn-secondary write-email-btn" ${!selectedConflict || !selectedConcern ? 'disabled' : ''}>
                  ✉️ Open in Email
                </button>
              </div>
            </div>
            ${selectedConflict ? `
              <div class="write-conflict-link">
                <a href="#/conflict/${selectedConflict}">Learn more about this conflict →</a>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Tips -->
        <div class="write-tips">
          <h3>Tips for Effective Letters</h3>
          <div class="write-tips-grid">
            <div class="write-tip">
              <strong>Be specific.</strong> Name the conflict and the policy you want. Vague letters get vague responses.
            </div>
            <div class="write-tip">
              <strong>Be personal.</strong> Add why this matters to you as a constituent. Personal stories are powerful.
            </div>
            <div class="write-tip">
              <strong>Ask for a response.</strong> Request a written reply about their position on this issue.
            </div>
            <div class="write-tip">
              <strong>Follow up.</strong> Send again if you don't hear back. Persistence signals that constituents care.
            </div>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    container.querySelectorAll('.write-conflict-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedConflict = btn.dataset.id;
        render();
      });
    });

    container.querySelectorAll('.write-concern-btn').forEach(btn => {
      if (btn.disabled) return;
      btn.addEventListener('click', () => {
        selectedConcern = btn.dataset.id;
        render();
      });
    });

    const copyBtn = container.querySelector('.write-copy-btn');
    if (copyBtn && !copyBtn.disabled) {
      copyBtn.addEventListener('click', () => {
        const textarea = container.querySelector('#letter-textarea');
        navigator.clipboard.writeText(textarea.value).then(() => {
          copyBtn.textContent = '✓ Copied!';
          setTimeout(() => { copyBtn.textContent = '📋 Copy to Clipboard'; }, 2000);
        });
      });
    }

    const emailBtn = container.querySelector('.write-email-btn');
    if (emailBtn && !emailBtn.disabled) {
      emailBtn.addEventListener('click', () => {
        const textarea = container.querySelector('#letter-textarea');
        const conflict = currentConflicts.find(c => c.id === selectedConflict);
        const subject = encodeURIComponent(`Regarding the ${conflict ? conflict.name : 'conflict situation'}`);
        const body = encodeURIComponent(textarea.value);
        window.open(`mailto:?subject=${subject}&body=${body}`);
      });
    }

    if (selectedConflict && selectedConcern) {
      container.querySelector('.write-letter-container').scrollIntoView({ behavior: 'smooth' });
    }
  }

  render();
}
