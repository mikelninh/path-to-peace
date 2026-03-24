// ============================================
// Hero Globe — Canvas 2D Particle Globe
// Renders a slowly rotating dotted sphere with
// world coastline outlines and conflict markers
// ============================================

// Severity color mapping
const SEVERITY_COLORS = {
  critical: '#e74c3c',
  high: '#e67e22',
  medium: '#f1c40f',
  low: '#2ecc71',
  tension: '#3498db',
};

// Compact coastline data: flat array of [lat, lng, lat, lng, ...]
// ~1500 points sampling major landmass outlines
const COASTLINE = [
  // ---- North America (West Coast) ----
  60,-147, 59,-139, 57,-136, 56,-133, 55,-130, 54,-130, 52,-128, 50,-127,
  49,-126, 48,-124, 47,-124, 46,-124, 44,-124, 43,-124, 42,-124, 40,-124,
  39,-123, 38,-123, 37,-122, 36,-122, 35,-121, 34,-120, 33,-118, 32,-117,
  31,-116, 30,-115, 29,-114, 28,-113, 27,-112, 26,-112, 25,-112, 24,-111,
  23,-110, 22,-110, 21,-107, 20,-106, 19,-105, 18,-104, 17,-101, 16,-96,
  // Alaska top
  71,-156, 70,-162, 68,-166, 66,-164, 64,-165, 63,-166, 61,-165, 60,-162,
  59,-160, 58,-157, 57,-155, 56,-154, 57,-152, 58,-150, 59,-148, 60,-147,
  // Alaska peninsula & Aleutians
  57,-157, 56,-159, 55,-161, 54,-164, 53,-167, 52,-170, 51,-173, 52,-176,
  // North America (North/Arctic coast)
  71,-156, 71,-150, 70,-145, 69,-140, 69,-135, 69,-130, 70,-128, 70,-125,
  71,-120, 72,-118, 73,-115, 74,-110, 75,-105, 74,-95, 73,-90, 72,-85,
  70,-82, 68,-80, 66,-78, 64,-76, 63,-78, 62,-80, 61,-82, 60,-78,
  // Hudson Bay
  63,-78, 62,-80, 61,-82, 60,-85, 59,-87, 58,-89, 57,-90, 56,-88,
  55,-85, 54,-82, 53,-80, 52,-79, 52,-80, 53,-82, 55,-83, 57,-85,
  59,-82, 60,-78, 58,-77, 56,-76, 55,-77, 54,-79,
  // East coast Canada
  60,-64, 59,-63, 58,-62, 57,-61, 56,-60, 55,-59, 54,-58, 53,-56,
  52,-55, 51,-56, 50,-57, 49,-58, 48,-59, 47,-60, 47,-62, 47,-64,
  46,-64, 46,-62, 46,-60, 45,-61, 44,-63, 44,-66,
  // US East Coast
  44,-67, 43,-70, 42,-71, 41,-72, 41,-73, 40,-74, 39,-75, 38,-75,
  37,-76, 36,-76, 35,-76, 34,-78, 33,-79, 32,-81, 31,-81, 30,-81,
  // Florida
  30,-81, 29,-81, 28,-81, 27,-80, 26,-80, 25,-80, 25,-81, 25,-82,
  26,-82, 27,-83, 28,-83, 29,-83, 30,-84, 30,-85, 30,-86, 30,-88,
  // Gulf Coast
  30,-89, 29,-90, 29,-91, 29,-93, 29,-94, 29,-95, 28,-97, 27,-97,
  26,-97, 25,-97,
  // Mexico East Coast
  24,-97, 22,-97, 21,-97, 20,-97, 19,-96, 18,-95, 18,-93, 18,-91,
  19,-90, 20,-90, 21,-90, 21,-88, 21,-87, 20,-87, 19,-88, 18,-89,
  // Yucatan / Central America
  18,-88, 17,-88, 16,-89, 16,-88, 15,-88, 15,-87, 14,-87, 13,-87,
  12,-87, 11,-85, 10,-84, 9,-83, 9,-80, 8,-79, 8,-77, 9,-76,
  // Cuba / Caribbean (select)
  23,-82, 22,-84, 21,-84, 20,-83, 20,-81, 20,-79, 21,-78, 22,-77,
  23,-80, 23,-82,
  // Hispaniola
  20,-73, 19,-72, 19,-70, 19,-69, 18,-69, 18,-72, 19,-73, 20,-73,
  // ---- South America ----
  // North coast
  12,-72, 11,-74, 11,-75, 10,-76, 9,-76, 8,-77, 7,-77, 6,-76,
  6,-75, 7,-73, 7,-72, 8,-70, 8,-68, 8,-65, 8,-63, 8,-60,
  9,-60, 10,-62, 10,-64, 11,-68, 11,-70, 12,-72,
  // Venezuela/Guyana coast
  8,-60, 7,-58, 7,-57, 6,-56, 6,-55, 5,-53, 4,-52, 3,-51, 2,-50,
  1,-50, 0,-50,
  // Brazil East Coast
  0,-50, -1,-48, -2,-44, -3,-41, -4,-38, -5,-35, -6,-35, -7,-35,
  -8,-35, -9,-35, -10,-36, -11,-37, -12,-38, -13,-39, -14,-39,
  -15,-39, -16,-39, -17,-39, -18,-40, -19,-40, -20,-40, -21,-41,
  -22,-41, -23,-43, -24,-46, -25,-48, -26,-48, -27,-49, -28,-49,
  -29,-49, -30,-50, -31,-51, -32,-52, -33,-53,
  // South coast / Uruguay / Argentina
  -34,-54, -35,-57, -36,-57, -37,-57, -38,-58, -39,-62, -40,-63,
  -41,-65, -42,-65, -43,-65, -44,-66, -45,-66, -46,-68, -47,-66,
  -48,-66, -49,-68, -50,-69, -51,-69, -52,-69, -53,-71, -54,-70,
  -55,-67, -55,-65, -54,-64, -52,-68, -51,-69,
  // Chile West Coast
  -55,-70, -54,-72, -53,-73, -52,-74, -50,-75, -48,-75, -46,-75,
  -44,-73, -42,-73, -40,-73, -38,-73, -36,-73, -34,-72, -32,-71,
  -30,-71, -28,-71, -26,-70, -24,-70, -22,-70, -20,-70, -18,-71,
  // Peru / Ecuador / Colombia West Coast
  -16,-75, -14,-76, -12,-77, -10,-78, -8,-80, -6,-81, -4,-81,
  -2,-80, 0,-80, 1,-79, 2,-78, 4,-77, 6,-77, 7,-77,
  // ---- Europe ----
  // Iberia
  36,-6, 37,-7, 38,-9, 39,-9, 40,-9, 41,-9, 42,-9, 43,-9, 43,-8,
  43,-6, 43,-4, 43,-2, 43,-1, 43,0, 43,2, 43,3, 42,3, 41,2,
  40,0, 39,0, 38,-1, 37,-2, 36,-5, 36,-6,
  // France
  43,3, 43,5, 43,6, 43,7, 44,8, 46,7, 47,6, 48,5, 48,3,
  49,2, 49,0, 48,-2, 48,-4, 48,-5, 47,-3, 47,-2, 46,-2,
  46,-1, 45,-1, 44,-1, 43,0,
  // British Isles
  50,-5, 51,-5, 52,-5, 53,-5, 54,-5, 55,-6, 56,-6, 57,-6, 58,-5,
  58,-3, 57,-2, 56,-3, 55,-2, 54,-1, 53,0, 52,1, 51,1, 51,0,
  50,-1, 50,-3, 50,-5,
  // Ireland
  52,-10, 53,-10, 54,-10, 55,-8, 54,-7, 53,-6, 52,-7, 51,-10, 52,-10,
  // Scandinavia (Norway)
  58,6, 59,5, 60,5, 61,5, 62,6, 63,7, 64,10, 65,12, 66,13,
  67,14, 68,15, 69,16, 70,18, 70,20, 70,22, 70,24, 70,26,
  70,28, 70,30, 69,30, 68,28, 67,26, 66,24, 65,22, 64,20,
  63,18, 62,18, 61,16, 60,12, 59,10, 58,8, 58,6,
  // Baltic / Sweden / Finland
  60,20, 60,22, 60,24, 61,24, 62,22, 63,20, 64,22, 65,25,
  66,26, 68,28, 70,28,
  // Italy
  44,8, 44,10, 44,12, 43,13, 42,12, 41,14, 40,16, 39,16,
  38,16, 38,15, 39,17, 40,18, 41,16, 42,14, 43,12, 44,12,
  // Italy boot/toe
  38,16, 37,15, 38,13, 39,16,
  // Sicily
  38,13, 37,13, 37,15, 38,15,
  // Greece
  40,20, 39,20, 38,22, 38,24, 37,24, 36,23, 37,22, 38,20, 40,20,
  // Crete
  35,24, 35,26,
  // Turkey (European part)
  42,28, 41,29, 41,28, 40,26, 41,26, 42,28,
  // Netherlands / Belgium / Germany coast
  52,4, 53,5, 54,8, 55,8, 54,10, 54,12,
  // Poland / Baltic coast
  54,14, 54,16, 54,18, 54,20, 55,20, 56,18, 57,20, 58,22, 59,24,
  // ---- Africa ----
  // Morocco / NW Africa
  36,-6, 35,-6, 34,-2, 35,0, 36,2, 37,4, 37,6, 37,8, 37,10,
  // Tunisia / Libya
  37,10, 37,11, 36,11, 34,10, 33,11, 32,12, 31,13, 30,15,
  30,18, 31,20, 32,23, 32,25,
  // Egypt
  32,25, 31,27, 31,29, 31,30, 31,32, 30,33, 28,33, 27,34,
  25,35, 24,35, 22,37,
  // Red Sea / East Africa
  20,40, 18,40, 16,42, 14,43, 12,43, 11,43, 10,44, 8,46, 6,48,
  4,46, 2,45, 0,42, -1,42, -2,41, -4,40, -6,39, -8,39, -10,40,
  // East Africa south
  -10,40, -12,40, -14,41, -15,40, -16,39, -18,37, -20,35, -22,35,
  -24,35, -25,35, -26,33, -28,32, -30,31, -32,29, -33,28, -34,26,
  -34,18,
  // South Africa south coast
  -34,18, -34,20, -34,22, -34,24, -34,26, -33,28,
  // West Africa (south going north)
  -34,18, -33,17, -31,17, -29,16, -27,15, -25,14, -23,14,
  -21,13, -19,12, -17,12, -15,12, -13,12, -11,14, -8,13,
  -6,12, -5,12, -4,10, -2,10, 0,10, 2,10, 4,7, 5,5,
  6,3, 6,1, 5,0, 5,-1, 4,-5, 5,-5, 6,-8, 7,-12,
  // West Africa bump
  7,-12, 8,-14, 10,-16, 12,-17, 14,-17, 15,-17, 16,-16,
  18,-16, 20,-17, 21,-17, 23,-16, 25,-15, 27,-13, 29,-10,
  31,-10, 33,-8, 35,-6, 36,-6,
  // Madagascar
  -12,49, -14,48, -16,47, -18,44, -20,44, -22,44, -24,44,
  -26,45, -25,47, -23,48, -20,49, -18,50, -16,50, -14,50, -12,49,
  // ---- Middle East ----
  // Turkey (Asia Minor)
  42,28, 41,30, 41,32, 41,34, 37,36, 36,36, 36,34, 36,32,
  36,30, 37,28, 38,26, 40,26, 42,28,
  // Syria / Lebanon / Israel coast
  36,36, 35,36, 34,36, 33,35, 32,35, 31,34,
  // Arabian Peninsula
  28,48, 26,50, 24,51, 23,52, 22,55, 21,57, 20,58, 18,57,
  16,53, 14,48, 13,45, 13,43, 15,42, 16,43, 18,42, 20,40,
  22,39, 24,38, 26,36, 28,35, 29,35, 30,33,
  // Persian Gulf
  30,48, 29,49, 28,50, 27,50, 26,50, 25,51, 24,52,
  // Iran south coast
  25,57, 26,57, 27,57, 27,59, 26,60, 25,61, 25,63, 24,64, 25,66,
  // ---- South & Southeast Asia ----
  // Pakistan / India west coast
  25,66, 24,67, 23,68, 22,68, 21,70, 20,73, 19,73, 18,73,
  17,73, 16,73, 15,74, 14,74, 13,75, 12,75, 11,76, 10,76,
  9,76, 8,77, 7,79, 6,80,
  // Sri Lanka
  10,80, 9,80, 7,80, 6,80, 7,82, 9,81, 10,80,
  // India east coast
  8,77, 10,80, 11,80, 12,80, 13,80, 14,80, 15,80, 16,81, 17,83,
  18,84, 19,85, 20,87, 21,87, 22,88,
  // Bangladesh / Myanmar
  22,88, 21,90, 22,92, 21,92, 20,93, 18,94, 16,96, 15,98,
  14,98, 12,98, 10,98, 8,98, 6,100, 4,104, 2,104, 1,104,
  // Malay Peninsula
  6,100, 5,100, 4,101, 3,103, 2,104, 1,104,
  // Indonesia (Sumatra outline)
  6,95, 4,96, 2,98, 0,99, -1,101, -3,104, -5,105, -6,106, -7,106,
  // Indonesia (Java)
  -6,106, -7,107, -7,108, -8,110, -8,112, -8,114, -8,115,
  // Indonesia (Borneo outline)
  7,117, 5,119, 3,118, 1,118, 0,117, -1,116, -2,117, -3,116,
  -4,115, -3,113, -2,111, -1,110, 1,109, 2,110, 4,114, 6,116, 7,117,
  // Indonesia (Sulawesi approximation)
  2,121, 0,122, -2,121, -4,122, -5,120, -3,120, -1,120, 1,121, 2,121,
  // Indonesia (Papua outline)
  -1,131, -2,133, -3,136, -4,138, -5,140, -6,141, -7,141, -8,140,
  -8,138, -7,137, -6,136, -5,135, -4,133, -3,132, -2,131, -1,131,
  // Philippines (Luzon approximation)
  19,121, 18,122, 17,122, 16,120, 15,120, 14,121, 13,123, 12,124,
  11,124, 10,124, 9,126, 11,126, 13,124, 15,122, 17,122, 19,121,
  // ---- East Asia ----
  // Vietnam / China south coast
  10,106, 12,109, 14,109, 16,108, 18,106, 20,106, 21,108, 22,108,
  23,108, 22,110, 21,110, 20,111, 19,110, 18,109, 16,108,
  // China coast
  23,113, 24,118, 25,119, 26,120, 27,121, 28,122, 29,122, 30,122,
  31,122, 32,122, 33,121, 34,120, 35,120, 36,121, 37,122, 38,121,
  39,118, 40,120, 41,122, 40,124,
  // Korea
  38,128, 37,127, 36,126, 35,126, 34,127, 35,129, 36,130, 37,129,
  38,128, 39,128, 40,124, 41,126, 42,130, 43,131,
  // Taiwan
  25,121, 24,121, 23,120, 22,121, 23,122, 25,122, 25,121,
  // Japan
  34,130, 33,131, 32,132, 33,134, 34,135, 35,137, 36,140, 37,141,
  38,140, 39,140, 40,140, 41,141, 42,143, 43,145, 44,145, 45,142,
  43,141, 42,140, 41,140, 40,140,
  // Hokkaido
  43,145, 44,145, 45,145, 45,142, 43,141,
  // Kyushu
  33,131, 32,131, 31,131, 32,132, 33,131,
  // ---- Russia (Pacific coast) ----
  43,132, 44,133, 45,136, 46,138, 48,140, 50,140, 52,141, 54,142,
  56,143, 58,150, 59,153, 60,155, 62,160, 64,168, 66,170,
  // Kamchatka
  56,163, 55,162, 54,160, 53,159, 52,158, 51,157, 52,158, 54,162, 56,163,
  // ---- Australia ----
  // North coast
  -12,130, -12,132, -12,134, -12,136, -14,136, -15,137, -16,138,
  -14,140, -12,142, -11,142, -11,140, -12,138, -12,136,
  // East coast
  -12,142, -14,144, -16,146, -18,146, -20,148, -22,150, -24,152,
  -26,153, -28,154, -30,153, -32,152, -34,151, -36,150, -37,150,
  -38,148, -39,146,
  // South coast
  -39,146, -38,144, -37,140, -36,137, -35,136, -34,136, -34,138,
  -36,138, -37,140, -38,144,
  // South Australia / Great Bight
  -34,136, -33,134, -32,133, -31,131, -32,129, -33,127, -34,124,
  -34,121, -34,118, -34,115,
  // West coast
  -34,115, -32,115, -30,115, -28,114, -26,113, -24,113, -22,114,
  -20,119, -18,122, -16,123, -14,126, -13,128, -12,130,
  // Tasmania
  -41,144, -42,145, -43,146, -43,148, -42,148, -41,147, -41,144,
  // New Zealand (North Island)
  -35,174, -36,175, -37,176, -38,177, -39,178, -40,176, -41,175,
  -39,174, -38,174, -37,174, -36,174, -35,174,
  // New Zealand (South Island)
  -41,174, -42,172, -43,170, -44,168, -45,167, -46,167, -46,168,
  -45,170, -44,172, -43,173, -42,174, -41,174,
  // ---- Additional detail: Iceland ----
  66,-23, 65,-24, 64,-22, 64,-18, 65,-14, 66,-14, 66,-18, 66,-23,
  // ---- Greenland outline ----
  60,-43, 62,-42, 64,-40, 66,-37, 68,-33, 70,-27, 72,-22, 74,-20,
  76,-18, 78,-20, 80,-22, 82,-30, 83,-40, 82,-50, 80,-55, 78,-60,
  76,-65, 74,-58, 72,-55, 70,-52, 68,-50, 66,-45, 64,-44, 62,-44, 60,-43,
];

