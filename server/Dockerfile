# ============================================
# DOCKERFILE — Containerize the API Server
# ============================================
#
# MASTERCLASS: Docker & Containers
#
# A container is a lightweight, isolated environment for your app.
# Think of it as a "shipping container" — your code + its dependencies
# packed together so it runs identically everywhere.
#
# Without Docker: "It works on my machine" (but not in production)
# With Docker: Same environment everywhere — dev, CI, staging, production.
#
# DESIGN DECISION: Multi-stage builds
# We use two stages:
# 1. "builder" — install dependencies (includes dev deps, build tools)
# 2. "production" — only the runtime files (smaller final image)
# This keeps the production image small (~150MB vs ~800MB).

# ---- Stage 1: Builder ----
# Start with the official Node.js image (Debian-based, has build tools)
FROM node:20-slim AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package files first (Docker cache optimization)
# DESIGN DECISION: Why copy package.json separately?
# Docker caches each layer. If package.json hasn't changed,
# Docker reuses the cached npm install (saves minutes on rebuilds).
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies for building)
RUN npm ci

# Copy the rest of the source code
COPY . .

# ---- Stage 2: Production ----
FROM node:20-slim AS production

# Security: don't run as root
# DESIGN DECISION: Run as non-root user
# Running as root inside a container means a vulnerability in your
# app could give an attacker root access to the container (and maybe the host).
# Creating a dedicated user limits the blast radius.
RUN groupadd --system app && useradd --system --gid app app

WORKDIR /app

# Copy only what's needed for production
COPY package.json package-lock.json ./

# Install only production dependencies (no devDependencies)
RUN npm ci --omit=dev && npm cache clean --force

# Copy source code from builder
COPY --from=builder /app/src ./src

# Create directories for data and backups
RUN mkdir -p data backups && chown -R app:app /app

# Switch to non-root user
USER app

# The port the server listens on
EXPOSE 3001

# Health check — Docker/Kubernetes uses this to know if the container is healthy
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD node -e "fetch('http://localhost:3001/api/v1/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# Start the server
CMD ["node", "src/index.js"]
