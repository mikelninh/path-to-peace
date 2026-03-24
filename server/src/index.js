// ============================================
// THE PATH TO PEACE — API Server
// ============================================
//
// MASTERCLASS: This is your Express server entry point.
//
// Think of Express like a restaurant:
// - The server (Express app) is the restaurant itself
// - Middleware are the staff that process every order (check IDs, sanitize, log)
// - Routes are the menu items (GET /api/conflicts, POST /api/conflicts, etc.)
// - Controllers are the chefs (they do the actual work)
// - The database is the pantry (where the ingredients/data live)
//
// Request flow:
// Client → Express → Middleware Stack → Router → Controller → Database → Response
//
// Every request passes through middleware IN ORDER. This is called the
// "middleware pipeline" and it's the most important concept in Express.

import 'dotenv/config';  // Load .env FIRST, before anything else reads process.env
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Import our custom pieces
import { initDatabase } from './db/connection.js';
import { errorHandler, notFoundHandler } from './middleware/errors.js';
import { apiLimiter } from './middleware/rate-limit.js';
import conflictRoutes from './routes/conflicts.js';
import historicalRoutes from './routes/historical.js';
import statsRoutes from './routes/stats.js';
import educationRoutes from './routes/education.js';
import healthRoutes from './routes/health.js';
import chatRoutes from './routes/chat.js';

// ============================================
// DESIGN DECISION: ES Modules vs CommonJS
// ============================================
// We use `"type": "module"` in package.json, which means:
//   import/export  (modern, what browsers use)
// instead of:
//   require/module.exports  (legacy Node.js)
//
// ES modules are the future. They match what you already
// use in the frontend (your js/data/*.js files).
// The only gotcha: __dirname doesn't exist in ES modules,
// so we reconstruct it:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// Create the Express Application
// ============================================
const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// MIDDLEWARE STACK (order matters!)
// ============================================
// Each middleware runs in the order you app.use() it.
// Think of it as a conveyor belt — every request passes
// through each station before reaching your route handler.

// 1. SECURITY HEADERS (helmet)
// Sets HTTP headers like X-Content-Type-Options, Strict-Transport-Security, etc.
// These prevent common attacks (XSS, clickjacking, MIME sniffing).
// DESIGN DECISION: Always add this first. It's free security.
app.use(helmet({
  // Allow our frontend to load resources
  contentSecurityPolicy: false,  // We'll configure CSP properly in production
}));

// 2. CORS (Cross-Origin Resource Sharing)
// Browsers block requests from one origin (localhost:8090) to another (localhost:3001)
// unless the server explicitly allows it. CORS headers say "yes, this origin is allowed."
// DESIGN DECISION: Be specific about allowed origins in production.
// Never use cors() with no options in production — that allows EVERYONE.
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL]              // Only our frontend in production
    : ['http://localhost:8090', 'http://localhost:5173', 'http://127.0.0.1:8090'],  // Dev flexibility
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 3. COMPRESSION (gzip)
// Compresses response bodies. A 60KB JSON response becomes ~12KB.
// DESIGN DECISION: Always compress API responses. It's free performance.
app.use(compression());

// 4. BODY PARSING
// Express doesn't parse request bodies by default. These middleware
// convert the raw bytes into JavaScript objects you can use.
app.use(express.json({ limit: '1mb' }));         // Parse JSON bodies (POST/PUT requests)
app.use(express.urlencoded({ extended: true }));  // Parse form submissions

// 5. LOGGING (morgan)
// Logs every request: method, URL, status, response time.
// DESIGN DECISION: 'dev' format in development (colorful, concise),
// 'combined' in production (Apache-style, good for log aggregation).
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// 6. RATE LIMITING
// Prevents abuse — limits how many requests one IP can make.
// Without this, someone could hammer your API and crash it.
app.use('/api', apiLimiter);

// 7. STATIC FILES
// Serve the frontend from the parent directory.
// This means your Express server serves BOTH the API and the website.
// DESIGN DECISION: In development, this is convenient (one server).
// In production, you'd typically serve static files from a CDN instead.
app.use(express.static(path.join(__dirname, '../../')));

// ============================================
// API ROUTES
// ============================================
// Each route file handles a group of related endpoints.
// DESIGN DECISION: Prefix all API routes with /api/v1
// This lets you introduce /api/v2 later without breaking existing clients.
app.use('/api/v1/conflicts', conflictRoutes);
app.use('/api/v1/historical', historicalRoutes);
app.use('/api/v1/stats', statsRoutes);
app.use('/api/v1/education', educationRoutes);
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/chat', chatRoutes);

// ============================================
// CATCH-ALL: Serve frontend for non-API routes
// ============================================
// Single Page App (SPA) pattern: any route that isn't /api/*
// gets the index.html, and the frontend router handles it.
// Express 5 uses named wildcards: '{*path}' instead of just '*'
app.get('{*path}', (req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../../index.html'));
  } else {
    next();
  }
});

// ============================================
// ERROR HANDLING (must be LAST)
// ============================================
// These catch errors that bubble up from route handlers.
// DESIGN DECISION: Centralized error handling means you don't
// need try/catch in every single route — errors propagate here.
app.use(notFoundHandler);
app.use(errorHandler);

// ============================================
// START THE SERVER
// ============================================
async function start() {
  try {
    // Initialize database (create tables if they don't exist)
    await initDatabase();
    console.log('[DB] Database initialized');

    app.listen(PORT, () => {
      console.log(`
╔══════════════════════════════════════════════╗
║   The Path to Peace — API Server             ║
║──────────────────────────────────────────────║
║   Local:    http://localhost:${PORT}            ║
║   API:      http://localhost:${PORT}/api/v1     ║
║   Health:   http://localhost:${PORT}/api/v1/health ║
║   Env:      ${process.env.NODE_ENV || 'development'}                    ║
╚══════════════════════════════════════════════╝
      `);
    });
  } catch (err) {
    console.error('[FATAL] Failed to start server:', err);
    process.exit(1);
  }
}

start();
