// ============================================
// Filter Bar
// ============================================

import { renderConflicts } from './cards.js';

export function initFilters(conflicts) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const container = document.getElementById('current-conflicts');
      renderConflicts(container, conflicts, btn.dataset.filter);
    });
  });
}
