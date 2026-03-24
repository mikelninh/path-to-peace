// ============================================
// Peace Progress Tracker
// ============================================

export async function renderPeaceTracker(container) {
  if (!container) return;

  const { peaceProgress } = await import('../data/peace-progress.js');

  let filter = 'all';

  const STATUS_CONFIG = {
    'active-talks': { color: '#2ecc71', icon: '🟢', label: 'Active Talks' },
    'stalled': { color: '#f1c40f', icon: '🟡', label: 'Stalled' },
    'no-process': { color: '#e74c3c', icon: '🔴', label: 'No Process' },
    'ceasefire': { color: '#3498db', icon: '🔵', label: 'Ceasefire' },
  };

  function render() {
    const filtered = filter === 'all' ? peaceProgress : peaceProgress.filter(p => p.status === filter);

    // Count by status
    const counts = {};
    peaceProgress.forEach(p => { counts[p.status] = (counts[p.status] || 0) + 1; });

    container.innerHTML = `
      <div class="peace-page">
        <div class="peace-back">
          <a href="#/" class="detail-back-link">← Back to home</a>
        </div>

        <div class="peace-hero">
          <h1>Peace Progress Tracker</h1>
          <p>Where do peace efforts stand for each active conflict? This tracker monitors the status of negotiations, ceasefires, and diplomatic initiatives.</p>
        </div>

        <!-- Status Overview -->
        <div class="peace-overview">
          ${Object.entries(STATUS_CONFIG).map(([key, cfg]) => `
            <div class="peace-overview-card ${filter === key ? 'active' : ''}" data-status="${key}">
              <span class="peace-overview-icon">${cfg.icon}</span>
              <span class="peace-overview-count">${counts[key] || 0}</span>
              <span class="peace-overview-label">${cfg.label}</span>
            </div>
          `).join('')}
        </div>

        <!-- Filters -->
        <div class="peace-filters">
          <button class="peace-filter-btn ${filter === 'all' ? 'active' : ''}" data-filter="all">All (${peaceProgress.length})</button>
          ${Object.entries(STATUS_CONFIG).map(([key, cfg]) => `
            <button class="peace-filter-btn ${filter === key ? 'active' : ''}" data-filter="${key}">
              ${cfg.icon} ${cfg.label} (${counts[key] || 0})
            </button>
          `).join('')}
        </div>

        <!-- Conflict Cards -->
        <div class="peace-grid">
          ${filtered.map(p => {
            const cfg = STATUS_CONFIG[p.status] || STATUS_CONFIG['no-process'];
            return `
            <div class="peace-card">
              <div class="peace-card-header">
                <div>
                  <span class="peace-status-badge" style="background: ${cfg.color}20; color: ${cfg.color};">
                    ${cfg.icon} ${cfg.label}
                  </span>
                  <span class="peace-update-date">Updated ${p.lastUpdate}</span>
                </div>
              </div>
              <h3 class="peace-card-title"><a href="#/conflict/${p.conflictId}">${p.conflictId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</a></h3>
              <p class="peace-card-status">${p.statusLabel}</p>
              <p class="peace-card-summary">${p.summary}</p>

              <!-- Milestones -->
              <div class="peace-milestones">
                ${p.milestones.map(m => `
                  <div class="peace-milestone ${m.status}">
                    <span class="peace-milestone-date">${m.date}</span>
                    <span class="peace-milestone-event">${m.event}</span>
                  </div>
                `).join('')}
              </div>

              <!-- What Needs to Happen -->
              <div class="peace-needs">
                <h4>What Needs to Happen</h4>
                <p>${p.whatNeedsToHappen}</p>
              </div>

              <!-- Key Actors -->
              <div class="peace-actors">
                ${p.keyActors.map(a => `<span class="peace-actor-tag">${a}</span>`).join('')}
              </div>

              <div class="peace-card-footer">
                <a href="#/conflict/${p.conflictId}" class="peace-detail-link">Full conflict analysis →</a>
                <a href="#/write" class="peace-write-link">Write to your rep →</a>
              </div>
            </div>
          `}).join('')}
        </div>
      </div>
    `;

    // Filter handlers
    container.querySelectorAll('.peace-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filter = btn.dataset.filter;
        render();
      });
    });

    container.querySelectorAll('.peace-overview-card').forEach(card => {
      card.addEventListener('click', () => {
        filter = filter === card.dataset.status ? 'all' : card.dataset.status;
        render();
      });
    });

    window.scrollTo(0, 0);
  }

  render();
}
