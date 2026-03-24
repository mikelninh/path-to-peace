# The Path to Peace

**Understanding why we fight — and how we can stop.**

An open educational resource documenting world conflicts, their root causes, historical lessons, and evidence-based paths to lasting peace. Built for students, educators, journalists, policymakers, and every citizen who believes peace is possible.

**[View the live site](https://mikelninh.github.io/path-to-peace/)**

---

## Our Vision

**A world where every person understands why conflicts happen — and knows what actually works to end them.**

War is not inevitable. It is a choice — made by leaders, driven by systems, and sustained by narratives. Every single war in human history has eventually ended. The question is never *whether* a conflict will end, but *how* — and at what cost.

This project exists because the truth about conflict and peace should be:
- **Accessible to everyone** — not locked in academic journals or think-tank reports
- **Visual and intuitive** — complex doesn't have to mean confusing
- **Honest and balanced** — showing all sides, naming root causes, rejecting propaganda
- **Actionable** — not just information, but a guide to what each person can do
- **Free forever** — peace education should never have a paywall

---

## What's Been Built (v1–v5)

### v1 — Content Foundation
15 current conflicts, 10 historical, root causes, patterns, path forward, and action guides.

### v2 — Interactive Data & Maps
Interactive world map (Leaflet.js + CartoDB dark tiles), data dashboard with SVG bar charts, conflict detail pages with hash routing, interactive event timelines with filtering, ES module architecture.

### v3 — Education Platform
6 lesson plans (Middle School through University), 4 learning modules with step-by-step navigation, 4 interactive quizzes (32 questions with scoring + localStorage progress), 7 discussion guides.

### v4 — Community & Accountability
"Write to Your Representative" letter generator, global arms trade visualizer (30 trade flows), peace progress tracker for all 15 conflicts, 3 conflict resolution simulators (131 decision nodes with branching narratives), methodology & sources page.

### v5 — Institutional Trust & Global Reach
Policymaker conflict briefs (print-optimized), data API with downloadable JSON endpoints, "State of Peace 2025" annual report (8 findings, 6 trends, 15-conflict scorecard), client-side search (Ctrl+K), PWA with service worker for offline access.

### By the Numbers
| Metric | Count |
|--------|-------|
| Files | ~85 |
| Lines of code & content | ~22,000+ |
| Hash routes | 18 |
| Current conflicts covered | 15 |
| Historical conflicts | 10 |
| Interactive quiz questions | 32 |
| Simulation decision nodes | 131 |
| Downloadable API datasets | 4 |
| External dependencies | 1 (Leaflet.js) |
| Tracking / analytics | 0 |
| Build step required | None |

---

## Architecture

```
path-to-peace/
  index.html                    # Single-page app shell
  manifest.json                 # PWA manifest
  sw.js                         # Service worker for offline

  js/
    main.js                     # Entry point — imports + initializes
    router.js                   # Hash router (18 routes)
    data/                       # All content as ES modules
      conflicts-current.js      # 15 conflicts with geo, timeline, stats
      conflicts-historical.js   # 10 historical with geo, casualties
      causes.js                 # Root cause categories + deep dives
      endings.js                # How wars end mechanisms
      patterns.js               # Patterns + path forward + apply lessons
      actions.js                # What you can do
      education.js              # Lesson plans, modules, quizzes, guides
      letter-templates.js       # Letter generator templates
      arms-trade.js             # SIPRI arms trade data
      peace-progress.js         # Peace process status per conflict
      simulations.js            # 3 branching scenario narratives
      state-of-peace.js         # Annual report data
      stats.js                  # Aggregate statistics
    components/                 # UI rendering modules
      map.js, cards.js, dashboard.js, detail-view.js,
      timeline.js, scrollytelling.js, filters.js, nav.js,
      animations.js, educators.js, learning-module.js,
      quiz.js, write-rep.js, arms-trade-viz.js,
      peace-tracker.js, simulator.js, methodology.js,
      briefing.js, api-docs.js, state-of-peace.js,
      search.js, share.js

  styles/                       # Modular CSS (no preprocessor)
    main.css                    # @import chain
    variables.css → base.css → nav.css → hero.css → cards.css →
    detail.css → timeline.css → map.css → dashboard.css →
    patterns.css → educators.css → quiz.css → write-rep.css →
    arms-trade.css → peace-tracker.css → simulator.css →
    methodology.css → briefing.css → api-docs.css →
    state-of-peace.css → search.css → animations.css → responsive.css

  lib/
    leaflet.min.js              # Self-hosted Leaflet 1.9.4
    leaflet.min.css

  api/                          # Static JSON API files
    conflicts.json, historical.json,
    arms-trade.json, peace-progress.json
```

### Key Design Decisions
- **Zero build step** — ES modules natively in the browser, no Webpack/Vite/bundler
- **Data-driven rendering** — all content in JS data files, components render via `innerHTML`
- **Hash routing** — `#/conflict/:id` style, works on static hosts, no server needed
- **Lazy loading** — education data, simulations, and map only load when their routes are visited
- **Progressive enhancement** — works without JS for basic content, enhanced with map/search/quizzes
- **Self-hosted dependencies** — Leaflet bundled locally for censorship resistance
- **Dark theme** — CSS custom properties, consistent design system across 25+ CSS files

---

## Learning Roadmap: Becoming an AI Engineer With This Project

This project is now also a **learning platform for AI engineering**. Each step below teaches a real skill by adding a feature to an existing, production codebase. The steps go from beginner to advanced.

### Phase 1: Backend Foundations (Weeks 1-4)

**Goal:** Move from a static site to a real fullstack application.

#### Step 1.1: Set Up a Backend (Node.js + Express)
**What you'll learn:** Server-side JavaScript, REST API design, project structure
**What you'll build:** A Node.js/Express server that serves the static site AND exposes API endpoints
**Design decisions to explore:**
- Why separate frontend from backend?
- Express vs. Fastify vs. Hono — when does the choice matter?
- How to structure routes, controllers, and middleware
- Environment variables and configuration management

#### Step 1.2: Add a Database (PostgreSQL or SQLite)
**What you'll learn:** SQL, schema design, migrations, ORM vs. raw queries
**What you'll build:** Move conflict data from JS files into a database, serve via API
**Design decisions to explore:**
- SQL vs. NoSQL — why PostgreSQL for structured conflict data?
- SQLite for development, PostgreSQL for production — how and why?
- Schema design: how to model conflicts, events, relationships
- Prisma vs. Drizzle vs. raw SQL — tradeoffs of abstraction
- Database migrations: why they matter, how to manage them

#### Step 1.3: Build a Real API
**What you'll learn:** REST API design, CRUD operations, validation, error handling
**What you'll build:** Full REST API for conflicts, education content, and user data
**Design decisions to explore:**
- RESTful route naming conventions
- Input validation (Zod, Joi) — why validate on the server even if the frontend does too?
- Error handling patterns — how to return useful errors
- API versioning — `/api/v1/` and why it matters
- Rate limiting and CORS

#### Step 1.4: Add Authentication
**What you'll learn:** Auth patterns, JWT, sessions, OAuth
**What you'll build:** User accounts so educators can save progress, create custom lesson plans
**Design decisions to explore:**
- JWT vs. session cookies — tradeoffs
- OAuth (Google/GitHub login) — when and why to use it
- Password hashing (bcrypt) — why you never store plain passwords
- Role-based access: admin, educator, student, public

### Phase 2: Data & Infrastructure (Weeks 5-8)

#### Step 2.1: Automated Backups
**What you'll learn:** Data persistence, backup strategies, cron jobs
**What you'll build:** Automated database backups to cloud storage (S3/R2)
**Design decisions to explore:**
- Backup frequency vs. storage cost
- Point-in-time recovery vs. daily snapshots
- Where to store backups (same provider? different?)
- Testing backup restoration — most people skip this, don't

#### Step 2.2: Deployment & CI/CD
**What you'll learn:** Docker, cloud deployment, GitHub Actions
**What you'll build:** Containerized app deployed to Railway/Fly.io/Render with auto-deploy on push
**Design decisions to explore:**
- Docker: why containers? Multi-stage builds
- GitHub Actions: test → build → deploy pipeline
- Environment management: dev, staging, production
- Zero-downtime deployments

#### Step 2.3: Monitoring & Logging
**What you'll learn:** Observability, error tracking, performance monitoring
**What you'll build:** Structured logging, error alerts, uptime monitoring
**Design decisions to explore:**
- What to log and what not to (PII, performance)
- Structured logging (JSON) vs. plain text
- Sentry for errors vs. self-hosted alternatives
- When to alert vs. when to log

### Phase 3: AI Features (Weeks 9-16)

**Goal:** Add genuinely useful AI capabilities that enhance the peace education mission.

#### Step 3.1: AI-Powered Conflict Summarizer
**What you'll learn:** LLM API integration, prompt engineering, caching
**What you'll build:** A feature that generates plain-language conflict summaries at different reading levels (elementary, high school, expert)
**Design decisions to explore:**
- Claude API vs. OpenAI — choosing a provider
- Prompt engineering: how to get consistent, factual summaries
- Caching AI responses — why you don't call the API on every page view
- Cost management: token counting, rate limiting, budget alerts
- Hallucination mitigation: grounding AI output in your own verified data

#### Step 3.2: Smart Q&A ("Ask About Any Conflict")
**What you'll learn:** RAG (Retrieval-Augmented Generation), embeddings, vector search
**What you'll build:** A chat interface where users can ask questions and get answers grounded in the site's verified data
**Design decisions to explore:**
- RAG architecture: why not just send everything to the LLM?
- Embeddings: what they are, how to generate them, where to store them
- Vector databases: Pinecone vs. pgvector vs. in-memory
- Chunking strategies: how to split conflict data for retrieval
- Grounding and citation: ensuring AI answers reference your sources
- Streaming responses: why and how

#### Step 3.3: AI-Assisted Lesson Plan Generator
**What you'll learn:** Structured output, tool use, multi-step AI workflows
**What you'll build:** Teachers describe their class (grade, subject, time) and AI generates a custom lesson plan using the site's content
**Design decisions to explore:**
- Structured output (JSON mode) — getting the AI to return data, not prose
- Tool use / function calling — letting the AI query your database
- Multi-step workflows: research → outline → draft → review
- Human-in-the-loop: AI generates, teacher edits, system learns

#### Step 3.4: Conflict Prediction & Early Warning (Advanced)
**What you'll learn:** Time-series analysis, ML basics, responsible AI
**What you'll build:** A dashboard showing which situations are at highest risk of escalation based on historical patterns
**Design decisions to explore:**
- Feature engineering: what signals predict escalation?
- Simple models (logistic regression) vs. complex (neural nets) — start simple
- Responsible AI: the ethics of conflict prediction, false positives/negatives
- Uncertainty communication: how to show predictions without overstating confidence
- Feedback loops: how predictions might influence the thing being predicted

### Phase 4: Scale & Polish (Weeks 17-20)

#### Step 4.1: Real-Time Data Pipeline
**What you'll learn:** Data pipelines, ETL, APIs, webhooks
**What you'll build:** Automated ingestion of live conflict data from ACLED/UCDP APIs
**Design decisions to explore:**
- Pull (polling) vs. push (webhooks) — what's available?
- Data transformation and normalization
- Handling API rate limits and failures
- Data freshness vs. cost

#### Step 4.2: Multi-Language Support (i18n)
**What you'll learn:** Internationalization, translation workflows, right-to-left layouts
**What you'll build:** Full site translation starting with Spanish and Arabic
**Design decisions to explore:**
- i18n architecture: key-based vs. content-based translation
- Machine translation (AI) + human review workflow
- RTL layout support for Arabic
- URL structure for languages

#### Step 4.3: Performance & Security Audit
**What you'll learn:** Web performance, security best practices, accessibility
**What you'll build:** Optimize everything — Core Web Vitals, security headers, WCAG compliance
**Design decisions to explore:**
- Performance budgets and measurement
- Content Security Policy (CSP) headers
- OWASP Top 10 for your specific stack
- Accessibility audit and remediation

---

## How to Use This Learning Roadmap

1. **Pick your starting point** — if you know basic JS, start at Phase 1. If you have backend experience, skip to Phase 3 (AI).
2. **Build each step on the real project** — don't create toy examples. Every feature gets deployed.
3. **Focus on design decisions** — the "what to build" is less important than understanding "why this approach vs. that one." Each step lists the key decisions to think through.
4. **Document your learning** — write a brief note after each step: what you built, what you decided, what you'd do differently.
5. **Ship each step** — push to GitHub, deploy, get it working. Nothing teaches like production.

---

## Sources & Methodology

All content is sourced from established, peer-reviewed conflict research. Full details on our [Methodology page](https://mikelninh.github.io/path-to-peace/#/methodology).

- **[UCDP](https://ucdp.uu.se/)** — Academic gold standard for conflict data
- **[ACLED](https://acleddata.com/)** — Real-time event-level conflict data
- **[SIPRI](https://www.sipri.org/)** — Arms transfers and military expenditure
- **[ICG](https://www.crisisgroup.org/)** — Field-based conflict analysis
- **[UN OCHA](https://www.unocha.org/) / [UNHCR](https://www.unhcr.org/)** — Humanitarian and refugee data

## Contributing

This is an open project. We welcome:
- Content corrections and updates
- New conflict coverage
- Translations
- Design and accessibility improvements
- Educational materials
- Technical contributions (see Learning Roadmap above)

## License

Content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — free to use, share, and teach with.
Code: [MIT](https://opensource.org/licenses/MIT) — free to use, modify, and distribute.

---

> "Peace is not merely a distant goal that we seek, but a means by which we arrive at that goal." — Martin Luther King Jr.

**Share this resource. Teach with it. Build on it. Demand peace.**

*Built by [@mikelninh](https://github.com/mikelninh) with [Claude](https://claude.ai) and the open-source community.*
