# The Path to Peace ☮

**Understanding why we fight — and how we can stop.**

A free, open-source platform documenting world conflicts, their root causes, historical lessons, and evidence-based paths to lasting peace. Built for students, educators, journalists, policymakers, and citizens.

**[View the live site →](https://mikelninh.github.io/path-to-peace/)**

---

## Important: Read Our Transparency Notice

This site was built by a human ([@mikelninh](https://github.com/mikelninh)) working with an AI assistant (Claude by Anthropic). The AI generated the initial content by synthesizing information from its training data. **Key dates, actor names, and major events have been spot-checked and verified. Casualty and displacement figures are approximate estimates that vary between sources.** Analysis and interpretation represent reasonable synthesis of established research but are not direct quotes from experts.

We are honest about what this is: **an educational starting point, not a definitive reference.** We encourage cross-referencing with the primary sources listed below and welcome corrections via [GitHub Issues](https://github.com/mikelninh/path-to-peace/issues).

[Read the full transparency notice on the site →](https://mikelninh.github.io/path-to-peace/#transparency)

---

## What's Inside

- **15 active conflicts** with detailed analysis — who, why, what's at stake, and paths to resolution
- **10 historical conflicts** — how they ended and what we learned
- **8 root cause categories** with real-world examples
- **6 proven peace mechanisms** backed by historical evidence
- **Interactive world map** — proportional circles sized by displacement, connection arcs between linked conflicts, animated critical hotspots
- **Data dashboard** — displacement, duration, and severity visualized
- **Education platform** — 6 lesson plans, 4 learning modules, 32 quiz questions, 7 discussion guides
- **Action tools** — letter generator for representatives, arms trade visualizer, peace progress tracker, conflict resolution simulator (3 scenarios, 131 branching decision nodes)
- **State of Peace 2025 report** — 8 findings, 6 global trends, 15-conflict scorecard
- **AI chatbot** — RAG-powered Q&A grounded in the site's data (with offline Quick Answers fallback on GitHub Pages)

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
| Transparency Notice | [/#transparency](https://mikelninh.github.io/path-to-peace/#transparency) |

## Architecture

```
path-to-peace/
├── index.html                  # Single-page app shell
├── manifest.json               # PWA manifest
├── sw.js                       # Service worker (offline, v6)
├── og-image.png                # Social sharing preview (1200x630)
│
├── js/
│   ├── main.js                 # Entry point
│   ├── router.js               # Hash router (18 routes)
│   ├── components/             # UI modules (25 files)
│   │   ├── hero-globe.js       # Canvas 2D rotating earth with conflict hotspots
│   │   ├── icons.js            # SVG icon sprite (24+ custom icons)
│   │   ├── map.js              # Leaflet map: proportional circles, arcs, pulse
│   │   ├── chat-widget.js      # AI chat + Quick Answers offline fallback
│   │   ├── cards.js            # Conflict cards with progressive disclosure
│   │   ├── nav.js              # Top nav + mobile bottom nav bar
│   │   ├── animations.js       # 3-tier: entrances, hover, scroll-linked
│   │   └── ...                 # dashboard, detail-view, educators, quiz, etc.
│   └── data/                   # All content as ES modules (14 files)
│       ├── conflicts-current.js    # 15 conflicts (fact-checked)
│       ├── conflicts-historical.js # 10 historical
│       ├── quick-answers.js        # 12 offline Q&A
│       └── ...
│
├── styles/                     # Modular CSS (28 files, no preprocessor)
│   ├── main.css                # @import chain
│   └── variables.css           # Design tokens
│
├── lib/                        # Self-hosted Leaflet.js
├── api/                        # Static JSON endpoints (4 files)
│
└── server/                     # Backend API (optional, for AI chatbot)
    ├── src/
    │   ├── index.js            # Express 5 server
    │   ├── db/                 # SQLite + 3 versioned migrations + seed
    │   ├── routes/             # REST API with Zod validation
    │   └── services/           # RAG embeddings (OpenAI) + chat (Claude)
    ├── Dockerfile
    └── .env.example
```

### Key Technical Decisions
- **Zero build step** — native ES modules, no bundler, no framework
- **One dependency** — Leaflet.js (self-hosted for censorship resistance)
- **Zero tracking** — no analytics, no cookies, no third-party scripts
- **PWA** — works offline via service worker
- **Accessibility** — skip-to-content link, ARIA landmarks, semantic HTML
- **Mobile-first** — bottom nav bar, scroll-snap, tap-to-interact map
- **Social sharing** — Open Graph image, Twitter cards, SVG favicon

### Backend (optional)
The frontend works standalone on GitHub Pages. The backend adds:
- REST API with SQLite (WAL mode)
- AI chatbot via RAG: OpenAI embeddings → cosine similarity → Claude answers
- Automated backup system

## Running Locally

**Frontend only:**
```bash
npx serve .
```

**With backend** (for AI chatbot):
```bash
cd server
cp .env.example .env         # Add your OPENAI_API_KEY and ANTHROPIC_API_KEY
npm install
npm run db:reset              # Create and seed database
npm run ai:build-index        # Build 70 embeddings (~$0.001)
npm run dev                   # Server on :3001
```

## Data Sources & Accuracy

Content is synthesized from established conflict research institutions. **We are transparent that this content was AI-generated and human-reviewed, not written by conflict researchers.** We encourage you to consult these sources directly:

- [Uppsala Conflict Data Program (UCDP)](https://ucdp.uu.se/) — academic gold standard since 1946
- [Armed Conflict Location & Event Data (ACLED)](https://acleddata.com/) — real-time event data
- [Stockholm International Peace Research Institute (SIPRI)](https://www.sipri.org/) — arms and military expenditure
- [International Crisis Group (ICG)](https://www.crisisgroup.org/) — field-based analysis
- [United Nations OCHA](https://www.unocha.org/) / [UNHCR](https://www.unhcr.org/) — humanitarian and refugee data

**What's been verified:** conflict start dates, key actor names, major event dates, peace agreement names.
**What's approximate:** casualty figures, displacement numbers (these vary between sources and change over time).
**What's AI-synthesized:** root cause analysis, "lessons learned" interpretations, paths to resolution.

## Contributing

We especially welcome:
- **Corrections from experts** — conflict researchers, journalists, people with direct experience
- **Fact-checking** — flag any claim that seems wrong or outdated
- **Translations** — help make this accessible in more languages
- **Accessibility** — improvements for screen readers and keyboard navigation

Please [open an issue](https://github.com/mikelninh/path-to-peace/issues) or submit a pull request.

## License

Content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — free to use, share, and teach with.
Code: [MIT](https://opensource.org/licenses/MIT)

---

*Built by [@mikelninh](https://github.com/mikelninh) with [Claude](https://claude.ai). Honesty about how it was made is part of the project.*
