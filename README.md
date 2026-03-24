# The Path to Peace ☮

**Understanding why we fight — and how we can stop.**

A free, open-source platform documenting world conflicts, their root causes, historical lessons, and evidence-based paths to lasting peace. Built for students, educators, journalists, policymakers, and citizens.

**[View the live site →](https://mikelninh.github.io/path-to-peace/)**

---

## What This Is

- **15 active conflicts** with detailed analysis — who, why, what resources are at stake, and paths to resolution
- **10 historical conflicts** — how they ended and what we learned
- **8 root cause categories** with real-world examples
- **6 proven peace mechanisms** backed by historical evidence
- **Interactive world map** with proportional conflict circles, connection arcs, and animated hotspots
- **Data dashboard** — displacement, duration, and severity visualized
- **Education platform** — lesson plans, learning modules, quizzes, discussion guides
- **Action tools** — letter generator for representatives, arms trade visualizer, peace progress tracker, conflict resolution simulator (131 branching decision nodes)
- **AI chatbot** — RAG-powered Q&A grounded in verified conflict data (with offline Quick Answers fallback)
- **State of Peace 2025 report** — 8 findings, 6 global trends, 15-conflict scorecard

## Live Features

| Feature | Link |
|---------|------|
| Homepage & conflict map | [path-to-peace](https://mikelninh.github.io/path-to-peace/) |
| For Educators | [/#/educators](https://mikelninh.github.io/path-to-peace/#/educators) |
| Write Your Representative | [/#/write](https://mikelninh.github.io/path-to-peace/#/write) |
| Peace Progress Tracker | [/#/peace-progress](https://mikelninh.github.io/path-to-peace/#/peace-progress) |
| Conflict Resolution Simulator | [/#/simulate/select](https://mikelninh.github.io/path-to-peace/#/simulate/select) |
| Arms Trade Visualizer | [/#/arms-trade](https://mikelninh.github.io/path-to-peace/#/arms-trade) |
| State of Peace 2025 | [/#/report](https://mikelninh.github.io/path-to-peace/#/report) |
| Policymaker Briefs | [/#/brief/sudan](https://mikelninh.github.io/path-to-peace/#/brief/sudan) |
| Data API | [/#/api](https://mikelninh.github.io/path-to-peace/#/api) |

## Architecture

```
path-to-peace/
├── index.html                  # Single-page app shell
├── manifest.json               # PWA manifest
├── sw.js                       # Service worker (offline)
│
├── js/
│   ├── main.js                 # Entry point
│   ├── router.js               # Hash router (18 routes)
│   ├── components/             # UI modules (25 files)
│   │   ├── hero-globe.js       # Canvas 2D animated globe
│   │   ├── icons.js            # SVG icon sprite (24+ icons)
│   │   ├── map.js              # Leaflet map with proportional circles + arcs
│   │   ├── chat-widget.js      # AI chat with Quick Answers fallback
│   │   ├── cards.js            # Conflict cards with progressive disclosure
│   │   ├── nav.js              # Top nav + mobile bottom nav bar
│   │   ├── animations.js       # 3-tier animation system
│   │   └── ...                 # dashboard, detail-view, educators, quiz, etc.
│   └── data/                   # All content as ES modules (14 files)
│       ├── conflicts-current.js
│       ├── conflicts-historical.js
│       ├── quick-answers.js    # Offline Q&A fallback data
│       └── ...                 # causes, endings, education, simulations, etc.
│
├── styles/                     # Modular CSS (28 files)
│   ├── main.css                # @import chain
│   ├── variables.css           # Design tokens (colors, fonts, spacing)
│   ├── animations.css          # Entrance reveals, hover effects, scroll-linked
│   ├── dividers.css            # Act dividers with pull-quotes
│   └── ...
│
├── lib/                        # Self-hosted Leaflet.js
├── api/                        # Static JSON endpoints (4 files)
│
└── server/                     # Backend API (optional)
    ├── src/
    │   ├── index.js            # Express 5 server
    │   ├── db/                 # SQLite + migrations + seed
    │   ├── routes/             # REST API: conflicts, stats, education, chat, health
    │   ├── middleware/         # Validation (Zod), rate limiting, error handling
    │   └── services/           # RAG embeddings, AI chat, backups
    ├── Dockerfile
    └── .env.example
```

### Design & UX
- **Animated globe hero** — Canvas 2D rotating earth with conflict hotspots pulsing in severity colors
- **Custom SVG icon system** — 24+ hand-crafted icons replacing all emoji, `currentColor` inheritance
- **3-tier animation system** — staggered entrance reveals, severity-colored hover glows, scroll-linked counters
- **Progressive disclosure** — homepage shows 3 featured conflicts, expands on demand
- **Act dividers** — pull-quotes between sections for visual breathing room
- **Mobile-first** — bottom nav bar, scroll-snap carousels, map tap-to-interact overlay
- **Dark theme** — consistent design tokens via CSS custom properties
- **Zero tracking** — no analytics, no cookies, no third-party scripts

### Frontend
- **Zero build step** — native ES modules, no bundler
- **One external dependency** — Leaflet.js (self-hosted)
- **PWA-enabled** — works offline via service worker
- **18 hash routes** with lazy-loaded content

### Backend (optional)
- **Express 5 + SQLite** (WAL mode, 3 versioned migrations)
- **REST API** — full CRUD with Zod validation, rate limiting, pagination
- **AI chatbot** — RAG pipeline: OpenAI embeddings → cosine similarity search → Claude answer generation
- **Backup system** — automated with retention policy
- **Docker-ready** — multi-stage build, non-root user, health checks

The frontend works standalone on GitHub Pages. The backend adds the AI chatbot and dynamic API.

## Running Locally

**Frontend only:**
```bash
npx serve .
# or
python3 -m http.server 8090
```

**With backend** (for AI chatbot):
```bash
cd server
cp .env.example .env         # Add your API keys
npm install
npm run db:reset              # Create and seed database
npm run ai:build-index        # Build embeddings (needs OpenAI key)
npm run dev                   # Start server on :3001
```

## Data Sources

All content sourced from established conflict research:

- [Uppsala Conflict Data Program (UCDP)](https://ucdp.uu.se/)
- [Armed Conflict Location & Event Data (ACLED)](https://acleddata.com/)
- [Stockholm International Peace Research Institute (SIPRI)](https://www.sipri.org/)
- [International Crisis Group (ICG)](https://www.crisisgroup.org/)
- [United Nations OCHA](https://www.unocha.org/) / [UNHCR](https://www.unhcr.org/)

## Contributing

Contributions welcome:

- **Content corrections** — found an error? Open an issue
- **New conflict coverage** — help document undercovered conflicts
- **Translations** — help make this accessible in more languages
- **Design & accessibility** — improve the experience for all users
- **Technical** — see open issues

## License

Content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
Code: [MIT](https://opensource.org/licenses/MIT)

---

*Built by [@mikelninh](https://github.com/mikelninh) with [Claude](https://claude.ai) and the open-source community.*
