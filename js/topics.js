/* Registro de temas + ayudantes para escribir ejercicios de forma compacta (Q.*).
   Cada tema vive en content/topics/*.js y llama a App.defineTopic({...}). */
(function (App) {
  const list = []; const byId = {}; const exById = {};

  function defineTopic(t) {
    t.sections = t.sections || [];
    t.sections.forEach((s, si) => {
      s.id = s.id || "s" + (si + 1); s.blocks = s.blocks || [];
      s.blocks.forEach((b, bi) => {
        b.id = b.id || "b" + (bi + 1);
        if (b.type === "exercises") {
          b.key = s.id + "." + b.id; b.title = b.title || "Ejercicios";
          b.items.forEach((it, ii) => { it.id = `${t.id}.${s.id}.${b.id}.${ii + 1}`; it._topic = t.id; it._sec = s.id; it._blk = b.id; exById[it.id] = it; });
        }
      });
    });
    if (App.dict) App.dict.registerTopic(t.words);
    const at = list.findIndex(x => x.id === t.id); if (at >= 0) list.splice(at, 1);
    list.push(t); byId[t.id] = t;
    list.sort((a, b) => (a.order || 999) - (b.order || 999));
  }
  const get = id => byId[id];
  const section = (t, sid) => t.sections.find(s => s.id === sid);
  const route = (topic, sec, q) => "/t/" + topic + (sec ? "/" + sec : "") + (q && Object.keys(q).length ? "?" + new URLSearchParams(q) : "");

  /* Progreso: unidades = secciones visitadas + sets de ejercicios aprobados. */
  function progress(t) {
    const p = App.store.d.progress[t.id]; let total = 0, done = 0;
    t.sections.forEach(s => {
      const sets = s.blocks.filter(b => b.type === "exercises");
      if (s.blocks.length > sets.length) { total++; if (p && p.visited[s.id]) done++; } // sección de contenido
      sets.forEach(b => { total++; if (p && p.sets[b.key] && p.sets[b.key].best >= 0.7) done++; });
    });
    return { total, done, pct: total ? Math.round(done * 100 / total) : 0 };
  }

  /* Etiqueta humana de un lugar (para los links del vocabulario) */
  function label(topic, sec, block) {
    const t = byId[topic]; if (!t) return topic === "reader" ? "Mi lector" : topic;
    const s = section(t, sec); return `${t.title} · ${s ? s.title : sec}`;
  }

  const Q = {
    /* mcq(pregunta, opciones, índiceCorrecto, porqué, extra) */
    mcq: (q, opts, a, why, x) => Object.assign({ type: "mcq", q, opts, a, why }, x),
    tf: (q, ok, why, x) => Object.assign({ type: "mcq", q, opts: ["Verdadero", "Falso"], a: ok ? 0 : 1, why, fixed: true }, x),
    /* fill("She ___ (work) here.", ["works"], porqué, {hint}) */
    fill: (q, a, why, x) => Object.assign({ type: "fill", q, a: [].concat(a), why }, x),
    /* order("Yo soy estudiante", "I am a student", porqué, {extra:["is"]}) */
    order: (es, en, why, x) => Object.assign({ type: "order", es, a: en, why }, x),
    match: (q, pairs, why) => ({ type: "match", q, pairs, why }),
    /* Dictado: escuchas y escribes */
    dictate: (en, why, x) => Object.assign({ type: "fill", q: "Escucha y escribe lo que oyes.", audio: en, a: [en], why, dictation: true }, x),
    /* Comprensión auditiva: escuchas y eliges */
    hear: (en, opts, a, why, x) => Object.assign({ type: "mcq", q: "¿Qué oración escuchas?", audio: en, opts, a, why, hideOnAudio: true }, x)
  };

  App.topics = { list, get, section, route, progress, label, exById, defineTopic, Q };
  App.defineTopic = defineTopic; App.Q = Q;
})(window.App);
