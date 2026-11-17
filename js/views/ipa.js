/* Fonética: tabla IPA interactiva, pares mínimos y entrenamiento de oído. */
(function (App) {
  const { esc, el, $, $$, shuffle } = App.u; const { icon } = App; const V = App.views; const D = () => window.IPA_DATA;

  const wordBtn = ([w, ipa]) => `<button class="s-word" data-say="${esc(w)}">${icon("vol")}<b>${esc(w)}</b><span class="ipa">/${esc(ipa)}/</span></button>`;
  const soundCard = s => `<div class="card sound flat"><div class="s-top"><button class="s-sym" data-say="${esc(s.words[0][0])}" aria-label="Escuchar ${esc(s.s)}">${esc(s.s)}</button>
      <div><div class="s-name">${esc(s.name)} ${s.hard ? '<span class="pill warn">difícil</span>' : ""}</div><div class="s-es">${esc(s.es)}</div></div></div>
      <div class="s-words">${s.words.map(wordBtn).join("")}</div>${s.tip ? `<div class="s-tip">${esc(s.tip)}</div>` : ""}</div>`;

  const TABS = [["vowels", "Vocales"], ["diphthongs", "Diptongos"], ["consonants", "Consonantes"], ["pairs", "Pares mínimos"], ["ear", "Entrena tu oído"], ["marks", "Acento y símbolos"]];

  V.ipa = {
    title: "Fonética IPA",
    render(route) {
      const tab = TABS.some(t => t[0] === route.params.tab) ? route.params.tab : "vowels"; const d = D();
      const root = el(`<div class="page"><div class="page-head"><div><h1>Fonética IPA</h1><p class="sub">El alfabeto fonético internacional te dice <b>cómo suena</b> una palabra, no cómo se escribe. Toca los sonidos y las palabras para escucharlos (inglés americano).</p></div></div>
        <div class="tabs" role="tablist">${TABS.map(([id, n]) => `<button role="tab" aria-selected="${id === tab}" data-tab="${id}">${n}</button>`).join("")}</div><div id="tabc"></div></div>`);
      const c = $("#tabc", root);
      if (tab === "vowels") c.innerHTML = `<div class="callout key" style="margin-bottom:var(--gap)"><div class="c-ic">🔑</div><div><h3>El inglés tiene más vocales que el español</h3><p>El español tiene 5 vocales; el inglés americano tiene unos 12 sonidos vocálicos. Escribir una letra no te dice qué sonido es: por eso existe el IPA.</p></div></div><div class="grid wide">${d.vowels.map(soundCard).join("")}</div>`;
      else if (tab === "diphthongs") c.innerHTML = `<p class="muted" style="margin-bottom:var(--gap)">Un diptongo son dos vocales en una sola sílaba: el sonido se desliza del primero al segundo.</p><div class="grid wide">${d.diphthongs.map(soundCard).join("")}</div>`;
      else if (tab === "consonants") c.innerHTML = `<p class="muted" style="margin-bottom:var(--gap)">Las marcadas como <span class="pill warn">difícil</span> son las que más confunden los hispanohablantes.</p><div class="grid wide">${d.consonants.map(soundCard).join("")}</div>`;
      else if (tab === "pairs") c.innerHTML = `<p class="muted" style="margin-bottom:var(--gap)">Pares de palabras que solo cambian en un sonido. Si los distingues al oído, los distinguirás al hablar.</p><div class="grid wide">${d.pairs.map(p => `<div class="card pair-card flat"><div class="pair-head">/${esc(p.a)}/ <span class="vs">vs</span> /${esc(p.b)}/</div><div class="s-es">${esc(p.tip)}</div>
        ${p.words.map(w => `<div class="pair-row">${wordBtn([w[0], w[1]])}${wordBtn([w[2], w[3]])}</div>`).join("")}</div>`).join("")}</div>`;
      else if (tab === "marks") c.innerHTML = `<div class="grid wide">${d.marks.map(m => `<div class="card sound flat"><div class="s-top"><span class="s-sym" style="cursor:default">${esc(m.s)}</span><div><div class="s-name">${esc(m.name)}</div><div class="s-es">${esc(m.es)}</div></div></div><div class="s-words">${m.ex.map(wordBtn).join("")}</div></div>`).join("")}</div>`;
      else c.appendChild(ear(d));
      $$("[data-tab]", root).forEach(b => b.onclick = () => App.router.go("/fonetica/" + b.dataset.tab));
      return root;
    }
  };

  /* Entrenamiento de oído: escuchas una palabra y eliges cuál era */
  function ear(d) {
    const box = el(`<div class="card"><div id="ear"></div></div>`); const ec = $("#ear", box);
    const start = (pairIdx) => {
      const pool = pairIdx === "all" ? d.pairs : [d.pairs[+pairIdx]];
      const qs = shuffle(pool.flatMap(p => p.words.map(w => ({ p, w })))).slice(0, 10); let i = 0, ok = 0;
      const ask = () => {
        if (i >= qs.length) { ec.innerHTML = `<div class="empty"><span class="big-i">${ok >= 8 ? "🏆" : ok >= 5 ? "👏" : "💪"}</span><h2>${ok} de ${qs.length} correctas</h2><p>${ok >= 8 ? "Tu oído ya distingue muy bien estos sonidos." : "Sigue entrenando: repetir es lo que afina el oído."}</p><button class="btn primary big" id="again">Otra ronda</button> <button class="btn big" id="menu">Cambiar pares</button></div>`; $("#again", ec).onclick = () => start(pairIdx); $("#menu", ec).onclick = menu; return; }
        const { p, w } = qs[i]; const target = Math.random() < .5 ? 0 : 1; const word = target ? w[2] : w[0];
        const opts = [[w[0], w[1]], [w[2], w[3]]];
        ec.innerHTML = `<div class="ear-q"><span class="muted">${i + 1} / ${qs.length}</span><h2>¿Qué palabra escuchas?</h2>
          <div class="row"><button class="btn big play" id="ep" aria-label="Escuchar" style="width:5rem;height:5rem">${icon("vol")}</button><button class="btn ghost" id="es">${icon("slow")} Lento</button></div>
          <div class="ear-opts">${opts.map((o, k) => `<button class="btn" data-k="${k}">${esc(o[0])}<small>/${esc(o[1])}/</small></button>`).join("")}</div><div id="efb" class="muted" aria-live="polite" style="min-height:3rem"></div></div>`;
        $("#ep", ec).onclick = () => App.audio.speak(word); $("#es", ec).onclick = () => App.audio.speak(word, { rate: App.audio.slowRate() }); setTimeout(() => App.audio.speak(word), 200);
        let done = false;
        $$("[data-k]", ec).forEach(b => b.onclick = () => {
          if (done) return; done = true; const k = +b.dataset.k; const good = k === target; if (good) ok++;
          b.classList.add(good ? "right" : "wrong"); if (!good) $$("[data-k]", ec)[target].classList.add("right");
          $("#efb", ec).innerHTML = `${good ? "<b style='color:var(--ok)'>¡Correcto!</b>" : "<b style='color:var(--bad)'>Era “" + esc(word) + "”.</b>"} <span class="ipa">/${esc(target ? w[3] : w[1])}/</span> · ${esc(p.tip)}<br><button class="btn primary" id="nx" style="margin-top:.7rem">Siguiente ${icon("arrow")}</button>`;
          $("#nx", ec).onclick = () => { i++; ask(); }; $("#nx", ec).focus();
        });
      };
      ask();
    };
    const menu = () => {
      ec.innerHTML = `<h2>Entrena tu oído</h2><p class="muted">Escuchas una palabra y eliges cuál de las dos era. Elige qué sonidos practicar:</p>
        <div class="row"><button class="btn primary big" data-p="all">${icon("shuffle")} Todos los pares</button>${d.pairs.map((p, i) => `<button class="btn" data-p="${i}"><span class="ipa">/${esc(p.a)}/ vs /${esc(p.b)}/</span></button>`).join("")}</div>`;
      $$("[data-p]", ec).forEach(b => b.onclick = () => start(b.dataset.p));
    };
    menu(); return box;
  }
})(window.App);
