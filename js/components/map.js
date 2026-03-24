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

let globalMap = null;
let markers = [];

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

  // Add conflict markers
  conflicts.forEach(c => {
    if (!c.lat || !c.lng) return;
    const cfg = SEVERITY_CONFIG[c.severity] || SEVERITY_CONFIG.medium;

    const marker = L.circleMarker([c.lat, c.lng], {
      radius: cfg.radius,
      color: cfg.color,
      fillColor: cfg.color,
      fillOpacity: 0.5,
      weight: 2,
      opacity: 0.8,
      className: cfg.pulse ? 'pulse-marker' : '',
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
  });

  // Enable scroll zoom on click
  globalMap.on('click', () => {
    globalMap.scrollWheelZoom.enable();
  });

  // Disable scroll zoom when mouse leaves
  container.addEventListener('mouseleave', () => {
    globalMap.scrollWheelZoom.disable();
  });

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
