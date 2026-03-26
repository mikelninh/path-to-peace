// ============================================
// Interactive Map (Leaflet)
// ============================================

import { navigate } from '../router.js';

const SEVERITY_CONFIG = {
  critical: { color: '#e74c3c', radius: 12, pulse: true },
  high: { color: '#e67e22', radius: 10, pulse: false },
  medium: { color: '#f1c40f', radius: 8, pulse: false },
  low: { color: '#2ecc71', radius: 7, pulse: false },
  tension: { color: '#3498db', radius: 7, pulse: false },
};

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>';

// Connection arcs between related conflicts
const CONNECTIONS = [
  ['russia-ukraine', 'north-korea'],    // Nuclear tensions, sanctions
  ['russia-ukraine', 'syria'],           // Russian military involvement
  ['israel-palestine', 'yemen'],         // Houthi attacks, Iran axis
  ['israel-palestine', 'syria'],         // Regional instability
  ['sudan', 'ethiopia'],                 // Regional spillover, refugees
  ['sudan', 'drc'],                      // Central African instability
  ['sahel', 'somalia'],                  // Islamist insurgency
  ['drc', 'ethiopia'],                   // Great Lakes region
  ['myanmar', 'south-china-sea'],        // Southeast Asian tensions
  ['taiwan', 'south-china-sea'],         // China assertion
  ['taiwan', 'north-korea'],             // East Asian security
];

let globalMap = null;
let markers = [];
let pulseIntervals = [];

// Parse displaced string to a number (e.g. "~14 million" → 14000000)
function parseDisplacedNumber(str) {
  if (!str || str === 'N/A') return 0;
  const cleaned = str.toLowerCase().replace(/[~,]/g, '').trim();
  const match = cleaned.match(/([\d.]+)\s*(million|mil|m\b)?/);
  if (!match) {
    // Try plain number like "120,000" or "120000"
    const plain = str.replace(/[^0-9.]/g, '');
    return plain ? parseFloat(plain) : 0;
  }
  let num = parseFloat(match[1]);
  if (match[2] && match[2].startsWith('m')) {
    num *= 1000000;
  }
  return num;
}

// Proportional radius in meters based on displaced population (sqrt scale)
function getRadius(displacedStr) {
  const num = parseDisplacedNumber(displacedStr);
  if (!num) return 30000; // default 30km
  // sqrt scale: 14M → ~337km radius, 50K → ~20km
  return Math.max(20000, Math.sqrt(num) * 90);
}

// Animated pulse for critical conflicts
// Uses requestAnimationFrame + visibility check instead of setInterval
// to avoid layout thrashing when the map is scrolled out of view.
let mapIsVisible = true;
let pulseFrame = null;
const pulseCircles = [];

function addPulse(map, lat, lng, color) {
  const baseRadius = 50000;
  const pulse = L.circle([lat, lng], {
    radius: baseRadius,
    color: color,
    fillColor: color,
    fillOpacity: 0.3,
    weight: 0,
    interactive: false,
  });
  pulse.addTo(map);
  pulseCircles.push({ pulse, baseRadius, phase: Math.random() * Math.PI * 2 });
}

function animatePulses() {
  if (mapIsVisible) {
    for (const p of pulseCircles) {
      p.phase = (p.phase + 0.03) % (Math.PI * 2);
      const scale = 1 + Math.sin(p.phase) * 0.5;
      p.pulse.setRadius(p.baseRadius * scale);
      p.pulse.setStyle({ fillOpacity: 0.15 + Math.sin(p.phase) * 0.15 });
    }
  }
  pulseFrame = requestAnimationFrame(animatePulses);
}

function startPulseObserver() {
  const mapSection = document.getElementById('conflict-map');
  if (!mapSection) return;

  const observer = new IntersectionObserver((entries) => {
    mapIsVisible = entries[0].isIntersecting;
  }, { threshold: 0 });

  observer.observe(mapSection);

  // Start the animation loop (runs only when visible)
  pulseFrame = requestAnimationFrame(animatePulses);
}

