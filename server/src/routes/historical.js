// ============================================
// HISTORICAL CONFLICTS ROUTES
// ============================================
// Simpler CRUD — same patterns as conflicts.js but for historical data.

import { Router } from 'express';
import { getDb } from '../db/connection.js';
import { ApiError } from '../middleware/errors.js';

const router = Router();

// GET /api/v1/historical — List all
router.get('/', (req, res) => {
  const db = getDb();
  const { search, sort = 'name', order = 'asc' } = req.query;

  let sql = 'SELECT * FROM historical_conflicts';
  const params = [];

  if (search) {
    sql += ' WHERE name LIKE ? OR summary LIKE ?';
    params.push(`%${search}%`, `%${search}%`);
  }

  const validSorts = ['name', 'period', 'region', 'created_at'];
  const sortCol = validSorts.includes(sort) ? sort : 'name';
  sql += ` ORDER BY ${sortCol} ${order === 'desc' ? 'DESC' : 'ASC'}`;

  const rows = db.prepare(sql).all(...params);

  res.json({
    data: rows.map(transformHistorical),
    meta: { total: rows.length }
  });
});

// GET /api/v1/historical/:id — Get one
router.get('/:id', (req, res) => {
  const db = getDb();
  const row = db.prepare('SELECT * FROM historical_conflicts WHERE id = ?').get(req.params.id);

  if (!row) {
    throw new ApiError(404, `Historical conflict not found: ${req.params.id}`);
  }

  res.json({ data: transformHistorical(row) });
});

function transformHistorical(row) {
  return {
    id: row.id,
    name: row.name,
    period: row.period,
    region: row.region,
    casualties: row.casualties,
    summary: row.summary,
    howEnded: row.how_it_ended,
    lessonLearned: row.lesson_learned,
    lat: row.lat,
    lng: row.lng,
    bounds: row.bounds_json ? JSON.parse(row.bounds_json) : null,
  };
}

export default router;
