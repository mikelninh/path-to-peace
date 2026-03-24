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
}
