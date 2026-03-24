// ============================================
// Navigation
// ============================================

export function initNav() {
  const nav = document.getElementById('main-nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!nav || !navToggle || !navLinks) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

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

  // Initialize mobile bottom navigation
  initBottomNav();
}

// ============================================
// Mobile Bottom Navigation
// ============================================

function initBottomNav() {
  const mql = window.matchMedia('(max-width: 768px)');
  let bottomNav = null;
  let moreOverlay = null;

  function createBottomNav() {
    if (bottomNav) return; // already created

    // -- More overlay --
    moreOverlay = document.createElement('div');
    moreOverlay.className = 'bottom-nav-more-overlay';
    moreOverlay.innerHTML = `
      <a class="bottom-nav-more-link" href="#conflict-map">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        Map
      </a>
      <a class="bottom-nav-more-link" href="#current">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        Current Conflicts
      </a>
      <a class="bottom-nav-more-link" href="#root-causes">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        Root Causes
      </a>
      <a class="bottom-nav-more-link" href="#historical">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Historical Lessons
      </a>
      <a class="bottom-nav-more-link" href="#how-wars-end">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        How Wars End
      </a>
      <a class="bottom-nav-more-link" href="#patterns">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        Patterns
      </a>
      <a class="bottom-nav-more-link" href="#path-forward">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
        Path Forward
      </a>
      <a class="bottom-nav-more-link" href="#/educators">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        Educators
      </a>
      <a class="bottom-nav-more-link" href="#/write">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        Write Your Rep
      </a>
      <a class="bottom-nav-more-link" href="#/peace-progress">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        Peace Tracker
      </a>
      <a class="bottom-nav-more-link" href="#/simulator">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        Simulator
      </a>
      <a class="bottom-nav-more-link" href="#/methodology">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        Methodology & Sources
      </a>
      <a class="bottom-nav-more-link" href="#/report">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
        Report
      </a>
    `;
    document.body.appendChild(moreOverlay);

    // Close overlay when a link is clicked
    moreOverlay.querySelectorAll('.bottom-nav-more-link').forEach(link => {
      link.addEventListener('click', () => {
        moreOverlay.classList.remove('open');
      });
    });

    // -- Bottom nav bar --
    bottomNav = document.createElement('nav');
    bottomNav.className = 'bottom-nav';
    bottomNav.setAttribute('aria-label', 'Bottom navigation');
    bottomNav.innerHTML = `
      <a class="bottom-nav-item" href="#conflict-map" data-section="conflict-map">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        <span>Map</span>
      </a>
      <a class="bottom-nav-item" href="#current" data-section="current">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        <span>Conflicts</span>
      </a>
      <a class="bottom-nav-item" href="#root-causes" data-section="root-causes">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        <span>Learn</span>
      </a>
      <a class="bottom-nav-item" href="#take-action" data-section="take-action">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10z"/><path d="M12 13L2.95 6.3"/><path d="M12 13l9.05-6.7"/><path d="M12 13v9"/></svg>
        <span>Act</span>
      </a>
      <button class="bottom-nav-item" id="bottom-nav-more-btn" aria-label="More navigation options">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <span>More</span>
      </button>
    `;
    document.body.appendChild(bottomNav);

    // More button toggles overlay
    const moreBtn = document.getElementById('bottom-nav-more-btn');
    moreBtn.addEventListener('click', () => {
      moreOverlay.classList.toggle('open');
    });

    // Close overlay when tapping outside (on the overlay background)
    moreOverlay.addEventListener('click', (e) => {
      if (e.target === moreOverlay) {
        moreOverlay.classList.remove('open');
      }
    });

    // Active state tracking based on scroll position
    updateBottomNavActive();
    window.addEventListener('scroll', updateBottomNavActive);
    window.addEventListener('hashchange', () => {
      // Close more overlay on navigation
      if (moreOverlay) moreOverlay.classList.remove('open');
      updateBottomNavActive();
    });
  }

  function removeBottomNav() {
    if (bottomNav) {
      bottomNav.remove();
      bottomNav = null;
    }
    if (moreOverlay) {
      moreOverlay.remove();
      moreOverlay = null;
    }
    window.removeEventListener('scroll', updateBottomNavActive);
  }

  function updateBottomNavActive() {
    if (!bottomNav) return;

    const items = bottomNav.querySelectorAll('.bottom-nav-item[data-section]');
    const sections = document.querySelectorAll('section[id]');

    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 200) current = section.getAttribute('id');
    });

    items.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-section') === current) {
        item.classList.add('active');
      }
    });
  }

  function handleMediaChange(e) {
    if (e.matches) {
      createBottomNav();
    } else {
      removeBottomNav();
    }
  }

  // Initial check
  if (mql.matches) {
    createBottomNav();
  }

  // Listen for viewport changes
  mql.addEventListener('change', handleMediaChange);
}
