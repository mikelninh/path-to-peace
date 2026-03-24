// ============================================
// CONFLICT ROUTES — Full CRUD API
// ============================================
//
// MASTERCLASS: RESTful API Design
//
// REST (Representational State Transfer) is a convention for
// organizing API endpoints around "resources" (nouns like conflicts,
// events, users) and "actions" (HTTP verbs like GET, POST, PUT, DELETE).
//
// The key principle: URLs identify RESOURCES, HTTP methods identify ACTIONS.
//
//   GET    /api/v1/conflicts           → List all conflicts (with filtering)
//   GET    /api/v1/conflicts/:id       → Get one specific conflict
//   POST   /api/v1/conflicts           → Create a new conflict
//   PUT    /api/v1/conflicts/:id       → Replace an entire conflict
//   PATCH  /api/v1/conflicts/:id       → Update specific fields
//   DELETE /api/v1/conflicts/:id       → Delete a conflict
//
//   GET    /api/v1/conflicts/:id/events → List events for a conflict
//   POST   /api/v1/conflicts/:id/events → Add an event to a conflict
//
// DESIGN DECISIONS:
// 1. Use plural nouns: /conflicts not /conflict
// 2. Use path params for identity: /conflicts/russia-ukraine
// 3. Use query params for filtering: /conflicts?type=war&severity=critical
// 4. Nest related resources: /conflicts/:id/events
// 5. Return consistent response shapes (always { data, meta })
// 6. Use proper HTTP status codes (200, 201, 204, 400, 404, 500)

import { Router } from 'express';
import { getDb } from '../db/connection.js';
import { ApiError } from '../middleware/errors.js';
import {
  validate,
  validateQuery,
  conflictSchema,
  conflictUpdateSchema,
  querySchema,
} from '../middleware/validate.js';

const router = Router();

// ============================================
// GET /api/v1/conflicts — List all conflicts
// ============================================
// Supports filtering, searching, sorting, and pagination.
//
// MASTERCLASS: Pagination
// You never want to return ALL rows if there might be thousands.
// Two common patterns:
// 1. Offset-based: ?limit=20&offset=40 (get rows 41-60)
//    - Simple, stateless, works for most cases
//    - Gets slower on huge datasets (DB has to skip offset rows)
// 2. Cursor-based: ?after=abc123 (get rows after this ID)
//    - More complex, but constant performance
//    - Better for infinite scroll / real-time data
// We use offset-based because it's simpler and our dataset is small.

