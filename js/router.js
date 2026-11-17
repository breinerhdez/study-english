/* Router por hash: #/ruta/parametros?consulta. Cada vista se registra con un patrón. */
(function (App) {
  const routes = []; let current = null; const subs = new Set();
  function add(pattern, name) {
    const keys = []; let src = "";
    pattern.split("/").filter(Boolean).forEach(seg => {
      const m = seg.match(/^:(\w+)(\?)?$/);
      if (m) { keys.push(m[1]); src += m[2] ? "(?:/([^/]+))?" : "/([^/]+)"; } else src += "/" + seg;
    });
    routes.push({ re: new RegExp("^" + src + "/?$"), keys, name });
  }
  function parse(hash) {
    const raw = (hash || location.hash || "#/").slice(1) || "/";
    const [path, qs] = raw.split("?"); const query = {};
    new URLSearchParams(qs || "").forEach((v, k) => { query[k] = v; });
    for (const r of routes) { const m = path.match(r.re); if (m) { const params = {}; r.keys.forEach((k, i) => { if (m[i + 1]) params[k] = decodeURIComponent(m[i + 1]); }); return { name: r.name, params, query, path, raw }; } }
    return { name: "home", params: {}, query: {}, path: "/", raw: "/" };
  }
  function go(path) { if (location.hash === "#" + path) window.dispatchEvent(new HashChangeEvent("hashchange")); else location.hash = path; }
  const href = (path, query) => "#" + path + (query && Object.keys(query).length ? "?" + new URLSearchParams(query) : "");
  window.addEventListener("hashchange", () => { current = parse(); subs.forEach(f => f(current)); });
  App.router = { add, go, href, parse, get current() { return current || (current = parse()); }, on(f) { subs.add(f); }, start() { current = parse(); subs.forEach(f => f(current)); } };
})(window.App);
