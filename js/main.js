// ============================================
// THE PATH TO PEACE v3 — Main Entry Point
// ============================================

import { currentConflicts } from './data/conflicts-current.js';
import { historicalConflicts } from './data/conflicts-historical.js';
import { causeCategories, rootCauses } from './data/causes.js';
import { howWarsEnd } from './data/endings.js';
import { patterns, pathForward, applyLessons } from './data/patterns.js';
import { takeActions } from './data/actions.js';

import { initRouter } from './router.js';
import { initNav } from './components/nav.js';
import { initAnimations, initSmoothScroll } from './components/animations.js';
import { initFilters } from './components/filters.js';
import {
  renderCauseCategories,
  renderConflicts,
  renderRootCauses,
  renderEndings,
  renderPatterns,
  renderPathForward,
  renderApplyLessons,
  renderActions,
  renderHistoricalTimeline,
} from './components/cards.js';
import { createGlobalMap } from './components/map.js';
import { renderConflictDetail } from './components/detail-view.js';
import { renderDashboard } from './components/dashboard.js';
import { initScrollytelling } from './components/scrollytelling.js';

// v3: Education imports (lazy loaded on route)
let educationData = null;
async function getEducationData() {
  if (!educationData) {
    educationData = await import('./data/education.js');
  }
  return educationData;
}

// ---- Initialize everything on DOM ready ----
document.addEventListener('DOMContentLoaded', () => {

  // Navigation
  initNav();

  // Render all sections
  renderCauseCategories(document.getElementById('cause-categories'), causeCategories);
  renderConflicts(document.getElementById('current-conflicts'), currentConflicts);
  renderRootCauses(document.getElementById('causes-deep-dive'), rootCauses);
  renderHistoricalTimeline(document.getElementById('historical-timeline'), historicalConflicts);
  renderEndings(document.getElementById('endings-grid'), howWarsEnd);
  renderPatterns(document.getElementById('patterns-content'), patterns);
  renderPathForward(document.getElementById('forward-content'), pathForward);
  renderApplyLessons(document.getElementById('apply-grid'), applyLessons);
  renderActions(document.getElementById('action-grid'), takeActions);

  // Dashboard
  renderDashboard(document.getElementById('dashboard-content'), currentConflicts);

  // Filters
  initFilters(currentConflicts);

  // Router (handles all routes)
  initRouter(async (route, id) => {
    const container = document.getElementById('detail-container');

    if (route === 'conflict' && id) {
      renderConflictDetail(id, container, currentConflicts, applyLessons);
    } else if (route === 'educators') {
      const { lessonPlans, learningModules, quizzes, discussionGuides } = await getEducationData();
      const { renderEducatorsHub } = await import('./components/educators.js');
      renderEducatorsHub(container, lessonPlans, learningModules, quizzes);
    } else if (route === 'lesson' && id) {
      const { lessonPlans, discussionGuides } = await getEducationData();
      const { renderLessonDetail } = await import('./components/educators.js');
      renderLessonDetail(id, container, lessonPlans, discussionGuides);
    } else if (route === 'module' && id) {
      const { learningModules } = await getEducationData();
      const { renderModule } = await import('./components/learning-module.js');
      renderModule(id, container, learningModules);
    } else if (route === 'quiz' && id) {
      const { quizzes } = await getEducationData();
      const { renderQuiz } = await import('./components/quiz.js');
      renderQuiz(id, container, quizzes);
    }
  });

  // Interactive map (lazy init when section becomes visible)
  const mapSection = document.getElementById('global-map');
  if (mapSection) {
    const mapObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          createGlobalMap('global-map', currentConflicts);
          mapObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' });
    mapObserver.observe(mapSection);
  }

  // Scrollytelling (lazy init)
  const storySection = document.getElementById('scrollytelling');
  if (storySection) {
    const storyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initScrollytelling(currentConflicts);
          storyObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '300px' });
    storyObserver.observe(storySection);
  }

  // Animations (must run after all rendering)
  setTimeout(() => {
    initAnimations();
    initSmoothScroll();
  }, 100);

});
