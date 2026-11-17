/* Vista de un tema: secciones paso a paso, enlaces profundos y vocabulario del tema al final. */
(function (App) {
  const { esc, el, $, $$ } = App.u; const { icon } = App; const T = App.topics;

  const V = App.views;
  V.topic = {
    title: r => { const t = T.get(r.params.id); return t ? t.title : "Tema"; },
    render(route) {
      const t = T.get(route.params.id);
      if (!t) return el(`<div class="page empty"><span class="big-i">🤔</span><p>No encontré ese tema.</p><a class="btn primary" href="#/temas">Ver temas</a></div>`);
      const secs = t.sections.concat([{ id: "vocab", title: "Mi vocabulario", virtual: true }]);
      const sid = route.params.sec && secs.some(s => s.id === route.params.sec) ? route.params.sec : secs[0].id;
      const si = secs.findIndex(s => s.id === sid); const sec = secs[si];
      App.store.visit(t.id, sid);
      const prog = App.store.prog(t.id); const pr = T.progress(t);

      const root = el(`<div class="page"><a class="crumb" href="#/temas">${icon("back")} Temas</a>
        <div class="page-head"><div><h1>${esc(t.title)}</h1>${t.summary ? `<p class="sub">${esc(t.summary)}</p>` : ""}</div>
          <div class="row">${t.level ? `<span class="pill accent">${esc(t.level)}</span>` : ""}<span class="pill ${pr.pct === 100 ? "ok" : ""}">${pr.pct}% completado</span></div></div>
        <div class="topic-layout"><nav class="stepper" aria-label="Secciones del tema"><ol>${secs.map((s, i) => `<li><a href="#${T.route(t.id, s.id)}" class="${prog.visited[s.id] && !s.virtual ? "done" : ""}" ${s.id === sid ? 'aria-current="step"' : ""}><span class="n">${prog.visited[s.id] && !s.virtual && s.id !== sid ? "✓" : i + 1}</span>${esc(s.title)}</a></li>`).join("")}</ol></nav>
        <div class="topic-main"><div class="blocks" id="blocks"></div>
        <div class="topic-foot">${si > 0 ? `<a class="btn big" href="#${T.route(t.id, secs[si - 1].id)}">${icon("back")} ${esc(secs[si - 1].title)}</a>` : "<span></span>"}
          ${si < secs.length - 1 ? `<a class="btn primary big" href="#${T.route(t.id, secs[si + 1].id)}">${esc(secs[si + 1].title)} ${icon("arrow")}</a>` : `<a class="btn primary big" href="#/temas">Terminar tema ${icon("check")}</a>`}</div></div></div></div>`);

      const box = $("#blocks", root);
      if (sec.virtual) box.appendChild(vocabSection(t));
      else sec.blocks.forEach(b => box.appendChild(App.blocks.render(b, { topic: t.id, sec: sec.id })));
      const cur = $('.stepper [aria-current="step"]', root); setTimeout(() => cur && cur.scrollIntoView({ inline: "center", block: "nearest" }), 0);
      return root;
    },
    /* Enlace profundo: ?b=bloque&s=frase&w=palabra */
    after(route, main) {
      const q = route.query; if (!q.b) return;
      const blk = $(`[data-blk="${CSS.escape(q.b)}"]`, main); if (!blk) return;
      let target = blk;
      if (q.s !== undefined) { const s = $(`.sent[data-s="${CSS.escape(q.s)}"]`, blk); if (s) target = s; }
      let word = null; if (q.w) word = $(`.w[data-w="${CSS.escape(q.w)}"]`, target);
      setTimeout(() => {
        (word || target).scrollIntoView({ block: "center", behavior: "smooth" });
        target.classList.add("flash"); if (word) word.classList.add("flash");
        setTimeout(() => { target.classList.remove("flash"); word && word.classList.remove("flash"); }, 5000);
      }, 120);
    }
  };

  /* Solo las palabras desconocidas que marcaste en ESTE tema */
  function vocabSection(t) {
    const root = el(`<div><div class="blk-title"><h2>Mi vocabulario de este tema</h2><div class="tools"></div></div><div id="vl"></div></div>`);
    const draw = () => {
      const words = Object.values(App.store.d.vocab).filter(v => v.locs.some(l => l.topic === t.id)).sort((a, b) => a.word.localeCompare(b.word));
      $(".tools", root).innerHTML = words.length ? `<a class="btn primary sm" href="#/vocabulario/repaso?topic=${esc(t.id)}&all=1">${icon("bookmark")} Repasar con tarjetas</a>` : "";
      $("#vl", root).innerHTML = words.length
        ? `<p class="muted" style="margin-bottom:var(--gap)">${words.length} palabra${words.length > 1 ? "s" : ""} que marcaste como desconocida${words.length > 1 ? "s" : ""} en este tema. Todas tus palabras de todos los temas están en <a href="#/vocabulario">Vocabulario</a>.</p><div class="grid wide">${words.map(v => App.vocabUI.card(v, { topic: t.id })).join("")}</div>`
        : `<div class="empty card"><span class="big-i">🎉</span><h3>No marcaste palabras desconocidas</h3><p>Si en alguna sección apareció una palabra que no entendías, tócala y pulsa <b>Guardar como desconocida</b>. Aparecerá aquí.</p><a class="btn" href="#${T.route(t.id, t.sections[0].id)}">Volver al inicio del tema</a></div>`;
    };
    draw(); const off = App.store.on(w => { if (!root.isConnected) return off(); if (w === "vocab") draw(); });
    return root;
  }
})(window.App);
