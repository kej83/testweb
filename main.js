// CURSOR
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorRing.style.left = e.clientX + 'px';
  cursorRing.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '16px'; cursor.style.height = '16px';
    cursorRing.style.width = '56px'; cursorRing.style.height = '56px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '8px'; cursor.style.height = '8px';
    cursorRing.style.width = '36px'; cursorRing.style.height = '36px';
  });
});

// NAV + TOP BAR SCROLL
const navbar = document.getElementById('navbar');
const topBar = document.querySelector('.top-bar');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 60;
  navbar.classList.toggle('scrolled', scrolled);
  if (topBar) topBar.style.opacity = scrolled ? '0' : '1';
  if (topBar) topBar.style.pointerEvents = scrolled ? 'none' : '';
});

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// VIDEO — INLINE PLAY (one at a time)
document.querySelectorAll('.media-card').forEach(card => {
  const thumbLayer = card.querySelector('.media-thumb-layer');
  const iframeLayer = card.querySelector('.media-iframe-layer');
  const videoId = card.dataset.videoId;

  thumbLayer.addEventListener('click', () => {
    if (card.classList.contains('playing')) return;

    // Stop any other card that's currently playing
    document.querySelectorAll('.media-card.playing').forEach(other => {
      other.querySelector('.media-iframe-layer').innerHTML = '';
      other.classList.remove('playing');
    });

    // Build and inject a fresh iframe for this card
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src',
      `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    );
    iframe.setAttribute('title', 'YouTube video player');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
    );
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;display:block;';

    iframeLayer.appendChild(iframe);
    card.classList.add('playing');
  });
});


// CONTACT FORM FEEDBACK
const formSubmit = document.querySelector('.form-submit');
if (formSubmit) {
  formSubmit.addEventListener('click', () => {
    formSubmit.textContent = 'Message Sent ✦';
    formSubmit.style.background = 'var(--gold-dim)';
    setTimeout(() => {
      formSubmit.textContent = 'Send Message';
      formSubmit.style.background = '';
    }, 3000);
  });
}
