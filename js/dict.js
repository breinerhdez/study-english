/* Diccionario: busca palabras (con IPA y significado) y divide textos en palabras.
   Fuentes, de mayor a menor prioridad: palabras añadidas por el usuario → palabras del tema → diccionario base. */
(function (App) {
  const { esc } = App.u;
  const topicWords = {};     // se llena cuando se registra un tema
  const BASE = () => window.DICT_BASE || {};
  const WORD_RE = /[\p{L}]+(?:['’][\p{L}]+)*/gu;

  const clean = w => w.toLowerCase().replace(/’/g, "'");

  function exact(w) {
    const u = App.store.d.userDict[w]; if (u) return { ipa: u[0], es: u[1], src: "user" };
    const t = topicWords[w]; if (t) return { ipa: t[0], es: t[1], src: "topic" };
    const b = BASE()[w]; if (b) return { ipa: b[0], es: b[1], src: "base" };
    return null;
  }
  /* Formas flexionadas: busca la palabra base (plural, -ed, -ing, 's) y deriva la IPA de la terminación. */
  function candidates(w) {
    const c = [];
    if (w.endsWith("'s")) c.push([w.slice(0, -2), "s"]);
    if (w.endsWith("ies")) c.push([w.slice(0, -3) + "y", "s"]);
    if (w.endsWith("es")) c.push([w.slice(0, -2), "s"]);
    if (w.endsWith("s")) c.push([w.slice(0, -1), "s"]);
    if (w.endsWith("ied")) c.push([w.slice(0, -3) + "y", "ed"]);
    if (w.endsWith("ed")) { c.push([w.slice(0, -2), "ed"], [w.slice(0, -1), "ed"]); if (/(.)\1ed$/.test(w)) c.push([w.slice(0, -3), "ed"]); }
    if (w.endsWith("ing")) { c.push([w.slice(0, -3), "ing"], [w.slice(0, -3) + "e", "ing"]); if (/(.)\1ing$/.test(w)) c.push([w.slice(0, -4), "ing"]); }
    if (w.endsWith("ly")) c.push([w.slice(0, -2), "ly"]);
    if (w.endsWith("er")) c.push([w.slice(0, -2), "er"]);
    return c;
  }
  function inflectIpa(ipa, kind) {
    if (!ipa) return "";
    const end = ipa.replace(/[ˈˌː]/g, "");
    const sib = /(s|z|ʃ|ʒ|tʃ|dʒ)$/.test(end), vl = /(p|t|k|f|θ)$/.test(end);
    if (kind === "s") return ipa + (sib ? "ɪz" : vl ? "s" : "z");
    if (kind === "ed") return ipa + (/(t|d)$/.test(end) ? "ɪd" : (vl || /(s|ʃ)$/.test(end)) ? "t" : "d");
    if (kind === "ing") return ipa + "ɪŋ";
    if (kind === "ly") return ipa + "li";
    if (kind === "er") return ipa.replace(/ɚ$/, "") + "ɚ";
    return "";
  }
  function get(raw) {
    const w = clean(raw); const hit = exact(w);
    if (hit) return Object.assign({ word: w, form: null }, hit);
    for (const [b, kind] of candidates(w)) { const h = exact(b); if (h) return { word: w, base: b, form: b, ipa: inflectIpa(h.ipa, kind), es: h.es, baseIpa: h.ipa, src: h.src, approx: true }; }
    return null;
  }

  /* Divide un texto en trozos: { w:'palabra' } o { s:' , ' } (separadores) */
  function split(text) {
    const out = []; let last = 0, m; WORD_RE.lastIndex = 0;
    while ((m = WORD_RE.exec(text))) { if (m.index > last) out.push({ s: text.slice(last, m.index) }); out.push({ w: m[0] }); last = m.index + m[0].length; }
    if (last < text.length) out.push({ s: text.slice(last) });
    return out;
  }
  /* División en oraciones conservando la puntuación. */
  function sentences(text) {
    const parts = String(text).replace(/\s+/g, " ").trim().match(/[^.!?…]+(?:[.!?…]+["”')\]]*|$)\s*/g) || [text];
    return parts.map(s => s.trim()).filter(Boolean);
  }

  /* HTML de un texto con palabras clicables. ipaOn añade data-ipa (para el modo "IPA bajo cada palabra"). */
  function html(text) {
    return split(text).map(t => {
      if (t.s !== undefined) return t.s.trim() ? `<span class="p">${esc(t.s)}</span>` : esc(t.s);
      const lw = clean(t.w); const d = get(lw); const saved = App.store.isSaved(lw);
      const ipa = d && d.ipa ? ` data-ipa="${esc(d.ipa)}"` : "";
      return `<span class="w${saved ? " saved" : ""}" data-w="${esc(lw)}"${ipa} role="button" tabindex="0">${esc(t.w)}</span>`;
    }).join("");
  }

  App.dict = {
    get, split, sentences, html, clean,
    registerTopic(map) { Object.keys(map || {}).forEach(k => { topicWords[clean(k)] = map[k]; }); },
    /* palabras de un texto que no están en ningún diccionario (para la validación) */
    missing(text) { return [...new Set(split(text).filter(t => t.w).map(t => clean(t.w)).filter(w => !get(w)))]; }
  };
})(window.App);
