// ============================================
// Scrollytelling — Scroll-driven map narratives
// ============================================

import { getGlobalMap, flyTo, resetView } from './map.js';

export function initScrollytelling(conflicts) {
  const section = document.getElementById('scrollytelling');
  if (!section) return;

  // Pick featured conflicts (ones with narrative data)
  const featured = conflicts.filter(c => c.narrative && c.narrative.length > 0).slice(0, 3);
  if (!featured.length) return;

  const storyContainer = section.querySelector('.story-narratives');
  const stickyMap = section.querySelector('.story-map');

  if (!storyContainer) return;

  // Render narrative steps
  storyContainer.innerHTML = featured.map((c, ci) => `
    <div class="story-conflict">
      <div class="story-conflict-title">
        <h3>${c.name}</h3>
        <span class="severity-badge ${c.severity}">${c.severity}</span>
      </div>
      ${c.narrative.map((step, si) => `
        <div class="narrative-step" data-conflict="${ci}" data-step="${si}"
             data-lat="${step.mapAction.flyTo[0]}" data-lng="${step.mapAction.flyTo[1]}"
             data-zoom="${step.mapAction.zoom || 5}">
          <p>${step.text}</p>
        </div>
      `).join('')}
      <div class="narrative-step narrative-step-cta" data-conflict="${ci}" data-step="cta"
           data-lat="${c.lat}" data-lng="${c.lng}" data-zoom="5">
        <a href="#/conflict/${c.id}" class="btn btn-secondary">Read full analysis →</a>
      </div>
    </div>
  `).join('');

  // Observe narrative steps
  const steps = section.querySelectorAll('.narrative-step');
  let activeStep = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target !== activeStep) {
        activeStep = entry.target;

        // Update active styling
        steps.forEach(s => s.classList.remove('active'));
        entry.target.classList.add('active');

        // Fly map
        const lat = parseFloat(entry.target.dataset.lat);
        const lng = parseFloat(entry.target.dataset.lng);
        const zoom = parseInt(entry.target.dataset.zoom) || 5;

        if (!isNaN(lat) && !isNaN(lng)) {
          flyTo(lat, lng, zoom);
        }
      }
    });
  }, { threshold: 0.5, rootMargin: '-30% 0px -30% 0px' });

  steps.forEach(step => observer.observe(step));

  // Reset map when scrollytelling section exits view
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        resetView();
      }
    });
  }, { threshold: 0 });

  sectionObserver.observe(section);
}
