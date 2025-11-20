const CACHE_NAME = 'jin10-pwa-v1';
const urlsToCache = [
  './',
  './index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // 对于 API 请求，总是网络优先；对于静态资源，缓存优先
  if (event.request.url.includes('/api/')) {
      return; 
  }
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
