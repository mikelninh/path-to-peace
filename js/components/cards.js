// ============================================
// Card Rendering — Conflicts, Causes, Actions, etc.
// ============================================

import { navigate } from '../router.js';
import { icon } from './icons.js';

// ---- Cause Categories (Overview) ----
export function renderCauseCategories(container, categories) {
  if (!container) return;
  container.innerHTML = categories.map(cat => `
    <div class="category-card">
      <div class="category-icon" style="background: ${cat.color}15; color: ${cat.color};">${cat.icon}</div>
      <div class="category-info">
        <h4>${cat.title}</h4>
        <p>${cat.desc}</p>
      </div>
    </div>
  `).join('');
}

// ---- Current Conflicts Grid ----
export function renderConflicts(container, conflicts, filter = 'all') {
  if (!container) return;

  const filtered = filter === 'all'
    ? conflicts
    : conflicts.filter(c => c.type === filter);

  container.innerHTML = filtered.map(c => `
    <div class="conflict-card fade-in" data-severity="${c.severity}" data-id="${c.id}">
      <div class="conflict-card-header">
        <h3>${c.name}</h3>
        <span class="severity-badge ${c.severity}">${c.severity}</span>
      </div>
      <div class="conflict-region">${c.region}</div>
      <p class="conflict-summary">${c.summary}</p>
      <div class="conflict-meta">
        <span class="meta-tag">${icon('calendar', 'icon-sm')} ${c.started}</span>
        ${c.displaced !== 'N/A' ? `<span class="meta-tag">${icon('home-broken', 'icon-sm')} ${c.displaced} displaced</span>` : ''}
      </div>
      <div class="conflict-tags">
        ${c.causes.map(tag => `<span class="cause-tag">${tag}</span>`).join('')}
      </div>
      <div class="conflict-card-footer">
        <span class="learn-more">Full analysis</span>
      </div>
    </div>
  `).join('');

  // Attach click handlers
  container.querySelectorAll('.conflict-card').forEach(card => {
    card.addEventListener('click', () => {
      navigate('/conflict/' + card.dataset.id);
    });
    card.style.cursor = 'pointer';
  });

  // Animate in
  setTimeout(() => {
    container.querySelectorAll('.conflict-card.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
  }, 50);
}

// ---- Root Causes Accordion ----
export function renderRootCauses(container, causes) {
  if (!container) return;
  container.innerHTML = causes.map(cause => `
    <div class="cause-item fade-in">
      <div class="cause-header">
        <div class="cause-number" style="background: ${cause.color}15; color: ${cause.color};">${cause.number}</div>
        <div class="cause-header-text">
          <h3>${cause.title}</h3>
          <p>${cause.shortDesc}</p>
        </div>
        <button class="cause-toggle" aria-label="Expand">${icon('chevron-down', 'icon-sm')}</button>
      </div>
      <div class="cause-body">
        <div class="cause-body-inner">
          <p>${cause.fullDesc}</p>
          <div class="cause-examples">
            <h4>Current Examples</h4>
            <div class="cause-example-list">
              ${cause.examples.map(ex => `
                <div class="cause-example">
                  <strong>${ex.name}:</strong> ${ex.detail}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Attach toggle handlers
  container.querySelectorAll('.cause-header').forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('open');
    });
  });
}

// ---- How Wars End ----
export function renderEndings(container, endings) {
  if (!container) return;
  container.innerHTML = endings.map(e => `
    <div class="ending-card fade-in">
      <div class="ending-icon" style="background: ${e.color}15; color: ${e.color};">${e.icon}</div>
      <h3>${e.title}</h3>
      <p>${e.desc}</p>
      <ul class="ending-examples">
        ${e.examples.map(ex => `<li>${ex}</li>`).join('')}
      </ul>
      <div class="ending-success">
        <span class="success-label">Durability</span>
        <div class="success-bar">
          <div class="success-bar-fill" style="width: ${e.successRate}%; background: ${e.successColor};"></div>
        </div>
        <span class="success-label">${e.successRate}%</span>
      </div>
    </div>
  `).join('');
}

// ---- Patterns ----
export function renderPatterns(container, patternData) {
  if (!container) return;
  container.innerHTML = patternData.map(p => `
    <div class="pattern-card fade-in ${p.fullWidth ? 'full-width' : ''}">
      <h3><span>${p.icon}</span> ${p.title}</h3>
      <p>${p.content}</p>
      <ul>
        ${p.points.map(pt => `<li>${pt}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// ---- Path Forward ----
export function renderPathForward(container, items) {
  if (!container) return;
  container.innerHTML = items.map(f => `
    <div class="forward-card fade-in">
      <div class="forward-step">${f.step}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
      <ul>
        ${f.actions.map(a => `<li>${a}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// ---- Apply Lessons ----
export function renderApplyLessons(container, lessons) {
  if (!container) return;
  container.innerHTML = lessons.map(a => `
    <div class="apply-card fade-in">
      <div class="apply-current">
        <h3>${icon('warning', 'icon-sm')} Today: ${a.current}</h3>
        <p><strong>Historical Parallel:</strong> ${a.historical}</p>
      </div>
      <div class="apply-historical">
        <h3>${icon('check', 'icon-sm')} Lesson We Can Apply</h3>
        <p>${a.lesson}</p>
      </div>
    </div>
  `).join('');
}

// ---- Take Action ----
export function renderActions(container, actions) {
  if (!container) return;
  container.innerHTML = actions.map(a => `
    <div class="action-card fade-in">
      <div class="action-card-header">
        <div class="action-icon" style="background: ${a.color}15; color: ${a.color};">${a.icon}</div>
        <div>
          <h3>${a.title}</h3>
          <span class="action-urgency" style="color: ${a.color};">${a.urgency}</span>
        </div>
      </div>
      <p class="action-desc">${a.desc}</p>
      <ul class="action-list">
        ${a.actions.map(act => `<li>${act}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// ---- Historical Timeline ----
export function renderHistoricalTimeline(container, conflicts) {
  if (!container) return;
  container.innerHTML = conflicts.map(h => `
    <div class="timeline-item fade-in">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-date">${h.date}</div>
        <h3>${h.name}</h3>
        <p>${h.desc}</p>
        <div class="timeline-how-ended">
          <div class="timeline-how-ended-label">How It Ended</div>
          <p>${h.howEnded}</p>
        </div>
        <div class="timeline-lesson">
          <div class="timeline-lesson-label">Key Lesson</div>
          <p>${h.lesson}</p>
        </div>
      </div>
    </div>
  `).join('');
}
