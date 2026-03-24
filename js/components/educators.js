// ============================================
// Educators Hub — Lesson Plans, Modules, Quizzes
// ============================================

import { navigate } from '../router.js';

export function renderEducatorsHub(container, lessonPlans, learningModules, quizzes) {
  if (!container) return;

  // Get quiz progress from localStorage
  const progress = getProgress();

  container.innerHTML = `
    <div class="educators-page">
      <div class="edu-back">
        <a href="#/" class="detail-back-link">← Back to home</a>
      </div>

      <div class="edu-hero">
        <div class="edu-hero-icon">🏫</div>
        <h1 class="edu-hero-title">For Educators</h1>
        <p class="edu-hero-desc">Free, ready-to-use teaching resources designed for classrooms. Lesson plans, interactive learning modules, quizzes, and discussion guides — all built on real conflict data and evidence-based peace research.</p>
      </div>

      <!-- Learning Modules -->
      <div class="edu-section">
        <div class="edu-section-header">
          <h2>Learning Modules</h2>
          <p>Guided journeys through key topics. Each module includes content, insights, and a quiz.</p>
        </div>
        <div class="edu-modules-grid">
          ${learningModules.map(m => {
            const completed = progress.modules && progress.modules[m.id];
            return `
            <div class="edu-module-card" data-id="${m.id}">
              <div class="edu-module-icon" style="background: ${m.color}15; color: ${m.color};">${m.icon}</div>
              <div class="edu-module-info">
                <h3>${m.title}</h3>
                <p>${m.subtitle}</p>
                <div class="edu-module-meta">
                  <span class="edu-meta-tag">⏱ ${m.estimatedTime}</span>
                  <span class="edu-meta-tag">${m.steps.length} steps</span>
                  ${completed ? '<span class="edu-meta-tag edu-completed">✓ Completed</span>' : ''}
                </div>
              </div>
              <div class="edu-module-arrow">→</div>
            </div>
          `}).join('')}
        </div>
      </div>

      <!-- Lesson Plans -->
      <div class="edu-section">
        <div class="edu-section-header">
          <h2>Lesson Plans</h2>
          <p>Curriculum-aligned lesson plans with objectives, activities, discussion questions, and assessments. Ready to use in your classroom.</p>
        </div>
        <div class="edu-filter-bar">
          <button class="edu-filter-btn active" data-grade="all">All Levels</button>
          <button class="edu-filter-btn" data-grade="middle-school">Middle School</button>
          <button class="edu-filter-btn" data-grade="high-school">High School</button>
          <button class="edu-filter-btn" data-grade="university">University</button>
        </div>
        <div class="edu-lessons-grid" id="edu-lessons-grid">
          ${renderLessonCards(lessonPlans)}
        </div>
      </div>

      <!-- Quizzes -->
      <div class="edu-section">
        <div class="edu-section-header">
          <h2>Knowledge Quizzes</h2>
          <p>Test your understanding. Each quiz is linked to a learning module — take the module first, then test yourself.</p>
        </div>
        <div class="edu-quizzes-grid">
          ${quizzes.map(q => {
            const score = progress.quizzes && progress.quizzes[q.id];
            return `
            <div class="edu-quiz-card" data-id="${q.id}">
              <div class="edu-quiz-icon">📝</div>
              <h3>${q.title}</h3>
              <p class="edu-quiz-meta">${q.questions.length} questions</p>
              ${score !== undefined ? `
                <div class="edu-quiz-score">
                  <div class="edu-score-bar">
                    <div class="edu-score-fill" style="width: ${score}%;"></div>
                  </div>
                  <span class="edu-score-text">${score}%</span>
                </div>
              ` : '<p class="edu-quiz-cta">Start Quiz →</p>'}
            </div>
          `}).join('')}
        </div>
      </div>

      <!-- Discussion Guides Teaser -->
      <div class="edu-section edu-section-highlight">
        <div class="edu-section-header">
          <h2>Discussion Guides</h2>
          <p>Every lesson plan includes structured discussion prompts and ground rules for respectful classroom dialogue on sensitive topics.</p>
        </div>
        <div class="edu-discussion-preview">
          <div class="edu-discuss-card">
            <h4>💬 Ground Rules for Every Discussion</h4>
            <ul>
              <li>Listen to understand, not to respond</li>
              <li>Acknowledge that all sides have human stories</li>
              <li>Distinguish between governments and people</li>
              <li>Question your own assumptions and biases</li>
              <li>Focus on understanding causes, not assigning blame</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Print Notice -->
      <div class="edu-print-notice">
        <p>💡 All lesson plans are print-friendly. Use your browser's print function (Ctrl/Cmd + P) on any lesson plan page to get a clean printout for your classroom.</p>
      </div>
    </div>
  `;

  // Attach event listeners
  container.querySelectorAll('.edu-module-card').forEach(card => {
    card.addEventListener('click', () => navigate('/module/' + card.dataset.id));
  });

  container.querySelectorAll('.edu-quiz-card').forEach(card => {
    card.addEventListener('click', () => navigate('/quiz/' + card.dataset.id));
  });

  container.querySelectorAll('.edu-lessons-grid .edu-lesson-card').forEach(card => {
    card.addEventListener('click', () => navigate('/lesson/' + card.dataset.id));
  });

  // Grade filter
  container.querySelectorAll('.edu-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.edu-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const grade = btn.dataset.grade;
      const grid = container.querySelector('#edu-lessons-grid');
      const filtered = grade === 'all' ? lessonPlans : lessonPlans.filter(l => l.gradeLevel === grade);
      grid.innerHTML = renderLessonCards(filtered);
      grid.querySelectorAll('.edu-lesson-card').forEach(card => {
        card.addEventListener('click', () => navigate('/lesson/' + card.dataset.id));
      });
    });
  });
}

