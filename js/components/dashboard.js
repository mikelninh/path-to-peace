// ============================================
// Data Dashboard — SVG Charts
// ============================================

const SEVERITY_COLORS = {
  critical: '#e74c3c',
  high: '#e67e22',
  medium: '#f1c40f',
  low: '#2ecc71',
  tension: '#3498db',
};

export function renderDashboard(container, conflicts) {
  if (!container || !conflicts.length) return;

  // Sort by displaced (parse numbers)
  const withDisplaced = conflicts
    .filter(c => c.displaced && c.displaced !== 'N/A')
    .map(c => ({
      name: c.name.length > 25 ? c.name.substring(0, 22) + '...' : c.name,
      value: parseDisplaced(c.displaced),
      color: SEVERITY_COLORS[c.severity] || '#a0a0b0',
      severity: c.severity,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  // Severity distribution
  const severityCounts = {};
  conflicts.forEach(c => {
    severityCounts[c.severity] = (severityCounts[c.severity] || 0) + 1;
  });

  // Duration data
  const withDuration = conflicts
    .map(c => {
      const yearMatch = c.started.match(/(\d{4})/);
      const startYear = yearMatch ? parseInt(yearMatch[1]) : 2020;
      return {
        name: c.name.length > 25 ? c.name.substring(0, 22) + '...' : c.name,
        duration: 2025 - startYear,
        color: SEVERITY_COLORS[c.severity] || '#a0a0b0',
      };
    })
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 10);

  container.innerHTML = `
    <div class="dashboard-grid">
      <div class="dashboard-card">
        <h3 class="dashboard-card-title">People Displaced by Conflict</h3>
        <p class="dashboard-card-desc">Estimated internally displaced persons and refugees per conflict</p>
        <div class="dashboard-chart" id="displaced-chart"></div>
      </div>
      <div class="dashboard-card">
        <h3 class="dashboard-card-title">Conflict Duration (Years Active)</h3>
        <p class="dashboard-card-desc">How long each conflict has been ongoing as of 2025</p>
        <div class="dashboard-chart" id="duration-chart"></div>
      </div>
      <div class="dashboard-card dashboard-card-small">
        <h3 class="dashboard-card-title">Severity Distribution</h3>
        <div class="dashboard-chart" id="severity-chart"></div>
      </div>
      <div class="dashboard-card dashboard-card-small">
        <h3 class="dashboard-card-title">By the Numbers</h3>
        <div class="dashboard-numbers">
          <div class="dashboard-number">
            <span class="dash-num-value">${conflicts.length}</span>
            <span class="dash-num-label">Conflicts Tracked</span>
          </div>
          <div class="dashboard-number">
            <span class="dash-num-value">${formatNumber(withDisplaced.reduce((sum, d) => sum + d.value, 0))}</span>
            <span class="dash-num-label">People Displaced</span>
          </div>
          <div class="dashboard-number">
            <span class="dash-num-value">${conflicts.filter(c => c.severity === 'critical').length}</span>
            <span class="dash-num-label">Critical Conflicts</span>
          </div>
          <div class="dashboard-number">
            <span class="dash-num-value">${Math.max(...withDuration.map(d => d.duration))}</span>
            <span class="dash-num-label">Years (Longest Active)</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Render charts
  renderBarChart(document.getElementById('displaced-chart'), withDisplaced, v => formatNumber(v));
  renderBarChart(document.getElementById('duration-chart'), withDuration.map(d => ({
    ...d, value: d.duration
  })), v => v + ' yrs');
  renderSeverityChart(document.getElementById('severity-chart'), severityCounts);
}

function renderBarChart(container, data, formatValue) {
  if (!container || !data.length) return;

  const maxVal = Math.max(...data.map(d => d.value));
  const barH = 32;
  const gap = 6;
  const labelW = 180;
  const chartW = 600;
  const svgH = data.length * (barH + gap);

  container.innerHTML = `
    <svg viewBox="0 0 ${chartW} ${svgH}" class="bar-chart" preserveAspectRatio="xMinYMin meet">
      ${data.map((d, i) => {
        const y = i * (barH + gap);
        const barW = Math.max(4, ((d.value / maxVal) * (chartW - labelW - 80)));
        return `
          <text x="${labelW - 8}" y="${y + barH / 2 + 5}" text-anchor="end" class="chart-label" fill="var(--text-secondary)" font-size="12">${d.name}</text>
          <rect x="${labelW}" y="${y + 4}" width="${barW}" height="${barH - 8}" rx="4" fill="${d.color}" opacity="0.7">
            <animate attributeName="width" from="0" to="${barW}" dur="0.8s" fill="freeze" begin="${i * 0.05}s"/>
          </rect>
          <text x="${labelW + barW + 8}" y="${y + barH / 2 + 5}" class="chart-value" fill="var(--text-muted)" font-size="11">${formatValue(d.value)}</text>
        `;
      }).join('')}
    </svg>
  `;
}

function renderSeverityChart(container, counts) {
  if (!container) return;

  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, v]) => sum + v, 0);

  container.innerHTML = `
    <div class="severity-bars">
      ${entries.map(([severity, count]) => `
        <div class="severity-row">
          <span class="severity-label" style="color: ${SEVERITY_COLORS[severity]}">${severity}</span>
          <div class="severity-bar-track">
            <div class="severity-bar-fill" style="width: ${(count / total) * 100}%; background: ${SEVERITY_COLORS[severity]};"></div>
          </div>
          <span class="severity-count">${count}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function parseDisplaced(str) {
  if (!str || str === 'N/A') return 0;
  const num = str.replace(/[^0-9.]/g, '');
  const val = parseFloat(num);
  if (str.toLowerCase().includes('million')) return val * 1000000;
  return val || 0;
}

function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n.toString();
}
