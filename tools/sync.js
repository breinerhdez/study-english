#!/usr/bin/env node
/* Sincroniza la plataforma tras añadir o editar archivos:
   1) content/manifest.js  → lista de temas (content/topics/*.js)
   2) sw-manifest.js       → lista de archivos para el modo sin internet + versión (hash)
   Uso: node tools/sync.js */
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const root = path.resolve(__dirname, "..");
const rel = p => path.relative(root, p).split(path.sep).join("/");

function walk(dir, out = []) {
  for (const n of fs.readdirSync(dir)) {
    const p = path.join(dir, n); const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}

function sync() {
  const topicsDir = path.join(root, "content", "topics");
  const topics = fs.existsSync(topicsDir) ? fs.readdirSync(topicsDir).filter(f => f.endsWith(".js")).sort() : [];
  fs.writeFileSync(path.join(root, "content", "manifest.js"),
    "/* GENERADO por tools/sync.js — no editar a mano */\nwindow.TOPIC_FILES = " + JSON.stringify(topics.map(f => "content/topics/" + f), null, 2) + ";\n");

  const include = ["index.html", "manifest.webmanifest", "sw-manifest.js"];
  const files = [];
  for (const d of ["css", "js", "data", "content", "icons"]) { const dd = path.join(root, d); if (fs.existsSync(dd)) walk(dd).forEach(p => files.push(rel(p))); }
  const all = [...new Set(["./", ...include, ...files])].filter(f => f !== "sw-manifest.js").sort();
  const hash = crypto.createHash("sha1");
  all.forEach(f => { if (f !== "./") hash.update(f).update(fs.readFileSync(path.join(root, f))); });
  const version = hash.digest("hex").slice(0, 10);
  fs.writeFileSync(path.join(root, "sw-manifest.js"),
    `/* GENERADO por tools/sync.js — no editar a mano */\nself.SW_VERSION = "${version}";\nself.SW_FILES = ${JSON.stringify([...all, "sw-manifest.js"], null, 2)};\n`);
  return { topics: topics.length, files: all.length + 1, version };
}
if (require.main === module) { const r = sync(); console.log(`✔ ${r.topics} tema(s), ${r.files} archivos en caché offline, versión ${r.version}`); }
module.exports = sync;
