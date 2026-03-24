// ============================================
// Animation System
// ============================================

/**
 * Reveal-on-scroll using IntersectionObserver.
 * Groups [data-reveal] elements by parent section and assigns
 * staggered --reveal-delay based on index within the group.
 */
export function initAnimations() {
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (!revealEls.length) return;

  // Group elements by their closest .section (or direct parentElement as fallback)
  const groups = new Map();
  revealEls.forEach(el => {
    const parent = el.closest('.section') || el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });

  // Assign staggered delays within each group
  groups.forEach(children => {
    children.forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${i * 80}ms`);
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: reveal everything immediately
    revealEls.forEach(el => el.classList.add('revealed'));
  }
}

/**
 * Animate numbers from 0 to their data-count value on scroll.
 * Supports data-count-suffix for appending "+" or "M+" etc.
 */
export function initCountUp() {
  const countEls = document.querySelectorAll('[data-count]');
  if (!countEls.length) return;

  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.countSuffix || '';
    const isFloat = target % 1 !== 0;
    const duration = 1200; // ms
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = eased * target;

      if (isFloat) {
        el.textContent = current.toFixed(1) + suffix;
      } else {
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure final value is exact
        if (isFloat) {
          el.textContent = target.toFixed(1) + suffix;
        } else {
          el.textContent = target.toLocaleString() + suffix;
        }
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    countEls.forEach(el => observer.observe(el));
  } else {
    countEls.forEach(el => animateCount(el));
  }
}

/**
 * Smooth scroll for same-page anchor links.
 * Skips hash-based router links (e.g. #/).
 */
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#/')) return; // Let router handle these
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
