// Guarda la app en el móvil para que abra sin conexión.
// Con conexión pide siempre la versión nueva; sin conexión, sirve la guardada.
// El historial de Pater vive en localStorage, no aquí: cambiar de caché no lo toca.
const CACHE = 'pater-v4';
// Sin './': en la web, la carpeta redirige a index.html y una respuesta redirigida no vale para abrir la app.
const ARCHIVOS = [
  'index.html', 'style.css', 'app.js', 'manifest.webmanifest',
  'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'
];

self.addEventListener('install', e => {
  // cache: 'reload' salta la caché HTTP del móvil, para no guardar otra vez la versión vieja.
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ARCHIVOS.map(a => new Request(a, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(claves => Promise.all(claves.filter(k => k.startsWith('pater-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(cache =>
      fetch(e.request, { cache: 'no-cache' })
        .then(r => { if (r.ok && !r.redirected) cache.put(e.request, r.clone()); return r; })
        .catch(async () =>
          (await cache.match(e.request, { ignoreSearch: true })) ||
          (e.request.mode === 'navigate' ? cache.match('index.html') : Response.error()))
    )
  );
});
