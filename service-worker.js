// service-worker.js
const CACHE_NAME = 'gee-app-v1';
const urlsToCache = [
  // IMPORTANTE: Reemplaza YOUR_GITHUB_REPO_NAME con el nombre de tu repositorio de GitHub (ej. GEE-App)
  '/YOUR_GITHUB_REPO_NAME/', // La raíz de tu aplicación ahora será /YOUR_GITHUB_REPO_NAME/
  '/YOUR_GITHUB_REPO_NAME/index.html',
  '/YOUR_GITHUB_REPO_NAME/manifest.json',
  '/YOUR_GITHUB_REPO_NAME/service-worker.js',
  'https://cdn.tailwindcss.com', // Cacha también Tailwind CSS
  // Agrega aquí todas las rutas a tus iconos
  '/YOUR_GITHUB_REPO_NAME/icons/gee-icon-192x192.png',
  '/YOUR_GITHUB_REPO_NAME/icons/gee-icon-512x512.png'
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
