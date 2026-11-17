/* Utilidades generales. Todo cuelga de window.App para no depender de módulos ES
   (así también funciona abriendo index.html directamente desde el disco). */
window.App = window.App || {};
window.App.views = window.App.views || {};
(function (App) {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const today = () => new Date().toISOString().slice(0, 10);
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };

  function toast(msg, ms = 2600) {
    const box = $("#toasts"); if (!box) return;
    const t = el(`<div class="toast" role="status">${esc(msg)}</div>`);
    box.appendChild(t); setTimeout(() => t.remove(), ms);
  }

  /* Texto con formato mínimo para el contenido de los temas:
     **negrita**  *cursiva*  `código`  {{English interactivo}}  — el resto se escapa. */
  function md(text, tokenizeEn) {
    let s = esc(text);
    s = s.replace(/\{\{(.+?)\}\}/g, (_, en) => `<span class="en-inline">${tokenizeEn ? tokenizeEn(en.replace(/&#39;/g, "'")) : en}</span>`);
    s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/(^|[^*])\*([^*]+?)\*/g, "$1<em>$2</em>").replace(/`(.+?)`/g, '<code class="ipa-inline">$1</code>');
    return s.split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
  }

  const norm = (s) => String(s ?? "").toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.,!?;:¡¿"“”()]/g, " ").replace(/\s+/g, " ").trim();
  const CONTR = [[/\bi'm\b/g, "i am"], [/\byou're\b/g, "you are"], [/\bwe're\b/g, "we are"], [/\bthey're\b/g, "they are"], [/\bhe's\b/g, "he is"], [/\bshe's\b/g, "she is"], [/\bit's\b/g, "it is"], [/\bthat's\b/g, "that is"], [/\bthere's\b/g, "there is"], [/\bwhat's\b/g, "what is"], [/\bi'll\b/g, "i will"], [/\bi've\b/g, "i have"], [/\bi'd\b/g, "i would"], [/\bdon't\b/g, "do not"], [/\bdoesn't\b/g, "does not"], [/\bdidn't\b/g, "did not"], [/\bisn't\b/g, "is not"], [/\baren't\b/g, "are not"], [/\bwasn't\b/g, "was not"], [/\bweren't\b/g, "were not"], [/\bcan't\b/g, "can not"], [/\bcannot\b/g, "can not"], [/\bwon't\b/g, "will not"], [/\bhaven't\b/g, "have not"], [/\bhasn't\b/g, "has not"], [/\bwouldn't\b/g, "would not"], [/\bcouldn't\b/g, "could not"], [/\bmustn't\b/g, "must not"], [/\bshouldn't\b/g, "should not"], [/\blet's\b/g, "let us"]];
  const expand = (s) => CONTR.reduce((acc, [re, to]) => acc.replace(re, to), norm(s));
  function lev(a, b) {
    const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
    return prev[n];
  }
  /* Compara una respuesta escrita con las aceptadas. strict=true no iguala contracciones. */
  function checkText(input, answers, strict) {
    const f = strict ? norm : expand;
    const x = f(input); const list = [].concat(answers);
    if (list.some(a => f(a) === x)) return "ok";
    if (x && list.some(a => lev(f(a), x) <= (f(a).length > 6 ? 1 : 0))) return "close";
    return "bad";
  }

  App.u = { esc, $, $$, el, shuffle, sleep, clamp, today, addDays, toast, md, norm, expand, checkText, lev };
})(window.App);
