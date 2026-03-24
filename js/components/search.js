// ============================================
// Client-Side Search
// ============================================

import { navigate } from '../router.js';

let searchIndex = [];
let isOpen = false;
let selectedIdx = -1;

export function initSearch() {
  // Build index lazily on first open
  createSearchUI();
  bindKeyboard();
}

function createSearchUI() {
  // Add search button to nav
  const nav = document.querySelector('.nav-inner');
  if (!nav) return;

  const searchBtn = document.createElement('button');
  searchBtn.className = 'search-trigger';
  searchBtn.innerHTML = '<span class="search-icon">🔍</span><span class="search-kbd">Ctrl+K</span>';
  searchBtn.addEventListener('click', openSearch);
  nav.appendChild(searchBtn);

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.id = 'search-overlay';
  overlay.innerHTML = `
    <div class="search-container">
      <div class="search-input-wrapper">
        <span class="search-input-icon">🔍</span>
        <input type="text" class="search-input" id="search-input" placeholder="Search conflicts, lessons, modules..." autocomplete="off">
        <span class="search-esc-hint">ESC</span>
      </div>
      <div class="search-results" id="search-results">
        <div class="search-empty">Type to search across all content...</div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });

  // Input handler
  const input = document.getElementById('search-input');
  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      performSearch(input.value.trim());
    }, 150);
  });

  // Keyboard navigation in results
  input.addEventListener('keydown', (e) => {
    const results = document.querySelectorAll('.search-result');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIdx = Math.min(selectedIdx + 1, results.length - 1);
      updateSelection(results);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIdx = Math.max(selectedIdx - 1, -1);
      updateSelection(results);
    } else if (e.key === 'Enter' && selectedIdx >= 0 && results[selectedIdx]) {
      e.preventDefault();
      const href = results[selectedIdx].dataset.href;
      if (href) { closeSearch(); navigate(href.replace('#', '')); }
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  });
}

function bindKeyboard() {
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      isOpen ? closeSearch() : openSearch();
    }
    if (e.key === 'Escape' && isOpen) {
      closeSearch();
    }
  });
}

function openSearch() {
  if (searchIndex.length === 0) buildIndex();
  const overlay = document.getElementById('search-overlay');
  if (overlay) {
    overlay.classList.add('active');
    isOpen = true;
    selectedIdx = -1;
    const input = document.getElementById('search-input');
    if (input) { input.value = ''; input.focus(); }
    document.getElementById('search-results').innerHTML = '<div class="search-empty">Type to search across all content...</div>';
  }
}

function closeSearch() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    isOpen = false;
  }
}

async function buildIndex() {
  try {
    const [
      { currentConflicts },
      { historicalConflicts },
      { causeCategories, rootCauses },
    ] = await Promise.all([
      import('../data/conflicts-current.js'),
      import('../data/conflicts-historical.js'),
      import('../data/causes.js'),
    ]);

    // Index current conflicts
    currentConflicts.forEach(c => {
      searchIndex.push({
        title: c.name,
        category: 'Conflict',
        excerpt: c.summary,
        href: '#/conflict/' + c.id,
        text: `${c.name} ${c.region} ${c.summary} ${c.why} ${c.whatAbout} ${c.causes.join(' ')}`.toLowerCase(),
      });
    });

    // Index historical conflicts
    historicalConflicts.forEach(h => {
      searchIndex.push({
        title: h.name,
        category: 'Historical',
        excerpt: h.desc.substring(0, 150) + '...',
        href: '#historical',
        text: `${h.name} ${h.desc} ${h.howEnded} ${h.lesson}`.toLowerCase(),
      });
    });

    // Index root causes
    rootCauses.forEach(rc => {
      searchIndex.push({
        title: rc.title,
        category: 'Root Cause',
        excerpt: rc.shortDesc,
        href: '#root-causes',
        text: `${rc.title} ${rc.shortDesc} ${rc.fullDesc}`.toLowerCase(),
      });
    });

    // Try education data
    try {
      const { lessonPlans, learningModules } = await import('../data/education.js');
      lessonPlans.forEach(l => {
        searchIndex.push({
          title: l.title,
          category: 'Lesson Plan',
          excerpt: l.subtitle,
          href: '#/lesson/' + l.id,
          text: `${l.title} ${l.subtitle} ${l.objectives.join(' ')}`.toLowerCase(),
        });
      });
      learningModules.forEach(m => {
        searchIndex.push({
          title: m.title,
          category: 'Module',
          excerpt: m.subtitle,
          href: '#/module/' + m.id,
          text: `${m.title} ${m.subtitle} ${m.steps.map(s => s.title).join(' ')}`.toLowerCase(),
        });
      });
    } catch {}

    // Static pages
    const staticPages = [
      { title: 'Write to Your Representative', category: 'Tool', excerpt: 'Generate letters to your elected officials about conflicts', href: '#/write', text: 'write representative letter politician elected official' },
      { title: 'Global Arms Trade', category: 'Tool', excerpt: 'Visualize who sells weapons to conflict zones', href: '#/arms-trade', text: 'arms trade weapons military exports' },
      { title: 'Peace Progress Tracker', category: 'Tool', excerpt: 'Track ceasefire and peace talks status for all conflicts', href: '#/peace-progress', text: 'peace progress tracker ceasefire negotiations diplomacy' },
      { title: 'Conflict Resolution Simulator', category: 'Tool', excerpt: 'Interactive simulations of peace negotiations', href: '#/simulate/select', text: 'simulator conflict resolution negotiation mediation' },
      { title: 'For Educators', category: 'Education', excerpt: 'Lesson plans, modules, quizzes for teachers', href: '#/educators', text: 'educators teachers lesson plans quizzes modules school' },
      { title: 'Sources & Methodology', category: 'About', excerpt: 'How we source and verify our data', href: '#/methodology', text: 'methodology sources data verification transparency' },
      { title: 'State of Peace Report', category: 'Report', excerpt: 'Comprehensive assessment of global conflict trends', href: '#/report', text: 'state of peace report annual assessment global trends' },
    ];
    searchIndex.push(...staticPages);

  } catch (e) {
    console.error('Search index build failed:', e);
  }
}

function performSearch(query) {
  const resultsContainer = document.getElementById('search-results');
  if (!resultsContainer) return;

  if (!query) {
    resultsContainer.innerHTML = '<div class="search-empty">Type to search across all content...</div>';
    selectedIdx = -1;
    return;
  }

  const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1);
  if (!terms.length) return;

  const scored = searchIndex.map(item => {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    terms.forEach(term => {
      if (titleLower.includes(term)) score += 10;
      if (item.text.includes(term)) score += 1;
    });
    return { ...item, score };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 10);

  if (!scored.length) {
    resultsContainer.innerHTML = `<div class="search-empty">No results for "${query}"</div>`;
    selectedIdx = -1;
    return;
  }

  resultsContainer.innerHTML = scored.map((r, i) => `
    <div class="search-result ${i === selectedIdx ? 'active' : ''}" data-href="${r.href}" data-idx="${i}">
      <span class="search-result-category">${r.category}</span>
      <div class="search-result-title">${highlightMatch(r.title, terms)}</div>
      <div class="search-result-excerpt">${highlightMatch(r.excerpt, terms)}</div>
    </div>
  `).join('');

  // Click handlers
  resultsContainer.querySelectorAll('.search-result').forEach(el => {
    el.addEventListener('click', () => {
      closeSearch();
      const href = el.dataset.href;
      if (href.startsWith('#/')) { navigate(href.replace('#', '')); }
      else { window.location.hash = href.replace('#', ''); }
    });
  });
}

function updateSelection(results) {
  results.forEach((r, i) => {
    r.classList.toggle('active', i === selectedIdx);
  });
  if (selectedIdx >= 0 && results[selectedIdx]) {
    results[selectedIdx].scrollIntoView({ block: 'nearest' });
  }
}

function highlightMatch(text, terms) {
  let result = text;
  terms.forEach(term => {
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(regex, '<mark>$1</mark>');
  });
  return result;
}
