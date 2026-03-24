// ============================================
// Learning Module — Step-by-step navigation
// ============================================

import { navigate } from '../router.js';

export function renderModule(id, container, learningModules) {
  const mod = learningModules.find(m => m.id === id);
  if (!mod || !container) return;

  let currentStep = 0;
  const totalSteps = mod.steps.length;

  function render() {
    const step = mod.steps[currentStep];
    const progress = ((currentStep + 1) / totalSteps) * 100;
    const isLast = currentStep === totalSteps - 1;
    const isFirst = currentStep === 0;

    container.innerHTML = `
      <div class="module-page">
        <div class="module-top-bar">
          <a href="#/educators" class="detail-back-link">← Educators Hub</a>
          <div class="module-progress-info">
            <span class="module-step-count">Step ${currentStep + 1} of ${totalSteps}</span>
          </div>
        </div>

        <div class="module-progress-bar">
          <div class="module-progress-fill" style="width: ${progress}%; background: ${mod.color};"></div>
        </div>

        <div class="module-header">
          <div class="module-icon" style="background: ${mod.color}15; color: ${mod.color};">${mod.icon}</div>
          <div>
            <h1 class="module-title">${mod.title}</h1>
            <p class="module-subtitle">${mod.subtitle}</p>
          </div>
        </div>

        <!-- Step Indicators -->
        <div class="module-step-indicators">
          ${mod.steps.map((s, i) => `
            <button class="module-step-dot ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}"
                    data-step="${i}" style="${i === currentStep ? `border-color: ${mod.color}; background: ${mod.color};` : i < currentStep ? `background: ${mod.color}40; border-color: ${mod.color}40;` : ''}">
              ${i < currentStep ? '✓' : i + 1}
            </button>
          `).join('')}
        </div>

        <!-- Step Content -->
        <div class="module-content">
          <h2 class="module-content-title">${step.title}</h2>
          <div class="module-content-body">
            ${formatContent(step.content)}
          </div>

          ${step.keyInsight ? `
            <div class="module-insight" style="border-color: ${mod.color};">
              <div class="module-insight-label" style="color: ${mod.color};">💡 Key Insight</div>
              <p>${step.keyInsight}</p>
            </div>
          ` : ''}

          ${step.linkedSection ? `
            <a href="${step.linkedSection}" class="module-explore-link" style="color: ${mod.color};">
              Explore this topic on the site →
            </a>
          ` : ''}
        </div>

        <!-- Navigation -->
        <div class="module-nav">
          <button class="module-nav-btn module-prev ${isFirst ? 'disabled' : ''}" ${isFirst ? 'disabled' : ''}>
            ← Previous
          </button>
          ${isLast ? `
            <button class="module-nav-btn module-complete" style="background: ${mod.color};">
              ${mod.quiz ? 'Take the Quiz →' : 'Complete Module ✓'}
            </button>
          ` : `
            <button class="module-nav-btn module-next" style="background: ${mod.color};">
              Next Step →
            </button>
          `}
        </div>
      </div>
    `;

    // Attach event listeners
    container.querySelectorAll('.module-step-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const step = parseInt(dot.dataset.step);
        if (step <= currentStep + 1) { // Can only go to completed or next step
          currentStep = step;
          render();
        }
      });
    });

    const prevBtn = container.querySelector('.module-prev');
    if (prevBtn && !isFirst) {
      prevBtn.addEventListener('click', () => { currentStep--; render(); });
    }

    const nextBtn = container.querySelector('.module-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => { currentStep++; render(); });
    }

    const completeBtn = container.querySelector('.module-complete');
    if (completeBtn) {
      completeBtn.addEventListener('click', () => {
        // Save progress
        saveModuleProgress(mod.id);
        if (mod.quiz) {
          navigate('/quiz/' + mod.quiz);
        } else {
          navigate('/educators');
        }
      });
    }

    window.scrollTo(0, 0);
  }

  render();
}

function formatContent(content) {
  // Split by double newlines into paragraphs
  return content.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('');
}

function saveModuleProgress(moduleId) {
  try {
    const progress = JSON.parse(localStorage.getItem('peace-progress') || '{}');
    if (!progress.modules) progress.modules = {};
    progress.modules[moduleId] = true;
    localStorage.setItem('peace-progress', JSON.stringify(progress));
  } catch {}
}
