// ============================================
// DATABASE MIGRATIONS
// ============================================
//
// MASTERCLASS: What are migrations?
//
// A migration is a versioned change to your database schema.
// Think of it like version control (git) for your database structure.
//
// Why not just CREATE TABLE and be done with it?
// Because your database evolves:
//   v1: conflicts table with basic fields
//   v2: add a "peace_status" column
//   v3: add a "key_events" table for timeline data
//   v4: rename a column, add an index
//
// Without migrations, every developer (or server) would need to
// manually run SQL commands in the right order. Migrations automate this.
//
// DESIGN DECISION: Simple migration system vs. full ORM
// - Prisma, Drizzle, Knex all have migration systems built in
// - We build our own (it's ~50 lines) because:
//   1. You LEARN what migrations actually do
//   2. Zero additional dependencies
//   3. Full control over the SQL
// - In a team project, you'd probably use Prisma (it handles edge cases)

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * SCHEMA DESIGN — The Most Important Decisions You'll Make
 *
 * Before writing any code, you design your tables. Key principles:
 *
 * 1. NORMALIZE (mostly): Don't repeat data. If a conflict has multiple
 *    causes, don't store them as a comma-separated string — make a
 *    separate table with a foreign key relationship.
 *
 * 2. USE PROPER TYPES: TEXT for strings, INTEGER for whole numbers,
 *    REAL for decimals, BLOB for binary data. SQLite is flexible about
 *    types, but PostgreSQL is strict — good habits now save pain later.
 *
 * 3. ALWAYS HAVE A PRIMARY KEY: Usually an auto-incrementing integer (id)
 *    or a meaningful string (slug like 'russia-ukraine').
 *
 * 4. INDEX WHAT YOU SEARCH: If you filter by severity, add an index on severity.
 *    Without an index, the database scans EVERY row (slow at scale).
 *
 * 5. TIMESTAMPS: Always add created_at and updated_at. You'll thank yourself
 *    later when debugging or building features like "recently updated."
 */