router.get('/', validateQuery(querySchema), (req, res) => {
  const db = getDb();
  const { type, severity, region, search, limit, offset, sort, order } = req.validatedQuery;

  // Build query dynamically based on filters
  // DESIGN DECISION: Dynamic query building
  // We construct the WHERE clause based on which filters are provided.
  // This is cleaner than writing separate queries for every combination.
  let where = [];
  let params = [];

  if (type) {
    where.push('c.type = ?');
    params.push(type);
  }

  if (severity) {
    where.push('c.severity = ?');
    params.push(severity);
  }

  if (region) {
    where.push('c.region LIKE ?');
    params.push(`%${region}%`);
  }

  if (search) {
    where.push('(c.name LIKE ? OR c.summary LIKE ? OR c.region LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(' AND ')}` : '';

  // Get total count (for pagination metadata)
  const countSql = `SELECT COUNT(*) as total FROM conflicts c ${whereClause}`;
  const { total } = db.prepare(countSql).get(...params);

  // DESIGN DECISION: Whitelist sort columns
  // Never let the client pass arbitrary column names into ORDER BY.
  // That's a SQL injection vector. We validate against a whitelist.
  const validSorts = ['name', 'severity', 'region', 'type', 'created_at', 'updated_at'];
  const sortCol = validSorts.includes(sort) ? sort : 'name';
  const sortOrder = order === 'desc' ? 'DESC' : 'ASC';

  // Main query with causes aggregated
  const sql = `
    SELECT
      c.*,
      GROUP_CONCAT(cc.cause, ', ') as causes_list
    FROM conflicts c
    LEFT JOIN conflict_causes cc ON c.id = cc.conflict_id
    ${whereClause}
    GROUP BY c.id
    ORDER BY c.${sortCol} ${sortOrder}
    LIMIT ? OFFSET ?
  `;

  const rows = db.prepare(sql).all(...params, limit, offset);

  // Transform rows into API response format
  const conflicts = rows.map(transformConflict);

  // DESIGN DECISION: Consistent response envelope
  // Always return { data, meta }. The "meta" object contains pagination
  // info so the client knows there are more pages to fetch.
  res.json({
    data: conflicts,
    meta: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    }
  });
});

// ============================================
// GET /api/v1/conflicts/:id — Get one conflict
// ============================================
router.get('/:id', (req, res) => {
  const db = getDb();
  const { id } = req.params;

  const conflict = db.prepare(`
    SELECT c.*,
      GROUP_CONCAT(DISTINCT cc.cause) as causes_list
    FROM conflicts c
    LEFT JOIN conflict_causes cc ON c.id = cc.conflict_id
    WHERE c.id = ?
    GROUP BY c.id
  `).get(id);

  if (!conflict) {
    throw new ApiError(404, `Conflict not found: ${id}`);
  }

  // Also fetch related data
  const events = db.prepare(
    'SELECT * FROM key_events WHERE conflict_id = ? ORDER BY event_date ASC'
  ).all(id);

  const peaceProgress = db.prepare(
    'SELECT * FROM peace_progress WHERE conflict_id = ?'
  ).get(id);

  const result = transformConflict(conflict);
  result.keyEvents = events;
  result.peaceProgress = peaceProgress ? {
    status: peaceProgress.status,
    summary: peaceProgress.summary,
    whatNeedsToHappen: peaceProgress.what_needs_to_happen,
    keyActors: safeJsonParse(peaceProgress.key_actors_json),
    milestones: safeJsonParse(peaceProgress.milestones_json),
  } : null;

  res.json({ data: result });
});

// ============================================
// POST /api/v1/conflicts — Create a new conflict
// ============================================
// MASTERCLASS: HTTP Status Codes for Creation
// - 201 Created: The resource was created successfully
// - Location header: URL of the new resource
// This is the standard pattern. Returning 200 works but isn't "proper" REST.

router.post('/', validate(conflictSchema), (req, res) => {
  const db = getDb();
  const data = req.validatedBody;

  // Check if conflict already exists
  const existing = db.prepare('SELECT id FROM conflicts WHERE id = ?').get(data.id);
  if (existing) {
    throw new ApiError(409, `Conflict with id '${data.id}' already exists`);
  }

  const insertConflict = db.transaction(() => {
    db.prepare(`
      INSERT INTO conflicts (
        id, name, region, type, severity, started, displaced, casualties,
        summary, who_side_a, who_side_b, why, resources, what_about,
        path_to_resolution, impact, lat, lng
      ) VALUES (
        @id, @name, @region, @type, @severity, @started, @displaced, @casualties,
        @summary, @who_side_a, @who_side_b, @why, @resources, @what_about,
        @path_to_resolution, @impact, @lat, @lng
      )
    `).run({
      id: data.id,
      name: data.name,
      region: data.region,
      type: data.type,
      severity: data.severity,
      started: data.started || null,
      displaced: data.displaced || null,
      casualties: data.casualties || null,
      summary: data.summary || null,
      who_side_a: data.who_side_a || null,
      who_side_b: data.who_side_b || null,
      why: data.why || null,
      resources: data.resources || null,
      what_about: data.what_about || null,
      path_to_resolution: data.path_to_resolution || null,
      impact: data.impact || null,
      lat: data.lat || null,
      lng: data.lng || null,
    });

    // Insert causes if provided
    if (data.causes) {
      const insertCause = db.prepare(
        'INSERT INTO conflict_causes (conflict_id, cause) VALUES (?, ?)'
      );
      for (const cause of data.causes) {
        insertCause.run(data.id, cause);
      }
    }
  });

  insertConflict();

  // Fetch the created conflict to return it
  const created = db.prepare('SELECT * FROM conflicts WHERE id = ?').get(data.id);

  res.status(201)
    .set('Location', `/api/v1/conflicts/${data.id}`)
    .json({ data: transformConflict(created) });
});

// ============================================
// PATCH /api/v1/conflicts/:id — Update fields
// ============================================
// DESIGN DECISION: PATCH vs PUT
// - PUT: Replace the ENTIRE resource (client sends ALL fields)
// - PATCH: Update ONLY the fields the client sends
// PATCH is more practical for most use cases — you don't want
// to send 15 fields just to update one.

router.patch('/:id', validate(conflictUpdateSchema), (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const data = req.validatedBody;

  // Check conflict exists
  const existing = db.prepare('SELECT id FROM conflicts WHERE id = ?').get(id);
  if (!existing) {
    throw new ApiError(404, `Conflict not found: ${id}`);
  }

  // Build dynamic UPDATE query from provided fields
  // DESIGN DECISION: Dynamic updates
  // Only update fields that were actually sent in the request.
  // This prevents accidentally nullifying fields the client didn't mention.
  const fields = Object.entries(data).filter(([key]) => key !== 'causes');
  if (fields.length > 0) {
    const setClause = fields.map(([key]) => `${key} = ?`).join(', ');
    const values = fields.map(([, val]) => val);

    db.prepare(`
      UPDATE conflicts SET ${setClause}, updated_at = datetime('now') WHERE id = ?
    `).run(...values, id);
  }

  // Update causes if provided
  if (data.causes) {
    db.prepare('DELETE FROM conflict_causes WHERE conflict_id = ?').run(id);
    const insertCause = db.prepare(
      'INSERT INTO conflict_causes (conflict_id, cause) VALUES (?, ?)'
    );
    for (const cause of data.causes) {
      insertCause.run(id, cause);
    }
  }

  const updated = db.prepare('SELECT * FROM conflicts WHERE id = ?').get(id);
  res.json({ data: transformConflict(updated) });
});

// ============================================
// DELETE /api/v1/conflicts/:id
// ============================================
// Returns 204 No Content (standard for successful deletion).
// DESIGN DECISION: 204 vs 200
// 204 means "success, but there's nothing to return in the body."
// Some APIs return the deleted resource (200 + body). 204 is cleaner.

router.delete('/:id', (req, res) => {
  const db = getDb();
  const { id } = req.params;

  const existing = db.prepare('SELECT id FROM conflicts WHERE id = ?').get(id);
  if (!existing) {
    throw new ApiError(404, `Conflict not found: ${id}`);
  }

  // CASCADE will auto-delete related causes and events
  db.prepare('DELETE FROM conflicts WHERE id = ?').run(id);

  res.status(204).end();
});

// ============================================
// GET /api/v1/conflicts/:id/events — Timeline events
// ============================================
router.get('/:id/events', (req, res) => {
  const db = getDb();
  const { id } = req.params;

  const conflict = db.prepare('SELECT id FROM conflicts WHERE id = ?').get(id);
  if (!conflict) {
    throw new ApiError(404, `Conflict not found: ${id}`);
  }

  const events = db.prepare(
    'SELECT * FROM key_events WHERE conflict_id = ? ORDER BY event_date ASC'
  ).all(id);

  res.json({ data: events, meta: { total: events.length } });
});

// ============================================
// POST /api/v1/conflicts/:id/events — Add event
// ============================================
router.post('/:id/events', (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { date, title, type, description } = req.body;

  if (!date || !title) {
    throw new ApiError(400, 'date and title are required');
  }

  const conflict = db.prepare('SELECT id FROM conflicts WHERE id = ?').get(id);
  if (!conflict) {
    throw new ApiError(404, `Conflict not found: ${id}`);
  }

  const result = db.prepare(`
    INSERT INTO key_events (conflict_id, event_date, title, type, description)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, date, title, type || null, description || null);

  const event = db.prepare('SELECT * FROM key_events WHERE id = ?').get(result.lastInsertRowid);

  res.status(201).json({ data: event });
});

// ============================================
// Helper: Transform DB row to API response
// ============================================
function transformConflict(row) {
  return {
    id: row.id,
    name: row.name,
    region: row.region,
    type: row.type,
    severity: row.severity,
    started: row.started,
    displaced: row.displaced,
    casualties: row.casualties,
    summary: row.summary,
    who: {
      sideA: row.who_side_a,
      sideB: row.who_side_b,
    },
    why: row.why,
    resources: row.resources,
    whatAbout: row.what_about,
    pathToResolution: row.path_to_resolution,
    impact: row.impact,
    lat: row.lat,
    lng: row.lng,
    bounds: safeJsonParse(row.bounds_json),
    stats: safeJsonParse(row.stats_json),
    causes: row.causes_list ? row.causes_list.split(', ') : [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function safeJsonParse(str) {
  if (!str) return null;
  try { return JSON.parse(str); } catch { return null; }
}

export default router;