// Draw connection arcs between related conflicts
function addConnectionArcs(map, conflicts) {
  const coordMap = {};
  conflicts.forEach(c => {
    if (c.lat && c.lng) {
      coordMap[c.id] = [c.lat, c.lng];
    }
  });

  const lines = [];
  CONNECTIONS.forEach(([idA, idB]) => {
    const a = coordMap[idA];
    const b = coordMap[idB];
    if (!a || !b) return;

    // Create a curved arc using intermediate points
    const midLat = (a[0] + b[0]) / 2;
    const midLng = (a[1] + b[1]) / 2;
    // Offset the midpoint perpendicular to the line for a slight curve
    const dx = b[1] - a[1];
    const dy = b[0] - a[0];
    const dist = Math.sqrt(dx * dx + dy * dy);
    const offset = dist * 0.15;
    const curveLat = midLat + (dx / dist) * offset;
    const curveLng = midLng - (dy / dist) * offset;

    const line = L.polyline(
      [a, [curveLat, curveLng], b],
      {
        weight: 1,
        opacity: 0.12,
        color: '#4ecdc4',
        dashArray: '4 8',
        smoothFactor: 2,
        interactive: false,
      }
    );
    lines.push(line);
  });

  const connectionLayer = L.layerGroup(lines);
  connectionLayer.addTo(map);
  return connectionLayer;
}

export function createGlobalMap(containerId, conflicts) {
  const container = document.getElementById(containerId);
  if (!container || typeof L === 'undefined') return null;

  // Prevent re-initialization
  if (globalMap) {
    globalMap.invalidateSize();
    return globalMap;
  }

  globalMap = L.map(containerId, {
    center: [20, 15],
    zoom: 2,
    minZoom: 2,
    maxZoom: 10,
    zoomControl: false,
    scrollWheelZoom: false,
    attributionControl: false,
    worldCopyJump: true,
  });

  // Dark tiles
  L.tileLayer(TILE_URL, {
    attribution: TILE_ATTRIBUTION,
    maxZoom: 18,
    subdomains: 'abcd',
  }).addTo(globalMap);

  // Zoom control on the right
  L.control.zoom({ position: 'topright' }).addTo(globalMap);

  // Attribution bottom-right
  L.control.attribution({ position: 'bottomright', prefix: false })
    .addAttribution(TILE_ATTRIBUTION)
    .addTo(globalMap);

  // Add connection arcs (drawn first so they appear beneath markers)
  addConnectionArcs(globalMap, conflicts);

  // Add conflict markers
  conflicts.forEach(c => {
    if (!c.lat || !c.lng) return;
    const cfg = SEVERITY_CONFIG[c.severity] || SEVERITY_CONFIG.medium;
    const meterRadius = getRadius(c.displaced);

    // Proportional circle (meters-based, scales with zoom)
    const marker = L.circle([c.lat, c.lng], {
      radius: meterRadius,
      color: cfg.color,
      fillColor: cfg.color,
      fillOpacity: 0.25,
      weight: 1.5,
      opacity: 0.6,
    });

    marker.bindPopup(createPopup(c), {
      className: 'conflict-popup',
      maxWidth: 300,
      closeButton: true,
    });

    marker.on('click', () => {
      globalMap.flyTo([c.lat, c.lng], 5, { duration: 1 });
    });

    marker.addTo(globalMap);
    markers.push({ marker, conflict: c });

    // Animated pulse for critical severity
    if (cfg.pulse) {
      addPulse(globalMap, c.lat, c.lng, cfg.color);
    }
  });

  // Start pulse visibility observer (pauses animation when map not in viewport)
  if (pulseCircles.length > 0) {
    startPulseObserver();
  }

  // Enable scroll zoom on click
  globalMap.on('click', () => {
    globalMap.scrollWheelZoom.enable();
  });

  // Disable scroll zoom when mouse leaves
  container.addEventListener('mouseleave', () => {
    globalMap.scrollWheelZoom.disable();
  });

  // Mobile: add "tap to interact" overlay to prevent scroll-jacking
  initMapTouchOverlay(container, globalMap);

  return globalMap;
}

