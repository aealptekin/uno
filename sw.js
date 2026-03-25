const CACHE_NAME = 'uno-pro-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js'
];

// Kurulum aşamasında dosyaları önbelleğe al
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Önbellek açıldı');
        return cache.addAll(urlsToCache);
      })
  );
});

// İstekleri yakala ve önbellekten veya ağdan getir
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Önbellekte varsa onu döndür, yoksa ağdan çek
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});