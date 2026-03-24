// ============================================
// RATE LIMITING MIDDLEWARE
// ============================================
//
// MASTERCLASS: Rate Limiting
//
// Without rate limiting, one user (or bot) can send thousands of
// requests per second and crash your server. Rate limiting says:
// "Each IP address can make at most X requests per Y minutes."
//
// DESIGN DECISION: Build our own vs. use express-rate-limit package
// - express-rate-limit is the standard choice (production-ready)
// - We build our own (~30 lines) because:
//   1. You learn HOW rate limiting works (it's just a counter + timer)
//   2. Zero additional dependencies
//   3. For learning, understanding > convenience
//
// How it works:
// - We keep a Map of IP addresses → request counts
// - Each request increments the count for that IP
// - If the count exceeds the limit, we reject with 429 (Too Many Requests)
// - Every WINDOW_MS, we reset all counts
//
// PRODUCTION NOTE: This in-memory approach doesn't work with multiple
// server instances (each has its own Map). In production, you'd use
// Redis to share the counts across instances.

const WINDOW_MS = 15 * 60 * 1000;  // 15 minutes
const MAX_REQUESTS = 200;           // per window per IP

// Store: IP → { count, resetTime }
const requestCounts = new Map();

// Clean up expired entries periodically (prevent memory leak)
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now > data.resetTime) {
      requestCounts.delete(ip);
    }
  }
}, WINDOW_MS);

/**
 * Rate limiting middleware.
 *
 * Attaches to /api routes in index.js.
 * Returns 429 if the client exceeds the limit.
 * Sets standard rate-limit headers so clients can self-regulate.
 */
export function apiLimiter(req, res, next) {
  // DESIGN DECISION: Use X-Forwarded-For in production
  // Behind a reverse proxy (nginx, Cloudflare), req.ip is the proxy's IP.
  // X-Forwarded-For contains the real client IP. But trusting this header
  // in development can be spoofed — only trust it behind YOUR proxy.
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  let record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    // New window for this IP
    record = { count: 0, resetTime: now + WINDOW_MS };
    requestCounts.set(ip, record);
  }

  record.count++;

  // Set standard rate-limit headers
  // These are a courtesy to API consumers — they can check these
  // to know how many requests they have left before being throttled.
  res.set({
    'X-RateLimit-Limit': MAX_REQUESTS,
    'X-RateLimit-Remaining': Math.max(0, MAX_REQUESTS - record.count),
    'X-RateLimit-Reset': Math.ceil(record.resetTime / 1000),
  });

  if (record.count > MAX_REQUESTS) {
    return res.status(429).json({
      error: {
        status: 429,
        message: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil((record.resetTime - now) / 1000),
      }
    });
  }

  next();
}
