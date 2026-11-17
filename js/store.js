/* Almacenamiento local (localStorage con respaldo en memoria) + vocabulario + progreso. */
(function (App) {
  const { today, addDays } = App.u;
  const KEY = "english-studio.v1";
  const DEFAULTS = () => ({
    settings: { rate: 0.9, slowRate: 0.6, voiceURI: "", ipa: true, translate: true, theme: "auto", scale: 1, repeats: 3, echo: true },
    vocab: {},          // word -> { word, es, ipa, status, box, due, added, locs:[{topic,section,block,sent,text,route,label,at}] }
    userDict: {},       // word -> [ipa, es] añadidas a mano
    progress: {},       // topicId -> { visited:{sec:1}, sets:{key:{best,last,at}}, last:sec, at }
    stats: { answered: 0, correct: 0, items: {}, days: {} },
    wrong: [],          // ids de ejercicios fallados
    texts: [],          // textos propios del Lector
    last: null
  });
  let data = DEFAULTS();
  let memOnly = false;
  const subs = new Set();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { const p = JSON.parse(raw); const d = DEFAULTS(); data = Object.assign(d, p, { settings: Object.assign(d.settings, p.settings || {}), stats: Object.assign(d.stats, p.stats || {}) }); }
    } catch (e) { memOnly = true; }
  }
  let timer = null;
  function save() {
    clearTimeout(timer);
    timer = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { memOnly = true; } }, 150);
  }
  function emit(what) { save(); subs.forEach(f => { try { f(what); } catch (e) { console.error(e); } }); }
  load();

  const S = {
    get d() { return data; },
    get memOnly() { return memOnly; },
    on(f) { subs.add(f); return () => subs.delete(f); },
    emit,
    setting(k, v) { if (v === undefined) return data.settings[k]; data.settings[k] = v; emit("settings"); },
    export() { return JSON.stringify({ app: "english-studio", version: 1, exported: new Date().toISOString(), data }, null, 1); },
    import(json) {
      const p = JSON.parse(json); if (!p || p.app !== "english-studio" || !p.data) throw new Error("Archivo no válido");
      const d = DEFAULTS(); data = Object.assign(d, p.data, { settings: Object.assign(d.settings, p.data.settings || {}) }); emit("import");
    },
    reset() { data = DEFAULTS(); emit("reset"); },

    /* ---------- Vocabulario ---------- */
    isSaved(w) { return !!data.vocab[w]; },
    savedInTopic(w, topic) { const v = data.vocab[w]; return !!v && v.locs.some(l => l.topic === topic); },
    saveWord(w, info, loc) {
      let v = data.vocab[w];
      if (!v) v = data.vocab[w] = { word: w, es: info.es || "", ipa: info.ipa || "", status: "learning", box: 0, due: today(), added: Date.now(), locs: [] };
      if (info.es && !v.es) v.es = info.es; if (info.ipa && !v.ipa) v.ipa = info.ipa;
      if (loc && !v.locs.some(l => l.route === loc.route)) v.locs.push(Object.assign({ at: Date.now() }, loc));
      emit("vocab"); return v;
    },
    removeWord(w, topic) {
      const v = data.vocab[w]; if (!v) return;
      if (topic) { v.locs = v.locs.filter(l => l.topic !== topic); if (!v.locs.length) delete data.vocab[w]; } else delete data.vocab[w];
      emit("vocab");
    },
    patchWord(w, patch) { if (data.vocab[w]) { Object.assign(data.vocab[w], patch); emit("vocab"); } },
    gradeWord(w, level) { // level: 0 no la sé, 1 más o menos, 2 la sé
      const v = data.vocab[w]; if (!v) return;
      const gaps = [0, 1, 3, 7, 14, 30];
      v.box = level === 0 ? 0 : level === 1 ? Math.max(1, v.box) : Math.min(5, v.box + 1);
      v.due = addDays(today(), gaps[v.box]); v.status = v.box >= 4 ? "known" : "learning";
      emit("vocab");
    },
    dueWords() { const t = today(); return Object.values(data.vocab).filter(v => v.status !== "known" && v.due <= t); },

    /* ---------- Progreso ---------- */
    prog(topic) { return data.progress[topic] || (data.progress[topic] = { visited: {}, sets: {}, last: null, at: 0 }); },
    visit(topic, sec) { const p = S.prog(topic); p.visited[sec] = 1; p.last = sec; p.at = Date.now(); data.last = { topic, sec, at: p.at }; emit("progress"); },
    markSet(topic, key, score) { const p = S.prog(topic); const o = p.sets[key] || { best: 0 }; o.best = Math.max(o.best, score); o.last = score; o.at = Date.now(); p.sets[key] = o; emit("progress"); },
    record(id, ok) {
      const s = data.stats; s.answered++; if (ok) s.correct++;
      const it = s.items[id] || (s.items[id] = { n: 0, c: 0 }); it.n++; if (ok) it.c++;
      s.days[today()] = (s.days[today()] || 0) + 1;
      const i = data.wrong.indexOf(id);
      if (ok && i >= 0) data.wrong.splice(i, 1); if (!ok && i < 0) data.wrong.push(id);
      emit("stats");
    },
    streak() { let n = 0, d = today(); if (!data.stats.days[d]) d = addDays(d, -1); while (data.stats.days[d]) { n++; d = addDays(d, -1); } return n; }
  };
  App.store = S;
})(window.App);