const migrations = [
  {
    version: 1,
    name: 'initial_schema',
    sql: `
      -- ========================================
      -- MIGRATION 001: Initial Schema
      -- ========================================

      -- Track which migrations have been applied
      -- This prevents running the same migration twice
      CREATE TABLE IF NOT EXISTS _migrations (
        version INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT DEFAULT (datetime('now'))
      );

      -- ========================================
      -- CONFLICTS — The core data model
      -- ========================================
      -- DESIGN DECISION: We use the conflict's slug as the primary key
      -- (e.g., 'russia-ukraine') instead of an auto-increment integer.
      -- Why? Because:
      -- 1. It's human-readable in URLs: /api/v1/conflicts/russia-ukraine
      -- 2. It's stable: if you delete and re-import data, IDs don't change
      -- 3. It matches what the frontend already uses
      -- Tradeoff: slugs are slower to JOIN on than integers, but at 15-50
      -- conflicts, this literally doesn't matter.

      CREATE TABLE IF NOT EXISTS conflicts (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        region TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('war', 'civil-war', 'insurgency', 'tension')),
        severity TEXT NOT NULL CHECK(severity IN ('critical', 'high', 'medium', 'low', 'tension')),
        started TEXT,
        displaced TEXT,
        casualties TEXT,
        summary TEXT,
        who_side_a TEXT,
        who_side_b TEXT,
        why TEXT,
        resources TEXT,
        what_about TEXT,
        path_to_resolution TEXT,
        impact TEXT,
        lat REAL,
        lng REAL,
        bounds_json TEXT,  -- JSON string for map bounds
        stats_json TEXT,   -- JSON string for casualty/displacement stats
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      -- ========================================
      -- CONFLICT CAUSES — Many-to-many relationship
      -- ========================================
      -- A conflict can have multiple causes ('Territory', 'Resources', etc.)
      -- and a cause can apply to multiple conflicts.
      -- This is called a "many-to-many" relationship.
      -- We model it with a JOIN table (also called a "bridge table").

      CREATE TABLE IF NOT EXISTS conflict_causes (
        conflict_id TEXT NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
        cause TEXT NOT NULL,
        PRIMARY KEY (conflict_id, cause)
      );

      -- ========================================
      -- KEY EVENTS — Timeline events for each conflict
      -- ========================================
      -- One conflict has many events = "one-to-many" relationship
      -- The foreign key (conflict_id) points back to the parent conflict.
      -- ON DELETE CASCADE means: if we delete a conflict, auto-delete its events.

      CREATE TABLE IF NOT EXISTS key_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conflict_id TEXT NOT NULL REFERENCES conflicts(id) ON DELETE CASCADE,
        event_date TEXT NOT NULL,
        title TEXT NOT NULL,
        type TEXT CHECK(type IN ('escalation', 'diplomacy', 'turning-point', 'humanitarian', 'ceasefire', 'intervention', 'resolution')),
        description TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      );

      -- ========================================
      -- HISTORICAL CONFLICTS
      -- ========================================
      CREATE TABLE IF NOT EXISTS historical_conflicts (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        period TEXT,
        region TEXT,
        casualties TEXT,
        summary TEXT,
        how_it_ended TEXT,
        lesson_learned TEXT,
        lat REAL,
        lng REAL,
        bounds_json TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      -- ========================================
      -- PEACE PROGRESS — Status of peace processes
      -- ========================================
      CREATE TABLE IF NOT EXISTS peace_progress (
        conflict_id TEXT PRIMARY KEY REFERENCES conflicts(id) ON DELETE CASCADE,
        status TEXT NOT NULL CHECK(status IN ('active-talks', 'stalled', 'no-process', 'ceasefire', 'agreement')),
        summary TEXT,
        what_needs_to_happen TEXT,
        key_actors_json TEXT,
        milestones_json TEXT,
        updated_at TEXT DEFAULT (datetime('now'))
      );

      -- ========================================
      -- EDUCATION — Lesson plans
      -- ========================================
      CREATE TABLE IF NOT EXISTS lesson_plans (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        grade_level TEXT NOT NULL,
        duration TEXT,
        subject TEXT,
        description TEXT,
        objectives_json TEXT,
        materials_json TEXT,
        steps_json TEXT,
        discussion_questions_json TEXT,
        related_conflicts_json TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      );

      -- ========================================
      -- INDEXES — Speed up common queries
      -- ========================================
      -- DESIGN DECISION: Only index columns you actually filter/sort by.
      -- Each index speeds up reads but slightly slows down writes.
      -- At 15 conflicts, indexes are overkill — but they're essential habits
      -- for when your tables have thousands of rows.

      CREATE INDEX IF NOT EXISTS idx_conflicts_type ON conflicts(type);
      CREATE INDEX IF NOT EXISTS idx_conflicts_severity ON conflicts(severity);
      CREATE INDEX IF NOT EXISTS idx_conflicts_region ON conflicts(region);
      CREATE INDEX IF NOT EXISTS idx_key_events_conflict ON key_events(conflict_id);
      CREATE INDEX IF NOT EXISTS idx_key_events_date ON key_events(event_date);
      CREATE INDEX IF NOT EXISTS idx_peace_progress_status ON peace_progress(status);
    `
  },
  {
    version: 2,
    name: 'add_arms_trade',
    sql: `
      -- ========================================
      -- MIGRATION 002: Arms Trade Data
      -- ========================================

      CREATE TABLE IF NOT EXISTS arms_exporters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        country TEXT NOT NULL UNIQUE,
        share_percent REAL,
        value_billions REAL,
        major_clients_json TEXT
      );

      CREATE TABLE IF NOT EXISTS arms_flows (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        exporter TEXT NOT NULL,
        importer TEXT NOT NULL,
        weapon_types TEXT,
        value_text TEXT,
        related_conflicts_json TEXT,
        notes TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_arms_flows_exporter ON arms_flows(exporter);
      CREATE INDEX IF NOT EXISTS idx_arms_flows_importer ON arms_flows(importer);
    `
  },
  {
    version: 3,
    name: 'add_user_contributions',
    sql: `
      -- ========================================
      -- MIGRATION 003: User Contributions (future)
      -- ========================================
      -- Preparing for user-submitted corrections and additions

      CREATE TABLE IF NOT EXISTS contributions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conflict_id TEXT REFERENCES conflicts(id),
        contributor_name TEXT,
        contributor_email TEXT,
        type TEXT CHECK(type IN ('correction', 'addition', 'translation', 'source')),
        content TEXT NOT NULL,
        status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
        reviewed_by TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        reviewed_at TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_contributions_status ON contributions(status);
      CREATE INDEX IF NOT EXISTS idx_contributions_conflict ON contributions(conflict_id);
    `
  }
];

/**
 * Run all pending migrations.
 * Checks which migrations have already been applied and only runs new ones.
 *
 * DESIGN DECISION: Migrations are idempotent and ordered.
 * - Each migration has a version number (1, 2, 3...)
 * - We track applied migrations in a _migrations table
 * - Only unapplied migrations run
 * - They run in order (you can't apply v3 before v2)
 * - Once applied, a migration NEVER runs again
 *
 * This means you can safely run `npm run db:migrate` as many times
 * as you want — it will never break existing data.
 */
export function runMigrations(db) {
  // Ensure the migrations table exists (bootstrap problem: first migration
  // creates it, but we need to check it before running the first migration)
  db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      version INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT DEFAULT (datetime('now'))
    );
  `);

  const applied = new Set(
    db.prepare('SELECT version FROM _migrations').all().map(r => r.version)
  );

  // Use a transaction: either ALL pending migrations succeed, or NONE do.
  // DESIGN DECISION: Always wrap migrations in transactions.
  // If migration 3 fails halfway, you don't want migration 2's changes
  // to be committed — that leaves the database in a broken state.
  const migrate = db.transaction(() => {
    for (const migration of migrations) {
      if (applied.has(migration.version)) {
        continue;  // Already applied, skip
      }

      console.log(`[DB] Running migration ${migration.version}: ${migration.name}`);
      db.exec(migration.sql);

      db.prepare('INSERT INTO _migrations (version, name) VALUES (?, ?)').run(
        migration.version,
        migration.name
      );
    }
  });

  migrate();  // Execute the transaction
}

// Allow running migrations directly: node src/db/migrate.js
if (process.argv[1] && process.argv[1].includes('migrate.js')) {
  const dbPath = process.env.DATABASE_PATH || './data/peace.db';
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  runMigrations(db);
  db.close();
  console.log('[DB] Migrations complete');
}
