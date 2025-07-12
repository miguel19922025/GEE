// service-worker.js
const CACHE_NAME = 'gee-app-v1';
const urlsToCache = [
  // IMPORTANTE: Asegúrate de que 'GEE-App' sea el nombre EXACTO de tu repositorio de GitHub.
  // Si tu aplicación está en la raíz de un dominio personalizado (ej. 'midominio.com'), puedes usar '/' en su lugar.
  '/GEE-App/', // La raíz de tu aplicación en GitHub Pages
  '/GEE-App/index.html',
  '/GEE-App/manifest.json',
  '/GEE-App/service-worker.js',
  'https://cdn.tailwindcss.com', // Cacha también Tailwind CSS
  // Asegúrate de que estos nombres de iconos coincidan con los de tu manifest.json y con los archivos físicos
  '/GEE-App/icons/icon-192x192.png',
  '/GEE-App/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