export function createMiniMap(containerId, conflict) {
  if (typeof L === 'undefined' || !conflict.lat) return null;

  const map = L.map(containerId, {
    center: [conflict.lat, conflict.lng],
    zoom: 5,
    zoomControl: false,
    scrollWheelZoom: false,
    dragging: false,
    attributionControl: false,
  });

  L.tileLayer(TILE_URL, {
    maxZoom: 18,
    subdomains: 'abcd',
  }).addTo(map);

  const cfg = SEVERITY_CONFIG[conflict.severity] || SEVERITY_CONFIG.medium;
  L.circleMarker([conflict.lat, conflict.lng], {
    radius: cfg.radius,
    color: cfg.color,
    fillColor: cfg.color,
    fillOpacity: 0.5,
    weight: 2,
  }).addTo(map);

  if (conflict.bounds) {
    map.fitBounds(conflict.bounds, { padding: [20, 20] });
  }

  return map;
}

export function flyTo(lat, lng, zoom = 5) {
  if (globalMap) {
    globalMap.flyTo([lat, lng], zoom, { duration: 1.5 });
  }
}

export function resetView() {
  if (globalMap) {
    globalMap.flyTo([20, 15], 2, { duration: 1 });
  }
}

export function getGlobalMap() {
  return globalMap;
}

function initMapTouchOverlay(container, map) {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (!isMobile) return;

  // Find the .map-wrapper parent (or use container itself)
  const wrapper = container.closest('.map-wrapper') || container.parentElement;
  if (!wrapper) return;

  // Ensure wrapper is positioned for absolute children
  const wrapperPosition = getComputedStyle(wrapper).position;
  if (wrapperPosition === 'static') {
    wrapper.style.position = 'relative';
  }

  // Disable map interaction by default on mobile
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'map-touch-overlay';
  overlay.innerHTML = '<span class="map-touch-label">Tap to explore the map</span>';

  // Create exit button
  const exitBtn = document.createElement('button');
  exitBtn.className = 'map-exit-btn';
  exitBtn.innerHTML = '&times;';
  exitBtn.setAttribute('aria-label', 'Exit map interaction');

  wrapper.appendChild(overlay);
  wrapper.appendChild(exitBtn);

  // Tap overlay: enable map interaction
  overlay.addEventListener('click', () => {
    overlay.classList.add('hidden');
    exitBtn.classList.add('visible');
    map.dragging.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
  });

  // Exit button: disable map interaction, re-show overlay
  exitBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    overlay.classList.remove('hidden');
    exitBtn.classList.remove('visible');
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
  });

  // Also listen for media query changes to clean up on resize to desktop
  const mql = window.matchMedia('(max-width: 768px)');
  mql.addEventListener('change', (e) => {
    if (!e.matches) {
      // Switched to desktop: remove overlay, re-enable interactions
      overlay.classList.add('hidden');
      exitBtn.classList.remove('visible');
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
    } else {
      // Switched back to mobile: re-show overlay, disable interactions
      overlay.classList.remove('hidden');
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
    }
  });
}

function createPopup(c) {
  const cfg = SEVERITY_CONFIG[c.severity] || SEVERITY_CONFIG.medium;
  return `
    <div class="map-popup">
      <div class="map-popup-header">
        <span class="map-popup-severity" style="background: ${cfg.color}; color: #fff;">${c.severity}</span>
      </div>
      <h3 class="map-popup-title">${c.name}</h3>
      <p class="map-popup-region">${c.region}</p>
      <p class="map-popup-summary">${c.summary.substring(0, 120)}...</p>
      <div class="map-popup-meta">
        ${c.displaced !== 'N/A' ? `<span>${c.displaced} displaced</span>` : ''}
      </div>
      <button class="map-popup-btn" onclick="window.location.hash='#/conflict/${c.id}'">Full Analysis →</button>
    </div>
  `;
}
