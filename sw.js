const CACHE_NAME = 'pwa-offline-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/offline.html'
    // Agrega aquí tus archivos CSS, JS o imágenes principales si los necesitas
];

// 1. Evento de Instalación: Guarda los archivos esenciales en el caché
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// 2. Evento de Activación: Limpia cachés antiguos si actualizas la versión
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 3. Evento Fetch: Intercepta las peticiones de red
self.addEventListener('fetch', (event) => {
    // Solo manejamos peticiones de tipo GET
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .catch(() => {
                // Si falla la red, intentamos buscar en el caché
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    
                    // Si el usuario intenta navegar a una página HTML y no hay red ni caché específico,
                    // mostramos la página de "offline.html" por defecto.
                    if (event.request.headers.get('accept').includes('text/html')) {
                        return caches.match('/offline.html');
                    }
                });
            })
    );
});