/**
 * Initialize the hero globe animation on a given canvas element.
 * @param {string} canvasId - ID of the canvas element
 * @param {Array} conflicts - Array of conflict objects with {lat, lng, severity}
 * @returns {Function} cleanup function to stop animation and remove listeners
 */
export function initHeroGlobe(canvasId, conflicts) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  // State
  let rotation = 0;
  let animFrameId = null;
  let isVisible = true;
  let lastFrameTime = 0;
  const FRAME_INTERVAL = 1000 / 30; // 30fps cap
  const ROTATION_SPEED = 0.15; // degrees per frame

  // Parse coastline flat array into point pairs
  const coastlinePoints = [];
  for (let i = 0; i < COASTLINE.length; i += 2) {
    coastlinePoints.push([COASTLINE[i], COASTLINE[i + 1]]);
  }

  // Map conflicts to globe format
  const conflictPoints = (conflicts || [])
    .filter(c => c.lat != null && c.lng != null)
    .map(c => ({
      lat: c.lat,
      lng: c.lng,
      severity: c.severity || 'medium',
      color: SEVERITY_COLORS[c.severity] || SEVERITY_COLORS.medium,
    }));

  // --- Sizing ---
  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const scale = isMobile ? 0.5 : 1;

    canvas.width = rect.width * dpr * scale;
    canvas.height = rect.height * dpr * scale;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  }

  resize();

  // --- Projection ---
  function projectPoint(lat, lng, centerX, centerY, radius) {
    const phi = lat * Math.PI / 180;
    const lambda = (lng + rotation) * Math.PI / 180;
    const x = Math.cos(phi) * Math.sin(lambda);
    const y = -Math.sin(phi);
    const z = Math.cos(phi) * Math.cos(lambda);
    if (z < 0) return null; // backface culling
    return {
      x: centerX + x * radius,
      y: centerY + y * radius,
      z: z,
    };
  }

  // --- Render frame ---
  function render(timestamp) {
    animFrameId = requestAnimationFrame(render);

    if (!isVisible) return;

    // Throttle to 30fps
    if (timestamp - lastFrameTime < FRAME_INTERVAL) return;
    lastFrameTime = timestamp;

    const w = canvas.width;
    const h = canvas.height;
    const centerX = w / 2;
    const centerY = h / 2;
    const radius = Math.min(w, h) * 0.38;

    ctx.clearRect(0, 0, w, h);

    // Time for pulse animation
    const time = timestamp * 0.001;

    // Draw coastline dots
    for (let i = 0; i < coastlinePoints.length; i++) {
      const pt = coastlinePoints[i];
      const proj = projectPoint(pt[0], pt[1], centerX, centerY, radius);
      if (!proj) continue;

      // Depth-based opacity with subtle teal tint
      const depthOpacity = 0.3 + proj.z * 0.7;
      const baseOpacity = 0.15 + (depthOpacity - 0.3) * 0.21; // maps to 0.15-0.3 range
      const dotSize = 1.2;

      ctx.beginPath();
      ctx.arc(proj.x, proj.y, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(78, 205, 196, ${baseOpacity})`;
      ctx.fill();
    }

    // Draw conflict dots
    for (let i = 0; i < conflictPoints.length; i++) {
      const c = conflictPoints[i];
      const proj = projectPoint(c.lat, c.lng, centerX, centerY, radius);
      if (!proj) continue;

      const depthOpacity = 0.3 + proj.z * 0.7;
      // Sin-wave pulse: oscillate opacity between 0.4 and 0.8
      const pulse = 0.4 + 0.4 * (0.5 + 0.5 * Math.sin(time * 2 + i * 1.7));
      const opacity = pulse * depthOpacity;
      const dotSize = 3 + 1.5 * (0.5 + 0.5 * Math.sin(time * 2 + i * 1.7));

      // Glow
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, dotSize + 3, 0, Math.PI * 2);
      ctx.fillStyle = hexToRGBA(c.color, opacity * 0.2);
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = hexToRGBA(c.color, opacity);
      ctx.fill();
    }

    // Advance rotation
    rotation += ROTATION_SPEED;
    if (rotation > 360) rotation -= 360;
  }

  // --- Helpers ---
  function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  // --- Intersection Observer for visibility ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
    });
  }, { threshold: 0 });

  const heroSection = canvas.closest('.hero') || canvas.parentElement;
  if (heroSection) {
    observer.observe(heroSection);
  }

  // --- Window resize handler ---
  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  }
  window.addEventListener('resize', onResize);

  // --- Start animation ---
  animFrameId = requestAnimationFrame(render);

  // --- Cleanup ---
  return function cleanup() {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    window.removeEventListener('resize', onResize);
    if (heroSection) observer.unobserve(heroSection);
    observer.disconnect();
  };
}
