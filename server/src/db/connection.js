// ============================================
// DATABASE CONNECTION
// ============================================
//
// MASTERCLASS: Database Connections
//
// A database connection is like a phone line between your app and the database.
// You need to:
// 1. Open the connection (establish the phone call)
// 2. Keep it open (reuse it for multiple queries — don't call back every time)
// 3. Close it cleanly when the app shuts down (hang up properly)
//
// DESIGN DECISION: better-sqlite3 vs. other SQLite libraries
// - better-sqlite3 is SYNCHRONOUS (blocking) — sounds bad, but for SQLite it's
//   actually faster because SQLite itself is single-threaded anyway.
//   No async overhead = simpler code = fewer bugs.
// - If we used PostgreSQL, we'd need an async driver (pg, pg-promise)
//   because PostgreSQL runs as a separate server process.

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

let db = null;

/**
 * Initialize the database connection and run migrations.
 *
 * DESIGN DECISION: We use a singleton pattern here.
 * That means there's only ONE database connection for the entire app.
 * Every route handler shares it. This is efficient because:
 * - Opening connections is expensive (file locks, memory allocation)
 * - SQLite only allows one writer at a time anyway
 * - We don't need a "connection pool" like PostgreSQL would
 */
export async function initDatabase() {
  const dbPath = process.env.DATABASE_PATH || './data/peace.db';
  const dbDir = path.dirname(dbPath);

  // Create the data directory if it doesn't exist
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  db = new Database(dbPath, {
    // DESIGN DECISION: WAL mode (Write-Ahead Logging)
    // Default SQLite locks the ENTIRE database during writes.
    // WAL mode allows reads to happen while writes are in progress.
    // This is a massive performance win for any app with concurrent users.
    // Always enable WAL mode. There's almost no reason not to.
    verbose: process.env.NODE_ENV === 'development' ? console.log : null,
  });

  // Enable WAL mode for better concurrent read performance
  db.pragma('journal_mode = WAL');

  // Enable foreign keys (SQLite has them OFF by default — a common gotcha!)
  db.pragma('foreign_keys = ON');

  // Run migrations
  const { runMigrations } = await import('./migrate.js');
  runMigrations(db);

  return db;
}

/**
 * Get the database instance.
 * Every route handler calls this to get the shared connection.
 *
 * Usage in a route:
 *   import { getDb } from '../db/connection.js';
 *   const db = getDb();
 *   const conflicts = db.prepare('SELECT * FROM conflicts').all();
 */
export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

/**
 * Close the database connection cleanly.
 * Called when the server shuts down (SIGTERM, SIGINT).
 *
 * DESIGN DECISION: Always handle graceful shutdown.
 * If the database connection isn't closed properly, you can get
 * corrupted data or locked database files. SQLite is particularly
 * sensitive to this because it writes to a file on disk.
 */
export function closeDb() {
  if (db) {
    db.close();
    db = null;
    console.log('[DB] Connection closed');
  }
}

// Graceful shutdown handlers
process.on('SIGTERM', () => { closeDb(); process.exit(0); });
process.on('SIGINT', () => { closeDb(); process.exit(0); });
