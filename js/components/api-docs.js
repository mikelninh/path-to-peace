// ============================================
// Data API Documentation & Download Center
// ============================================

export function renderApiDocs(container) {
  if (!container) return;

  const datasets = [
    { file: 'conflicts.json', title: 'Current Conflicts', desc: '15 active conflicts with geographic, timeline, and statistical data', fields: 'id, name, region, type, severity, lat, lng, who, why, resources, keyEvents, stats' },
    { file: 'historical.json', title: 'Historical Conflicts', desc: '10 major historical conflicts with lessons learned', fields: 'date, name, desc, howEnded, lesson, lat, lng, casualties' },
    { file: 'arms-trade.json', title: 'Arms Trade', desc: 'Global arms export data, trade flows, and key statistics', fields: 'armsExporters, armsFlows, keyStats' },
    { file: 'peace-progress.json', title: 'Peace Progress', desc: 'Peace process status for all 15 conflicts', fields: 'conflictId, status, milestones, whatNeedsToHappen, keyActors' },
    { file: 'education.json', title: 'Education Resources', desc: 'Lesson plans, learning modules, quizzes, discussion guides', fields: 'lessonPlans, learningModules, quizzes, discussionGuides' },
  ];

  container.innerHTML = `
    <div class="api-page">
      <div class="api-back">
        <a href="#/" class="detail-back-link">← Back to home</a>
      </div>

      <div class="api-hero">
        <h1>Data API & Downloads</h1>
        <p>All data from The Path to Peace is freely available for researchers, journalists, educators, and developers. Download JSON files or integrate our data into your own projects.</p>
      </div>

      <!-- Download Cards -->
      <div class="api-section">
        <h2>Download Datasets</h2>
        <div class="api-download-grid">
          ${datasets.map(d => `
            <div class="api-download-card">
              <div class="api-file-icon">{ }</div>
              <h3>${d.title}</h3>
              <p>${d.desc}</p>
              <a href="api/${d.file}" download class="btn btn-primary api-download-btn">Download JSON</a>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Schema -->
      <div class="api-section">
        <h2>Data Schema</h2>
        <p>Each conflict object includes the following fields:</p>
        <div class="api-schema">
<pre>{
  "id": "string — Unique kebab-case identifier",
  "name": "string — Full conflict name",
  "region": "string — Geographic region",
  "type": "string — war | civil-war | insurgency | tension",
  "severity": "string — critical | high | medium | tension",
  "lat": "number — Latitude for map marker",
  "lng": "number — Longitude for map marker",
  "started": "string — Start date with context",
  "displaced": "string — Estimated displaced persons",
  "casualties": "string — Estimated casualties",
  "summary": "string — Brief overview",
  "causes": ["string — Array of cause tags"],
  "who": {
    "sideA": "string — Description of side A",
    "sideB": "string — Description of side B"
  },
  "why": "string — Detailed motivation analysis",
  "resources": "string — Resources at stake",
  "whatAbout": "string — Core issues",
  "pathToResolution": "string — Path to peace",
  "impact": "string — Global impact",
  "keyEvents": [
    { "date": "YYYY-MM-DD", "title": "string", "type": "string" }
  ],
  "stats": {
    "casualtiesByYear": { "2023": "number", ... },
    "displacedByYear": { "2023": "number", ... }
  }
}</pre>
        </div>
      </div>

      <!-- Usage -->
      <div class="api-section">
        <h2>How to Use</h2>
        <p>Fetch data directly from our GitHub Pages URL:</p>
        <div class="api-schema">
<pre>// JavaScript
const response = await fetch(
  'https://mikelninh.github.io/path-to-peace/api/conflicts.json'
);
const conflicts = await response.json();
console.log(conflicts.length + ' conflicts loaded');</pre>
        </div>
        <div class="api-schema">
<pre># Python
import requests
data = requests.get(
  'https://mikelninh.github.io/path-to-peace/api/conflicts.json'
).json()
print(f'{len(data)} conflicts loaded')</pre>
        </div>
      </div>

      <!-- Terms -->
      <div class="api-section">
        <h2>License & Citation</h2>
        <div class="api-terms">
          <p>All data is available under <strong>Creative Commons Attribution 4.0 (CC BY 4.0)</strong>. You are free to use, share, and adapt this data for any purpose, including commercial use, as long as you provide attribution.</p>
          <h3>Suggested Citation</h3>
          <div class="api-schema">
<pre>The Path to Peace. (2025). World Conflict Data.
Retrieved from https://mikelninh.github.io/path-to-peace/
Licensed under CC BY 4.0.</pre>
          </div>
          <h3>Data Sources</h3>
          <p>Our data is synthesized from: UCDP (Uppsala Conflict Data Program), ACLED (Armed Conflict Location & Event Data), SIPRI (Stockholm International Peace Research Institute), ICG (International Crisis Group), and UN agencies (OCHA, UNHCR). See our <a href="#/methodology">Methodology page</a> for full details.</p>
        </div>
      </div>

      <!-- Contribute -->
      <div class="api-section">
        <h2>Contribute</h2>
        <p>Found an error? Want to add data? Contributions are welcome via our <a href="https://github.com/mikelninh/path-to-peace" target="_blank" rel="noopener">GitHub repository</a>. All submissions are reviewed for accuracy.</p>
      </div>
    </div>
  `;

  window.scrollTo(0, 0);
}
