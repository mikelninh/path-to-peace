// ============================================
// Interactive Quiz Component
// ============================================

import { navigate } from '../router.js';

export function renderQuiz(id, container, quizzes) {
  const quiz = quizzes.find(q => q.id === id);
  if (!quiz || !container) return;

  let currentQuestion = 0;
  let answers = new Array(quiz.questions.length).fill(null);
  let showingResults = false;

  function render() {
    if (showingResults) {
      renderResults();
      return;
    }

    const q = quiz.questions[currentQuestion];
    const total = quiz.questions.length;
    const answered = answers.filter(a => a !== null).length;
    const selected = answers[currentQuestion];

    container.innerHTML = `
      <div class="quiz-page">
        <div class="quiz-top-bar">
          <a href="#/educators" class="detail-back-link">← Educators Hub</a>
          <div class="quiz-progress-info">
            <span>${answered}/${total} answered</span>
          </div>
        </div>

        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${(answered / total) * 100}%;"></div>
        </div>

        <div class="quiz-header">
          <h1 class="quiz-title">${quiz.title}</h1>
        </div>

        <!-- Question Navigation -->
        <div class="quiz-question-nav">
          ${quiz.questions.map((_, i) => `
            <button class="quiz-q-dot ${i === currentQuestion ? 'active' : ''} ${answers[i] !== null ? 'answered' : ''}" data-q="${i}">
              ${i + 1}
            </button>
          `).join('')}
        </div>

        <!-- Question -->
        <div class="quiz-question-card">
          <div class="quiz-question-number">Question ${currentQuestion + 1} of ${total}</div>
          <h2 class="quiz-question-text">${q.question}</h2>

          <div class="quiz-options">
            ${q.options.map((opt, i) => `
              <button class="quiz-option ${selected === i ? 'selected' : ''}" data-opt="${i}">
                <span class="quiz-option-letter">${String.fromCharCode(65 + i)}</span>
                <span class="quiz-option-text">${opt}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Navigation -->
        <div class="quiz-nav">
          <button class="quiz-nav-btn quiz-prev ${currentQuestion === 0 ? 'disabled' : ''}" ${currentQuestion === 0 ? 'disabled' : ''}>
            ← Previous
          </button>
          ${currentQuestion === total - 1 ? `
            <button class="quiz-nav-btn quiz-submit ${answered < total ? 'disabled' : ''}" ${answered < total ? 'disabled' : ''}>
              Submit Answers
            </button>
          ` : `
            <button class="quiz-nav-btn quiz-next">
              Next →
            </button>
          `}
        </div>
      </div>
    `;

    // Event listeners
    container.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        answers[currentQuestion] = parseInt(btn.dataset.opt);
        render();
      });
    });

    container.querySelectorAll('.quiz-q-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        currentQuestion = parseInt(dot.dataset.q);
        render();
      });
    });

    const prevBtn = container.querySelector('.quiz-prev');
    if (prevBtn && currentQuestion > 0) {
      prevBtn.addEventListener('click', () => { currentQuestion--; render(); });
    }

    const nextBtn = container.querySelector('.quiz-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => { currentQuestion++; render(); });
    }

    const submitBtn = container.querySelector('.quiz-submit');
    if (submitBtn && answers.filter(a => a !== null).length === total) {
      submitBtn.addEventListener('click', () => {
        showingResults = true;
        render();
      });
    }

    window.scrollTo(0, 0);
  }

  function renderResults() {
    const total = quiz.questions.length;
    const correct = quiz.questions.reduce((sum, q, i) => sum + (answers[i] === q.correct ? 1 : 0), 0);
    const score = Math.round((correct / total) * 100);

    // Save score
    saveQuizScore(quiz.id, score);

    const scoreColor = score >= 80 ? '#2ecc71' : score >= 60 ? '#f1c40f' : '#e74c3c';
    const scoreMessage = score >= 80 ? 'Excellent! You have a strong understanding.'
      : score >= 60 ? 'Good effort! Review the explanations below to strengthen your knowledge.'
      : 'Keep learning! The explanations below will help deepen your understanding.';

    container.innerHTML = `
      <div class="quiz-page">
        <div class="quiz-top-bar">
          <a href="#/educators" class="detail-back-link">← Educators Hub</a>
        </div>

        <div class="quiz-results">
          <div class="quiz-score-circle" style="border-color: ${scoreColor};">
            <span class="quiz-score-number" style="color: ${scoreColor};">${score}%</span>
            <span class="quiz-score-label">${correct}/${total} correct</span>
          </div>
          <h2 class="quiz-results-title">${quiz.title}</h2>
          <p class="quiz-results-message">${scoreMessage}</p>

          <div class="quiz-results-actions">
            ${quiz.moduleId ? `<a href="#/module/${quiz.moduleId}" class="btn btn-secondary">Review Module</a>` : ''}
            <button class="btn btn-primary quiz-retake">Retake Quiz</button>
          </div>
        </div>

        <!-- Answer Review -->
        <div class="quiz-review">
          <h3>Review Your Answers</h3>
          ${quiz.questions.map((q, i) => {
            const isCorrect = answers[i] === q.correct;
            return `
              <div class="quiz-review-item ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="quiz-review-status">${isCorrect ? '✓' : '✗'}</div>
                <div class="quiz-review-content">
                  <h4>Q${i + 1}: ${q.question}</h4>
                  <p class="quiz-review-answer">
                    Your answer: <strong>${q.options[answers[i]]}</strong>
                    ${!isCorrect ? `<br>Correct answer: <strong class="quiz-correct-answer">${q.options[q.correct]}</strong>` : ''}
                  </p>
                  <p class="quiz-review-explanation">${q.explanation}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Retake button
    const retakeBtn = container.querySelector('.quiz-retake');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        currentQuestion = 0;
        answers = new Array(quiz.questions.length).fill(null);
        showingResults = false;
        render();
      });
    }

    window.scrollTo(0, 0);
  }

  render();
}

function saveQuizScore(quizId, score) {
  try {
    const progress = JSON.parse(localStorage.getItem('peace-progress') || '{}');
    if (!progress.quizzes) progress.quizzes = {};
    progress.quizzes[quizId] = score;
    localStorage.setItem('peace-progress', JSON.stringify(progress));
  } catch {}
}
