/* Vocabulario global: lista, filtros, enlaces al punto exacto y tarjetas de repaso. */
(function (App) {
  const { esc, el, $, $$ } = App.u; const { icon } = App; const T = App.topics; const V = App.views;

  function ctxMark(text, word) {
    if (!text) return ""; const re = new RegExp("\\b(" + word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "i");
    return esc(text).replace(re, "<mark>$1</mark>");
  }
  /* Tarjeta de palabra (se usa en Vocabulario y en "Mi vocabulario" de cada tema) */
  function card(v, o = {}) {
    const locs = o.topic ? v.locs.filter(l => l.topic === o.topic) : v.locs;
    const first = locs[0];
    return `<div class="card v-card flat" data-w="${esc(v.word)}">
      <div class="v-top"><button class="btn icon play" data-v="play" aria-label="Escuchar ${esc(v.word)}">${icon("vol")}</button>
        <div style="flex:1;min-width:0"><div class="v-w">${esc(v.word)}</div><div class="ipa">${v.ipa ? "/" + esc(v.ipa) + "/" : '<span class="muted">sin IPA</span>'}</div></div>
        ${v.status === "known" ? '<span class="pill ok">Dominada</span>' : ""}</div>
      <div class="v-es">${v.es ? esc(v.es) : '<span class="muted">Sin significado — toca ✎ para añadirlo</span>'}</div>
      ${first && first.text ? `<div class="v-ctx">${ctxMark(first.text, v.word)}</div>` : ""}
      <div class="v-links">${locs.map(l => `<a href="#${esc(l.route)}" title="Ir al punto exacto">${icon("link")} ${esc(l.label)}</a>`).join("") || '<span class="muted" style="font-size:.8rem">Añadida manualmente</span>'}</div>
      <div class="v-foot"><div class="row"><button class="btn sm ghost" data-v="slow">${icon("slow")}</button><button class="btn sm ghost" data-v="edit" aria-label="Editar significado">✎</button>
        <button class="btn sm ghost" data-v="known">${v.status === "known" ? "Repasar de nuevo" : icon("check") + " La aprendí"}</button></div>
        <button class="btn sm ghost danger" data-v="del" aria-label="Eliminar">${icon("trash")}</button></div></div>`;
  }
  /* Acciones de las tarjetas (delegación global) */
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-v]"); if (!b) return; const c = b.closest("[data-w]"); if (!c) return;
    const w = c.dataset.w; const v = App.store.d.vocab[w]; if (!v) return; const a = b.dataset.v;
    if (a === "play") App.audio.speak(w); else if (a === "slow") App.audio.speak(w, { rate: App.audio.slowRate() });
    else if (a === "known") App.store.patchWord(w, v.status === "known" ? { status: "learning", box: 0, due: App.u.today() } : { status: "known", box: 5, due: App.u.addDays(App.u.today(), 30) });
    else if (a === "edit") { const n = prompt("Significado de “" + w + "”", v.es || ""); if (n !== null) { App.store.patchWord(w, { es: n.trim() }); } }
    else if (a === "del") { if (confirm("¿Eliminar “" + w + "” de tu vocabulario?")) App.store.removeWord(w); }
  });
  App.vocabUI = { card };

  V.vocab = {
    title: "Vocabulario",
    render(route) { return route.params.mode === "repaso" ? review(route) : list(); }
  };

  function list() {
    const st = { q: "", topic: "", status: "", sort: "recent" };
    const root = el(`<div class="page"><div class="page-head"><div><h1>Vocabulario</h1><p class="sub">Todas las palabras que marcaste como desconocidas, de todos los temas. Cada una enlaza al lugar exacto donde la encontraste.</p></div>
      <div class="row"><a class="btn primary" id="rv" href="#/vocabulario/repaso">${icon("bookmark")} Repasar tarjetas</a><button class="btn" id="cp">Copiar lista</button></div></div>
      <div class="v-tools">
        <div class="field"><label for="vq">Buscar</label><input type="search" id="vq" placeholder="palabra o significado…"></div>
        <div class="field"><label for="vt">Tema</label><select id="vt"></select></div>
        <div class="field"><label for="vs">Estado</label><select id="vst"><option value="">Todas</option><option value="learning">Aprendiendo</option><option value="known">Dominadas</option><option value="due">Para repasar hoy</option></select></div>
        <div class="field"><label for="vo">Orden</label><select id="vo"><option value="recent">Más recientes</option><option value="az">A → Z</option></select></div></div>
      <div id="vl"></div>
      <details class="card flat" style="margin-top:calc(var(--gap)*1.5)"><summary style="cursor:pointer;font-weight:700">Añadir una palabra a mano</summary><div class="row" style="margin-top:.8rem;align-items:end">
        <div class="field" style="flex:1;min-width:10rem"><label>Palabra</label><input type="text" id="aw" autocomplete="off"></div><div class="field" style="flex:2;min-width:14rem"><label>Significado</label><input type="text" id="ae" autocomplete="off"></div><button class="btn primary" id="ab">Añadir</button></div></details></div>`);
    const draw = () => {
      const vs = Object.values(App.store.d.vocab); const topics = [...new Set(vs.flatMap(v => v.locs.map(l => l.topic)))];
      const sel = $("#vt", root); const keep = st.topic;
      sel.innerHTML = `<option value="">Todos los temas</option>` + topics.map(id => `<option value="${esc(id)}">${esc(id === "reader" ? "Mi lector" : (T.get(id) || { title: id }).title)}</option>`).join(""); sel.value = keep;
      const q = st.q.toLowerCase(); const t0 = App.u.today();
      let out = vs.filter(v => (!q || v.word.includes(q) || (v.es || "").toLowerCase().includes(q)) && (!st.topic || v.locs.some(l => l.topic === st.topic)) &&
        (!st.status || (st.status === "due" ? v.status !== "known" && v.due <= t0 : v.status === st.status)));
      out = out.sort(st.sort === "az" ? (a, b) => a.word.localeCompare(b.word) : (a, b) => b.added - a.added);
      $("#vl", root).innerHTML = out.length ? `<p class="muted">${out.length} de ${vs.length} palabras</p><div class="grid wide">${out.map(v => card(v, { topic: st.topic })).join("")}</div>`
        : `<div class="empty card"><span class="big-i">📚</span><h3>${vs.length ? "Nada coincide con el filtro" : "Aún no hay palabras"}</h3><p>${vs.length ? "Prueba con otro filtro." : "Toca cualquier palabra en inglés dentro de un tema y pulsa <b>Guardar como desconocida</b>. Aquí aparecerá con su IPA y un enlace de regreso."}</p></div>`;
      $("#rv", root).hidden = !vs.length; $("#cp", root).hidden = !vs.length;
    };
    $("#vq", root).oninput = e => { st.q = e.target.value; draw(); };
    $("#vt", root).onchange = e => { st.topic = e.target.value; draw(); };
    $("#vst", root).onchange = e => { st.status = e.target.value; draw(); };
    $("#vo", root).onchange = e => { st.sort = e.target.value; draw(); };
    $("#cp", root).onclick = () => { const txt = Object.values(App.store.d.vocab).map(v => `${v.word}\t/${v.ipa || ""}/\t${v.es || ""}`).join("\n"); (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => App.u.toast("Lista copiada"), () => App.u.toast("No se pudo copiar")); };
    $("#ab", root).onclick = () => {
      const w = App.dict.clean($("#aw", root).value.trim()), es = $("#ae", root).value.trim(); if (!/^[a-z']+$/.test(w)) return App.u.toast("Escribe una palabra en inglés (solo letras)");
      const d = App.dict.get(w); App.store.saveWord(w, { es: es || (d && d.es) || "", ipa: (d && (d.ipa || d.baseIpa)) || "" }, null); $("#aw", root).value = ""; $("#ae", root).value = ""; App.u.toast("Palabra añadida");
    };
    draw(); const off = App.store.on(w => { if (!root.isConnected) return off(); if (w === "vocab") draw(); });
    return root;
  }

  /* Tarjetas de repaso con repetición espaciada (cajas de Leitner) */
  function review(route) {
    const topic = route.query.topic; const all = route.query.all === "1";
    let deck = Object.values(App.store.d.vocab).filter(v => (!topic || v.locs.some(l => l.topic === topic)));
    const t0 = App.u.today(); const dueOnly = deck.filter(v => v.status !== "known" && v.due <= t0);
    if (!all) deck = dueOnly; else deck = deck.filter(v => v.status !== "known").length ? deck.filter(v => v.status !== "known") : deck;
    deck = App.u.shuffle(deck);
    const root = el(`<div class="page"><a class="crumb" href="${topic ? "#" + T.route(topic, "vocab") : "#/vocabulario"}">${icon("back")} Volver</a><div class="page-head"><h1>Repaso de vocabulario</h1></div><div id="fc"></div></div>`);
    let i = 0, flipped = false, stats = [0, 0, 0];
    const box = $("#fc", root);
    const draw = () => {
      if (!deck.length) { box.innerHTML = `<div class="empty card"><span class="big-i">✅</span><h3>No hay palabras pendientes de repasar</h3><p>Vuelve mañana o repasa todas ahora.</p><a class="btn primary" href="#/vocabulario/repaso?all=1${topic ? "&topic=" + esc(topic) : ""}">Repasar todas igualmente</a></div>`; return; }
      if (i >= deck.length) { box.innerHTML = `<div class="card empty"><span class="big-i">🎉</span><h2>¡Repaso terminado!</h2><p>No la sabía: <b>${stats[0]}</b> · Más o menos: <b>${stats[1]}</b> · La sé: <b>${stats[2]}</b></p><a class="btn primary big" href="#/vocabulario">Ir a mi vocabulario</a></div>`; return; }
      const v = deck[i]; const loc = v.locs[0];
      box.innerHTML = `<div class="fc-wrap"><div class="row muted"><span>${i + 1} / ${deck.length}</span></div>
        <div class="flash-card" tabindex="0" role="button" aria-label="Voltear tarjeta"><div class="face">${!flipped ? `<div class="fc-w">${esc(v.word)}</div>${App.store.setting("ipa") && v.ipa ? `<div class="ipa" style="font-size:1.4rem">/${esc(v.ipa)}/</div>` : ""}<div class="fc-hint">Piensa en su significado · toca para ver la respuesta</div>`
          : `<div class="fc-w" style="font-size:1.8rem">${esc(v.word)} <span class="ipa" style="font-size:1.2rem">${v.ipa ? "/" + esc(v.ipa) + "/" : ""}</span></div><div class="fc-es">${esc(v.es || "—")}</div>${loc && loc.text ? `<div class="fc-ctx">${ctxMark(loc.text, v.word)}</div>` : ""}${loc ? `<a href="#${esc(loc.route)}">${icon("link")} ${esc(loc.label)}</a>` : ""}`}</div></div>
        <div class="row"><button class="btn soft" data-a="play">${icon("vol")} Escuchar</button><button class="btn soft" data-a="slow">${icon("slow")} Lento</button></div>
        ${flipped ? `<div class="fc-grade"><button class="btn big" data-g="0">No la sé<br><small>1</small></button><button class="btn big" data-g="1">Más o menos<br><small>2</small></button><button class="btn big primary" data-g="2">La sé<br><small>3</small></button></div>` : `<button class="btn primary big" data-a="flip">Mostrar respuesta</button>`}</div>`;
      if (!flipped) App.audio.speak(v.word);
    };
    const flip = () => { flipped = true; draw(); };
    const grade = g => { App.store.gradeWord(deck[i].word, g); stats[g]++; i++; flipped = false; draw(); };
    root.addEventListener("click", e => {
      if (e.target.closest("a")) return;
      const a = e.target.closest("[data-a]"), g = e.target.closest("[data-g]");
      if (g) return grade(+g.dataset.g);
      if (a) { const v = deck[i]; if (a.dataset.a === "play") App.audio.speak(v.word); else if (a.dataset.a === "slow") App.audio.speak(v.word, { rate: App.audio.slowRate() }); else flip(); return; }
      if (e.target.closest(".flash-card") && !flipped) flip();
    });
    const key = e => {
      if (!root.isConnected) return document.removeEventListener("keydown", key);
      if (i >= deck.length || !deck.length) return;
      if ((e.key === " " || e.key === "Enter") && !flipped && !e.target.closest("a,button")) { e.preventDefault(); flip(); }
      else if (flipped && "123".includes(e.key) && e.key) grade(+e.key - 1);
    };
    document.addEventListener("keydown", key); draw(); return root;
  }
})(window.App);
