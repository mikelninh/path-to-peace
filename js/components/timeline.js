// ============================================
// Interactive Timeline
// ============================================

const EVENT_COLORS = {
  escalation: '#e74c3c',
  ceasefire: '#2ecc71',
  diplomacy: '#3498db',
  humanitarian: '#e67e22',
  resolution: '#4ecdc4',
  default: '#a0a0b0',
};

export function renderConflictTimeline(container, events, title) {
  if (!container || !events || !events.length) return;

  // Sort by date
  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  const filterTypes = [...new Set(sorted.map(e => e.type))];

  container.innerHTML = `
    <div class="event-timeline">
      <div class="timeline-filters">
        <button class="tl-filter-btn active" data-filter="all">All</button>
        ${filterTypes.map(t => `
          <button class="tl-filter-btn" data-filter="${t}">
            <span class="tl-filter-dot" style="background: ${EVENT_COLORS[t] || EVENT_COLORS.default};"></span>
            ${t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        `).join('')}
      </div>
      <div class="event-timeline-track">
        <div class="event-timeline-line"></div>
        ${sorted.map((e, i) => {
          const color = EVENT_COLORS[e.type] || EVENT_COLORS.default;
          const year = e.date.substring(0, 4);
          const month = e.date.substring(5, 7);
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const dateLabel = months[parseInt(month) - 1] + ' ' + year;
          return `
            <div class="event-timeline-item" data-type="${e.type}" style="--event-color: ${color};">
              <div class="event-timeline-dot" style="background: ${color}; box-shadow: 0 0 8px ${color}40;"></div>
              <div class="event-timeline-card">
                <span class="event-timeline-date">${dateLabel}</span>
                <p class="event-timeline-title">${e.title}</p>
                <span class="event-timeline-type" style="color: ${color};">${e.type}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Filter functionality
  container.querySelectorAll('.tl-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tl-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      container.querySelectorAll('.event-timeline-item').forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.type === filter) ? '' : 'none';
      });
    });
  });
}
