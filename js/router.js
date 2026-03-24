// ============================================
// Hash Router — v4
// ============================================

let currentRoute = '/';
let onRouteChange = null;

export function initRouter(callback) {
  onRouteChange = callback;
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

export function navigate(path) {
  window.location.hash = path;
}

export function getCurrentRoute() {
  return currentRoute;
}

function handleRoute() {
  const hash = window.location.hash.slice(1) || '/';
  currentRoute = hash;

  const mainContent = document.getElementById('main-content');
  const detailContainer = document.getElementById('detail-container');

  // Determine route type
  let route = 'home';
  let id = null;

  if (hash.startsWith('/conflict/')) { route = 'conflict'; id = hash.split('/conflict/')[1]; }
  else if (hash.startsWith('/educators')) { route = 'educators'; }
  else if (hash.startsWith('/lesson/')) { route = 'lesson'; id = hash.split('/lesson/')[1]; }
  else if (hash.startsWith('/module/')) { route = 'module'; id = hash.split('/module/')[1]; }
  else if (hash.startsWith('/quiz/')) { route = 'quiz'; id = hash.split('/quiz/')[1]; }
  else if (hash.startsWith('/write')) { route = 'write'; }
  else if (hash.startsWith('/arms-trade')) { route = 'arms-trade'; }
  else if (hash.startsWith('/peace-progress')) { route = 'peace-progress'; }
  else if (hash.startsWith('/simulate')) { route = 'simulate'; id = hash.split('/simulate/')[1] || 'select'; }
  else if (hash.startsWith('/methodology')) { route = 'methodology'; }

  // Show/hide containers
  if (route === 'home') {
    if (mainContent) mainContent.style.display = '';
    if (detailContainer) {
      detailContainer.style.display = 'none';
      detailContainer.innerHTML = '';
    }
  } else {
    if (mainContent) mainContent.style.display = 'none';
    if (detailContainer) {
      detailContainer.innerHTML = '';
      detailContainer.style.display = 'block';
    }
  }

  if (onRouteChange) onRouteChange(route, id);
}
