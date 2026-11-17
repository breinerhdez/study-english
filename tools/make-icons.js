#!/usr/bin/env node
/* Genera los íconos PNG de la app (sin dependencias). Uso: node tools/make-icons.js */
const fs = require("fs"), zlib = require("zlib"), path = require("path");
const out = path.resolve(__dirname, "..", "icons");
function crc32(buf) { let c, crc = ~0; for (let n = 0; n < buf.length; n++) { c = (crc ^ buf[n]) & 255; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; crc = (crc >>> 8) ^ c; } return ~crc >>> 0; }
function chunk(t, d) { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc32(td)); return Buffer.concat([l, td, c]); }
function png(size, maskable) {
  const px = Buffer.alloc(size * size * 4);
  const pad = maskable ? 0.18 : 0; // zona segura
  const bars = [.34, .62, .9, .62, .34].map(h => h * (1 - pad * 1.2));
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = x / size, v = y / size; const i = (y * size + x) * 4;
    // fondo: degradado índigo, esquinas redondeadas (salvo maskable)
    let a = 255; if (!maskable) { const r = .22, cx = Math.min(u, 1 - u), cy = Math.min(v, 1 - v); if (cx < r && cy < r) { const d = Math.hypot(r - cx, r - cy); a = d > r ? 0 : d > r - .004 ? 160 : 255; } }
    const t = (u + v) / 2; let R = 99 + (67 - 99) * t, G = 102 + (56 - 102) * t, B = 241 + (202 - 241) * t, white = 0;
    // 5 barras de "onda de sonido"
    const span = .56 * (1 - pad), x0 = .5 - span / 2, bw = span / 9;
    for (let k = 0; k < 5; k++) {
      const bx = x0 + k * 2 * bw, h = bars[k] * .62; const cx = bx + bw / 2, cy = .5;
      const dx = Math.abs(u - cx) - 0, dy = Math.abs(v - cy);
      const rad = bw / 2; const inRect = Math.abs(u - cx) <= rad && dy <= h / 2 - rad;
      const cap = Math.hypot(u - cx, dy - (h / 2 - rad)) <= rad;
      if (inRect || cap) white = 1;
    }
    if (white) { R = G = B = 255; }
    px[i] = R; px[i + 1] = G; px[i + 2] = B; px[i + 3] = a;
  }
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) { raw[y * (size * 4 + 1)] = 0; px.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4); }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
}
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "icon-192.png"), png(192, false));
fs.writeFileSync(path.join(out, "icon-512.png"), png(512, false));
fs.writeFileSync(path.join(out, "icon-maskable-512.png"), png(512, true));
fs.writeFileSync(path.join(out, "icon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6366f1"/><stop offset="1" stop-color="#4338ca"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="url(#g)"/><g fill="#fff">${[.34, .62, .9, .62, .34].map((h, k) => { const hh = h * .62 * 512, w = 28, x = 512 * (.5 - .28) + k * 2 * w - 0; return `<rect x="${(x).toFixed(1)}" y="${(256 - hh / 2).toFixed(1)}" width="${w}" height="${hh.toFixed(1)}" rx="14"/>`; }).join("")}</g></svg>\n`);
console.log("✔ íconos generados en icons/");
