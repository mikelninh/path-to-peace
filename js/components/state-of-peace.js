// ============================================
// State of Peace Report
// ============================================

export async function renderStateOfPeace(container) {
  if (!container) return;

  const { reportData } = await import('../data/state-of-peace.js');
  const r = reportData;

  const trendIcons = { up: '📈', down: '📉', stable: '➡️' };
  const trendColors = { worsening: '#e74c3c', improving: '#2ecc71', stable: '#f1c40f' };
  const statusColors = { critical: '#e74c3c', concerning: '#e67e22', mixed: '#f1c40f', improving: '#2ecc71' };
  const gradeColors = { A: '#2ecc71', B: '#1abc9c', C: '#f1c40f', D: '#e67e22', F: '#e74c3c' };

  container.innerHTML = `
    <div class="report-page">
      <div class="report-back">
        <a href="#/" class="detail-back-link">← Back to home</a>
        <button class="btn btn-secondary" onclick="window.print()">🖨️ Print Report</button>
      </div>

      <div class="report-hero">
        <h1>${r.title}</h1>
        <p class="report-subtitle">${r.subtitle}</p>
        <p class="report-date">Last updated: ${r.lastUpdated}</p>
      </div>

      <!-- Table of Contents -->
      <div class="report-toc">
        <h3>Contents</h3>
        <ol>
          <li><a href="#report-exec">Executive Summary</a></li>
          <li><a href="#report-findings">Key Findings</a></li>
          <li><a href="#report-trends">Global Trends</a></li>
          <li><a href="#report-regions">Regional Assessments</a></li>
          <li><a href="#report-scorecard">Peace Process Scorecard</a></li>
          <li><a href="#report-outlook">Outlook</a></li>
        </ol>
      </div>

      <!-- Executive Summary -->
      <div class="report-section" id="report-exec">
        <h2>Executive Summary</h2>
        <div class="report-executive">
          ${r.executiveSummary.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('')}
        </div>
      </div>

      <!-- Key Findings -->
      <div class="report-section" id="report-findings">
        <h2>Key Findings</h2>
        <div class="report-findings-grid">
          ${r.keyFindings.map(f => `
            <div class="report-finding">
              <span class="report-finding-icon">${f.icon}</span>
              <div>
                <div class="report-finding-text">${f.finding}</div>
                <p class="report-finding-detail">${f.detail}</p>
                <span class="report-trend-badge" style="background: ${trendColors[f.trend]}20; color: ${trendColors[f.trend]};">
                  ${f.trend === 'worsening' ? '↓' : f.trend === 'improving' ? '↑' : '→'} ${f.trend}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Global Trends -->
      <div class="report-section" id="report-trends">
        <h2>Global Trends</h2>
        ${r.globalTrends.map(t => `
          <div class="report-trend">
            <h3><span>${trendIcons[t.direction] || '➡️'}</span> ${t.title}</h3>
            ${t.content.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('')}
            ${t.stats && t.stats.length ? `
              <div class="report-stat-row">
                ${t.stats.map(s => `
                  <div class="report-stat">
                    <div class="report-stat-value">${s.value}</div>
                    <div class="report-stat-label">${s.label}</div>
                    <div class="report-stat-context">${s.context}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>

      <!-- Regional Assessments -->
      <div class="report-section" id="report-regions">
        <h2>Regional Assessments</h2>
        <div class="report-regions-grid">
          ${r.regionalAssessments.map(ra => `
            <div class="report-region-card">
              <div class="report-region-header">
                <h3>${ra.region}</h3>
                <span class="report-region-status" style="background: ${statusColors[ra.status]}20; color: ${statusColors[ra.status]};">${ra.status}</span>
              </div>
              <p>${ra.summary}</p>
              <p class="report-key-dev"><strong>Key Development:</strong> ${ra.keyDevelopment}</p>
              <div class="report-region-conflicts">
                ${ra.conflicts.map(c => `<a href="#/conflict/${c}" class="report-conflict-link">${c.replace(/-/g, ' ')}</a>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Peace Process Scorecard -->
      <div class="report-section" id="report-scorecard">
        <h2>Peace Process Scorecard</h2>
        <p class="report-scorecard-desc">How are peace efforts progressing for each active conflict?</p>
        <div class="report-scorecard-grid">
          ${r.peaceProcessScorecard.map(p => `
            <div class="report-scorecard-row">
              <div class="report-grade" style="background: ${gradeColors[p.grade]}20; color: ${gradeColors[p.grade]}; border-color: ${gradeColors[p.grade]};">${p.grade}</div>
              <div class="report-scorecard-info">
                <a href="#/conflict/${p.conflictId}" class="report-scorecard-name">${p.conflict}</a>
                <span class="report-grade-label">${p.gradeLabel}</span>
                <p class="report-scorecard-assessment">${p.assessment}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Outlook -->
      <div class="report-section" id="report-outlook">
        <h2>${r.outlook.title}</h2>
        ${r.outlook.content.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('')}

        <div class="report-outlook-grid">
          <div class="report-outlook-col">
            <h3>⚠️ Risks to Watch</h3>
            ${r.outlook.risksToWatch.map(risk => `
              <div class="report-risk">
                <span class="report-likelihood ${risk.likelihood}">${risk.likelihood}</span>
                <span>${risk.risk}</span>
              </div>
            `).join('')}
          </div>
          <div class="report-outlook-col">
            <h3>🕊️ Opportunities for Peace</h3>
            ${r.outlook.opportunitiesForPeace.map(opp => `
              <div class="report-opportunity">
                <span class="report-potential ${opp.potential}">${opp.potential}</span>
                <span>${opp.opportunity}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="report-section report-cta">
        <p class="report-cta-text">${r.callToAction}</p>
        <div class="report-cta-links">
          <a href="#/write" class="btn btn-primary">Write to Your Representative</a>
          <a href="#/educators" class="btn btn-secondary">Teaching Resources</a>
        </div>
      </div>
    </div>
  `;

  window.scrollTo(0, 0);
}
