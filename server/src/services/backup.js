// ============================================
// DATABASE BACKUP SERVICE
// ============================================
//
// MASTERCLASS: Why Backups Matter
//
// "Everyone has a backup strategy. Until they need to restore."
//
// Your database is the most valuable thing in your application.
// Code can be rewritten. Designs can be recreated. Data cannot.
//
// Backup Strategy:
// 1. WHAT: Full database file copy (SQLite makes this easy)
// 2. WHEN: On-demand + can be scheduled via cron
// 3. WHERE: Local backup directory (extend to S3/R2 for production)
// 4. HOW MANY: Keep the last N backups, delete older ones
// 5. TEST RESTORES: A backup you haven't tested is not a backup
//
// DESIGN DECISION: SQLite backup approach
// SQLite is a single file. You COULD just copy it, but:
// - Copying during writes can create a corrupt backup
// - SQLite's .backup() API does a safe, atomic copy
// - We use better-sqlite3's backup method for safety
//
// For PostgreSQL, you'd use pg_dump instead.

import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Create a timestamped backup of the database.
 *
 * Returns the backup file path and size.
 */
export async function createBackup() {
  const dbPath = process.env.DATABASE_PATH || './data/peace.db';
  const backupDir = process.env.BACKUP_DIR || './backups';

  // Ensure backup directory exists
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Generate timestamped filename
  // DESIGN DECISION: ISO timestamp in filename
  // Makes backups sortable by name = sortable by date.
  // Example: peace-2025-12-15T10-30-00.db
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `peace-${timestamp}.db`);

  // Use SQLite's backup API for a safe, consistent copy
  const source = new Database(dbPath, { readonly: true });

  try {
    await source.backup(backupPath);
    const stats = fs.statSync(backupPath);

    console.log(`[BACKUP] Created: ${backupPath} (${formatBytes(stats.size)})`);

    // Clean old backups
    const maxBackups = parseInt(process.env.MAX_BACKUPS || '10', 10);
    await cleanOldBackups(backupDir, maxBackups);

    return {
      path: backupPath,
      size: stats.size,
      sizeFormatted: formatBytes(stats.size),
      timestamp: new Date().toISOString(),
    };
  } finally {
    source.close();
  }
}

/**
 * Restore from a backup file.
 *
 * DESIGN DECISION: Restore creates a backup of current state first.
 * If the restore goes wrong, you can recover. Belt AND suspenders.
 */
export async function restoreBackup(backupPath) {
  const dbPath = process.env.DATABASE_PATH || './data/peace.db';

  if (!fs.existsSync(backupPath)) {
    throw new Error(`Backup file not found: ${backupPath}`);
  }

  // Safety: backup current database before overwriting
  console.log('[RESTORE] Creating safety backup of current database...');
  await createBackup();

  // Copy backup over current database
  console.log(`[RESTORE] Restoring from: ${backupPath}`);
  fs.copyFileSync(backupPath, dbPath);

  // Verify the restored database
  const db = new Database(dbPath, { readonly: true });
  try {
    const count = db.prepare('SELECT COUNT(*) as count FROM conflicts').get();
    console.log(`[RESTORE] Verified: ${count.count} conflicts in restored database`);
    return { success: true, conflictsCount: count.count };
  } finally {
    db.close();
  }
}

/**
 * List available backups.
 */
export function listBackups() {
  const backupDir = process.env.BACKUP_DIR || './backups';

  if (!fs.existsSync(backupDir)) {
    return [];
  }

  return fs.readdirSync(backupDir)
    .filter(f => f.endsWith('.db'))
    .sort()
    .reverse()  // Newest first
    .map(filename => {
      const filePath = path.join(backupDir, filename);
      const stats = fs.statSync(filePath);
      return {
        filename,
        path: filePath,
        size: stats.size,
        sizeFormatted: formatBytes(stats.size),
        createdAt: stats.mtime.toISOString(),
      };
    });
}

/**
 * Delete old backups, keeping only the N most recent.
 *
 * DESIGN DECISION: Retention policy
 * Without this, backups accumulate forever and fill your disk.
 * A simple "keep last N" policy is easy to understand and implement.
 * Production systems might use:
 * - Keep hourly for 24h, daily for 30d, weekly for 1y
 * - Based on storage cost vs. recovery needs
 */
async function cleanOldBackups(backupDir, maxBackups) {
  const backups = fs.readdirSync(backupDir)
    .filter(f => f.endsWith('.db'))
    .sort()
    .reverse();

  if (backups.length > maxBackups) {
    const toDelete = backups.slice(maxBackups);
    for (const filename of toDelete) {
      const filePath = path.join(backupDir, filename);
      fs.unlinkSync(filePath);
      console.log(`[BACKUP] Deleted old backup: ${filename}`);
    }
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ============================================
// CLI: Run directly with `npm run db:backup`
// ============================================
if (process.argv[1] && process.argv[1].includes('backup.js')) {
  const command = process.argv[2] || 'create';

  if (command === 'create') {
    createBackup()
      .then(result => console.log('[BACKUP] Done:', result))
      .catch(err => { console.error('[BACKUP] Failed:', err); process.exit(1); });
  } else if (command === 'list') {
    const backups = listBackups();
    console.log(`\nAvailable backups (${backups.length}):\n`);
    for (const b of backups) {
      console.log(`  ${b.filename}  ${b.sizeFormatted}  ${b.createdAt}`);
    }
  } else if (command === 'restore') {
    const target = process.argv[3];
    if (!target) {
      console.error('Usage: node backup.js restore <backup-file>');
      process.exit(1);
    }
    restoreBackup(target)
      .then(result => console.log('[RESTORE] Done:', result))
      .catch(err => { console.error('[RESTORE] Failed:', err); process.exit(1); });
  }
}
