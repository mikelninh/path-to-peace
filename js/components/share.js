// ============================================
// Social Sharing
// ============================================

const SITE_URL = 'https://mikelninh.github.io/path-to-peace/';

export function addShareButtons(container, title, description, hash) {
  if (!container) return;

  const url = SITE_URL + (hash || '');
  const text = title + ' — ' + description;

  const shareHTML = `
    <div class="share-bar">
      <span class="share-label">Share:</span>
      <button class="share-btn" data-platform="twitter" title="Share on X/Twitter">𝕏</button>
      <button class="share-btn" data-platform="linkedin" title="Share on LinkedIn">in</button>
      <button class="share-btn" data-platform="whatsapp" title="Share on WhatsApp">💬</button>
      <button class="share-btn share-copy" data-platform="copy" title="Copy link">🔗</button>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', shareHTML);

  container.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const platform = btn.dataset.platform;
      const encodedUrl = encodeURIComponent(url);
      const encodedText = encodeURIComponent(text);

      switch (platform) {
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank', 'width=600,height=400');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank', 'width=600,height=400');
          break;
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, '_blank');
          break;
        case 'copy':
          navigator.clipboard.writeText(url).then(() => {
            btn.textContent = '✓';
            setTimeout(() => { btn.textContent = '🔗'; }, 2000);
          });
          break;
      }
    });
  });
}
