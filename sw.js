// Dev Medistore Service Worker v1.3
const CACHE = 'devmedistore-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './images/logo-192.png',
  './images/logo-512.png',
  './images/logo-192-maskable.png',
  './images/logo-512-maskable.png',
  './images/apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;600;700;800&display=swap'
];

// Install: cache core assets
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return Promise.allSettled(
        ASSETS.map(url => cache.add(url).catch(()=>{}))
      );
    })
  );
});

// Activate: clear old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for same-origin, network-first for CDN
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Network-first for WhatsApp links
  if(url.hostname === 'wa.me') return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if(cached) return cached;
      return fetch(e.request).then(response => {
        if(response && response.status === 200 && response.type !== 'opaque') {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback for navigation
        if(e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// Background sync / push placeholder
self.addEventListener('message', e => {
  if(e.data === 'skipWaiting') self.skipWaiting();
});
