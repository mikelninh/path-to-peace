// ============================================
// VALIDATION MIDDLEWARE (using Zod)
// ============================================
//
// MASTERCLASS: Input Validation
//
// NEVER trust data from the client. Users can send anything:
// - Missing required fields
// - Wrong data types (string where you expect a number)
// - Malicious strings (SQL injection, XSS)
// - Values out of range (severity: "banana")
//
// Validation is the bouncer at the door — it checks every input
// BEFORE it reaches your business logic or database.
//
// DESIGN DECISION: Zod vs. Joi vs. manual validation
// - Zod: TypeScript-first, excellent type inference, modern API
// - Joi: Older, more established, heavier
// - Manual: if/else chains — error-prone, hard to maintain
//
// We use Zod because:
// 1. It's the modern standard
// 2. Clean, readable schema definitions
// 3. If you add TypeScript later, Zod gives you types for free
// 4. Great error messages out of the box

import { z } from 'zod';
import { ApiError } from './errors.js';

// ============================================
// Schemas — Define what valid data looks like
// ============================================
// Each schema is a blueprint. Zod checks incoming data against
// the blueprint and tells you exactly what's wrong.

/**
 * Schema for creating/updating a conflict.
 * .partial() makes all fields optional (for PATCH updates).
 */
export const conflictSchema = z.object({
  id: z.string()
    .min(2, 'ID must be at least 2 characters')
    .max(100, 'ID must be at most 100 characters')
    .regex(/^[a-z0-9-]+$/, 'ID must be lowercase alphanumeric with hyphens'),
  name: z.string().min(1, 'Name is required').max(200),
  region: z.string().min(1, 'Region is required'),
  type: z.enum(['war', 'civil-war', 'insurgency', 'tension'], {
    errorMap: () => ({ message: 'Type must be: war, civil-war, insurgency, or tension' }),
  }),
  severity: z.enum(['critical', 'high', 'medium', 'low', 'tension'], {
    errorMap: () => ({ message: 'Severity must be: critical, high, medium, low, or tension' }),
  }),
  started: z.string().optional(),
  displaced: z.string().optional(),
  casualties: z.string().optional(),
  summary: z.string().optional(),
  who_side_a: z.string().optional(),
  who_side_b: z.string().optional(),
  why: z.string().optional(),
  resources: z.string().optional(),
  what_about: z.string().optional(),
  path_to_resolution: z.string().optional(),
  impact: z.string().optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  causes: z.array(z.string()).optional(),
});

export const conflictUpdateSchema = conflictSchema.partial().omit({ id: true });

export const contributionSchema = z.object({
  conflict_id: z.string().optional(),
  contributor_name: z.string().min(1).max(100).optional(),
  contributor_email: z.string().email('Invalid email address').optional(),
  type: z.enum(['correction', 'addition', 'translation', 'source']),
  content: z.string().min(10, 'Content must be at least 10 characters').max(5000),
});

export const querySchema = z.object({
  type: z.enum(['war', 'civil-war', 'insurgency', 'tension']).optional(),
  severity: z.enum(['critical', 'high', 'medium', 'low', 'tension']).optional(),
  region: z.string().optional(),
  search: z.string().max(200).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
  sort: z.enum(['name', 'severity', 'region', 'type', 'created_at', 'updated_at']).default('name'),
  order: z.enum(['asc', 'desc']).default('asc'),
});

/**
 * Middleware factory: validate request body against a schema.
 *
 * Usage in routes:
 *   router.post('/', validate(conflictSchema), createConflict);
 *
 * If validation fails, returns 400 with detailed error messages.
 * If validation passes, the cleaned data is attached to req.validatedBody.
 *
 * DESIGN DECISION: Why req.validatedBody instead of modifying req.body?
 * Because Zod strips unknown fields (security: prevents mass assignment)
 * and coerces types. The validated version may differ from the raw body.
 * Keeping both means you can always check the original if needed.
 */
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Format Zod errors into a readable structure
      const details = result.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      throw new ApiError(400, 'Validation failed', details);
    }

    // Attach cleaned, validated data
    req.validatedBody = result.data;
    next();
  };
}

/**
 * Validate query parameters.
 */
export function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const details = result.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      throw new ApiError(400, 'Invalid query parameters', details);
    }

    req.validatedQuery = result.data;
    next();
  };
}
