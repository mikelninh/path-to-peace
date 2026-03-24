// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================
//
// MASTERCLASS: Centralized Error Handling
//
// Without this, every route handler needs its own try/catch
// and its own error formatting. That's repetitive and inconsistent.
//
// With centralized error handling, you throw an error ANYWHERE
// in your code, and it bubbles up to here, where it's formatted
// consistently and returned to the client.
//
// Express has a special rule: middleware with 4 parameters
// (err, req, res, next) is treated as error-handling middleware.
// It only runs when an error is thrown or passed to next(error).

/**
 * Custom API Error class.
 *
 * DESIGN DECISION: Custom error classes
 * JavaScript's built-in Error only has a message.
 * We need a status code (404, 400, 500) and sometimes
 * additional details. A custom class lets us carry this info.
 *
 * Usage in route handlers:
 *   throw new ApiError(404, 'Conflict not found');
 *   throw new ApiError(400, 'Invalid severity', { field: 'severity' });
 */
export class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'ApiError';
  }
}

/**
 * 404 handler — runs when no route matches the request.
 *
 * This is NOT an error handler (3 params, not 4).
 * It creates a 404 error and passes it to the error handler.
 */
export function notFoundHandler(req, res, next) {
  // Only handle API routes — let the SPA catch-all handle frontend routes
  if (req.path.startsWith('/api')) {
    next(new ApiError(404, `Route not found: ${req.method} ${req.path}`));
  } else {
    next();
  }
}

/**
 * Global error handler — catches all errors that bubble up.
 *
 * DESIGN DECISION: Different error responses in dev vs. production
 * - Development: Include full stack trace (helps debugging)
 * - Production: Hide implementation details (security)
 *
 * Never expose stack traces or internal error messages to users
 * in production — attackers can use them to find vulnerabilities.
 */
export function errorHandler(err, req, res, next) {
  // Default to 500 (Internal Server Error) if no status code is set
  const statusCode = err.statusCode || 500;

  // Log the full error server-side (always, even in production)
  if (statusCode >= 500) {
    console.error(`[ERROR] ${req.method} ${req.path}:`, err);
  } else {
    console.warn(`[WARN] ${req.method} ${req.path}: ${err.message}`);
  }

  // Build the response
  const response = {
    error: {
      status: statusCode,
      message: err.message || 'Internal Server Error',
    }
  };

  // Include extra details if provided (e.g., validation errors)
  if (err.details) {
    response.error.details = err.details;
  }

  // Include stack trace only in development
  if (process.env.NODE_ENV === 'development' && statusCode >= 500) {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
}
