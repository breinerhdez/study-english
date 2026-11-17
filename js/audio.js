/* Motor de audio: voz del navegador (Web Speech API). Funciona sin internet si el dispositivo
   tiene una voz en inglés instalada. Maneja colas (frases, repeticiones, pausas para repetir). */
(function (App) {
  const { sleep } = App.u;
  const can = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  let voices = [], voice = null;
  const listeners = new Set();
  let token = 0;
  const state = { playing: false, paused: false, index: -1, rep: 0, total: 0, item: null, queue: [], opts: null };

  function emit() { listeners.forEach(f => { try { f(state); } catch (e) { console.error(e); } }); }

  function score(v) {
    let s = 0; const n = v.name.toLowerCase();
    if (/en[-_]US/i.test(v.lang)) s += 10; else if (/en[-_]GB/i.test(v.lang)) s += 6; else if (/^en/i.test(v.lang)) s += 3;
    if (v.localService) s += 20; // las voces locales respetan la velocidad y funcionan sin internet
    if (/samantha|aria|jenny|guy|zira|alex|google us|ava|allison|nicky|evan|siri/.test(n)) s += 2;
    if (/enhanced|premium|natural|neural/.test(n)) s += 3;
    return s;
  }
  function loadVoices() {
    if (!can) return;
    voices = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang)).sort((a, b) => score(b) - score(a));
    const want = App.store.setting("voiceURI");
    voice = voices.find(v => v.voiceURI === want) || voices[0] || null;
    emit();
  }
  if (can) { loadVoices(); speechSynthesis.addEventListener ? speechSynthesis.addEventListener("voiceschanged", loadVoices) : (speechSynthesis.onvoiceschanged = loadVoices); }

  /* Dice un texto una vez. Resuelve cuando termina (o falla: nunca se queda colgado). */
  function say(text, rate) {
    return new Promise(resolve => {
      if (!can) return resolve(false);
      const u = new SpeechSynthesisUtterance(text);
      u.lang = (voice && voice.lang) || "en-US"; if (voice) u.voice = voice;
      u.rate = rate || App.store.setting("rate") || 0.9;
      let done = false; const fin = (ok) => { if (!done) { done = true; clearTimeout(guard); resolve(ok); } };
      u.onend = () => fin(true);
      u.onerror = (e) => fin(e.error === "canceled" || e.error === "interrupted" ? "canceled" : false);
      // Algunos navegadores no disparan onend: seguro de tiempo.
      const guard = setTimeout(() => fin(true), Math.max(4000, text.length * 160 / u.rate));
      try { speechSynthesis.resume(); speechSynthesis.speak(u); } catch (e) { fin(false); }
    });
  }

  function cancelSpeech() { if (can) try { speechSynthesis.cancel(); } catch (e) { } }

  function stop() { token++; cancelSpeech(); Object.assign(state, { playing: false, paused: false, resume: false, index: -1, rep: 0, item: null }); emit(); }

  let warned = false;
  function ensureVoice() {
    if (!can) { if (!warned) { warned = true; App.u.toast("Este navegador no tiene síntesis de voz. Prueba con Chrome, Edge, Safari o Firefox."); } return false; }
    if (!voices.length && !warned && speechSynthesis.getVoices().length) { warned = true; App.u.toast("No hay voz en inglés instalada. Mira Ajustes › Voz para activarla."); }
    return true;
  }

  /* Reproduce una sola palabra/frase (corta cualquier cola anterior). */
  async function speak(text, opts = {}) {
    if (!ensureVoice()) return;
    token++; const my = token; cancelSpeech();
    Object.assign(state, { playing: true, paused: false, resume: false, index: 0, rep: 1, total: 1, item: { text }, queue: [{ text }], opts: { single: true } }); emit();
    await sleep(40); if (my !== token) return;
    await say(text, opts.rate);
    if (my === token) { state.playing = false; state.item = null; emit(); }
  }

  /* Cola de frases.
     items: [{text, label?, ref?}]; opts: {rate, repeats, echo (pausa para repetir), gap(ms), loop, start, onItem(i,rep), onEnd} */
  async function playQueue(items, opts = {}) {
    if (!ensureVoice() || !items.length) return;
    token++; const my = token; cancelSpeech();
    const o = Object.assign({ repeats: 1, echo: false, gap: 500, loop: false, start: 0 }, opts);
    Object.assign(state, { playing: true, paused: false, resume: false, queue: items, total: items.length, opts: o });
    await sleep(40);
    let i = o.start;
    while (my === token) {
      const it = items[i]; state.index = i; state.item = it;
      for (let r = 1; r <= o.repeats && my === token; r++) {
        state.rep = r; emit(); if (o.onItem) o.onItem(i, r, it);
        const rate = it.rate || o.rate;
        const ok = await say(it.text, rate);
        if (my !== token) return;
        if (ok === false) { stop(); return; }
        // pausa para que el estudiante repita en voz alta (proporcional a la frase)
        const wait = o.echo ? Math.max(1100, it.text.length * 75 / (rate || App.store.setting("rate") || .9)) : o.gap;
        if (r < o.repeats || i < items.length - 1 || o.loop) await sleep(wait);
      }
      if (my !== token) return;
      if (++i >= items.length) { if (o.loop) i = 0; else break; }
    }
    if (my === token) { state.playing = false; state.index = -1; state.item = null; emit(); if (o.onEnd) o.onEnd(); }
  }

  /* Salta a otra frase de la cola actual (anterior / siguiente) */
  function jump(delta) {
    if (!state.playing || !state.queue.length || state.opts.single) return;
    const i = App.u.clamp(state.index + delta, 0, state.queue.length - 1);
    playQueue(state.queue, Object.assign({}, state.opts, { start: i }));
  }
  function toggle() {
    if (state.playing) { const q = state.queue, o = state.opts, i = Math.max(0, state.index); stop(); state.queue = q; state.opts = Object.assign({}, o, { start: i }); state.resume = true; emit(); }
    else if (state.queue.length && state.opts && !state.opts.single) playQueue(state.queue, state.opts);
  }

  App.audio = {
    can, state, speak, playQueue, stop, jump, toggle,
    get voices() { return voices; }, get voice() { return voice; },
    setVoice(uri) { App.store.setting("voiceURI", uri); loadVoices(); },
    on(f) { listeners.add(f); return () => listeners.delete(f); },
    slowRate() { return App.store.setting("slowRate") || 0.6; },
    get hasVoice() { return !can ? false : voices.length > 0; },
    reload: loadVoices
  };
})(window.App);
