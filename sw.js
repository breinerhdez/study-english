/* Service worker: la plataforma completa queda guardada y funciona sin internet.
   La lista de archivos y la versión se generan con `node tools/sync.js` (sw-manifest.js). */
importScripts("sw-manifest.js");
const CACHE = "english-studio-" + self.SW_VERSION;

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(self.SW_FILES.map(f => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("english-studio-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;
  // Red primero (siempre la versión más nueva); si no hay internet o tarda más de 3 s, la copia guardada.
  e.respondWith(caches.open(CACHE).then(async c => {
    const fromCache = () => c.match(req, { ignoreSearch: true });
    try {
      const r = await Promise.race([fetch(req), new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 3000))]);
      if (r && r.ok) c.put(req, r.clone());
      return r;
    } catch (err) {
      return (await fromCache()) || (req.mode === "navigate" ? c.match("index.html") : Response.error());
    }
  }));
});
