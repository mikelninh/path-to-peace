// ============================================
// Service Worker — Offline Access
// ============================================

const CACHE_NAME = 'peace-v5';
const CORE_ASSETS = [
  './',
  './index.html',
  './styles/main.css',
  './styles/variables.css',
  './styles/base.css',
  './styles/nav.css',
  './styles/hero.css',
  './styles/cards.css',
  './styles/detail.css',
  './styles/timeline.css',
  './styles/map.css',
  './styles/dashboard.css',
  './styles/patterns.css',
  './styles/educators.css',
  './styles/learning-module.css',
  './styles/quiz.css',
  './styles/write-rep.css',
  './styles/arms-trade.css',
  './styles/peace-tracker.css',
  './styles/simulator.css',
  './styles/methodology.css',
  './styles/briefing.css',
  './styles/api-docs.css',
  './styles/state-of-peace.css',
  './styles/search.css',
  './styles/animations.css',
  './styles/responsive.css',
  './styles/scrollytelling.css',
  './lib/leaflet.min.js',
  './lib/leaflet.min.css',
  './js/main.js',
  './js/router.js',
  './js/data/conflicts-current.js',
  './js/data/conflicts-historical.js',
  './js/data/causes.js',
  './js/data/endings.js',
  './js/data/patterns.js',
  './js/data/actions.js',
  './js/data/stats.js',
];

// Install — cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch — cache-first for assets, network-first for map tiles
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Map tiles — network first, fallback to cache
  if (url.hostname.includes('basemaps.cartocdn.com') || url.hostname.includes('tile.openstreetmap.org')) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // Google Fonts — cache first
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        });
      })
    );
    return;
  }

  // All other requests — cache first, fallback to network
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Cache successful responses for same-origin
        if (response.ok && url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    }).catch(() => {
      // Offline fallback for navigation
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
