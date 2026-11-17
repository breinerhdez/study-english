#!/usr/bin/env node
/* Servidor local sin dependencias. Uso: node tools/serve.js [puerto]
   Sincroniza antes de arrancar y muestra la dirección para abrir desde el celular (misma WiFi). */
const http = require("http"), fs = require("fs"), path = require("path"), os = require("os");
const sync = require("./sync");
const root = path.resolve(__dirname, "..");
const port = +process.argv[2] || 8080;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon" };
sync();
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
  if (/^\/(content\/manifest|sw-manifest)\.js$/.test(p)) sync(); // siempre al día mientras desarrollas
  const f = path.join(root, p);
  if (!f.startsWith(root) || p.startsWith("/guides") || p.startsWith("/tools")) { res.writeHead(404); return res.end("No encontrado"); }
  fs.readFile(f, (err, buf) => {
    if (err) { res.writeHead(404); return res.end("No encontrado"); }
    res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream", "Cache-Control": "no-cache" }); res.end(buf);
  });
}).listen(port, "0.0.0.0", () => {
  console.log(`\n  English Studio →  http://localhost:${port}`);
  Object.values(os.networkInterfaces()).flat().filter(i => i.family === "IPv4" && !i.internal).forEach(i => console.log(`  En tu celular    →  http://${i.address}:${port}`));
  console.log("\n  (Ctrl+C para detener)\n");
});
