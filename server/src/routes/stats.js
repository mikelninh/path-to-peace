// ============================================
// STATS & ANALYTICS ROUTES
// ============================================
//
// MASTERCLASS: Aggregate Queries
//
// These endpoints return computed data — counts, groupings, summaries.
// They use SQL aggregate functions (COUNT, GROUP BY, SUM) to do the
// math in the database instead of in JavaScript.
//
// DESIGN DECISION: Let the database do the math
// You COULD fetch all rows and count in JS. But that:
// 1. Transfers more data over the wire
// 2. Uses more memory in your Node process
// 3. Is slower (databases are optimized for this)
// Rule of thumb: if SQL can do it, let SQL do it.

import { Router } from 'express';
import { getDb } from '../db/connection.js';

const router = Router();

// GET /api/v1/stats/overview — High-level numbers
router.get('/overview', (req, res) => {
  const db = getDb();

  const totalConflicts = db.prepare('SELECT COUNT(*) as count FROM conflicts').get().count;
  const totalHistorical = db.prepare('SELECT COUNT(*) as count FROM historical_conflicts').get().count;
  const totalEvents = db.prepare('SELECT COUNT(*) as count FROM key_events').get().count;

  // Group by type
  const byType = db.prepare(`
    SELECT type, COUNT(*) as count FROM conflicts GROUP BY type ORDER BY count DESC
  `).all();

  // Group by severity
  const bySeverity = db.prepare(`
    SELECT severity, COUNT(*) as count FROM conflicts GROUP BY severity ORDER BY count DESC
  `).all();

  // Group by region
  const byRegion = db.prepare(`
    SELECT region, COUNT(*) as count FROM conflicts GROUP BY region ORDER BY count DESC
  `).all();

  // Most common causes
  const topCauses = db.prepare(`
    SELECT cause, COUNT(*) as count FROM conflict_causes GROUP BY cause ORDER BY count DESC
  `).all();

  // Peace process status breakdown
  const peaceStatus = db.prepare(`
    SELECT status, COUNT(*) as count FROM peace_progress GROUP BY status ORDER BY count DESC
  `).all();

  res.json({
    data: {
      totalConflicts,
      totalHistorical,
      totalEvents,
      totalDisplaced: '110M+',
      byType,
      bySeverity,
      byRegion,
      topCauses,
      peaceStatus,
    }
  });
});

// GET /api/v1/stats/severity-timeline — How severity distributes
router.get('/severity-timeline', (req, res) => {
  const db = getDb();

  const data = db.prepare(`
    SELECT
      severity,
      COUNT(*) as count,
      GROUP_CONCAT(name, '|') as conflicts
    FROM conflicts
    GROUP BY severity
    ORDER BY
      CASE severity
        WHEN 'critical' THEN 1
        WHEN 'high' THEN 2
        WHEN 'medium' THEN 3
        WHEN 'low' THEN 4
        WHEN 'tension' THEN 5
      END
  `).all();

  res.json({
    data: data.map(row => ({
      severity: row.severity,
      count: row.count,
      conflicts: row.conflicts.split('|'),
    }))
  });
});

// GET /api/v1/stats/arms-trade — Arms trade summary
router.get('/arms-trade', (req, res) => {
  const db = getDb();

  const exporters = db.prepare(
    'SELECT * FROM arms_exporters ORDER BY share_percent DESC'
  ).all();

  const flows = db.prepare(
    'SELECT * FROM arms_flows ORDER BY exporter'
  ).all();

  res.json({
    data: {
      exporters: exporters.map(e => ({
        ...e,
        majorClients: e.major_clients_json ? JSON.parse(e.major_clients_json) : [],
      })),
      flows: flows.map(f => ({
        ...f,
        relatedConflicts: f.related_conflicts_json ? JSON.parse(f.related_conflicts_json) : [],
      })),
      totalFlows: flows.length,
    }
  });
});

export default router;
