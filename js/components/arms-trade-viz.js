// ============================================
// Arms Trade Visualizer — SVG Flow Diagram
// ============================================

export async function renderArmsTrade(container) {
  if (!container) return;

  const { armsExporters, armsFlows, keyStats } = await import('../data/arms-trade.js');

  // Group flows by region
  const regions = {};
  armsFlows.forEach(f => {
    if (!regions[f.to]) regions[f.to] = { name: f.to, totalValue: 0, flows: [], conflicts: new Set() };
    regions[f.to].totalValue += f.value;
    regions[f.to].flows.push(f);
    f.conflicts.forEach(c => regions[f.to].conflicts.add(c));
  });

  const regionList = Object.values(regions).sort((a, b) => b.totalValue - a.totalValue);

  container.innerHTML = `
    <div class="arms-page">
      <div class="arms-back">
        <a href="#/" class="detail-back-link">← Back to home</a>
      </div>

      <div class="arms-hero">
        <h1>The Global Arms Trade</h1>
        <p>The countries calling for peace are often the same ones selling weapons to conflict zones. This visualization shows who sells weapons to whom — and which active conflicts they fuel.</p>
      </div>

      <!-- Key Stats -->
      <div class="arms-stats">
        ${keyStats.map(s => `
          <div class="arms-stat">
            <div class="arms-stat-value">${s.value}</div>
            <div class="arms-stat-label">${s.label}</div>
          </div>
        `).join('')}
      </div>

      <!-- The Uncomfortable Truth -->
      <div class="arms-callout">
        <h2>The Uncomfortable Truth</h2>
        <p>The 5 permanent members of the UN Security Council — the body responsible for maintaining international peace — are also the world's top 5 arms exporters. They sell 76% of all weapons traded globally.</p>
      </div>

      <!-- Top Exporters -->
      <div class="arms-section">
        <h2>Top Arms Exporters</h2>
        <p class="arms-section-desc">Share of global arms exports (SIPRI 2019-2023 averages)</p>
        <div class="arms-exporters-chart">
          ${armsExporters.map(e => `
            <div class="arms-exporter-row">
              <span class="arms-exporter-name">${e.name}</span>
              <div class="arms-exporter-bar-track">
                <div class="arms-exporter-bar" style="width: ${(e.share / armsExporters[0].share) * 100}%; background: ${e.color};">
                  <span class="arms-bar-label">${e.share}%</span>
                </div>
              </div>
              <span class="arms-exporter-value">$${(e.value / 1000).toFixed(1)}B</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Flows to Conflict Regions -->
      <div class="arms-section">
        <h2>Arms Flowing to Conflict Zones</h2>
        <p class="arms-section-desc">Where do the weapons go? Major arms transfers to regions with active conflicts.</p>
        <div class="arms-flows-grid">
          ${regionList.map(r => `
            <div class="arms-flow-card">
              <div class="arms-flow-header">
                <h3>${r.name}</h3>
                <span class="arms-flow-value">$${(r.totalValue / 1000).toFixed(1)}B</span>
              </div>
              <div class="arms-flow-suppliers">
                ${r.flows.sort((a, b) => b.value - a.value).map(f => {
                  const exp = armsExporters.find(e => e.id === f.from);
                  return `
                    <div class="arms-flow-item">
                      <div class="arms-flow-dot" style="background: ${exp ? exp.color : '#888'};"></div>
                      <span class="arms-flow-from">${exp ? exp.name : f.from}</span>
                      <span class="arms-flow-amount">$${(f.value / 1000).toFixed(1)}B</span>
                    </div>
                  `;
                }).join('')}
              </div>
              <div class="arms-flow-conflicts">
                <span class="arms-flow-conflicts-label">Active conflicts:</span>
                ${[...r.conflicts].map(c => `<a href="#/conflict/${c}" class="arms-conflict-link">${c.replace(/-/g, ' ')}</a>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- What You Can Do -->
      <div class="arms-action">
        <h2>What Can Be Done?</h2>
        <div class="arms-action-grid">
          <div class="arms-action-item">
            <h4>📣 Demand Transparency</h4>
            <p>Push your government to publish detailed arms export reports. Many countries sell weapons with minimal public oversight.</p>
          </div>
          <div class="arms-action-item">
            <h4>⚖️ Strengthen the Arms Trade Treaty</h4>
            <p>The ATT requires risk assessments before arms transfers. Support its enforcement and universal adoption.</p>
          </div>
          <div class="arms-action-item">
            <h4>💰 Divest</h4>
            <p>Check if your pension fund or investments include arms manufacturers. Divest from companies profiting from conflict.</p>
          </div>
          <div class="arms-action-item">
            <h4>✍️ Write to Your Representative</h4>
            <p><a href="#/write">Use our letter generator</a> to demand your government stop selling weapons to conflict zones.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  window.scrollTo(0, 0);
}
