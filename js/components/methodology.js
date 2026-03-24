// ============================================
// Methodology & Sources Page
// ============================================

export function renderMethodology(container) {
  if (!container) return;

  container.innerHTML = `
    <div class="method-page">
      <div class="method-back">
        <a href="#/" class="detail-back-link">← Back to home</a>
      </div>

      <div class="method-hero">
        <h1>Sources & Methodology</h1>
        <p>Transparency is the foundation of trust. This page documents where our data comes from, how we verify it, and the principles that guide our editorial decisions.</p>
      </div>

      <div class="method-section">
        <h2>Our Principles</h2>
        <div class="method-principles">
          <div class="method-principle">
            <h3>1. No Original Claims</h3>
            <p>We synthesize and present established research from recognized institutions. We do not conduct original field research or make independent claims about conflict dynamics.</p>
          </div>
          <div class="method-principle">
            <h3>2. Transparent Sourcing</h3>
            <p>Every fact should be traceable to an authoritative source. When estimates differ between sources, we note the range and cite both.</p>
          </div>
          <div class="method-principle">
            <h3>3. Balanced Perspective</h3>
            <p>We present all sides of each conflict honestly. We describe the stated motivations and grievances of all parties, while clearly identifying actions that violate international law.</p>
          </div>
          <div class="method-principle">
            <h3>4. Regular Updates</h3>
            <p>Conflict situations change rapidly. We commit to updating content as situations evolve and correcting errors promptly when identified.</p>
          </div>
          <div class="method-principle">
            <h3>5. Open Correction</h3>
            <p>If something is wrong, we fix it publicly and promptly. Report errors via our GitHub repository.</p>
          </div>
        </div>
      </div>

      <div class="method-section">
        <h2>Primary Data Sources</h2>
        <div class="method-sources">
          <div class="method-source">
            <h3>Uppsala Conflict Data Program (UCDP)</h3>
            <p class="method-source-affil">Uppsala University, Sweden</p>
            <p>The academic gold standard for conflict data, operating for 40+ years. Uses a conservative threshold of 25 battle-related deaths per year to classify armed conflicts. We use UCDP for conflict classification, casualty estimates, and historical conflict data.</p>
            <p class="method-source-url">ucdp.uu.se</p>
          </div>
          <div class="method-source">
            <h3>Armed Conflict Location & Event Data (ACLED)</h3>
            <p class="method-source-affil">Independent research organization</p>
            <p>Real-time, granular event-level conflict data coded weekly by trained researchers examining sources in 75+ languages. We use ACLED for current event tracking, geographic data, and trend analysis.</p>
            <p class="method-source-url">acleddata.com</p>
          </div>
          <div class="method-source">
            <h3>Stockholm International Peace Research Institute (SIPRI)</h3>
            <p class="method-source-affil">Swedish government-funded, editorially independent</p>
            <p>The authority on arms transfers, military expenditure, and arms control. Uses only open sources that can be independently checked. We use SIPRI for arms trade data, military spending figures, and nuclear weapons information.</p>
            <p class="method-source-url">sipri.org</p>
          </div>
          <div class="method-source">
            <h3>International Crisis Group (ICG)</h3>
            <p class="method-source-affil">Independent, Brussels-based</p>
            <p>Field-research-based qualitative conflict analysis. Analysts stationed in or near conflict zones build networks and talk to all parties. We use ICG for policy analysis, peace process assessments, and early warning.</p>
            <p class="method-source-url">crisisgroup.org</p>
          </div>
          <div class="method-source">
            <h3>United Nations OCHA & UNHCR</h3>
            <p class="method-source-affil">United Nations agencies</p>
            <p>Official humanitarian data including displacement figures, humanitarian needs assessments, and aid delivery tracking. We use UN data for displacement numbers, humanitarian impact, and refugee statistics.</p>
            <p class="method-source-url">unocha.org / unhcr.org</p>
          </div>
        </div>
      </div>

      <div class="method-section">
        <h2>How We Handle Uncertainty</h2>
        <p>Conflict data is inherently uncertain. Casualty figures are often estimates with wide ranges. Displacement numbers change daily. We address this by:</p>
        <ul class="method-list">
          <li>Using conservative estimates where possible (following UCDP's approach)</li>
          <li>Presenting ranges rather than precise numbers when sources disagree</li>
          <li>Clearly labeling estimates with "approximately," "estimated," or "~"</li>
          <li>Citing the source and date of each major data point</li>
          <li>Updating figures as new data becomes available</li>
        </ul>
      </div>

      <div class="method-section">
        <h2>Education Content</h2>
        <p>Our lesson plans, learning modules, and quizzes are designed to be:</p>
        <ul class="method-list">
          <li>Aligned with UNESCO's 2023 Recommendation on Education for Peace</li>
          <li>Appropriate for the indicated grade levels</li>
          <li>Balanced in presenting multiple perspectives</li>
          <li>Focused on critical thinking and media literacy, not advocacy</li>
          <li>Reviewed for accuracy against our primary sources</li>
        </ul>
      </div>

      <div class="method-section">
        <h2>Report an Error</h2>
        <div class="method-error-box">
          <p>Found something wrong? We want to know. Open an issue on our GitHub repository with:</p>
          <ul class="method-list">
            <li>The specific claim or data point that is incorrect</li>
            <li>The source that contradicts it</li>
            <li>The correct information with citation</li>
          </ul>
          <a href="https://github.com/mikelninh/path-to-peace/issues" class="btn btn-primary" target="_blank" rel="noopener">Report on GitHub →</a>
        </div>
      </div>

      <div class="method-section">
        <h2>License</h2>
        <p>Content is available under <strong>Creative Commons Attribution 4.0 (CC BY 4.0)</strong> — free to use, share, adapt, and teach with, as long as you credit the source. Code is <strong>MIT licensed</strong>.</p>
      </div>
    </div>
  `;

  window.scrollTo(0, 0);
}
