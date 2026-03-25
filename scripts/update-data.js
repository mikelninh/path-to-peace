#!/usr/bin/env node

// ============================================================
// Data Update Pipeline
// ============================================================
//
// Fetches latest conflict data from ACLED/UCDP APIs (or mock),
// normalizes it to our format, shows a diff for human review,
// and optionally writes updated JS data files.
//
// Usage:
//   node scripts/update-data.js              # Dry run (show diff only)
//   node scripts/update-data.js --write      # Write changes to files
//   node scripts/update-data.js --mock       # Use mock data (no API keys)
//   node scripts/update-data.js --mock --write
//
// Requires:
//   UCDP_API_TOKEN in .env (or use --mock)
//   ACLED_API_KEY + ACLED_API_EMAIL in .env (or use --mock)
// ============================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'js', 'data');

const args = process.argv.slice(2);
const DRY_RUN = !args.includes('--write');
const USE_MOCK = args.includes('--mock');

// ============================================================
// Color output helpers
// ============================================================
const c = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

// ============================================================
// Step 1: FETCH — Get data from APIs or mock
// ============================================================

/**
 * Mock data simulating what UCDP/ACLED would return.
 * Structured to match their actual API response format.
 * When real API keys are available, replace fetchMockData()
 * with fetchUCDP() and fetchACLED().
 */
function fetchMockData() {
  console.log(c.cyan('\n📡 Using mock data (no API keys)\n'));

  // Mock: simulates UCDP-style conflict updates
  // These represent what "new data" might look like
  return {
    source: 'mock',
    fetchedAt: new Date().toISOString(),
    conflicts: [
      {
        id: 'sudan',
        updates: {
          casualties: '~85,000+ killed (estimates as of mid-2025; likely far higher)',
          displaced: '~15.8 million',
        },
        newEvents: [
          { date: '2025-03-01', title: 'RSF launches offensive on El Fasher, last government-held city in Darfur', type: 'escalation' },
          { date: '2025-02-15', title: 'UN warns of famine spreading to six states', type: 'humanitarian' },
        ],
      },
      {
        id: 'russia-ukraine',
        updates: {
          casualties: '500,000+ military casualties on both sides (estimated)',
        },
        newEvents: [
          { date: '2025-01-20', title: 'Russia makes incremental gains in Donetsk region', type: 'military' },
        ],
      },
      {
        id: 'myanmar',
        updates: {
          displaced: '~3.5 million internally displaced',
        },
        newEvents: [
          { date: '2025-02-10', title: 'Resistance forces capture additional towns in Shan State', type: 'military' },
        ],
      },
      {
        id: 'drc',
        updates: {
          casualties: '~120,000+ killed since 1990s (eastern conflict)',
        },
        newEvents: [
          { date: '2025-01-27', title: 'M23 forces capture Goma, displacing hundreds of thousands', type: 'escalation' },
        ],
      },
    ],
  };
}

/**
 * Fetch from real UCDP API.
 * Requires UCDP_API_TOKEN environment variable.
 */
async function fetchUCDP() {
  const token = process.env.UCDP_API_TOKEN;
  if (!token) {
    console.log(c.yellow('⚠ UCDP_API_TOKEN not set. Use --mock or add token to .env'));
    return null;
  }

  console.log(c.cyan('📡 Fetching from UCDP API...'));

  try {
    // Fetch latest georeferenced events for our 15 conflict countries
    const countries = [
      'Sudan', 'Ukraine', 'Israel', 'Myanmar', 'Ethiopia',
      'Yemen', 'DR Congo', 'Mali', 'Syria', 'Haiti',
      'Somalia', 'Azerbaijan',
    ];

    const events = [];
    for (const country of countries) {
      const url = `https://ucdpapi.pcr.uu.se/api/gedevents/25.1?pagesize=50&page=0&Country=${encodeURIComponent(country)}`;
      const response = await fetch(url, {
        headers: { 'x-ucdp-access-token': token },
      });

      if (!response.ok) {
        console.log(c.yellow(`  ⚠ UCDP returned ${response.status} for ${country}`));
        continue;
      }

      const data = await response.json();
      events.push(...(data.Result || []));
      console.log(c.dim(`  ✓ ${country}: ${data.TotalCount} events`));
    }

    return { source: 'ucdp', fetchedAt: new Date().toISOString(), events };
  } catch (err) {
    console.log(c.red(`  ✗ UCDP fetch failed: ${err.message}`));
    return null;
  }
}

/**
 * Fetch from real ACLED API.
 * Requires ACLED_API_KEY and ACLED_API_EMAIL environment variables.
 */
