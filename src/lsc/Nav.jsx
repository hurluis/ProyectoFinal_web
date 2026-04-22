// Luis&SantiCO — Nav with numbered links, scroll-aware.
function LSCNav({ route, navigate, cartCount, onOpenCart }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  React.useEffect(() => setMobileOpen(false), [route.path]);

  const links = [
    { n: "01", label: "Tienda",      to: { path: "catalog" } },
    { n: "02", label: "Auriculares", to: { path: "catalog", cat: "auriculares" } },
    { n: "03", label: "Altavoces",   to: { path: "catalog", cat: "altavoces" } },
    { n: "04", label: "Hi-Fi",       to: { path: "catalog", cat: "audio-hifi" } },
    { n: "05", label: "Historia",    to: { path: "home", hash: "manifesto" } },
  ];

  return (
    <header className={"lsc-nav " + (scrolled ? "is-scrolled" : "")}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: scrolled ? "14px 0" : "24px 0",
        transition: "padding .35s ease, background-color .35s ease, backdrop-filter .35s ease, border-color .35s ease",
        background: scrolled ? "color-mix(in oklab, var(--bg) 75%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="lsc-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate({ path: "home" }); }}
          style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.02em", color: "var(--ink)", textDecoration: "none", fontWeight: 400 }}>
          Luis<span style={{ color: "var(--accent)", fontStyle: "italic" }}>&amp;</span>Santi<span style={{ fontSize: 13, verticalAlign: "super", color: "var(--ink-soft)" }}>CO</span>
        </a>
        <nav className="lsc-nav-links" style={{ display: "flex", gap: 28 }}>
          {links.map((l) => (
            <a key={l.n} href="#" onClick={(e) => { e.preventDefault(); navigate(l.to); }}
              className="lsc-nav-link"
              style={{ display: "inline-flex", alignItems: "baseline", gap: 6, color: "var(--ink)", textDecoration: "none", fontSize: 13, letterSpacing: "0.02em" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-faint)", letterSpacing: "0.1em" }}>{l.n}</span>
              <span>{l.label}</span>
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button onClick={onOpenCart} className="lsc-icon-btn" aria-label="Carrito"
            style={{ position: "relative", padding: "10px 14px", background: "transparent", border: "1px solid var(--line-strong)", color: "var(--ink)", borderRadius: 999, fontSize: 12, fontFamily: "var(--font-mono)", letterSpacing: "0.1em", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span>CARRITO</span>
            <span style={{ minWidth: 20, height: 20, borderRadius: 999, background: cartCount > 0 ? "var(--accent)" : "var(--surface-2)", color: cartCount > 0 ? "var(--accent-ink)" : "var(--ink-soft)", fontSize: 11, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 6px", transition: "background-color .3s ease" }}>{cartCount}</span>
          </button>
          <button onClick={() => setMobileOpen(v => !v)} className="lsc-show-mobile" aria-label="Menú" style={{ width: 40, height: 40, background: "transparent", border: "none", color: "var(--ink)", cursor: "pointer" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d={mobileOpen ? "M5 5l10 10" : "M3 7h14"} /><path d={mobileOpen ? "M15 5L5 15" : "M3 13h14"} />
            </svg>
          </button>
        </div>
      </div>
      <div style={{ maxHeight: mobileOpen ? 500 : 0, overflow: "hidden", transition: "max-height .5s cubic-bezier(.2,.8,.2,1)", background: "var(--bg)" }}>
        <div className="lsc-container" style={{ padding: "24px 0 32px", display: "flex", flexDirection: "column", gap: 2 }}>
          {links.map((l) => (
            <a key={l.n} href="#" onClick={(e) => { e.preventDefault(); navigate(l.to); }}
              style={{ padding: "16px 0", display: "flex", gap: 12, alignItems: "baseline", color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--line)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-faint)" }}>{l.n}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 26, letterSpacing: "-0.01em" }}>{l.label}</span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
Object.assign(window, { LSCNav });
