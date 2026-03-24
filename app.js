// ============================================
// THE PATH TO PEACE — Application Logic
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navigation ----
  const nav = document.getElementById('main-nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Active nav link tracking
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 200) current = section.getAttribute('id');
    });
    navAnchors.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('data-section') === current) a.classList.add('active');
    });
  });

  // ---- Render Cause Categories ----
  const catContainer = document.getElementById('cause-categories');
  causeCategories.forEach(cat => {
    catContainer.innerHTML += `
      <div class="category-card">
        <div class="category-icon" style="background: ${cat.color}15; color: ${cat.color};">${cat.icon}</div>
        <div class="category-info">
          <h4>${cat.title}</h4>
          <p>${cat.desc}</p>
        </div>
      </div>
    `;
  });

  // ---- Render Current Conflicts ----
  const conflictsContainer = document.getElementById('current-conflicts');

  function renderConflicts(filter = 'all') {
    const filtered = filter === 'all'
      ? currentConflicts
      : currentConflicts.filter(c => c.type === filter);

    conflictsContainer.innerHTML = filtered.map(c => `
      <div class="conflict-card fade-in" data-severity="${c.severity}" data-id="${c.id}" onclick="openModal('${c.id}')">
        <div class="conflict-card-header">
          <h3>${c.name}</h3>
          <span class="severity-badge ${c.severity}">${c.severity}</span>
        </div>
        <div class="conflict-region">${c.region}</div>
        <p class="conflict-summary">${c.summary}</p>
        <div class="conflict-meta">
          <span class="meta-tag">📅 ${c.started}</span>
          ${c.displaced !== 'N/A' ? `<span class="meta-tag">🏠 ${c.displaced} displaced</span>` : ''}
        </div>
        <div class="conflict-tags">
          ${c.causes.map(tag => `<span class="cause-tag">${tag}</span>`).join('')}
        </div>
        <div class="conflict-card-footer">
          <span class="learn-more">Full analysis</span>
        </div>
      </div>
    `).join('');

    // Animate in
    setTimeout(() => {
      document.querySelectorAll('.conflict-card.fade-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 80);
      });
    }, 50);
  }

  renderConflicts();

  // ---- Filter buttons ----
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderConflicts(btn.dataset.filter);
    });
  });

  // ---- Modal ----
  const overlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');

  window.openModal = function(id) {
    const c = currentConflicts.find(x => x.id === id);
    if (!c) return;

    modalContent.innerHTML = `
      <h2>${c.name}</h2>
      <p class="modal-region">${c.region} &middot; ${c.type.replace('-', ' ')} &middot; Since ${c.started}</p>

      <div class="modal-key-facts">
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

      <div class="modal-section">
        <h3>📋 Overview</h3>
        <p>${c.summary}</p>
      </div>

      <div class="modal-section">
        <h3>👥 Who Is Fighting?</h3>
        <ul>
          <li><strong>Side A:</strong> ${c.who.sideA}</li>
          <li><strong>Side B:</strong> ${c.who.sideB}</li>
        </ul>
      </div>

      <div class="modal-section">
        <h3>❓ Why Are They Fighting?</h3>
        <p>${c.why}</p>
      </div>

      <div class="modal-section">
        <h3>💎 What Resources Are At Stake?</h3>
        <p>${c.resources}</p>
      </div>

      <div class="modal-section">
        <h3>🎯 What Is This Really About?</h3>
        <p>${c.whatAbout}</p>
      </div>

      <div class="modal-section">
        <h3>🕊️ Path to Resolution</h3>
        <p>${c.pathToResolution}</p>
      </div>

      <div class="modal-section">
        <h3>🌍 Global Impact</h3>
        <p>${c.impact}</p>
      </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ---- Root Causes Deep Dive ----
  const causesContainer = document.getElementById('causes-deep-dive');
  rootCauses.forEach(cause => {
    causesContainer.innerHTML += `
      <div class="cause-item fade-in">
        <div class="cause-header" onclick="this.parentElement.classList.toggle('open')">
          <div class="cause-number" style="background: ${cause.color}15; color: ${cause.color};">${cause.number}</div>
          <div class="cause-header-text">
            <h3>${cause.title}</h3>
            <p>${cause.shortDesc}</p>
          </div>
          <button class="cause-toggle" aria-label="Expand">&#9660;</button>
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
    `;
  });

  // ---- Historical Timeline ----
  const timelineContainer = document.getElementById('historical-timeline');
  historicalConflicts.forEach(h => {
    timelineContainer.innerHTML += `
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
    `;
  });

  // ---- How Wars End ----
  const endingsContainer = document.getElementById('endings-grid');
  howWarsEnd.forEach(e => {
    endingsContainer.innerHTML += `
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
    `;
  });

  // ---- Patterns ----
  const patternsContainer = document.getElementById('patterns-content');
  patterns.forEach(p => {
    patternsContainer.innerHTML += `
      <div class="pattern-card fade-in ${p.fullWidth ? 'full-width' : ''}">
        <h3><span>${p.icon}</span> ${p.title}</h3>
        <p>${p.content}</p>
        <ul>
          ${p.points.map(pt => `<li>${pt}</li>`).join('')}
        </ul>
      </div>
    `;
  });

  // ---- Path Forward ----
  const forwardContainer = document.getElementById('forward-content');
  pathForward.forEach(f => {
    forwardContainer.innerHTML += `
      <div class="forward-card fade-in">
        <div class="forward-step">${f.step}</div>
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
        <ul>
          ${f.actions.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>
    `;
  });

  // ---- Apply Lessons ----
  const applyContainer = document.getElementById('apply-grid');
  applyLessons.forEach(a => {
    applyContainer.innerHTML += `
      <div class="apply-card fade-in">
        <div class="apply-current">
          <h3>🔴 Today: ${a.current}</h3>
          <p><strong>Historical Parallel:</strong> ${a.historical}</p>
        </div>
        <div class="apply-historical">
          <h3>🟢 Lesson We Can Apply</h3>
          <p>${a.lesson}</p>
        </div>
      </div>
    `;
  });

  // ---- Take Action ----
  const actionContainer = document.getElementById('action-grid');
  if (actionContainer && typeof takeActions !== 'undefined') {
    takeActions.forEach(a => {
      actionContainer.innerHTML += `
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
      `;
    });
  }

  // ---- Intersection Observer for Animations ----
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  }

  // Fallback: ensure everything is visible after 3 seconds
  setTimeout(() => {
    fadeEls.forEach(el => el.classList.add('visible'));
  }, 3000);

  // ---- Smooth scroll for all anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
