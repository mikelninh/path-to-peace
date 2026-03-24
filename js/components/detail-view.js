// ============================================
// Conflict Detail View
// ============================================

import { createMiniMap } from './map.js';
import { renderConflictTimeline } from './timeline.js';

let currentMiniMap = null;

export function renderConflictDetail(id, container, currentConflicts, applyLessons) {
  const c = currentConflicts.find(x => x.id === id);
  if (!c || !container) return;

  // Find applicable lesson
  const lesson = applyLessons ? applyLessons.find(a =>
    a.current.toLowerCase().includes(c.name.split(':')[0].split('–')[0].trim().toLowerCase().substring(0, 8))
  ) : null;

  container.innerHTML = `
    <div class="detail-page">
      <div class="detail-back">
        <a href="#/" class="detail-back-link">← Back to all conflicts</a>
      </div>

      <div class="detail-header">
        <div class="detail-title-area">
          <h1 class="detail-title">${c.name}</h1>
          <p class="detail-region">${c.region} · ${c.type.replace('-', ' ')} · Since ${c.started}</p>
          <div class="detail-severity">
            <span class="severity-badge ${c.severity}">${c.severity}</span>
          </div>
        </div>
      </div>

      <div class="detail-top-grid">
        <div class="detail-map-container" id="detail-mini-map"></div>
        <div class="detail-key-facts">
          <div class="key-fact">
            <div class="key-fact-label">Severity</div>
            <div class="key-fact-value" style="color: var(--severity-${c.severity})">${c.severity.charAt(0).toUpperCase() + c.severity.slice(1)}</div>
          </div>
          <div class="key-fact">
            <div class="key-fact-label">Displaced</div>
            <div class="key-fact-value">${c.displaced}</div>
          </div>
          <div class="key-fact">
            <div class="key-fact-label">Casualties</div>
            <div class="key-fact-value">${c.casualties}</div>
          </div>
          <div class="key-fact">
            <div class="key-fact-label">Started</div>
            <div class="key-fact-value">${c.started}</div>
          </div>
        </div>
      </div>

      ${c.keyEvents && c.keyEvents.length ? `
      <div class="detail-section">
        <h2>Timeline of Key Events</h2>
        <div class="detail-timeline-container" id="detail-timeline"></div>
      </div>
      ` : ''}

      <div class="detail-tabs">
        <button class="detail-tab active" data-tab="overview">Overview</button>
        <button class="detail-tab" data-tab="who">Who</button>
        <button class="detail-tab" data-tab="why">Why</button>
        <button class="detail-tab" data-tab="resources">Resources</button>
        <button class="detail-tab" data-tab="resolution">Resolution</button>
      </div>

      <div class="detail-tab-content">
        <div class="detail-tab-pane active" id="tab-overview">
          <h3>📋 Overview</h3>
          <p>${c.summary}</p>
          <h3>🎯 What Is This Really About?</h3>
          <p>${c.whatAbout}</p>
          <h3>🌍 Global Impact</h3>
          <p>${c.impact}</p>
        </div>
        <div class="detail-tab-pane" id="tab-who">
          <h3>👥 Who Is Fighting?</h3>
          <div class="who-sides">
            <div class="who-side side-a">
              <h4>Side A</h4>
              <p>${c.who.sideA}</p>
            </div>
            <div class="who-vs">VS</div>
            <div class="who-side side-b">
              <h4>Side B</h4>
              <p>${c.who.sideB}</p>
            </div>
          </div>
        </div>
        <div class="detail-tab-pane" id="tab-why">
          <h3>❓ Why Are They Fighting?</h3>
          <p>${c.why}</p>
          <div class="detail-cause-tags">
            ${c.causes.map(tag => `<span class="cause-tag">${tag}</span>`).join('')}
          </div>
        </div>
        <div class="detail-tab-pane" id="tab-resources">
          <h3>💎 Resources At Stake</h3>
          <p>${c.resources}</p>
        </div>
        <div class="detail-tab-pane" id="tab-resolution">
          <h3>🕊️ Path to Resolution</h3>
          <p>${c.pathToResolution}</p>
          ${lesson ? `
          <div class="detail-lesson-box">
            <h4>📚 Historical Parallel: ${lesson.historical}</h4>
            <p>${lesson.lesson}</p>
          </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  // Initialize tabs
  container.querySelectorAll('.detail-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.detail-tab-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = container.querySelector('#tab-' + tab.dataset.tab);
      if (pane) pane.classList.add('active');
    });
  });

  // Initialize mini map
  if (currentMiniMap) {
    currentMiniMap.remove();
    currentMiniMap = null;
  }
  setTimeout(() => {
    currentMiniMap = createMiniMap('detail-mini-map', c);
  }, 100);

  // Render timeline
  if (c.keyEvents && c.keyEvents.length) {
    setTimeout(() => {
      renderConflictTimeline(document.getElementById('detail-timeline'), c.keyEvents, c.name);
    }, 150);
  }

  // Scroll to top
  window.scrollTo(0, 0);
}
