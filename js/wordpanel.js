/* Panel de palabra: al tocar cualquier palabra en inglés muestra IPA, significado, audio y
   permite guardarla como "desconocida" recordando el punto exacto donde se encontró. */
(function (App) {
  const { $, $$, esc } = App.u; const { icon } = App;
  let cur = null, selEl = null;
  const panel = () => $("#wordpanel");

  /* Ruta para volver al punto exacto */
  function locRoute(c, word) {
    if (!c) return "";
    if (c.topic === "reader") return `/lector/${c.blk}?s=${c.s}&w=${encodeURIComponent(word)}`;
    const q = new URLSearchParams({ b: c.blk }); if (c.s !== undefined && c.s !== "") q.set("s", c.s); q.set("w", word);
    return `/t/${c.topic}/${c.sec}?${q}`;
  }
  function ctxFrom(elm) {
    const s = elm.closest("[data-topic]"); if (!s) return null;
    return { topic: s.dataset.topic, sec: s.dataset.sec, blk: s.dataset.blk, s: s.dataset.s, text: s.dataset.text || s.textContent.replace(/\s+/g, " ").trim() };
  }

  function open(word, ctx, elm) {
    cur = { word, ctx };
    if (selEl) selEl.classList.remove("sel"); selEl = elm || null; if (selEl) selEl.classList.add("sel");
    render(); panel().classList.add("open");
    if (App.store.setting("autoplay") !== false) App.audio.speak(word);
  }
  function close() { panel().classList.remove("open"); if (selEl) selEl.classList.remove("sel"); selEl = null; cur = null; render(); }

  function highlight(text, word) {
    const re = new RegExp("\\b(" + word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")\\b", "i");
    return esc(text).replace(re, "<mark>$1</mark>");
  }

  function render() {
    const p = panel();
    if (!cur) {
      p.innerHTML = `<div class="grab"></div><div class="wp-empty"><h3>${icon("bookmark")} Palabras</h3>
        <p>Toca cualquier palabra en inglés para ver su <b>pronunciación (IPA)</b>, escucharla y guardarla si no la conoces.</p>
        <p class="muted">Las palabras guardadas se subrayan en amarillo en todos los textos y aparecen en <b>Vocabulario</b>, con un enlace al lugar exacto donde las encontraste.</p></div>`;
      return;
    }
    const { word, ctx } = cur; const d = App.dict.get(word); const v = App.store.d.vocab[word];
    const here = !!ctx && v && v.locs.some(l => l.topic === ctx.topic);
    const ipa = d ? (d.ipa || (d.baseIpa ? d.baseIpa : "")) : (v && v.ipa) || "";
    const es = d ? d.es : (v && v.es) || "";
    p.innerHTML = `<div class="grab"></div>
      <div class="wp-head"><div><div class="wp-word">${esc(word)}</div>
        <div class="wp-ipa ipa">${ipa ? "/" + esc(ipa) + "/" : '<span class="muted">sin IPA todavía</span>'}${d && d.approx ? ' <span class="muted" style="font-size:.8rem">(de “' + esc(d.base) + '”)</span>' : ""}</div></div>
        <button class="btn icon ghost wp-close" aria-label="Cerrar">${icon("x")}</button></div>
      ${d ? `<div class="wp-es">${esc(es)}</div>` : `<div class="wp-empty" style="padding:.4rem 0"><p>Esta palabra aún no está en el diccionario. Puedes escribir tu propio significado:</p>
         <div class="field"><input type="text" id="wp-es" placeholder="Significado en español" value="${esc(es)}" autocomplete="off"></div>
         <div class="field" style="margin-top:.5rem"><input type="text" id="wp-ipa" placeholder="IPA (opcional) ej. ˈwɜːrd" value="${esc(ipa)}" autocomplete="off"></div></div>`}
      ${ctx && ctx.text ? `<div class="wp-ctx">${highlight(ctx.text, word)}<div style="margin-top:.4rem"><button class="btn sm ghost" data-a="sent">${icon("vol")} Escuchar frase</button></div></div>` : ""}
      <div class="wp-actions">
        <div class="row"><button class="btn soft" data-a="play">${icon("vol")} Escuchar</button><button class="btn soft" data-a="slow">${icon("slow")} Lento</button></div>
        ${ctx ? `<button class="btn big wp-save ${here ? "saved" : "primary"}" data-a="save">${here ? icon("check") + " Guardada · quitar" : icon("bookmark") + " Guardar como desconocida"}</button>` : (v ? `<button class="btn danger" data-a="remove">${icon("trash")} Quitar de mi vocabulario</button>` : "")}
        ${!d ? `<a class="btn sm ghost" target="_blank" rel="noopener" href="https://www.wordreference.com/es/translation.asp?tranword=${encodeURIComponent(word)}">Buscar en WordReference (requiere internet)</a>` : ""}
      </div>
      ${v && v.locs.length ? `<div class="wp-links"><span class="label">Encontrada en</span>${v.locs.slice(0, 4).map(l => `<a href="#${esc(l.route)}">${icon("link")} ${esc(l.label)}</a>`).join("")}</div>` : ""}`;
  }

  function onAction(a) {
    if (!cur) return; const { word, ctx } = cur;
    if (a === "play") App.audio.speak(word);
    else if (a === "slow") App.audio.speak(word, { rate: App.audio.slowRate() });
    else if (a === "sent") App.audio.speak(ctx.text);
    else if (a === "remove") { App.store.removeWord(word); close(); }
    else if (a === "save") {
      const v = App.store.d.vocab[word];
      if (v && ctx && v.locs.some(l => l.topic === ctx.topic)) { App.store.removeWord(word, ctx.topic); App.u.toast("Quitada de este tema"); return; }
      const d = App.dict.get(word); let es = d ? d.es : "", ipa = d ? (d.ipa || d.baseIpa || "") : "";
      if (!d) {
        es = ($("#wp-es") || {}).value || ""; ipa = ($("#wp-ipa") || {}).value || "";
        if (es || ipa) { App.store.d.userDict[word] = [ipa.replace(/\//g, ""), es]; }
      }
      const route = locRoute(ctx, word);
      App.store.saveWord(word, { es, ipa }, { topic: ctx.topic, section: ctx.sec, block: ctx.blk, sent: ctx.s, text: ctx.text, route, label: App.topics.label(ctx.topic, ctx.sec, ctx.blk) + (ctx.topic !== "reader" && /^\d+$/.test(ctx.s || "") ? " · frase " + (+ctx.s + 1) : "") });
      App.u.toast("Guardada en tu vocabulario");
    }
  }

  function refreshSaved(root = document) {
    $$(".w[data-w]", root).forEach(n => n.classList.toggle("saved", App.store.isSaved(n.dataset.w)));
  }

  function init() {
    document.addEventListener("click", e => {
      const w = e.target.closest(".w[data-w]");
      if (w) { e.preventDefault(); open(w.dataset.w, ctxFrom(w), w); return; }
      const b = e.target.closest("#wordpanel [data-a]"); if (b) { onAction(b.dataset.a); return; }
      if (e.target.closest(".wp-close")) close();
    });
    document.addEventListener("keydown", e => {
      if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches(".w[data-w]")) { e.preventDefault(); e.target.click(); }
      if (e.key === "Escape" && cur) close();
    });
    App.store.on(w => { if (w === "vocab" || w === "import" || w === "reset") { refreshSaved(); if (cur) render(); } });
    render();
  }
  App.wordpanel = { init, open, close, refreshSaved, locRoute };
})(window.App);
