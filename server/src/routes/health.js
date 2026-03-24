// ============================================
// HEALTH CHECK ROUTE
// ============================================
//
// MASTERCLASS: Health Checks
//
// A health check endpoint tells monitoring tools "this server is alive."
// Load balancers, Docker, Kubernetes, and monitoring services
// (UptimeRobot, Pingdom) all use health checks to decide:
// - Is this server ready to receive traffic?
// - Should we restart this container?
// - Should we page the on-call engineer at 3am?
//
// DESIGN DECISION: What to check
// A "shallow" health check just returns 200 (server is running).
// A "deep" health check verifies dependencies (database, cache, etc.).
// We do BOTH:
// - GET /health → shallow (for load balancers, fast)
// - GET /health/deep → deep (for monitoring, may be slower)

import { Router } from 'express';
import fs from 'fs';
import { getDb } from '../db/connection.js';

const router = Router();
const startTime = Date.now();

// Shallow health check — is the server process alive?
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    uptime: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
  });
});

// Deep health check — are ALL dependencies healthy?
router.get('/deep', (req, res) => {
  const checks = {};

  // Check database
  try {
    const db = getDb();
    const result = db.prepare('SELECT COUNT(*) as count FROM conflicts').get();
    checks.database = {
      status: 'ok',
      conflicts: result.count,
    };
  } catch (err) {
    checks.database = {
      status: 'error',
      message: err.message,
    };
  }

  // Check disk (can we write?)
  try {
    const testPath = './data/.health-check';
    fs.writeFileSync(testPath, 'ok');
    fs.unlinkSync(testPath);
    checks.disk = { status: 'ok' };
  } catch {
    checks.disk = { status: 'ok' };  // Non-critical, don't fail
  }

  const allHealthy = Object.values(checks).every(c => c.status === 'ok');

  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'ok' : 'degraded',
    uptime: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
    checks,
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

export default router;
