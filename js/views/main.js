/* Vistas principales: Inicio, Temas, Práctica, Más */
(function (App) {
  const { esc, el, $, $$, shuffle } = App.u; const { icon } = App; const T = App.topics; const V = App.views;
  const href = p => "#" + p;

  function topicCard(t, i) {
    const pr = T.progress(t);
    return `<a class="card link topic-card" href="${href(T.route(t.id))}"><div class="t-num">${esc(t.unit || "Tema")}${t.order ? " · " + String(t.order).padStart(2, "0") : ""}</div>
      <h3>${esc(t.title)}</h3><div class="t-sum">${esc(t.summary || "")}</div>
      <div class="tag-row">${t.level ? `<span class="pill accent">${esc(t.level)}</span>` : ""}${t.minutes ? `<span class="pill">${t.minutes} min</span>` : ""}${pr.pct === 100 ? '<span class="pill ok">✓ Completado</span>' : pr.pct > 0 ? `<span class="pill warn">${pr.pct}%</span>` : ""}${t.demo ? '<span class="pill">Ejemplo</span>' : ""}</div>
      <div class="bar ${pr.pct === 100 ? "ok" : ""}"><i style="width:${pr.pct}%"></i></div></a>`;
  }

  /* ---------- Inicio ---------- */
  V.home = {
    title: "Inicio",
    render() {
      const d = App.store.d; const last = d.last && T.get(d.last.topic); const due = App.store.dueWords().length;
      const wrong = d.wrong.filter(id => T.exById[id]).length; const words = Object.keys(d.vocab).length;
      const acc = d.stats.answered ? Math.round(d.stats.correct * 100 / d.stats.answered) : null;
      const next = last ? last : T.list.find(t => T.progress(t).pct < 100) || T.list[0];
      const sec = last && T.section(last, d.last.sec);
      return el(`<div class="page"><div class="page-head"><div><h1>Hola, a practicar 👋</h1><p class="sub">Un paso a la vez: lee, escucha, repite y practica. Toca cualquier palabra para guardarla.</p></div></div>
        <div class="hero">
          <div class="card continue"><div class="muted">${last ? "Continúa donde lo dejaste" : "Empieza aquí"}</div>
            ${next ? `<h2 style="margin:.3rem 0 .2rem">${esc(next.title)}</h2><p class="sub" style="margin-bottom:1rem">${last && sec ? "Sección: " + esc(sec.title) : esc(next.summary || "")}</p>
            <a class="btn big" href="${href(T.route(next.id, last ? d.last.sec : null))}">${last ? "Continuar" : "Empezar"} ${icon("arrow")}</a>` : `<h2>Aún no hay temas</h2><p class="sub">Agrega un archivo en content/topics/ y ejecuta node tools/sync.js.</p>`}</div>
          <div class="card"><h3>Repaso de hoy</h3>
            <div class="stack" style="gap:.7rem">
              <a class="btn ${due ? "primary" : ""}" href="${href("/vocabulario/repaso")}">${icon("bookmark")} ${due ? due + " palabra" + (due > 1 ? "s" : "") + " por repasar" : "Sin palabras pendientes"}</a>
              <a class="btn ${wrong ? "primary" : ""}" href="${href("/practica")}">${icon("target")} ${wrong ? wrong + " ejercicio" + (wrong > 1 ? "s" : "") + " por corregir" : "Practicar ejercicios"}</a></div></div>
          <div class="card"><h3>Tu progreso</h3><div class="grid narrow" style="gap:1rem">
            <div class="stat"><b>${App.store.streak()}</b><span>${icon("flame")} días seguidos</span></div>
            <div class="stat"><b>${words}</b><span>palabras guardadas</span></div>
            <div class="stat"><b>${acc === null ? "—" : acc + "%"}</b><span>aciertos</span></div></div></div>
        </div>
        <div class="section-title"><h2>Tus temas</h2><a href="${href("/temas")}">Ver todos</a></div>
        <div class="grid">${T.list.slice(0, 6).map(topicCard).join("") || '<div class="empty">Sin temas todavía.</div>'}</div>
        <div class="section-title"><h2>Herramientas</h2></div>
        <div class="grid">
          <a class="card link" href="${href("/fonetica")}"><h3>${icon("ipa")} Fonética IPA</h3><p class="muted">Todos los sonidos del inglés con ejemplos, audio y pares mínimos para entrenar el oído.</p></a>
          <a class="card link" href="${href("/lector")}"><h3>${icon("text")} Lector</h3><p class="muted">Pega cualquier texto en inglés: escúchalo frase por frase, ve la IPA y guarda palabras.</p></a>
          <a class="card link" href="${href("/vocabulario")}"><h3>${icon("bookmark")} Vocabulario</h3><p class="muted">Todas tus palabras desconocidas, con enlace al lugar exacto donde las encontraste.</p></a>
        </div></div>`);
    }
  };

  /* ---------- Temas ---------- */
  V.topics = {
    title: "Temas",
    render() {
      const root = el(`<div class="page"><div class="page-head"><div><h1>Temas</h1><p class="sub">Cada tema tiene concepto, ejemplos, lectura, frases para repetir y práctica.</p></div>
        <div class="field" style="min-width:min(100%,20rem)"><input type="search" id="tq" placeholder="Buscar tema…" aria-label="Buscar tema"></div></div><div id="tl"></div></div>`);
      const draw = () => {
        const q = $("#tq", root).value.trim().toLowerCase(); const groups = {};
        T.list.filter(t => !q || (t.title + " " + (t.summary || "") + " " + (t.unit || "")).toLowerCase().includes(q)).forEach(t => (groups[t.unit || "Temas"] = groups[t.unit || "Temas"] || []).push(t));
        const keys = Object.keys(groups);
        $("#tl", root).innerHTML = keys.length ? keys.map(k => `<div class="section-title"><h2>${esc(k)}</h2></div><div class="grid">${groups[k].map(topicCard).join("")}</div>`).join("") : '<div class="empty"><span class="big-i">🔎</span>No hay temas con ese nombre.</div>';
      };
      $("#tq", root).addEventListener("input", draw); draw(); return root;
    }
  };

  /* ---------- Práctica mixta (errores + repaso general) ---------- */
  V.practice = {
    title: "Práctica",
    render() {
      const root = el(`<div class="page"></div>`);
      const home = () => {
        const wrong = App.store.d.wrong.map(id => T.exById[id]).filter(Boolean); const all = Object.values(T.exById);
        root.innerHTML = `<div class="page-head"><div><h1>Práctica</h1><p class="sub">Repetir es lo que fija las estructuras. Elige cómo practicar hoy.</p></div></div>
          <div class="grid">
            <div class="card"><h3>${icon("target")} Corregir mis errores</h3><p class="muted">${wrong.length ? `Tienes ${wrong.length} ejercicio(s) que fallaste. Al acertarlos salen de la lista.` : "No tienes errores pendientes. ¡Bien!"}</p><button class="btn primary" data-go="wrong" ${wrong.length ? "" : "disabled"}>Practicar errores</button></div>
            <div class="card"><h3>${icon("shuffle")} Mezcla rápida</h3><p class="muted">10 ejercicios al azar de todos los temas. Ideal para repasar a diario.</p><button class="btn primary" data-go="mix" ${all.length ? "" : "disabled"}>Empezar (10)</button></div>
            <div class="card"><h3>${icon("book")} Por tema</h3><p class="muted">Todos los ejercicios de un tema, mezclados.</p><div class="field"><select id="pt" aria-label="Tema">${T.list.map(t => `<option value="${esc(t.id)}">${esc(t.title)}</option>`).join("")}</select></div><button class="btn" data-go="topic" style="margin-top:.7rem">Practicar tema</button></div>
          </div>`;
      };
      root.addEventListener("click", e => {
        const b = e.target.closest("[data-go]"); if (!b) return; let items = [], title = "Práctica";
        if (b.dataset.go === "wrong") { items = shuffle(App.store.d.wrong.map(id => T.exById[id]).filter(Boolean)); title = "Corregir errores"; }
        if (b.dataset.go === "mix") { items = shuffle(Object.values(T.exById)).slice(0, 10); title = "Mezcla rápida"; }
        if (b.dataset.go === "topic") { const id = $("#pt", root).value; items = shuffle(Object.values(T.exById).filter(i => i._topic === id)); title = "Tema"; }
        if (!items.length) return App.u.toast("No hay ejercicios para esa opción");
        App.exercises.run(root, { items, title, onExit: home });
      });
      home(); return root;
    }
  };

  /* ---------- Más (móvil) ---------- */
  V.more = {
    title: "Más",
    render() {
      return el(`<div class="page"><div class="page-head"><h1>Más</h1></div><div class="grid">
        <a class="card link" href="${href("/practica")}"><h3>${icon("target")} Práctica</h3><p class="muted">Corrige errores o haz una mezcla de ejercicios.</p></a>
        <a class="card link" href="${href("/lector")}"><h3>${icon("text")} Lector</h3><p class="muted">Pega un texto y léelo con audio e IPA.</p></a>
        <a class="card link" href="${href("/ajustes")}"><h3>${icon("settings")} Ajustes</h3><p class="muted">Voz, velocidad, tamaño de letra, copia de seguridad.</p></a></div></div>`);
    }
  };
  App.ui = { topicCard };
})(window.App);
