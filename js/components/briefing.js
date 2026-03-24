// ============================================
// Policymaker Conflict Brief
// ============================================

export function renderBriefing(id, container, currentConflicts, peaceProgressData) {
  const c = currentConflicts.find(x => x.id === id);
  if (!c || !container) return;

  const peace = peaceProgressData ? peaceProgressData.find(p => p.conflictId === id) : null;
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const severityColors = { critical: '#c0392b', high: '#d35400', medium: '#f39c12', low: '#27ae60', tension: '#2980b9' };
  const sevColor = severityColors[c.severity] || '#666';

  container.innerHTML = `
    <div class="brief-page">
      <div class="brief-screen-bar">
        <a href="#/conflict/${c.id}" class="detail-back-link">← Back to conflict</a>
        <button class="btn btn-primary brief-print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
      </div>

      <div class="brief-document">
        <div class="brief-header">
          <div class="brief-label">BRIEFING DOCUMENT</div>
          <h1 class="brief-title">${c.name}</h1>
          <div class="brief-meta">
            <span>${c.region}</span>
            <span>•</span>
            <span>Prepared ${date}</span>
            <span>•</span>
            <span class="brief-classification" style="background: ${sevColor}; color: #fff;">${c.severity.toUpperCase()}</span>
          </div>
        </div>

        <div class="brief-executive">
          <h2>Executive Summary</h2>
          <p>${c.summary} ${c.impact}</p>
        </div>

        <div class="brief-facts-grid">
          <div class="brief-fact">
            <div class="brief-fact-label">Severity</div>
            <div class="brief-fact-value" style="color: ${sevColor};">${c.severity.charAt(0).toUpperCase() + c.severity.slice(1)}</div>
          </div>
          <div class="brief-fact">
            <div class="brief-fact-label">People Displaced</div>
            <div class="brief-fact-value">${c.displaced}</div>
          </div>
          <div class="brief-fact">
            <div class="brief-fact-label">Estimated Casualties</div>
            <div class="brief-fact-value">${c.casualties}</div>
          </div>
          <div class="brief-fact">
            <div class="brief-fact-label">Conflict Start</div>
            <div class="brief-fact-value">${c.started}</div>
          </div>
        </div>

        <div class="brief-section">
          <h2>Key Actors</h2>
          <table class="brief-actors-table">
            <thead>
              <tr><th>Side A</th><th>Side B</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>${c.who.sideA}</td>
                <td>${c.who.sideB}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="brief-section">
          <h2>Situation Overview</h2>
          <p>${c.why}</p>
        </div>

        <div class="brief-section">
          <h2>Resources & Strategic Interests</h2>
          <p>${c.resources}</p>
        </div>

        <div class="brief-section">
          <h2>Core Issues</h2>
          <p>${c.whatAbout}</p>
        </div>

        ${c.keyEvents && c.keyEvents.length ? `
        <div class="brief-section">
          <h2>Recent Developments</h2>
          <div class="brief-timeline">
            ${c.keyEvents.slice(-6).map((e, i) => `
              <div class="brief-timeline-item">
                <span class="brief-timeline-date">${e.date}</span>
                <span class="brief-timeline-event">${e.title}</span>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        ${peace ? `
        <div class="brief-section">
          <h2>Peace Process Status</h2>
          <p><strong>Status:</strong> ${peace.statusLabel}</p>
          <p>${peace.summary}</p>
          <h3>What Needs to Happen</h3>
          <p>${peace.whatNeedsToHappen}</p>
          <p><strong>Key Actors for Resolution:</strong> ${peace.keyActors.join(', ')}</p>
        </div>
        ` : ''}

        <div class="brief-section">
          <h2>Policy Options & Recommended Actions</h2>
          <p>${c.pathToResolution}</p>
          <div class="brief-actions">
            <h3>Recommended Actions</h3>
            <ul>
              <li>Support diplomatic initiatives and ceasefire efforts</li>
              <li>Increase humanitarian funding and ensure aid access</li>
              <li>Review and restrict arms transfers to parties involved</li>
              <li>Impose targeted sanctions on individuals obstructing peace</li>
              <li>Support accountability mechanisms for violations of international law</li>
            </ul>
          </div>
        </div>

        <div class="brief-section">
          <h2>Global Impact</h2>
          <p>${c.impact}</p>
        </div>

        <div class="brief-sources">
          <h2>Sources</h2>
          <p>Data sourced from: Uppsala Conflict Data Program (UCDP), Armed Conflict Location & Event Data (ACLED), Stockholm International Peace Research Institute (SIPRI), International Crisis Group (ICG), United Nations OCHA & UNHCR.</p>
          <p>Prepared by The Path to Peace (mikelninh.github.io/path-to-peace) — an open educational resource. Content available under CC BY 4.0.</p>
        </div>
      </div>
    </div>
  `;

  window.scrollTo(0, 0);
}
