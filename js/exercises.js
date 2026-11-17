/* Motor de ejercicios interactivos con retroalimentación inmediata.
   Tipos: mcq (elegir), fill (escribir), order (ordenar palabras), match (unir pares).
   Cualquier ejercicio puede llevar `audio` (se escucha antes de responder). */
(function (App) {
  const { esc, el, $, $$, shuffle, checkText, norm } = App.u; const { icon } = App;
  const BLANK = /_{3,}/;
  const SPOKEN_HINT = /\s*\([^)]*\)/g; // quita "(work)" de "She ___ (work)"

  /* Frase completa en inglés (para mostrarla interactiva y leerla tras responder) */
  function fullSentence(it, ans) {
    if (it.full !== undefined) return it.full;
    if (it.audio) return it.audio;
    if (it.type === "fill" && !BLANK.test(it.q || "") && ans) return ans; // traducciones y correcciones: muestra la frase correcta
    if (it.type === "order") return it.a;
    if (BLANK.test(it.q || "") && ans) return it.q.replace(SPOKEN_HINT, "").replace(BLANK, ans).replace(/\s+/g, " ").trim();
    return it.full || "";
  }
  const qHtml = (it, fill) => esc(it.q || "").replace(BLANK, fill || '<span class="blank" data-blank>&nbsp;</span>');

  /* ---------- Tipos ---------- */
  const T = {};

  T.mcq = (it, body, api) => {
    const order = it.fixed ? it.opts.map((_, i) => i) : shuffle(it.opts.map((_, i) => i));
    const right = [].concat(it.a); let sel = null;
    const cloze = BLANK.test(it.q || "");
    body.innerHTML = `${prompt(it, cloze ? qHtml(it) : esc(it.q))}<div class="opts" role="radiogroup">${order.map((oi, k) => `<button class="opt" role="radio" aria-checked="false" data-o="${oi}"><span class="k">${k + 1}</span><span>${esc(it.opts[oi])}</span></button>`).join("")}</div>`;
    const blank = $("[data-blank]", body);
    const pick = (btn) => { $$(".opt", body).forEach(b => { b.classList.toggle("sel", b === btn); b.setAttribute("aria-checked", String(b === btn)); }); sel = +btn.dataset.o; if (blank) blank.textContent = it.opts[sel]; api.ready(true); };
    body.addEventListener("click", e => { const b = e.target.closest(".opt"); if (b && !api.locked()) pick(b); });
    api.keys = (e) => { const n = parseInt(e.key, 10); if (n >= 1 && n <= order.length) pick($$(".opt", body)[n - 1]); };
    api.check = () => {
      const ok = right.includes(sel); const correctText = right.map(i => it.opts[i]).join(" / ");
      $$(".opt", body).forEach(b => { const i = +b.dataset.o; b.classList.toggle("right", right.includes(i)); if (i === sel && !ok) b.classList.add("wrong"); });
      if (blank) { blank.textContent = ok ? it.opts[sel] : it.opts[sel]; blank.classList.add(ok ? "ok" : "bad"); }
      const whyOpt = it.whys && it.whys[sel];
      return { ok, answer: correctText, mine: it.opts[sel], full: fullSentence(it, it.opts[right[0]]), why: (!ok && whyOpt ? whyOpt + " " : "") + (it.why || "") };
    };
    api.focus = () => { };
  };

  T.fill = (it, body, api) => {
    const cloze = BLANK.test(it.q || "");
    const inp = `<input class="fill-in" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" aria-label="Tu respuesta" ${it.dictation ? 'placeholder="Escribe lo que oyes…"' : 'placeholder="…"'}>`;
    body.innerHTML = prompt(it, cloze ? qHtml(it, inp) : esc(it.q)) + (cloze ? "" : `<div class="fill-wrap">${inp}</div>`);
    const input = $("input", body);
    input.addEventListener("input", () => { api.ready(input.value.trim().length > 0); input.style.width = cloze ? Math.max(6, input.value.length + 2) + "ch" : ""; });
    api.focus = () => input.focus({ preventScroll: true });
    api.check = () => {
      const r = checkText(input.value, it.a, it.strict); input.disabled = true;
      input.classList.add(r === "ok" ? "ok" : "bad");
      const ans = it.a[0];
      return { ok: r === "ok", close: r === "close", answer: ans, mine: input.value, full: fullSentence(it, ans), why: it.why };
    };
  };

  T.order = (it, body, api) => {
    const words = it.a.split(/\s+/); const pool = shuffle(words.concat(it.extra || []).map((w, i) => ({ w, i })));
    let line = [];
    body.innerHTML = `${prompt(it, `<span class="muted" style="font-size:.9rem">Ordena las palabras para decir:</span><br>${esc(it.es || it.q || "")}`)}
      <div class="line" aria-live="polite"></div><div class="pool"></div>`;
    const lineEl = $(".line", body), poolEl = $(".pool", body);
    const draw = () => {
      lineEl.innerHTML = line.length ? line.map(c => `<button class="chip in" data-i="${c.i}">${esc(c.w)}</button>`).join("") : '<span class="muted">Toca las palabras en orden…</span>';
      poolEl.innerHTML = pool.map(c => `<button class="chip" data-i="${c.i}" ${line.includes(c) ? "disabled" : ""}>${esc(c.w)}</button>`).join("");
      api.ready(line.length >= words.length);
    };
    body.addEventListener("click", e => {
      if (api.locked()) return; const b = e.target.closest(".chip"); if (!b) return;
      const c = pool.find(x => x.i === +b.dataset.i);
      if (b.classList.contains("in")) line = line.filter(x => x !== c); else if (!line.includes(c)) line.push(c); draw();
    });
    api.keys = (e) => { if (e.key === "Backspace" && line.length) { line.pop(); draw(); } };
    draw();
    api.check = () => {
      const mine = line.map(c => c.w).join(" "); const r = checkText(mine, [it.a].concat(it.alt || []), it.strict);
      $$(".chip", lineEl).forEach(c => c.disabled = true); lineEl.classList.add(r === "ok" ? "ok" : "bad");
      return { ok: r === "ok", answer: it.a, mine, full: it.a, why: it.why };
    };
  };

  T.match = (it, body, api) => {
    const left = it.pairs.map((p, i) => ({ t: p[0], i })), right = shuffle(it.pairs.map((p, i) => ({ t: p[1], i })));
    let selL = null, mistakes = 0, done = 0;
    body.innerHTML = `${prompt(it, esc(it.q || "Une cada elemento con su pareja"))}<div class="match"><div class="col" data-col="l">${left.map(c => `<button class="mt" data-i="${c.i}">${esc(c.t)}</button>`).join("")}</div>
      <div class="col" data-col="r">${right.map(c => `<button class="mt" data-i="${c.i}">${esc(c.t)}</button>`).join("")}</div></div>`;
    body.addEventListener("click", e => {
      const b = e.target.closest(".mt"); if (!b || b.classList.contains("done") || api.locked()) return;
      const side = b.parentNode.dataset.col;
      if (side === "l") { $$('[data-col="l"] .mt', body).forEach(x => x.classList.remove("sel")); b.classList.add("sel"); selL = b; return; }
      if (!selL) { App.u.toast("Primero toca una frase de la izquierda"); return; }
      if (selL.dataset.i === b.dataset.i) { selL.classList.remove("sel"); selL.classList.add("done"); b.classList.add("done"); selL = null; done++; if (done === it.pairs.length) api.auto(); }
      else { mistakes++; b.classList.add("shake"); setTimeout(() => b.classList.remove("shake"), 400); }
    });
    api.autoCheck = true;
    api.check = () => ({ ok: mistakes === 0, answer: mistakes ? it.pairs.map(p => `${p[0]} = ${p[1]}`).join("  ·  ") : "", mine: mistakes + " error(es)", full: "", why: mistakes ? (it.why || "") + ` (Tuviste ${mistakes} intento${mistakes > 1 ? "s" : ""} fallido${mistakes > 1 ? "s" : ""}.)` : it.why });
  };

  function prompt(it, html) {
    return `<div class="prompt">${it.audio ? `<button class="btn big play ap" data-ap aria-label="Escuchar">${icon("vol")} Escuchar</button><button class="btn ghost" data-ap-slow>${icon("slow")} Lento</button>` : ""}<div class="q">${html}</div></div>`;
  }

  /* ---------- Sesión ---------- */
  function run(container, cfg) {
    const items = cfg.items.slice(); let queue = items.slice(), idx = 0, results = [], firstRun = true, locked = false, answered = false;
    const exit = () => { cleanup(); if (cfg.onExit) cfg.onExit(); };
    const keyH = (e) => {
      if (!container.isConnected) return cleanup();
      if (e.key === "Enter") { e.preventDefault(); const b = $(".rn-go:not([disabled])", container); if (b) b.click(); }
      else if (!locked && cur && cur.keys && !/input|textarea/i.test(e.target.tagName)) cur.keys(e);
    };
    document.addEventListener("keydown", keyH);
    function cleanup() { document.removeEventListener("keydown", keyH); App.audio.stop(); }
    let cur = null;

    function show() {
      if (idx >= queue.length) return summary();
      const it = queue[idx]; locked = false; answered = false;
      const total = queue.length;
      container.innerHTML = `<section class="card runner"><div class="rn-top"><button class="btn ghost sm" data-exit>${icon("x")} Salir</button><div class="bar"><i style="width:${Math.round(idx * 100 / total)}%"></i></div><span class="muted">${idx + 1} / ${total}</span></div>
        <div class="rn-body"></div><div class="rn-hint" hidden></div><div class="rn-fb" hidden aria-live="polite"></div>
        <div class="rn-foot">${it.hint ? `<button class="btn ghost" data-hint>${icon("bulb")} Pista</button>` : "<span></span>"}<button class="btn primary big rn-go" disabled>Comprobar</button></div></section>`;
      const body = $(".rn-body", container), go = $(".rn-go", container);
      const api = {
        ready: (v) => { if (!locked) go.disabled = !v; }, locked: () => locked,
        auto: () => setTimeout(() => finish(), 350)
      };
      cur = api; T[it.type](it, body, api);
      const ctxItem = it._topic ? it : cfg;
      $(".rn-top [data-exit]", container).onclick = () => { if (idx === 0 || confirm("¿Salir de la práctica? Se pierde el avance de esta ronda.")) exit(); };
      const hb = $("[data-hint]", container); if (hb) hb.onclick = () => { const h = $(".rn-hint", container); h.hidden = false; h.innerHTML = `${icon("bulb")} ${esc(it.hint)}`; hb.disabled = true; };
      const ap = $("[data-ap]", container); if (ap) { ap.onclick = () => App.audio.speak(it.audio); $("[data-ap-slow]", container).onclick = () => App.audio.speak(it.audio, { rate: App.audio.slowRate() }); setTimeout(() => App.audio.speak(it.audio), 250); }
      if (api.focus) setTimeout(api.focus, 60);
      go.onclick = () => { if (!answered) finish(); else next(); };

      function finish() {
        if (answered) return; answered = true; locked = true;
        const r = api.check(); go.disabled = false; go.textContent = idx + 1 >= queue.length ? "Ver resultado" : "Continuar";
        go.classList.toggle("primary", true);
        results.push({ it, ok: r.ok, r });
        App.store.record(it.id || "x." + Math.random(), r.ok);
        const fb = $(".rn-fb", container); fb.hidden = false; fb.className = "rn-fb " + (r.ok ? "ok" : r.close ? "close" : "bad");
        const sentCtx = { topic: it._topic || cfg.topic || "", sec: it._sec || cfg.sec || "", blk: it._blk || cfg.blk || "" };
        const full = r.full ? `<div class="fb-full">${App.blocks.sent(r.full, sentCtx, "q" + idx)} <button class="btn icon sm play" data-fbplay aria-label="Escuchar frase">${icon("vol")}</button></div><div class="fb-tip">Toca una palabra que no conozcas para guardarla.</div>` : "";
        fb.innerHTML = `<div class="fb-h">${r.ok ? icon("check") + " ¡Correcto!" : r.close ? "Casi… revisa la ortografía" : icon("x") + " Todavía no"}</div>
          ${!r.ok && r.answer ? `<div class="fb-ans"><span>Respuesta correcta</span><b>${esc(r.answer)}</b></div>` : ""}
          ${!r.ok && r.mine && it.type !== "match" ? `<div class="fb-mine"><span>Tu respuesta</span> ${esc(r.mine)}</div>` : ""}
          ${r.why ? `<div class="fb-why">${icon("bulb")}<span>${App.blocks.inline(r.why, sentCtx)}</span></div>` : ""}${full}`;
        const fp = $("[data-fbplay]", fb); if (fp) fp.onclick = () => App.audio.speak(r.full);
        if (r.full && App.store.setting("autoSpeak") !== false && !it.audio) setTimeout(() => App.audio.speak(r.full), 200);
        fb.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
    function next() { idx++; show(); }

    function summary() {
      cleanup(); const total = results.length; const okN = results.filter(r => r.ok).length; const pct = total ? okN / total : 0;
      if (firstRun && cfg.topic && cfg.key) App.store.markSet(cfg.topic, cfg.key, pct);
      const missed = results.filter(r => !r.ok);
      const stars = pct >= .9 ? 3 : pct >= .7 ? 2 : pct >= .4 ? 1 : 0;
      const msg = pct >= .9 ? "¡Excelente! Dominas este tema." : pct >= .7 ? "¡Muy bien! Repasa los errores para consolidar." : "Buen intento. Repasa la explicación y vuelve a practicar: así se aprende.";
      container.innerHTML = `<section class="card runner result"><div class="stars" aria-label="${stars} de 3 estrellas">${[0, 1, 2].map(i => `<span class="${i < stars ? "on" : ""}">${icon("star")}</span>`).join("")}</div>
        <h2>${okN} de ${total} correctas · ${Math.round(pct * 100)}%</h2><p class="muted">${msg}</p>
        ${missed.length ? `<h3>Para repasar</h3><div class="missed">${missed.map(({ it, r }) => `<div class="miss"><div class="m-q">${esc(it.q || it.es || it.audio || "")}</div><div><span class="muted">Correcta:</span> <b>${esc(r.answer || r.full)}</b></div>${r.why ? `<div class="muted">${App.blocks.inline(r.why, { topic: "", sec: "", blk: "" })}</div>` : ""}</div>`).join("")}</div>` : `<p>✓ Sin errores. ¡Perfecto!</p>`}
        <div class="row" style="margin-top:1rem">${missed.length ? `<button class="btn primary big" data-retry-miss>${icon("repeat")} Repetir las falladas (${missed.length})</button>` : ""}<button class="btn big" data-retry>${icon("shuffle")} Repetir todo</button><button class="btn ghost big" data-done>Terminar</button></div></section>`;
      $("[data-retry-miss]", container) && ($("[data-retry-miss]", container).onclick = () => { firstRun = false; queue = missed.map(m => m.it); idx = 0; results = []; document.addEventListener("keydown", keyH); show(); });
      $("[data-retry]", container).onclick = () => { firstRun = false; queue = shuffle(items); idx = 0; results = []; document.addEventListener("keydown", keyH); show(); };
      $("[data-done]", container).onclick = exit;
      container.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    show();
  }

  App.exercises = { run };
})(window.App);
