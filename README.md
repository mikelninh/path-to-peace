# The Path to Peace ☮

**Understanding why we fight — and how we can stop.**

An open educational resource documenting world conflicts, their root causes, historical lessons, and evidence-based paths to lasting peace.

**[View the live site →](https://mikelninh.github.io/path-to-peace/)**

---

## What This Is

A comprehensive, free, open-source platform that makes conflict and peace data accessible to everyone — students, educators, journalists, policymakers, and citizens.

The site covers:
- **15 active conflicts** with detailed analysis (who, why, what, paths to resolution)
- **10 historical conflicts** with lessons learned and how they ended
- **8 root cause categories** with real-world examples
- **6 proven peace mechanisms** backed by historical evidence
- **Interactive tools** — world map, data dashboard, arms trade visualizer, peace tracker
- **Education platform** — lesson plans, learning modules, quizzes, discussion guides
- **Action tools** — letter generator for representatives, conflict resolution simulator
- **AI chatbot** — ask questions and get answers grounded in verified conflict data

## Live Features

| Feature | URL |
|---------|-----|
| Homepage & conflict map | [/path-to-peace/](https://mikelninh.github.io/path-to-peace/) |
| For Educators | [/#/educators](https://mikelninh.github.io/path-to-peace/#/educators) |
| Write Your Representative | [/#/write](https://mikelninh.github.io/path-to-peace/#/write) |
| Peace Progress Tracker | [/#/peace-progress](https://mikelninh.github.io/path-to-peace/#/peace-progress) |
| Conflict Resolution Simulator | [/#/simulate/select](https://mikelninh.github.io/path-to-peace/#/simulate/select) |
| Arms Trade Visualizer | [/#/arms-trade](https://mikelninh.github.io/path-to-peace/#/arms-trade) |
| State of Peace 2025 Report | [/#/report](https://mikelninh.github.io/path-to-peace/#/report) |
| API Documentation | [/#/api](https://mikelninh.github.io/path-to-peace/#/api) |

## Architecture

```
path-to-peace/
├── index.html                  # Single-page app shell
├── manifest.json               # PWA manifest
├── sw.js                       # Service worker (offline support)
│
├── js/
│   ├── main.js                 # Entry point
│   ├── router.js               # Hash-based router (18 routes)
│   ├── data/                   # All content as ES modules (13 files)
│   └── components/             # UI rendering modules (23 files)
│
├── styles/                     # Modular CSS via @import chain (27 files)
│   └── main.css                # Import entry point
│
├── lib/                        # Self-hosted Leaflet.js (maps)
├── api/                        # Static JSON endpoints (4 files)
│
└── server/                     # Backend API (optional, for AI features)
    ├── src/
    │   ├── index.js            # Express server
    │   ├── db/                 # SQLite, migrations, seed
    │   ├── routes/             # REST API (conflicts, stats, education, chat)
    │   ├── middleware/         # Auth, validation (Zod), rate limiting, errors
    │   └── services/           # Embeddings, AI chat (RAG), backups
    ├── Dockerfile
    └── .env.example
```

### Frontend
- **Zero build step** — native ES modules, no bundler
- **One external dependency** — Leaflet.js for maps (self-hosted)
- **Zero tracking** — no analytics, no cookies, no third-party scripts
- **PWA-enabled** — works offline via service worker
- **18 hash routes** with lazy-loaded education content

### Backend (optional)
- **Express 5** with SQLite (WAL mode)
- **REST API** — full CRUD for conflicts, stats, education, peace progress
- **AI chatbot** — RAG pipeline: OpenAI embeddings + Claude answer generation
- **Database migrations** — versioned schema evolution
- **Backup system** — automated with retention policy

The frontend works completely standalone on GitHub Pages. The backend adds the AI chatbot and a real API for dynamic data.

## Running Locally

**Frontend only** (static site):
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

All content is sourced from established conflict research institutions:

- [Uppsala Conflict Data Program (UCDP)](https://ucdp.uu.se/)
- [Armed Conflict Location & Event Data (ACLED)](https://acleddata.com/)
- [Stockholm International Peace Research Institute (SIPRI)](https://www.sipri.org/)
- [International Crisis Group (ICG)](https://www.crisisgroup.org/)
- [United Nations OCHA](https://www.unocha.org/) / [UNHCR](https://www.unhcr.org/)

## Contributing

This is an open project. Contributions welcome:

- **Content corrections** — found an error? Open an issue
- **New conflict coverage** — help document conflicts we haven't covered
- **Translations** — help make this accessible in more languages
- **Design & accessibility** — improve the experience for all users
- **Technical** — see open issues for current needs

## License

Content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — free to use, share, and teach with.
Code: [MIT](https://opensource.org/licenses/MIT)

---

*Built by [@mikelninh](https://github.com/mikelninh) and the open-source community.*
