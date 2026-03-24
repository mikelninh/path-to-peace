// ============================================
// SVG Icon Sprite — Replaces all emoji usage
// ============================================
//
// Usage: <svg class="icon"><use href="#icon-NAME"/></svg>
// Call injectIconSprite() once on page load (before rendering).

/**
 * Inject a hidden SVG sprite sheet into document.body.
 * Each symbol uses a 24x24 viewBox with 1.5px stroke, rounded caps/joins.
 */
export function injectIconSprite() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = `

<!-- peace — classic peace symbol -->
<symbol id="icon-peace" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-width="1.5"/>
  <line x1="12" y1="12" x2="5.5" y2="19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="12" y1="12" x2="18.5" y2="19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</symbol>

<!-- globe — circle with latitude/longitude lines -->
<symbol id="icon-globe" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1.5"/>
  <path d="M3.5 8h17M3.5 16h17" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
</symbol>

<!-- people — two person silhouettes -->
<symbol id="icon-people" viewBox="0 0 24 24">
  <circle cx="9" cy="7" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <path d="M3 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <circle cx="17" cy="8" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <path d="M21 20c0-2.761-1.79-5-4-5-1.03 0-1.966.39-2.68 1.03" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
</symbol>

<!-- calendar — rectangle with date dots -->
<symbol id="icon-calendar" viewBox="0 0 24 24">
  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="1.5"/>
  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="8" cy="15" r="1" fill="currentColor" stroke="none"/>
  <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none"/>
  <circle cx="16" cy="15" r="1" fill="currentColor" stroke="none"/>
</symbol>

<!-- home-broken — house with crack -->
<symbol id="icon-home-broken" viewBox="0 0 24 24">
  <path d="M3 12L12 3l9 9" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5 10v10h14V10" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 8l-1 4 2 1-1 4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>

<!-- shield — shield shape -->
<symbol id="icon-shield" viewBox="0 0 24 24">
  <path d="M12 2L3 6v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6L12 2z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>

<!-- flag — flag on pole -->
<symbol id="icon-flag" viewBox="0 0 24 24">
  <line x1="4" y1="2" x2="4" y2="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M4 3h13l-3 4 3 4H4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>

<!-- map-pin — location marker -->
<symbol id="icon-map-pin" viewBox="0 0 24 24">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
</symbol>

<!-- chart-bar — bar chart -->
<symbol id="icon-chart-bar" viewBox="0 0 24 24">
  <rect x="3" y="12" width="4" height="9" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <rect x="10" y="7" width="4" height="14" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <rect x="17" y="3" width="4" height="18" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/>
</symbol>

<!-- book — open book -->
<symbol id="icon-book" viewBox="0 0 24 24">
  <path d="M2 4c2-1 4.5-1.5 7-1.5S13 3 14 4v15c-1-.5-3-1-5-1s-4.5.5-7 1.5V4z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14 4c1-1 3.5-1.5 5-1.5S22 3 22 4v15c-1-.5-2-1-3-1s-3.5.5-5 1.5V4z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>

<!-- megaphone — megaphone/speaker -->
<symbol id="icon-megaphone" viewBox="0 0 24 24">
  <path d="M18 3v18l-8-5H4a1 1 0 01-1-1V9a1 1 0 011-1h6l8-5z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11 16v3a2 2 0 004 0v-1" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20.5 7.5c1 1.5 1 4.5 0 6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
</symbol>

<!-- handshake — two hands meeting -->
<symbol id="icon-handshake" viewBox="0 0 24 24">
  <path d="M2 11l4-4 4 2 3-3 4 2 5-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7 13l3 3 4-4 3 3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 11l2 2M22 7l-2 2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M10 16l-3 3M17 15l-3 3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
</symbol>

<!-- crosshair — target/crosshair -->
<symbol id="icon-crosshair" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <line x1="12" y1="1" x2="12" y2="5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="1" y1="12" x2="5" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="19" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</symbol>

<!-- scales — balance scales -->
<symbol id="icon-scales" viewBox="0 0 24 24">
  <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M4 6l-2 8h8L8 6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 6l-2 8h-4l-2-8" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 14a4 4 0 008 0M14 14a4 4 0 008 0" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <line x1="9" y1="22" x2="15" y2="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</symbol>

<!-- arrow-right — right arrow -->
<symbol id="icon-arrow-right" viewBox="0 0 24 24">
  <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <polyline points="14 6 20 12 14 18" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>

<!-- chevron-down — down chevron -->
<symbol id="icon-chevron-down" viewBox="0 0 24 24">
  <polyline points="6 9 12 15 18 9" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>

<!-- search — magnifying glass -->
<symbol id="icon-search" viewBox="0 0 24 24">
  <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</symbol>

<!-- close — X mark -->
<symbol id="icon-close" viewBox="0 0 24 24">
  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</symbol>

<!-- message — chat bubble -->
<symbol id="icon-message" viewBox="0 0 24 24">
  <path d="M21 12c0 4.418-4.03 8-9 8-1.6 0-3.11-.36-4.41-1L3 21l1.5-4.08C3.56 15.56 3 13.84 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>

<!-- warning — triangle with exclamation -->
<symbol id="icon-warning" viewBox="0 0 24 24">
  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none"/>
</symbol>

<!-- check — checkmark -->
<symbol id="icon-check" viewBox="0 0 24 24">
  <polyline points="4 12 9 17 20 6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>

<!-- star — 5-point star -->
<symbol id="icon-star" viewBox="0 0 24 24">
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>

<!-- external — arrow pointing out of box -->
<symbol id="icon-external" viewBox="0 0 24 24">
  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline points="15 3 21 3 21 9" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</symbol>

<!-- help — question mark in circle -->
<symbol id="icon-help" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none"/>
</symbol>

<!-- fuel — fuel pump (for resources) -->
<symbol id="icon-fuel" viewBox="0 0 24 24">
  <rect x="3" y="4" width="12" height="16" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <rect x="6" y="7" width="6" height="5" rx="0.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <path d="M15 10h2a2 2 0 012 2v5a2 2 0 004 0V7l-3-3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>

<!-- crown — for power/governance -->
<symbol id="icon-crown" viewBox="0 0 24 24">
  <path d="M2 18l3-12 5 6 2-9 2 9 5-6 3 12H2z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="2" y1="21" x2="22" y2="21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</symbol>

<!-- dove — for identity/religion -->
<symbol id="icon-dove" viewBox="0 0 24 24">
  <path d="M12 6c-2-3-6-3-8-1s-2 6 1 8l7 7 2-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 6c2-3 7-3 9 0s1 7-2 9" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 11l4-2" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
</symbol>

<!-- columns — for colonial legacy / institutions -->
<symbol id="icon-columns" viewBox="0 0 24 24">
  <line x1="2" y1="4" x2="22" y2="4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="2" y1="20" x2="22" y2="20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="6" y1="4" x2="6" y2="20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="18" y1="4" x2="18" y2="20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</symbol>

<!-- radiation — for nuclear/arms -->
<symbol id="icon-radiation" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <path d="M12 2a10 10 0 00-8.66 5l5 2.86" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M12 2a10 10 0 018.66 5l-5 2.86" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M3.34 17a10 10 0 0017.32 0l-5-2.86" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
</symbol>

<!-- coins — for economic inequality -->
<symbol id="icon-coins" viewBox="0 0 24 24">
  <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <path d="M15.83 7.17A7 7 0 0122 14c0 3.87-3.13 7-7 7a7 7 0 01-6.83-5.17" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <line x1="9" y1="6" x2="9" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="7" y1="8" x2="11" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="7" y1="10" x2="11" y2="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</symbol>

<!-- thermometer — for climate/scarcity -->
<symbol id="icon-thermometer" viewBox="0 0 24 24">
  <path d="M14 14.76V3a2 2 0 10-4 0v11.76a4 4 0 104 0z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="12" y1="9" x2="12" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</symbol>

<!-- refresh — for patterns/recurrence -->
<symbol id="icon-refresh" viewBox="0 0 24 24">
  <polyline points="1 4 1 10 7 10" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline points="23 20 23 14 17 14" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>

<!-- trending-up — for positive trends -->
<symbol id="icon-trending-up" viewBox="0 0 24 24">
  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline points="16 7 22 7 22 13" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>

<!-- construction — for post-conflict rebuild -->
<symbol id="icon-construction" viewBox="0 0 24 24">
  <rect x="2" y="18" width="20" height="4" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <path d="M6 18V8l6-5 6 5v10" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="10" y="12" width="4" height="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
</symbol>

<!-- users-plus — for power-sharing -->
<symbol id="icon-users-plus" viewBox="0 0 24 24">
  <circle cx="9" cy="7" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <path d="M3 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <line x1="19" y1="8" x2="19" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="16" y1="11" x2="22" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</symbol>

<!-- cart — shopping cart for economic power -->
<symbol id="icon-cart" viewBox="0 0 24 24">
  <circle cx="9" cy="21" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <circle cx="19" cy="21" r="1.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <path d="M1 1h4l2.68 13.39a1 1 0 001 .81h9.72a1 1 0 001-.76L22 6H6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>

<!-- speech — speech bubble for dialogue -->
<symbol id="icon-speech" viewBox="0 0 24 24">
  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>

<!-- school — for educators -->
<symbol id="icon-school" viewBox="0 0 24 24">
  <path d="M22 10l-10-6L2 10l10 6 10-6z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6 12v5c0 2 2.686 4 6 4s6-2 6-4v-5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="22" y1="10" x2="22" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</symbol>

<!-- sparkles — for peace/positive -->
<symbol id="icon-sparkles" viewBox="0 0 24 24">
  <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>

<!-- gamepad — for simulator -->
<symbol id="icon-gamepad" viewBox="0 0 24 24">
  <rect x="2" y="6" width="20" height="12" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <line x1="8" y1="10" x2="8" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="6" y1="12" x2="10" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="16" cy="10.5" r="0.75" fill="currentColor" stroke="none"/>
  <circle cx="18" cy="13" r="0.75" fill="currentColor" stroke="none"/>
</symbol>

<!-- target — for arms/crosshair (alternate) -->
<symbol id="icon-target" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
</symbol>

`;
  document.body.insertBefore(svg, document.body.firstChild);
}

/**
 * Helper: returns the SVG use markup for a given icon name.
 * @param {string} name — icon id without the "icon-" prefix
 * @param {string} [cls] — additional CSS classes
 * @returns {string} — SVG markup string for use in template literals
 */
export function icon(name, cls = '') {
  const classes = cls ? `icon ${cls}` : 'icon';
  return `<svg class="${classes}" aria-hidden="true"><use href="#icon-${name}"/></svg>`;
}
