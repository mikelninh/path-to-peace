// ============================================
// DATABASE SEEDER
// ============================================
//
// MASTERCLASS: What is seeding?
//
// Seeding = populating your database with initial data.
// Your conflict data currently lives in frontend JS files.
// This script reads those files and inserts the data into SQLite.
//
// DESIGN DECISION: Import from existing data files
// Instead of manually typing 15 conflicts into SQL INSERT statements,
// we import the JS modules you already have. This means:
// 1. Single source of truth (the frontend data files)
// 2. No manual copying (less chance of errors)
// 3. Easy to re-seed if you change the data
//
// In a real production app, you'd typically have seed files
// separate from your frontend. But for bootstrapping, this is smart.

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We need to import the frontend data files.
// They use `export const`, which works with dynamic import().
const dataDir = path.join(__dirname, '../../../js/data');

async function seed() {
  const dbPath = process.env.DATABASE_PATH || './data/peace.db';
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  console.log('[SEED] Starting database seed...');

  // ========================================
  // DESIGN DECISION: Use a transaction for seeding
  // ========================================
  // If seeding fails halfway (e.g., a data format error on conflict #8),
  // the transaction rolls back ALL changes. You won't end up with
  // a half-populated database. This is called "atomicity" — one of the
  // four ACID properties (Atomicity, Consistency, Isolation, Durability).

  // ========================================
  // Step 1: Load current conflicts
  // ========================================
  console.log('[SEED] Loading current conflicts...');
  const { currentConflicts } = await import(path.join(dataDir, 'conflicts-current.js'));

  const insertConflict = db.prepare(`
    INSERT OR REPLACE INTO conflicts (
      id, name, region, type, severity, started, displaced, casualties,
      summary, who_side_a, who_side_b, why, resources, what_about,
      path_to_resolution, impact, lat, lng, bounds_json, stats_json
    ) VALUES (
      @id, @name, @region, @type, @severity, @started, @displaced, @casualties,
      @summary, @who_side_a, @who_side_b, @why, @resources, @what_about,
      @path_to_resolution, @impact, @lat, @lng, @bounds_json, @stats_json
    )
  `);

  const insertCause = db.prepare(`
    INSERT OR REPLACE INTO conflict_causes (conflict_id, cause) VALUES (?, ?)
  `);

  const insertEvent = db.prepare(`
    INSERT OR REPLACE INTO key_events (conflict_id, event_date, title, type)
    VALUES (@conflict_id, @event_date, @title, @type)
  `);

  // DESIGN DECISION: Prepared Statements
  // Instead of building SQL strings with concatenation (SQL injection risk!),
  // we use prepared statements. The database compiles the SQL once, then
  // we just feed it different values. This is:
  // 1. SAFE — prevents SQL injection attacks
  // 2. FAST — the SQL is compiled once, executed many times
  // 3. CLEAN — no messy string concatenation

  const seedConflicts = db.transaction(() => {
    // Clear existing data first (for re-seeding)
    db.exec('DELETE FROM key_events');
    db.exec('DELETE FROM conflict_causes');
    db.exec('DELETE FROM conflicts');

    for (const c of currentConflicts) {
      insertConflict.run({
        id: c.id,
        name: c.name,
        region: c.region,
        type: c.type,
        severity: c.severity,
        started: c.started || null,
        displaced: c.displaced || null,
        casualties: c.casualties || null,
        summary: c.summary || null,
        who_side_a: c.who?.sideA || null,
        who_side_b: c.who?.sideB || null,
        why: c.why || null,
        resources: c.resources || null,
        what_about: c.whatAbout || null,
        path_to_resolution: c.pathToResolution || null,
        impact: c.impact || null,
        lat: c.lat || null,
        lng: c.lng || null,
        bounds_json: c.bounds ? JSON.stringify(c.bounds) : null,
        stats_json: c.stats ? JSON.stringify(c.stats) : null,
      });

      // Insert causes (many-to-many)
      if (c.causes) {
        for (const cause of c.causes) {
          insertCause.run(c.id, cause);
        }
      }

      // Insert key events (one-to-many)
      if (c.keyEvents) {
        for (const event of c.keyEvents) {
          insertEvent.run({
            conflict_id: c.id,
            event_date: event.date,
            title: event.title,
            type: event.type || null,
          });
        }
      }
    }

    console.log(`[SEED] Inserted ${currentConflicts.length} current conflicts`);
  });

  seedConflicts();

  // ========================================
  // Step 2: Load historical conflicts
  // ========================================
  console.log('[SEED] Loading historical conflicts...');
  const { historicalConflicts } = await import(path.join(dataDir, 'conflicts-historical.js'));

  const insertHistorical = db.prepare(`
    INSERT OR REPLACE INTO historical_conflicts (
      id, name, period, region, casualties, summary, how_it_ended,
      lesson_learned, lat, lng, bounds_json
    ) VALUES (
      @id, @name, @period, @region, @casualties, @summary, @how_it_ended,
      @lesson_learned, @lat, @lng, @bounds_json
    )
  `);

  const seedHistorical = db.transaction(() => {
    db.exec('DELETE FROM historical_conflicts');

    for (const h of historicalConflicts) {
      insertHistorical.run({
        id: h.id,
        name: h.name,
        period: h.period || h.date || null,
        region: h.region || null,
        casualties: h.casualties ? String(h.casualties) : null,
        summary: h.summary || null,
        how_it_ended: h.howEnded || h.how_it_ended || null,
        lesson_learned: h.lessonLearned || h.lesson || null,
        lat: h.lat || null,
        lng: h.lng || null,
        bounds_json: h.bounds ? JSON.stringify(h.bounds) : null,
      });
    }

    console.log(`[SEED] Inserted ${historicalConflicts.length} historical conflicts`);
  });

  seedHistorical();

  // ========================================
  // Step 3: Load peace progress data
  // ========================================
  console.log('[SEED] Loading peace progress...');
  try {
    const { peaceProgress } = await import(path.join(dataDir, 'peace-progress.js'));

    const insertPeace = db.prepare(`
      INSERT OR REPLACE INTO peace_progress (
        conflict_id, status, summary, what_needs_to_happen,
        key_actors_json, milestones_json
      ) VALUES (
        @conflict_id, @status, @summary, @what_needs_to_happen,
        @key_actors_json, @milestones_json
      )
    `);

    const seedPeace = db.transaction(() => {
      db.exec('DELETE FROM peace_progress');
      for (const p of peaceProgress) {
        insertPeace.run({
          conflict_id: p.conflictId || p.id,
          status: p.status,
          summary: p.summary || null,
          what_needs_to_happen: p.whatNeedsToHappen || null,
          key_actors_json: p.keyActors ? JSON.stringify(p.keyActors) : null,
          milestones_json: p.milestones ? JSON.stringify(p.milestones) : null,
        });
      }
      console.log(`[SEED] Inserted ${peaceProgress.length} peace progress records`);
    });

    seedPeace();
  } catch (err) {
    console.log('[SEED] Peace progress data not found, skipping');
  }

  // ========================================
  // Step 4: Load arms trade data
  // ========================================
  console.log('[SEED] Loading arms trade...');
  try {
    const { armsExporters, armsFlows } = await import(path.join(dataDir, 'arms-trade.js'));

    const insertExporter = db.prepare(`
      INSERT OR REPLACE INTO arms_exporters (country, share_percent, value_billions, major_clients_json)
      VALUES (@country, @share_percent, @value_billions, @major_clients_json)
    `);

    const insertFlow = db.prepare(`
      INSERT OR REPLACE INTO arms_flows (exporter, importer, weapon_types, value_text, related_conflicts_json, notes)
      VALUES (@exporter, @importer, @weapon_types, @value_text, @related_conflicts_json, @notes)
    `);

    const seedArms = db.transaction(() => {
      db.exec('DELETE FROM arms_flows');
      db.exec('DELETE FROM arms_exporters');

      if (armsExporters) {
        for (const e of armsExporters) {
          insertExporter.run({
            country: e.country || e.name,
            share_percent: e.sharePercent || e.share || null,
            value_billions: e.valueBillions || e.value || null,
            major_clients_json: e.majorClients ? JSON.stringify(e.majorClients) : null,
          });
        }
        console.log(`[SEED] Inserted ${armsExporters.length} arms exporters`);
      }

      if (armsFlows) {
        for (const f of armsFlows) {
          insertFlow.run({
            exporter: f.exporter || f.from,
            importer: f.importer || f.to,
            weapon_types: f.weaponTypes || f.weapons || null,
            value_text: f.value || null,
            related_conflicts_json: f.relatedConflicts ? JSON.stringify(f.relatedConflicts) : null,
            notes: f.notes || null,
          });
        }
        console.log(`[SEED] Inserted ${armsFlows.length} arms trade flows`);
      }
    });

    seedArms();
  } catch (err) {
    console.log('[SEED] Arms trade data not found, skipping');
  }

  // ========================================
  // Done!
  // ========================================
  const counts = {
    conflicts: db.prepare('SELECT COUNT(*) as count FROM conflicts').get().count,
    historical: db.prepare('SELECT COUNT(*) as count FROM historical_conflicts').get().count,
    events: db.prepare('SELECT COUNT(*) as count FROM key_events').get().count,
    causes: db.prepare('SELECT COUNT(*) as count FROM conflict_causes').get().count,
    peace: db.prepare('SELECT COUNT(*) as count FROM peace_progress').get().count,
  };

  console.log(`
[SEED] Complete!
  Conflicts:    ${counts.conflicts}
  Historical:   ${counts.historical}
  Key Events:   ${counts.events}
  Cause Links:  ${counts.causes}
  Peace Status: ${counts.peace}
  `);

  db.close();
}

seed().catch(err => {
  console.error('[SEED] Failed:', err);
  process.exit(1);
});
