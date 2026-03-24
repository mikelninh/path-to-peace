// ============================================
// Hash Router — #/ and #/conflict/:id
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

  if (hash.startsWith('/conflict/')) {
    const id = hash.split('/conflict/')[1];
    if (mainContent) mainContent.style.display = 'none';
    if (detailContainer) {
      detailContainer.style.display = 'block';
      detailContainer.scrollIntoView({ behavior: 'instant' });
    }
    if (onRouteChange) onRouteChange('conflict', id);
  } else {
    if (mainContent) mainContent.style.display = '';
    if (detailContainer) {
      detailContainer.style.display = 'none';
      detailContainer.innerHTML = '';
    }
    if (onRouteChange) onRouteChange('home', null);
  }
}
