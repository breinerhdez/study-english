#!/usr/bin/env node
/* Valida el contenido: palabras sin IPA/significado, ejercicios mal formados, IDs repetidos.
   Uso: node tools/validate.js        (sale con código 1 si hay errores) */
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.resolve(__dirname, "..");
global.window = global; global.App = window.App = { store: { d: { userDict: {}, vocab: {} }, isSaved: () => false } };
App.u = { esc: s => String(s) };
const load = f => vm.runInThisContext(fs.readFileSync(path.join(root, f), "utf8"), { filename: f });
load("data/dictionary.js"); load("js/dict.js"); load("js/topics.js");
const dir = path.join(root, "content/topics");
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith(".js")).sort() : [];
let errors = 0, warns = 0; const err = (m) => { errors++; console.log("  ✖ " + m); }; const warn = (m) => { warns++; console.log("  ! " + m); };

// 1) Diccionario base
const IPA_OK = /^[iɪɛæɑɔʊuʌəɝɚeaoɡpbtdkfvθðszʃʒhmnŋlrwjˈˌː\s]+$/;
for (const [w, e] of Object.entries(window.DICT_BASE)) if (!IPA_OK.test(e[0].replace(/tʃ|dʒ|aɪ|aʊ|ɔɪ|eɪ|oʊ/g, "x") .replace(/x/g, "t"))) warn(`IPA con símbolo raro en “${w}”: ${e[0]}`);

files.forEach(f => vm.runInThisContext(fs.readFileSync(path.join(dir, f), "utf8"), { filename: f }));
console.log(`\nValidando ${App.topics.list.length} tema(s)…`);

const englishOf = (t) => {
  const out = []; const brace = s => { (String(s).match(/\{\{(.+?)\}\}/g) || []).forEach(m => out.push(m.slice(2, -2))); };
  t.sections.forEach(s => s.blocks.forEach(b => {
    if (b.es) brace(b.es); if (b.intro) brace(b.intro); (b.items || []).forEach(i => { if (typeof i === "string") brace(i); else { if (i.en) out.push(i.en); if (i.note) brace(i.note); } });
    (b.rows || []).forEach(r => r.forEach(brace)); (b.paragraphs || []).forEach(p => out.push(p.en)); (b.phrases || []).forEach(p => out.push(p.en));
    (b.groups || []).forEach(g => { (g.words || []).forEach(w => out.push(typeof w === "string" ? w : w.w)); if (g.tip) brace(g.tip); });
    if (b.type === "exercises") b.items.forEach(i => {
      if (i.audio) out.push(i.audio); if (i.type === "order") out.push(i.a);
      const es = /[¿¡áéíóúñ«»]/.test(i.q || "");
      if (i.full) out.push(i.full);
      else if (i.type === "fill" && !i.dictation) { if (/_{3}/.test(i.q) && !es) out.push(i.q.replace(/\s*\([^)]*\)/g, "").replace(/_{3,}/g, "")); else out.push(i.a[0]); }
      else if (i.type === "mcq" && /_{3}/.test(i.q) && !es) out.push(i.q.replace(/_{3,}/g, ""));
      if (i.type === "mcq" && i.hideOnAudio) i.opts.forEach(o => out.push(o)); if (i.type === "match") i.pairs.forEach(p => { if (!/[+]/.test(p[0])) out.push(p[0]); });
    });
  }));
  return out;
};

for (const t of App.topics.list) {
  console.log(`\n● ${t.id} — ${t.title}`);
  if (!t.title || !t.id) err("falta id o title");
  const secIds = new Set();
  t.sections.forEach(s => { if (secIds.has(s.id)) err(`sección repetida: ${s.id}`); secIds.add(s.id); const bi = new Set(); s.blocks.forEach(b => { if (bi.has(b.id)) err(`bloque repetido ${s.id}.${b.id}`); bi.add(b.id); }); });
  let nEx = 0;
  t.sections.forEach(s => s.blocks.forEach(b => {
    if (b.type === "exercises") b.items.forEach(i => {
      nEx++; const where = `${i.id}`;
      if (i.type === "mcq") { if (!Array.isArray(i.opts) || i.opts.length < 2) err(`${where}: mcq necesita ≥2 opciones`); [].concat(i.a).forEach(a => { if (!(a >= 0 && a < i.opts.length)) err(`${where}: índice de respuesta fuera de rango`); }); }
      else if (i.type === "fill") { if (!i.a || !i.a.length) err(`${where}: fill sin respuestas`); }
      else if (i.type === "order") { if (!i.a || i.a.split(/\s+/).length < 2) err(`${where}: order necesita una frase`); }
      else if (i.type === "match") { if (!i.pairs || i.pairs.length < 2) err(`${where}: match necesita ≥2 pares`); }
      else err(`${where}: tipo desconocido “${i.type}”`);
      if (!i.why) warn(`${where}: sin explicación (why): el estudiante no sabrá por qué falló`);
    });
  }));
  console.log(`  ${nEx} ejercicios`);
  App.dict.registerTopic(t.words);
  const miss = new Set(); englishOf(t).forEach(x => App.dict.missing(x).forEach(w => miss.add(w)));
  if (miss.size) { warn(`${miss.size} palabra(s) sin IPA/significado (añádelas a data/dictionary.js o a words del tema):`); console.log("    " + [...miss].sort().join(", ")); }
  Object.keys(t.words || {}).forEach(w => { if (!IPA_OK.test(t.words[w][0].replace(/tʃ|dʒ|aɪ|aʊ|ɔɪ|eɪ|oʊ/g, "t"))) warn(`IPA raro en words.${w}`); });
}
console.log(`\n${errors ? "✖" : "✔"} ${errors} error(es), ${warns} aviso(s)\n`);
process.exit(errors ? 1 : 0);
