// Esta es la función que se activa al hacer clic en el botón
function mostrarBienvenida() {
    alert("¡Bienvenido a mi página web! 🎉 Todo está conectado correctamente.");
}
const CACHE_NAME = &#39;pwa-cache-v1&#39;;
const urlsToCache = [&#39;/&#39;, &#39;/index.html&#39;, &#39;/style.css&#39;];

self.addEventListener(&#39;install&#39;, event =&gt; {
event.waitUntil(
caches.open(CACHE_NAME).then(cache =&gt; cache.addAll(urlsToCache))
);
});
