/* Arranque: preferencias, navegación, reproductor, carga de temas y enrutado. */
(function (App) {
  const { $, $$, esc, el } = App.u; const { icon } = App;

  /* ---------- Preferencias visuales ---------- */
  function applyPrefs() {
    const s = App.store.d.settings; const r = document.documentElement;
    r.dataset.theme = s.theme === "auto" ? "" : s.theme; if (s.theme === "auto") r.removeAttribute("data-theme");
    r.style.setProperty("--fs", s.scale || 1);
    document.body.classList.toggle("show-ipa", !!s.ipa);
    document.body.classList.toggle("no-es", s.translate === false);
    const meta = $('meta[name="theme-color"]'); if (meta) meta.content = getComputedStyle(document.body).getPropertyValue("--bg").trim() || "#f6f7fb";
  }
  App.view = {
    toggle(name) { const k = name === "ipa" ? "ipa" : "translate"; App.store.setting(k, !App.store.setting(k)); },
    apply: applyPrefs
  };

  /* ---------- Navegación ---------- */
  const NAV = [
    ["home", "/", "Inicio", "home"], ["topics", "/temas", "Temas", "book"], ["practice", "/practica", "Práctica", "target", "rail"],
    ["ipa", "/fonetica", "Fonética", "ipa"], ["vocab", "/vocabulario", "Vocabulario", "bookmark"], ["reader", "/lector", "Lector", "text", "rail"],
    ["more", "/mas", "Más", "more", "mob"], ["settings", "/ajustes", "Ajustes", "settings", "rail"]
  ];
  function buildNav() {
    $("#nav").innerHTML = `<a class="brand" href="#/" aria-label="English Studio"><span class="logo">æ</span><span class="brand-t">English Studio</span></a>
      <div class="nav-links">${NAV.map(([id, path, label, ic, only]) => `<a class="nav-i ${only ? only + "-only" : ""}" data-nav="${id}" href="#${path}">${icon(ic)}<span>${label}</span></a>`).join("")}</div>
      <div class="nav-foot"><div id="net-badge">Sin conexión</div></div>`;
  }
  function markNav(name) {
    const map = { topic: "topics", topics: "topics", home: "home", practice: "practice", ipa: "ipa", vocab: "vocab", reader: "reader", settings: "settings", more: "more" };
    const cur = map[name] || name;
    $$("#nav .nav-i").forEach(a => { const on = a.dataset.nav === cur || (cur === "reader" && a.dataset.nav === "more" && document.documentElement.dataset.layout !== "rail") || (["practice", "settings"].includes(cur) && a.dataset.nav === "more" && document.documentElement.dataset.layout !== "rail"); if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  }

  /* ---------- Mini reproductor + resaltado de la frase que suena ---------- */
  let lastEl = null;
  function buildPlayer() {
    $("#player").innerHTML = `<button class="btn icon ghost" data-pl="prev" aria-label="Anterior">${icon("prev")}</button>
      <button class="btn icon play" data-pl="toggle" aria-label="Pausa / continuar"></button>
      <button class="btn icon ghost" data-pl="next" aria-label="Siguiente">${icon("next")}</button>
      <div class="pl-txt"><div class="pl-sent"></div><div class="pl-meta"></div></div>
      <button class="btn icon ghost" data-pl="close" aria-label="Cerrar">${icon("x")}</button>`;
    $("#player").addEventListener("click", e => {
      const b = e.target.closest("[data-pl]"); if (!b) return; const a = b.dataset.pl;
      if (a === "prev") App.audio.jump(-1); else if (a === "next") App.audio.jump(1); else if (a === "toggle") App.audio.toggle(); else { App.audio.stop(); }
    });
  }
  function onAudio(st) {
    const pl = $("#player"); const multi = st.queue.length > 1 && st.opts && !st.opts.single;
    const show = multi && (st.playing || st.resume); pl.classList.toggle("on", !!show);
    if (show) {
      const idx = st.playing ? st.index : (st.opts.start || 0); const it = st.queue[idx] || {};
      $(".pl-sent", pl).textContent = it.text || ""; $(".pl-meta", pl).textContent = `Frase ${idx + 1} de ${st.queue.length}` + (st.opts.repeats > 1 && st.playing ? ` · repetición ${st.rep}/${st.opts.repeats}` : "");
      $('[data-pl="toggle"]', pl).innerHTML = icon(st.playing ? "pause" : "play");
    }
    $$(".playing, .speaking").forEach(n => n.classList.remove("playing", "speaking"));
    $$(".play.playing").forEach(n => n.classList.remove("playing"));
    if (st.playing && st.item) {
      if (st.item.el) st.item.el.classList.add("playing"); if (st.item.row) st.item.row.classList.add("speaking");
      if (st.item.dots) { st.item.dots.innerHTML = Array.from({ length: st.opts.repeats }, (_, j) => `<i class="${j < st.rep - 1 ? "on" : j === st.rep - 1 ? "cur" : ""}"></i>`).join(""); }
      const t = st.item.row || st.item.el;
      if (t && t !== lastEl) { lastEl = t; const r = t.getBoundingClientRect(); if (r.top < 90 || r.bottom > innerHeight - 140) t.scrollIntoView({ block: "center", behavior: "smooth" }); }
    } else lastEl = null;
  }

  /* ---------- Navegación con control remoto / flechas (TV) ---------- */
  function spatialNav() {
    document.addEventListener("keydown", e => {
      const dir = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key]; if (!dir) return;
      const t = e.target; if (t.matches && t.matches("input,textarea,select")) return;
      const items = $$("a[href],button:not([disabled]),[tabindex='0'],input,select,textarea").filter(n => n.offsetParent !== null);
      const from = (document.activeElement && items.includes(document.activeElement)) ? document.activeElement : null;
      if (!from) { const f = items.find(n => n.closest("#main")) || items[0]; if (f) { f.focus(); e.preventDefault(); } return; }
      const a = from.getBoundingClientRect(); const ax = a.left + a.width / 2, ay = a.top + a.height / 2; let best = null, bd = 1e9;
      items.forEach(n => {
        if (n === from) return; const r = n.getBoundingClientRect(); const dx = r.left + r.width / 2 - ax, dy = r.top + r.height / 2 - ay;
        const along = dx * dir[0] + dy * dir[1]; if (along <= 4) return; const across = Math.abs(dx * dir[1]) + Math.abs(dy * dir[0]);
        const d = along + across * 2.2; if (d < bd) { bd = d; best = n; }
      });
      if (best) { e.preventDefault(); best.focus(); best.scrollIntoView({ block: "nearest" }); }
    });
  }

  /* ---------- Render de rutas ---------- */
  function render(route) {
    const v = App.views[route.name] || App.views.home; const main = $("#main");
    App.audio.stop(); App.wordpanel.close(); markNav(route.name);
    main.innerHTML = ""; const out = v.render(route);
    if (out instanceof Node) main.appendChild(out); else if (typeof out === "string") main.innerHTML = out;
    if (v.after) v.after(route, main);
    if (!route.query.b) { window.scrollTo(0, 0); }
    document.title = (v.title ? (typeof v.title === "function" ? v.title(route) : v.title) + " · " : "") + "English Studio";
  }

  function loadScript(src) { return new Promise(res => { const s = document.createElement("script"); s.src = src; s.onload = s.onerror = () => res(); document.head.appendChild(s); }); }

  async function boot() {
    buildNav(); buildPlayer(); applyPrefs(); App.wordpanel.init(); spatialNav();
    App.audio.on(onAudio);
    App.store.on(w => { if (w === "settings" || w === "import" || w === "reset") { applyPrefs(); $$(".reading").forEach(r => r.parentNode._sync && r.parentNode._sync()); } });
    const net = () => { const b = $("#net-badge"); b.classList.toggle("on", !navigator.onLine); b.textContent = "Sin conexión · todo sigue funcionando"; };
    addEventListener("online", net); addEventListener("offline", net); net();
    addEventListener("beforeinstallprompt", e => { e.preventDefault(); App.installPrompt = e; });
    // Temas: la lista la genera tools/sync.js en content/manifest.js
    await loadScript("content/manifest.js");
    for (const f of (window.TOPIC_FILES || [])) await loadScript(f);
    [["/", "home"], ["/temas", "topics"], ["/t/:id/:sec?", "topic"], ["/practica", "practice"], ["/fonetica/:tab?", "ipa"], ["/vocabulario/:mode?", "vocab"],
      ["/lector/:id?", "reader"], ["/mas", "more"], ["/ajustes", "settings"]].forEach(([p, n]) => App.router.add(p, n));
    App.router.on(render); App.router.start();
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => { });
  }
  document.addEventListener("DOMContentLoaded", boot);
})(window.App);
