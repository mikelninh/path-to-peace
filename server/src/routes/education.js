// ============================================
// EDUCATION ROUTES
// ============================================

import { Router } from 'express';
import { getDb } from '../db/connection.js';
import { ApiError } from '../middleware/errors.js';
import { validate, contributionSchema } from '../middleware/validate.js';

const router = Router();

// GET /api/v1/education/lesson-plans
router.get('/lesson-plans', (req, res) => {
  const db = getDb();
  const { grade_level } = req.query;

  let sql = 'SELECT * FROM lesson_plans';
  const params = [];

  if (grade_level) {
    sql += ' WHERE grade_level = ?';
    params.push(grade_level);
  }

  sql += ' ORDER BY title';

  const rows = db.prepare(sql).all(...params);

  res.json({
    data: rows.map(row => ({
      id: row.id,
      title: row.title,
      gradeLevel: row.grade_level,
      duration: row.duration,
      subject: row.subject,
      description: row.description,
      objectives: safeJsonParse(row.objectives_json),
      materials: safeJsonParse(row.materials_json),
      steps: safeJsonParse(row.steps_json),
      discussionQuestions: safeJsonParse(row.discussion_questions_json),
      relatedConflicts: safeJsonParse(row.related_conflicts_json),
    })),
    meta: { total: rows.length }
  });
});

// GET /api/v1/education/peace-progress
router.get('/peace-progress', (req, res) => {
  const db = getDb();
  const { status } = req.query;

  let sql = `
    SELECT pp.*, c.name as conflict_name, c.severity, c.region
    FROM peace_progress pp
    JOIN conflicts c ON pp.conflict_id = c.id
  `;
  const params = [];

  if (status) {
    sql += ' WHERE pp.status = ?';
    params.push(status);
  }

  sql += ' ORDER BY c.name';

  const rows = db.prepare(sql).all(...params);

  res.json({
    data: rows.map(row => ({
      conflictId: row.conflict_id,
      conflictName: row.conflict_name,
      severity: row.severity,
      region: row.region,
      status: row.status,
      summary: row.summary,
      whatNeedsToHappen: row.what_needs_to_happen,
      keyActors: safeJsonParse(row.key_actors_json),
      milestones: safeJsonParse(row.milestones_json),
      updatedAt: row.updated_at,
    })),
    meta: { total: rows.length }
  });
});

// ============================================
// CONTRIBUTIONS — User-submitted content
// ============================================
//
// MASTERCLASS: User-Generated Content
//
// Allowing user contributions is powerful but risky:
// 1. Spam and abuse
// 2. Misinformation (especially dangerous for conflict data)
// 3. Legal liability
//
// DESIGN DECISION: Moderation queue
// All contributions go into "pending" status.
// They must be reviewed and approved before appearing on the site.
// This is slower but essential for a site about factual conflict data.

// POST /api/v1/education/contributions — Submit a contribution
router.post('/contributions', validate(contributionSchema), (req, res) => {
  const db = getDb();
  const data = req.validatedBody;

  // Verify conflict exists if one is referenced
  if (data.conflict_id) {
    const conflict = db.prepare('SELECT id FROM conflicts WHERE id = ?').get(data.conflict_id);
    if (!conflict) {
      throw new ApiError(404, `Conflict not found: ${data.conflict_id}`);
    }
  }

  const result = db.prepare(`
    INSERT INTO contributions (conflict_id, contributor_name, contributor_email, type, content)
    VALUES (@conflict_id, @contributor_name, @contributor_email, @type, @content)
  `).run({
    conflict_id: data.conflict_id || null,
    contributor_name: data.contributor_name || null,
    contributor_email: data.contributor_email || null,
    type: data.type,
    content: data.content,
  });

  res.status(201).json({
    data: {
      id: result.lastInsertRowid,
      status: 'pending',
      message: 'Thank you! Your contribution has been submitted for review.',
    }
  });
});

// GET /api/v1/education/contributions — List contributions (admin)
router.get('/contributions', (req, res) => {
  const db = getDb();
  const { status = 'pending' } = req.query;

  const rows = db.prepare(`
    SELECT con.*, c.name as conflict_name
    FROM contributions con
    LEFT JOIN conflicts c ON con.conflict_id = c.id
    WHERE con.status = ?
    ORDER BY con.created_at DESC
  `).all(status);

  res.json({ data: rows, meta: { total: rows.length } });
});

function safeJsonParse(str) {
  if (!str) return null;
  try { return JSON.parse(str); } catch { return null; }
}

export default router;