async function fetchACLED() {
  const key = process.env.ACLED_API_KEY;
  const email = process.env.ACLED_API_EMAIL;
  if (!key || !email) {
    console.log(c.yellow('⚠ ACLED_API_KEY or ACLED_API_EMAIL not set. Use --mock or add to .env'));
    return null;
  }

  console.log(c.cyan('📡 Fetching from ACLED API...'));

  try {
    // Fetch recent events (last 30 days) for conflict countries
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const url = `https://api.acleddata.com/acled/read?key=${key}&email=${email}&event_date=${thirtyDaysAgo}|&event_date_where=>=&limit=500`;

    const response = await fetch(url);
    if (!response.ok) {
      console.log(c.yellow(`  ⚠ ACLED returned ${response.status}`));
      return null;
    }

    const data = await response.json();
    console.log(c.dim(`  ✓ ACLED: ${data.count} events in last 30 days`));
    return { source: 'acled', fetchedAt: new Date().toISOString(), events: data.data || [] };
  } catch (err) {
    console.log(c.red(`  ✗ ACLED fetch failed: ${err.message}`));
    return null;
  }
}

// ============================================================
// Step 2: LOAD current data
// ============================================================

async function loadCurrentData() {
  const filePath = path.join(DATA_DIR, 'conflicts-current.js');
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract conflict objects by parsing the JS file
  // We look for key fields we care about comparing
  const conflicts = {};

  const idMatches = [...content.matchAll(/id:\s*'([^']+)'/g)];
  for (const match of idMatches) {
    const id = match[1];
    const idx = match.index;

    // Find the next conflict's id or end of array to bound our search
    const nextId = idMatches.find((m) => m.index > idx);
    const slice = content.slice(idx, nextId ? nextId.index : content.length);

    const casualties = slice.match(/casualties:\s*'([^']+)'/)?.[1] || '';
    const displaced = slice.match(/displaced:\s*'([^']+)'/)?.[1] || '';

    // Count existing events
    const eventCount = (slice.match(/\{ date:/g) || []).length;

    conflicts[id] = { casualties, displaced, eventCount };
  }

  return { filePath, content, conflicts };
}

// ============================================================
// Step 3: DIFF — Compare and show changes
// ============================================================

function computeDiff(current, incoming) {
  const changes = [];

  for (const update of incoming.conflicts) {
    const existing = current.conflicts[update.id];
    if (!existing) {
      changes.push({
        conflictId: update.id,
        type: 'new-conflict',
        message: `New conflict: ${update.id}`,
      });
      continue;
    }

    // Check for updated fields
    if (update.updates) {
      for (const [field, newValue] of Object.entries(update.updates)) {
        const oldValue = existing[field] || '(empty)';
        if (oldValue !== newValue) {
          changes.push({
            conflictId: update.id,
            type: 'field-update',
            field,
            oldValue,
            newValue,
          });
        }
      }
    }

    // Check for new events
    if (update.newEvents && update.newEvents.length > 0) {
      changes.push({
        conflictId: update.id,
        type: 'new-events',
        count: update.newEvents.length,
        events: update.newEvents,
      });
    }
  }

  return changes;
}

function printDiff(changes) {
  if (changes.length === 0) {
    console.log(c.green('\n✓ No changes detected. Data is up to date.\n'));
    return;
  }

  console.log(c.bold(`\n${'='.repeat(60)}`));
  console.log(c.bold('  DATA CHANGES — Review before applying'));
  console.log(c.bold(`${'='.repeat(60)}\n`));

  let currentConflict = '';

  for (const change of changes) {
    if (change.conflictId !== currentConflict) {
      currentConflict = change.conflictId;
      console.log(c.bold(`  ${change.conflictId.toUpperCase()}`));
      console.log(c.dim(`  ${'─'.repeat(40)}`));
    }

    if (change.type === 'field-update') {
      console.log(`    ${change.field}:`);
      console.log(`      ${c.red('- ' + change.oldValue)}`);
      console.log(`      ${c.green('+ ' + change.newValue)}`);
      console.log('');
    }

    if (change.type === 'new-events') {
      console.log(`    ${c.cyan(`+${change.count} new event(s):`)}`);
      for (const event of change.events) {
        console.log(`      ${c.dim(event.date)} ${event.title} ${c.dim(`(${event.type})`)}`);
      }
      console.log('');
    }

    if (change.type === 'new-conflict') {
      console.log(`    ${c.yellow(change.message)}`);
      console.log('');
    }
  }

  console.log(c.bold(`${'='.repeat(60)}`));
  console.log(`  ${c.bold(changes.length)} change(s) detected`);
  console.log(c.bold(`${'='.repeat(60)}\n`));
}

// ============================================================
// Step 4: APPLY — Write changes to data file
// ============================================================