function renderLessonCards(plans) {
  const gradeLabels = {
    'middle-school': 'Middle School',
    'high-school': 'High School',
    'university': 'University',
  };
  const gradeColors = {
    'middle-school': '#2ecc71',
    'high-school': '#3498db',
    'university': '#9b59b6',
  };

  return plans.map(l => `
    <div class="edu-lesson-card" data-id="${l.id}" data-grade="${l.gradeLevel}">
      <div class="edu-lesson-header">
        <span class="edu-grade-badge" style="background: ${gradeColors[l.gradeLevel]}15; color: ${gradeColors[l.gradeLevel]};">${gradeLabels[l.gradeLevel]}</span>
        <span class="edu-duration">${l.duration}</span>
      </div>
      <h3>${l.title}</h3>
      <p class="edu-lesson-subtitle">${l.subtitle}</p>
      <div class="edu-lesson-subjects">
        ${l.subjects.map(s => `<span class="edu-subject-tag">${s}</span>`).join('')}
      </div>
      <div class="edu-lesson-footer">
        <span>${l.objectives.length} objectives</span>
        <span>${l.activities.length} activities</span>
        <span class="edu-lesson-arrow">View Plan →</span>
      </div>
    </div>
  `).join('');
}

// ---- Lesson Plan Detail ----
export function renderLessonDetail(id, container, lessonPlans, discussionGuides) {
  const lesson = lessonPlans.find(l => l.id === id);
  if (!lesson || !container) return;

  const gradeLabels = { 'middle-school': 'Middle School', 'high-school': 'High School', 'university': 'University' };

  // Find relevant discussion guide
  const guide = discussionGuides ? discussionGuides[0] : null; // ground rules

  container.innerHTML = `
    <div class="lesson-page">
      <div class="edu-back">
        <a href="#/educators" class="detail-back-link">← Back to Educators Hub</a>
      </div>

      <div class="lesson-header">
        <div class="lesson-meta-row">
          <span class="edu-grade-badge">${gradeLabels[lesson.gradeLevel]}</span>
          <span class="lesson-duration-badge">⏱ ${lesson.duration}</span>
        </div>
        <h1 class="lesson-title">${lesson.title}</h1>
        <p class="lesson-subtitle">${lesson.subtitle}</p>
        <div class="lesson-subjects">
          ${lesson.subjects.map(s => `<span class="edu-subject-tag">${s}</span>`).join('')}
        </div>
      </div>

      <div class="lesson-body">
        <!-- Objectives -->
        <div class="lesson-section">
          <h2>🎯 Learning Objectives</h2>
          <ul class="lesson-objectives">
            ${lesson.objectives.map(o => `<li>${o}</li>`).join('')}
          </ul>
        </div>

        <!-- Materials -->
        <div class="lesson-section">
          <h2>📦 Materials Needed</h2>
          <ul class="lesson-materials">
            ${lesson.materials.map(m => `<li>${m}</li>`).join('')}
          </ul>
        </div>

        <!-- Activities -->
        <div class="lesson-section">
          <h2>📋 Activities</h2>
          <div class="lesson-activities">
            ${lesson.activities.map((a, i) => `
              <div class="lesson-activity">
                <div class="activity-number">${i + 1}</div>
                <div class="activity-content">
                  <div class="activity-header">
                    <h3>${a.title}</h3>
                    <span class="activity-duration">${a.duration}</span>
                  </div>
                  <p>${a.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Discussion Questions -->
        <div class="lesson-section">
          <h2>💬 Discussion Questions</h2>
          ${guide ? `
            <div class="lesson-ground-rules">
              <h4>Ground Rules for Discussion</h4>
              <ul>
                ${guide.groundRules.map(r => `<li>${r}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          <ol class="lesson-discussion-questions">
            ${lesson.discussionQuestions.map(q => `<li>${q}</li>`).join('')}
          </ol>
        </div>

        <!-- Assessment -->
        <div class="lesson-section">
          <h2>📊 Assessment</h2>
          <div class="lesson-assessment">
            <p>${lesson.assessment}</p>
          </div>
        </div>

        <!-- Linked Conflicts -->
        ${lesson.conflictLinks && lesson.conflictLinks.length ? `
          <div class="lesson-section">
            <h2>🔗 Related Conflicts on This Site</h2>
            <div class="lesson-conflict-links">
              ${lesson.conflictLinks.map(id => `
                <a href="#/conflict/${id}" class="lesson-conflict-link">${id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} →</a>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  window.scrollTo(0, 0);
}

// ---- Progress tracking ----
function getProgress() {
  try {
    return JSON.parse(localStorage.getItem('peace-progress') || '{}');
  } catch { return {}; }
}
