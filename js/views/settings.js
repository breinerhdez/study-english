/* Ajustes: voz, velocidad, apariencia, copia de seguridad. */
(function (App) {
  const { esc, el, $, $$ } = App.u; const { icon } = App; const V = App.views;

  V.settings = {
    title: "Ajustes",
    render() {
      const s = App.store.d.settings; const au = App.audio;
      const root = el(`<div class="page"><div class="page-head"><div><h1>Ajustes</h1><p class="sub">Todo se guarda en este dispositivo. No necesitas cuenta ni internet.</p></div></div><div class="set-grid">
        <div class="card"><h2>${icon("vol")} Voz y audio</h2>
          <div class="field"><label for="sv">Voz en inglés</label><select id="sv"></select></div><div id="vwarn"></div>
          <div class="field"><label for="sr">Velocidad normal: <b id="srv"></b></label><input type="range" id="sr" min="0.5" max="1.3" step="0.05"></div>
          <div class="field"><label for="ssl">Velocidad lenta (botón ${icon("slow")} Lento): <b id="sslv"></b></label><input type="range" id="ssl" min="0.3" max="0.85" step="0.05"></div>
          <div class="row"><button class="btn soft" id="st">${icon("play")} Probar normal</button><button class="btn soft" id="sts">${icon("slow")} Probar lento</button></div>
          <p class="muted" id="vnote" style="font-size:.85rem;margin:0"></p>
          <label class="switch"><input type="checkbox" id="sas"> Leer la frase completa tras cada ejercicio</label>
          <label class="switch"><input type="checkbox" id="sap"> Pronunciar la palabra al tocarla</label></div>
        <div class="card"><h2>${icon("eye")} Lectura</h2>
          <label class="switch"><input type="checkbox" id="si"> Mostrar IPA bajo cada palabra</label>
          <label class="switch"><input type="checkbox" id="stt"> Mostrar traducción junto a las lecturas</label>
          <div class="field"><label>Tamaño de texto</label><div class="seg" id="sz">${[[1, "Normal"], [1.2, "Grande"], [1.45, "Muy grande"], [1.8, "TV"]].map(([v, n]) => `<button data-v="${v}">${n}</button>`).join("")}</div></div>
          <div class="field"><label>Tema</label><div class="seg" id="th">${[["auto", "Automático"], ["light", "Claro"], ["dark", "Oscuro"]].map(([v, n]) => `<button data-v="${v}">${n}</button>`).join("")}</div></div></div>
        <div class="card"><h2>${icon("download")} Copia de seguridad</h2><p class="muted">Guarda tu vocabulario y progreso en un archivo, o pásalo a otro dispositivo.</p>
          <div class="row"><button class="btn" id="ex">${icon("download")} Exportar</button><label class="btn" for="im" style="cursor:pointer">${icon("upload")} Importar</label><input type="file" id="im" accept=".json,application/json" hidden></div>
          <button class="btn danger" id="rs">${icon("trash")} Borrar todo mi progreso</button></div>
        <div class="card"><h2>${icon("home")} Instalar y usar sin internet</h2><p class="muted" id="inst">Esta plataforma funciona sin conexión una vez cargada. Puedes instalarla como app desde el menú del navegador (“Añadir a pantalla de inicio” / “Instalar”).</p><div class="row"><button class="btn primary" id="ib" hidden>Instalar app</button><span class="pill ${"serviceWorker" in navigator && location.protocol.startsWith("http") ? "ok" : "warn"}">${"serviceWorker" in navigator && location.protocol.startsWith("http") ? "Modo sin conexión activo" : "Abierta desde archivo: sin modo offline (usa el servidor local)"}</span></div></div>
      </div></div>`);
      const sv = $("#sv", root);
      const fillVoices = () => {
        sv.innerHTML = au.voices.length ? au.voices.map(v => `<option value="${esc(v.voiceURI)}" ${au.voice && au.voice.voiceURI === v.voiceURI ? "selected" : ""}>${esc(v.name)} (${esc(v.lang)})${v.localService ? " · sin internet" : " · online"}</option>`).join("") : '<option>No hay voces en inglés</option>';
        $("#vwarn", root).innerHTML = au.voices.length ? "" : `<div class="callout warn"><div class="c-ic">⚠️</div><div><h3>Instala una voz en inglés</h3><p><b>Android:</b> Ajustes › Sistema › Idiomas › Salida de texto a voz. <b>iPhone:</b> Ajustes › Accesibilidad › Contenido hablado › Voces. <b>Windows:</b> Configuración › Hora e idioma › Voz. <b>Mac:</b> Ajustes › Accesibilidad › Contenido hablado.</p></div></div>`;
      };
      fillVoices(); const off = au.on(() => { if (!root.isConnected) return off(); if (!sv.matches(":focus")) fillVoices(); });
      sv.onchange = () => au.setVoice(sv.value);
      const sr = $("#sr", root); sr.value = s.rate; $("#srv", root).textContent = s.rate.toFixed(2) + "×"; sr.oninput = () => { App.store.setting("rate", +sr.value); $("#srv", root).textContent = (+sr.value).toFixed(2) + "×"; };
      const sl = $("#ssl", root); sl.value = s.slowRate || 0.6; $("#sslv", root).textContent = (+sl.value).toFixed(2) + "×"; sl.oninput = () => { App.store.setting("slowRate", +sl.value); $("#sslv", root).textContent = (+sl.value).toFixed(2) + "×"; };
      const T = "Hello! This is how I sound. Let's practice English together.";
      $("#st", root).onclick = () => au.speak(T); $("#sts", root).onclick = () => au.speak(T, { rate: au.slowRate() });
      const note = () => { const v = au.voice; $("#vnote", root).textContent = v && !v.localService ? "⚠ Esta voz funciona por internet y casi siempre IGNORA la velocidad. Elige una voz marcada “sin internet” para que lento/normal se noten." : ""; }; note(); sv.addEventListener("change", note);
      const bind = (id, key, inv) => { const c = $(id, root); c.checked = inv ? s[key] !== false : !!s[key]; c.onchange = () => App.store.setting(key, c.checked); };
      bind("#sas", "autoSpeak", true); bind("#sap", "autoplay", true); bind("#si", "ipa"); bind("#stt", "translate");
      const seg = (id, key) => { const box = $(id, root); const mark = () => $$("button", box).forEach(b => b.setAttribute("aria-pressed", String(String(App.store.setting(key)) === b.dataset.v))); mark(); box.onclick = e => { const b = e.target.closest("button"); if (!b) return; App.store.setting(key, key === "scale" ? +b.dataset.v : b.dataset.v); mark(); }; };
      seg("#sz", "scale"); seg("#th", "theme");
      $("#ex", root).onclick = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([App.store.export()], { type: "application/json" })); a.download = "english-studio-" + App.u.today() + ".json"; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); };
      $("#im", root).onchange = e => { const f = e.target.files[0]; if (!f) return; f.text().then(t => { App.store.import(t); App.u.toast("Copia restaurada"); }).catch(() => App.u.toast("Archivo no válido")); };
      $("#rs", root).onclick = () => { if (confirm("¿Borrar vocabulario, progreso y ajustes de este dispositivo?")) { App.store.reset(); App.u.toast("Todo borrado"); App.router.go("/"); } };
      const ib = $("#ib", root); if (App.installPrompt) { ib.hidden = false; ib.onclick = () => App.installPrompt.prompt(); }
      return root;
    }
  };
})(window.App);