function applyChanges(current, incoming) {
  let content = current.content;
  let appliedCount = 0;

  for (const update of incoming.conflicts) {
    if (!update.updates) continue;

    for (const [field, newValue] of Object.entries(update.updates)) {
      const existing = current.conflicts[update.id]?.[field];
      if (!existing || existing === newValue) continue;

      // Replace the old value with the new value in the file content
      const escaped = existing.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(id:\\s*'${update.id}'[\\s\\S]*?${field}:\\s*')${escaped}(')`);

      if (regex.test(content)) {
        content = content.replace(regex, `$1${newValue}$2`);
        appliedCount++;
      }
    }

    // Add new events (append before the closing ] of keyEvents array)
    if (update.newEvents && update.newEvents.length > 0) {
      const eventsStr = update.newEvents
        .map((e) => `      { date: '${e.date}', title: '${e.title.replace(/'/g, "\\'")}', type: '${e.type}' },`)
        .join('\n');

      // Find the keyEvents array for this conflict and append before its closing ]
      const conflictPattern = new RegExp(
        `(id:\\s*'${update.id}'[\\s\\S]*?keyEvents:\\s*\\[[\\s\\S]*?)(\\s*\\])`
      );

      if (conflictPattern.test(content)) {
        content = content.replace(conflictPattern, `$1\n${eventsStr}$2`);
        appliedCount++;
      }
    }
  }

  return { content, appliedCount };
}

// ============================================================
// Main
// ============================================================

async function main() {
  console.log(c.bold('\n☮ Path to Peace — Data Update Pipeline\n'));
  console.log(c.dim(`  Mode: ${DRY_RUN ? 'DRY RUN (use --write to apply)' : 'WRITE MODE'}`));
  console.log(c.dim(`  Source: ${USE_MOCK ? 'Mock data' : 'Live APIs'}`));
  console.log(c.dim(`  Time: ${new Date().toISOString()}\n`));

  // Step 1: Fetch
  let incoming;
  if (USE_MOCK) {
    incoming = fetchMockData();
  } else {
    // Try UCDP first, fall back to ACLED, combine if both work
    const ucdp = await fetchUCDP();
    const acled = await fetchACLED();

    if (!ucdp && !acled) {
      console.log(c.red('\n✗ No data sources available. Use --mock to test with mock data.\n'));
      process.exit(1);
    }

    // TODO: normalize UCDP/ACLED formats into our update format
    // For now, this is a placeholder
    console.log(c.yellow('\n⚠ Live API normalization not yet implemented. Use --mock for now.\n'));
    process.exit(0);
  }

  // Step 2: Load current data
  console.log(c.cyan('📂 Loading current conflict data...\n'));
  const current = await loadCurrentData();
  console.log(c.dim(`  Found ${Object.keys(current.conflicts).length} conflicts in conflicts-current.js\n`));

  // Step 3: Diff
  const changes = computeDiff(current, incoming);
  printDiff(changes);

  if (changes.length === 0) return;

  // Step 4: Apply (if not dry run)
  if (DRY_RUN) {
    console.log(c.yellow('  This is a dry run. No files were modified.'));
    console.log(c.yellow('  Run with --write to apply changes.\n'));
    return;
  }

  console.log(c.cyan('📝 Applying changes...\n'));
  const result = applyChanges(current, incoming);

  fs.writeFileSync(current.filePath, result.content, 'utf-8');
  console.log(c.green(`  ✓ Written ${result.appliedCount} change(s) to conflicts-current.js`));
  console.log(c.dim(`  File: ${current.filePath}\n`));

  // Write update log
  const logEntry = {
    timestamp: new Date().toISOString(),
    source: incoming.source,
    changes: changes.map((ch) => ({
      conflict: ch.conflictId,
      type: ch.type,
      field: ch.field,
      old: ch.oldValue,
      new: ch.newValue,
    })),
  };

  const logPath = path.join(ROOT, 'scripts', 'update-log.json');
  const existingLog = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath, 'utf-8')) : [];
  existingLog.push(logEntry);
  fs.writeFileSync(logPath, JSON.stringify(existingLog, null, 2), 'utf-8');
  console.log(c.dim(`  Update logged to scripts/update-log.json\n`));

  console.log(c.bold('  Next steps:'));
  console.log(c.dim('    1. Review the changes: git diff js/data/conflicts-current.js'));
  console.log(c.dim('    2. Test locally: npx serve .'));
  console.log(c.dim('    3. Commit: git add . && git commit -m "Update conflict data"'));
  console.log(c.dim('    4. Push: git push origin main\n'));
}

main().catch((err) => {
  console.error(c.red(`\n✗ Pipeline error: ${err.message}\n`));
  process.exit(1);
});
