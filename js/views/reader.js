/* Lector libre: pega cualquier texto en inglés y léelo con audio, IPA y guardado de palabras. */
(function (App) {
  const { esc, el, $, $$ } = App.u; const { icon } = App; const V = App.views;

  V.reader = {
    title: "Lector",
    render(route) { return route.params.id ? view(route.params.id) : index(); },
    after(route, main) { // enlace profundo a una palabra guardada de un texto propio
      const q = route.query; if (!q.s) return; const s = $(`.sent[data-s="${CSS.escape(q.s)}"]`, main); if (!s) return;
      const w = q.w && $(`.w[data-w="${CSS.escape(q.w)}"]`, s);
      setTimeout(() => { (w || s).scrollIntoView({ block: "center", behavior: "smooth" }); s.classList.add("flash"); w && w.classList.add("flash"); }, 120);
    }
  };

  function index() {
    const texts = App.store.d.texts;
    const root = el(`<div class="page"><div class="page-head"><div><h1>Lector</h1><p class="sub">Pega un artículo, un correo o una letra de canción. Podrás escucharlo frase por frase, ver la IPA y guardar las palabras que no conoces.</p></div></div>
      <div class="grid wide" style="align-items:start"><div class="card"><h3>Nuevo texto</h3><div class="stack" style="gap:.8rem"><div class="field"><label for="rt">Título (opcional)</label><input type="text" id="rt" autocomplete="off"></div>
        <div class="field"><label for="rx">Texto en inglés</label><textarea id="rx" placeholder="Pega aquí tu texto…"></textarea></div><button class="btn primary big" id="rg">Leer ${icon("arrow")}</button></div></div>
      <div class="card"><h3>Mis textos</h3>${texts.length ? `<div class="stack" style="gap:.5rem">${texts.map(t => `<div class="row between"><a class="btn ghost" style="flex:1;justify-content:flex-start" href="#/lector/${t.id}">${icon("text")} ${esc(t.title)}</a><button class="btn icon ghost danger sm" data-del="${t.id}" aria-label="Eliminar">${icon("trash")}</button></div>`).join("")}</div>` : '<p class="muted">Todavía no has guardado textos.</p>'}</div></div></div>`);
    $("#rg", root).onclick = () => {
      const text = $("#rx", root).value.trim(); if (text.length < 3) return App.u.toast("Pega primero un texto");
      const id = "t" + Date.now().toString(36); const title = $("#rt", root).value.trim() || text.split(/\s+/).slice(0, 6).join(" ") + "…";
      App.store.d.texts.unshift({ id, title, text }); App.store.emit("texts"); App.router.go("/lector/" + id);
    };
    root.addEventListener("click", e => { const b = e.target.closest("[data-del]"); if (b && confirm("¿Eliminar este texto?")) { App.store.d.texts = App.store.d.texts.filter(t => t.id !== b.dataset.del); App.store.emit("texts"); App.router.go("/lector"); } });
    return root;
  }

  function view(id) {
    const t = App.store.d.texts.find(x => x.id === id);
    if (!t) return el(`<div class="page empty"><p>No encontré ese texto.</p><a class="btn primary" href="#/lector">Volver</a></div>`);
    const pars = t.text.split(/\n{1,}/).map(p => p.trim()).filter(Boolean).map(p => ({ en: p }));
    const root = el(`<div class="page"><a class="crumb" href="#/lector">${icon("back")} Lector</a><div class="page-head"><h1>${esc(t.title)}</h1></div></div>`);
    root.appendChild(App.blocks.render({ type: "reading", id: t.id, title: "Texto", paragraphs: pars }, { topic: "reader", sec: "read" }));
    return root;
  }
})(window.App);
