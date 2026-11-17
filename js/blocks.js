/* Renderizadores de bloques de contenido de un tema.
   Cada bloque recibe (block, ctx) y devuelve un elemento DOM. ctx = { topic, sec } */
(function (App) {
  const { esc, el, md, $, $$ } = App.u; const { icon } = App;
  const dict = App.dict;

  /* Frase interactiva: guarda dónde está (para el enlace del vocabulario) */
  function sent(text, ctx, s, extra = "") {
    return `<span class="sent" data-topic="${esc(ctx.topic)}" data-sec="${esc(ctx.sec)}" data-blk="${esc(ctx.blk)}" data-s="${s}" data-text="${esc(text)}"${extra}>${dict.html(text)}</span>`;
  }
  /* Texto explicativo en español con inglés interactivo {{...}} */
  function rich(text, ctx) {
    let n = 0; return md(text, en => sent(en, ctx, "e" + (++n)));
  }
  const inline = (t, ctx) => rich(t, ctx).replace(/^<p>|<\/p>$/g, "");

  const playBtn = (cls = "") => `<button class="btn icon play ${cls}" data-play aria-label="Escuchar">${icon("play")}</button>`;
  const slowBtn = () => `<button class="btn sm soft" data-slow aria-label="Escuchar lento">${icon("slow")} Lento</button>`;
  const rateOf = () => App.store.setting("rate");

  const R = {};

  R.h = (b) => el(`<div class="blk-h"><h2>${esc(b.h)}</h2></div>`);
  R.p = (b, ctx) => el(`<div class="blk-p">${rich(b.es, ctx)}</div>`);
  R.list = (b, ctx) => el(`<div class="blk-list"><${b.ordered ? "ol" : "ul"}>${b.items.map(i => `<li>${inline(i, ctx)}</li>`).join("")}</${b.ordered ? "ol" : "ul"}></div>`);

  R.callout = (b, ctx) => {
    const ic = { tip: "💡", warn: "⚠️", key: "🔑", note: "📝", error: "🚫" }[b.kind || "note"];
    return el(`<div class="callout ${b.kind || "note"}"><div class="c-ic">${ic}</div><div>${b.title ? `<h3>${esc(b.title)}</h3>` : ""}${rich(b.es, ctx)}</div></div>`);
  };

  R.table = (b, ctx) => el(`<div class="table-wrap"><table>${b.title ? `<caption>${esc(b.title)}</caption>` : ""}
    ${b.head ? `<thead><tr>${b.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead>` : ""}
    <tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${inline(c, ctx)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);

  R.formula = (b) => el(`<div class="card formula-card">${b.title ? `<div class="f-title">${esc(b.title)}</div>` : ""}
    <div class="formula">${b.parts.map((p, i) => (i ? '<span class="plus">+</span>' : "") + `<div class="part ${p.c || ""}">${esc(p.t)}${p.s ? `<small>${esc(p.s)}</small>` : ""}</div>`).join("")}</div>
    ${b.note ? `<div class="f-note">${esc(b.note)}</div>` : ""}</div>`);

  R.examples = (b, ctx) => {
    const root = el(`<div><div class="blk-title"><h2>${esc(b.title || "Ejemplos")}</h2><div class="tools"><button class="btn soft sm" data-all>${icon("play")} Escuchar todos</button></div></div>
      ${b.intro ? `<div class="blk-p" style="margin-bottom:var(--gap)">${rich(b.intro, ctx)}</div>` : ""}
      <div class="grid wide">${b.items.map((it, i) => `<div class="card ex-card flat" data-i="${i}">
        <div class="ex-body"><div class="ex-en">${sent(it.en, ctx, i)}</div><div class="ex-es">${esc(it.es)}</div>${it.note ? `<div class="ex-note">${inline(it.note, ctx)}</div>` : ""}</div>
        <div class="btns">${playBtn()}${slowBtn()}</div></div>`).join("")}</div></div>`);
    root.addEventListener("click", e => {
      const card = e.target.closest(".ex-card"); const all = e.target.closest("[data-all]");
      if (all) { App.audio.playQueue(b.items.map((it, i) => ({ text: it.en, el: $(`.ex-card[data-i="${i}"] .sent`, root), row: $(`.ex-card[data-i="${i}"]`, root) })), { rate: rateOf(), gap: 700 }); return; }
      if (!card) return; const it = b.items[card.dataset.i];
      if (e.target.closest("[data-play]")) App.audio.speak(it.en); else if (e.target.closest("[data-slow]")) App.audio.speak(it.en, { rate: App.audio.slowRate() });
    });
    return root;
  };

  /* Lectura de un texto completo o diálogo, frase por frase, con audio continuo */
  R.reading = (b, ctx) => {
    let k = 0; const flat = []; // todas las frases del bloque, en orden
    const pars = (b.paragraphs || [{ en: b.text }]).map((p, pi) => {
      const ss = dict.sentences(p.en).map(t => { const i = k++; flat.push({ text: t, i, pi }); return sent(t, ctx, i); });
      return { p, pi, html: ss.join(" "), first: flat.findIndex(f => f.pi === pi) };
    });
    const root = el(`<div><div class="blk-title"><h2>${esc(b.title || "Lectura")}</h2><div class="tools">
        <button class="btn primary sm" data-all>${icon("play")} Escuchar todo</button>
        <button class="btn sm" data-view="translate" aria-pressed="true">Traducción</button>
        <button class="btn sm" data-view="ipa">IPA</button></div></div>
      ${b.intro ? `<div class="blk-p" style="margin-bottom:var(--gap)">${rich(b.intro, ctx)}</div>` : ""}
      <div class="reading ${b.dialogue ? "dialogue" : ""}">${pars.map(({ p, pi, html, first }) => `<div class="rd-par ${b.dialogue && pi % 2 ? "alt" : ""}" data-pi="${pi}" data-first="${first}">
        <div class="rd-en">${p.speaker ? `<div class="rd-spk">${esc(p.speaker)}</div>` : ""}<button class="btn icon sm play rd-play" data-play aria-label="Escuchar desde aquí">${icon("play")}</button>${html}</div>
        ${p.es ? `<div class="rd-es">${esc(p.es)}</div>` : '<div class="rd-es"></div>'}</div>`).join("")}</div></div>`);
    const queue = (from = 0) => flat.map(f => ({ text: f.text, el: $(`.sent[data-s="${f.i}"]`, root), row: $(`.rd-par[data-pi="${f.pi}"]`, root) }));
    root.addEventListener("click", e => {
      if (e.target.closest("[data-all]")) { if (App.audio.state.playing) App.audio.stop(); else App.audio.playQueue(queue(), { rate: rateOf(), gap: 450 }); return; }
      const v = e.target.closest("[data-view]"); if (v) { App.view.toggle(v.dataset.view); return; }
      const pl = e.target.closest("[data-play]"); if (pl) { const par = pl.closest(".rd-par"); App.audio.playQueue(queue(), { rate: rateOf(), gap: 450, start: +par.dataset.first }); }
    });
    root._sync = () => { const t = $('[data-view="translate"]', root), i = $('[data-view="ipa"]', root); t.setAttribute("aria-pressed", String(App.store.setting("translate") !== false)); t.classList.toggle("on", App.store.setting("translate") !== false); i.classList.toggle("on", !!App.store.setting("ipa")); };
    root._sync(); return root;
  };

  /* Frases con repetición: el valor está en escuchar cada frase varias veces */
  R.drill = (b, ctx) => {
    const st = { repeats: b.repeats || App.store.setting("repeats") || 3, echo: App.store.setting("echo") !== false, rate: rateOf(), loop: false };
    const seg = (name, opts, cur) => `<div class="seg" data-seg="${name}">${opts.map(([v, t]) => `<button data-v="${v}" aria-pressed="${String(cur) === String(v)}">${t}</button>`).join("")}</div>`;
    const root = el(`<div><div class="blk-title"><h2>${esc(b.title || "Frases")}</h2></div>
      ${b.intro ? `<div class="blk-p" style="margin-bottom:var(--gap)">${rich(b.intro, ctx)}</div>` : ""}
      <div class="drill-bar">
        <button class="btn primary" data-all>${icon("play")} Reproducir todas</button>
        <label>Repeticiones ${seg("repeats", [[1, "1"], [2, "2"], [3, "3"], [5, "5"], [10, "10"]], st.repeats)}</label>
        <label>Modo ${seg("echo", [[0, "Escuchar"], [1, "Escuchar y repetir"]], st.echo ? 1 : 0)}</label>
        <label>Velocidad ${seg("rate", [["slow", "Lenta"], ["normal", "Normal"], ["fast", "Rápida"]], "normal")}</label>
        <button class="btn sm" data-loop aria-pressed="false">${icon("repeat")} Bucle</button>
      </div>
      <div class="phrases">${b.phrases.map((p, i) => `<div class="phrase" data-i="${i}"><span class="p-n">${i + 1}</span>
        <div><div class="p-en">${sent(p.en, ctx, i)}</div>${p.ipa ? `<div class="p-ipa">/${esc(p.ipa)}/</div>` : ""}<div class="p-es">${esc(p.es || "")}</div><div class="dots" aria-hidden="true"></div></div>
        ${playBtn()}</div>`).join("")}</div></div>`);
    const dotsFor = (n, rep, active) => Array.from({ length: n }, (_, j) => `<i class="${active ? (j < rep - 1 ? "on" : j === rep - 1 ? "cur" : "") : ""}"></i>`).join("");
    const paint = () => $$(".phrase", root).forEach(r => { $(".dots", r).innerHTML = st.repeats > 1 ? dotsFor(st.repeats, 0, false) : ""; });
    paint();
    const items = () => b.phrases.map((p, i) => ({ text: p.en, el: $(`.phrase[data-i="${i}"] .sent`, root), row: $(`.phrase[data-i="${i}"]`, root), dots: $(`.phrase[data-i="${i}"] .dots`, root), n: st.repeats }));
    const opts = (extra) => Object.assign({ rate: st.rate, repeats: st.repeats, echo: st.echo, gap: 650, loop: st.loop }, extra);
    root.addEventListener("click", e => {
      const sg = e.target.closest("[data-seg] button");
      if (sg) {
        const name = sg.parentNode.dataset.seg, v = name === "rate" ? sg.dataset.v : +sg.dataset.v;
        if (name === "repeats") { st.repeats = v; App.store.setting("repeats", v); } if (name === "echo") { st.echo = !!v; App.store.setting("echo", !!v); } if (name === "rate") st.rate = { slow: App.audio.slowRate(), normal: rateOf(), fast: Math.min(1.4, rateOf() + 0.25) }[v];
        $$("button", sg.parentNode).forEach(x => x.setAttribute("aria-pressed", String(x === sg))); paint(); return;
      }
      if (e.target.closest("[data-loop]")) { st.loop = !st.loop; const lb = $("[data-loop]", root); lb.setAttribute("aria-pressed", String(st.loop)); lb.classList.toggle("on", st.loop); return; }
      if (e.target.closest("[data-all]")) { if (App.audio.state.playing) App.audio.stop(); else App.audio.playQueue(items(), opts()); return; }
      const pl = e.target.closest("[data-play]"); if (pl) { const i = +pl.closest(".phrase").dataset.i; const it = items(); App.audio.playQueue([it[i]], opts({ loop: false })); }
    });
    return root;
  };

  /* Pronunciación guiada: grupos de palabras con un mismo sonido */
  R.pron = (b, ctx) => el(`<div><div class="blk-title"><h2>${esc(b.title || "Pronunciación")}</h2></div>
    ${b.intro ? `<div class="blk-p" style="margin-bottom:var(--gap)">${rich(b.intro, ctx)}</div>` : ""}
    <div class="grid wide">${b.groups.map(g => `<div class="card pron-group flat">
      <div class="row"><span class="sym">${esc(g.sym)}</span>${g.name ? `<b>${esc(g.name)}</b>` : ""}</div>
      ${g.tip ? `<div class="muted">${inline(g.tip, ctx)}</div>` : ""}
      <div class="pron-words">${g.words.map(w => { const word = typeof w === "string" ? w : w.w; const d = dict.get(word); const ipa = (typeof w === "object" && w.ipa) || (d && (d.ipa || d.baseIpa)) || ""; return `<button class="pron-w btn ghost" data-say="${esc(word)}" style="justify-content:flex-start">${icon("vol")}<b>${esc(word)}</b><span class="ipa">${ipa ? "/" + esc(ipa) + "/" : ""}</span></button>`; }).join("")}</div></div>`).join("")}</div></div>`)
    ;
  document.addEventListener("click", e => { const b = e.target.closest("[data-say]"); if (b) App.audio.speak(b.dataset.say); });

  R.exercises = (b, ctx) => {
    const kinds = { mcq: "Elegir", fill: "Escribir", order: "Ordenar", match: "Unir" };
    const types = [...new Set(b.items.map(i => kinds[i.type]))];
    const p = App.store.prog(ctx.topic).sets[b.key]; const best = p ? Math.round(p.best * 100) : null;
    const root = el(`<section class="card ex-set"><div class="row between"><div><h2 style="margin:0">${esc(b.title)}</h2>
        <p class="muted" style="margin:.2rem 0 0">${b.items.length} ejercicios · ${types.join(" · ")}</p>${b.intro ? `<p style="margin:.5rem 0 0">${esc(b.intro)}</p>` : ""}</div>
        <div class="row">${best !== null ? `<span class="pill ${best >= 70 ? "ok" : "warn"}">Mejor: ${best}%</span>` : ""}<button class="btn primary big" data-start>${best !== null ? "Repetir" : "Empezar"} ${icon("arrow")}</button></div></div></section>`);
    root.querySelector("[data-start]").addEventListener("click", () => {
      App.exercises.run(root, { items: b.items, title: b.title, topic: ctx.topic, key: b.key, sec: ctx.sec, blk: b.id, onExit: () => { const n = R.exercises(b, ctx); root.replaceWith(n); n.scrollIntoView({ block: "center" }); } });
    });
    return root;
  };

  App.blocks = {
    sent, rich, inline,
    render(b, ctx) {
      const c = Object.assign({}, ctx, { blk: b.id });
      const fn = R[b.type || (b.h ? "h" : b.es ? "p" : "p")] || R.p;
      const node = (R[b.type] ? R[b.type] : b.h !== undefined ? R.h : R.p)(b, c);
      node.classList.add("blk", "blk-" + (b.type || (b.h ? "h" : "p"))); node.dataset.blk = b.id; node.dataset.topic = c.topic; node.dataset.sec = c.sec;
      // el atributo data-topic en un contenedor nunca debe confundirse con una frase: las frases llevan data-s
      return node;
    }
  };
})(window.App);
