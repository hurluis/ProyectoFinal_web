// Luis&SantiCO — App root, router, cart state, toast, tweaks panel
const { useState, useEffect, useRef, useMemo } = React;

const TWEAKS_DEFAULTS = {
  "accent": "oklch(0.78 0.14 68)",
  "bg": "#0e0d0b",
  "fontDisplay": "'Fraunces', serif",
  "density": "comfortable"
};

function useCart() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("lsc_cart") || "[]"); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem("lsc_cart", JSON.stringify(cart)); }, [cart]);
  const add = (product, color, qty = 1) => {
    const key = product.id + "-" + color.id;
    setCart(c => {
      const ex = c.find(i => i.key === key);
      if (ex) return c.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      return [...c, { key, productId: product.id, name: product.name, heroImage: product.gallery[0], price: product.price, qty, colorId: color.id, colorName: color.name }];
    });
  };
  return { cart, setCart, add };
}

function useRoute() {
  const [route, setRoute] = useState(() => {
    try { return JSON.parse(localStorage.getItem("lsc_route") || "null") || { path: "home" }; } catch { return { path: "home" }; }
  });
  const navigate = (r) => {
    setRoute(r);
    localStorage.setItem("lsc_route", JSON.stringify(r));
    setTimeout(() => {
      if (r.hash) {
        const el = document.getElementById(r.hash);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }, 50);
  };
  return [route, navigate];
}

function LSCToast({ show, children }) {
  return (
    <div style={{
      position: "fixed", top: 100, left: "50%", zIndex: 200,
      transform: `translateX(-50%) translateY(${show ? 0 : -20}px)`,
      opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none",
      transition: "all .35s cubic-bezier(.2,.8,.2,1)",
      padding: "12px 24px", background: "var(--ink)", color: "var(--bg)",
      borderRadius: 999, fontSize: 13, fontFamily: "var(--font-mono)",
      letterSpacing: "0.1em", textTransform: "uppercase",
      boxShadow: "0 18px 48px -12px rgba(0,0,0,0.5)",
    }}>{children}</div>
  );
}

function LSCTweaks({ tweaks, setTweaks }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const on = (e) => {
      if (e.data?.type === "__activate_edit_mode") setActive(true);
      if (e.data?.type === "__deactivate_edit_mode") setActive(false);
    };
    window.addEventListener("message", on);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", on);
  }, []);
  const set = (k, v) => {
    setTweaks(t => ({ ...t, [k]: v }));
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
  };
  if (!active) return null;
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 150, padding: 20, background: "var(--surface)", border: "1px solid var(--line-strong)", borderRadius: 16, width: 280, boxShadow: "0 24px 64px -12px rgba(0,0,0,0.6)", color: "var(--ink)" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 14 }}>— Tweaks</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <div style={{ fontSize: 11, marginBottom: 8, color: "var(--ink-soft)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Acento</div>
          <div style={{ display: "flex", gap: 6 }}>
            {[["oklch(0.78 0.14 68)", "Ámbar"], ["oklch(0.75 0.15 25)", "Coral"], ["oklch(0.72 0.13 155)", "Verde"], ["oklch(0.75 0.14 260)", "Azul"]].map(([c, n]) => (
              <button key={c} onClick={() => set("accent", c)} title={n} style={{ width: 32, height: 32, borderRadius: 999, background: c, border: tweaks.accent === c ? "2px solid var(--ink)" : "2px solid transparent", cursor: "pointer" }} />
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, marginBottom: 8, color: "var(--ink-soft)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Tema</div>
          <div style={{ display: "flex", gap: 6 }}>
            {[["#0e0d0b", "Obsidiana"], ["#f3ece0", "Hueso"]].map(([c, n]) => (
              <button key={c} onClick={() => set("bg", c)} style={{ padding: "8px 14px", borderRadius: 999, background: c, color: c === "#0e0d0b" ? "#f3ece0" : "#0e0d0b", border: tweaks.bg === c ? "2px solid var(--accent)" : "1px solid var(--line-strong)", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>{n}</button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, marginBottom: 8, color: "var(--ink-soft)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Tipografía display</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[["'Fraunces', serif", "Fraunces"], ["'Playfair Display', serif", "Playfair"], ["'Instrument Serif', serif", "Instrument"]].map(([v, n]) => (
              <button key={v} onClick={() => set("fontDisplay", v)} style={{ padding: "8px 12px", borderRadius: 999, background: "transparent", color: "var(--ink)", border: tweaks.fontDisplay === v ? "1px solid var(--accent)" : "1px solid var(--line-strong)", fontFamily: v, fontSize: 13, cursor: "pointer" }}>{n}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [route, navigate] = useRoute();
  const { cart, setCart, add } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [tweaks, setTweaks] = useState(TWEAKS_DEFAULTS);

  useEffect(() => {
    const s = document.documentElement.style;
    s.setProperty("--accent", tweaks.accent);
    s.setProperty("--bg", tweaks.bg);
    s.setProperty("--font-display", tweaks.fontDisplay);
    if (tweaks.bg === "#f3ece0") {
      s.setProperty("--surface", "#ebe3d5"); s.setProperty("--surface-2", "#e0d7c7");
      s.setProperty("--ink", "#0e0d0b"); s.setProperty("--ink-soft", "#5a5346"); s.setProperty("--ink-faint", "#8a8274");
      s.setProperty("--line", "#d7cebe"); s.setProperty("--line-strong", "#bfb5a4");
      s.setProperty("--accent-ink", "#0e0d0b");
    } else {
      s.setProperty("--surface", "#16140f"); s.setProperty("--surface-2", "#1f1c16");
      s.setProperty("--ink", "#f3ece0"); s.setProperty("--ink-soft", "#a39b8c"); s.setProperty("--ink-faint", "#6b6457");
      s.setProperty("--line", "#2a261f"); s.setProperty("--line-strong", "#3a342a");
      s.setProperty("--accent-ink", "#0e0d0b");
    }
  }, [tweaks]);

  const addAndToast = (product, color, qty) => {
    add(product, color, qty);
    setToast(`✓ ${product.name} añadido`);
    setTimeout(() => setToast(null), 2400);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div data-screen-label={"Luis&SantiCO / " + route.path}>
      <LSCNav route={route} navigate={navigate} cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        {route.path === "home" && <LSCHome navigate={navigate} onAddToCart={addAndToast} />}
        {route.path === "catalog" && <LSCCatalog navigate={navigate} onAddToCart={addAndToast} initialCat={route.cat} />}
        {route.path === "product" && <LSCProduct slug={route.slug} navigate={navigate} onAddToCart={addAndToast} />}
        {route.path === "checkout" && <LSCCheckout cart={cart} setCart={setCart} navigate={navigate} />}
      </main>
      <LSCFooter navigate={navigate} />
      <LSCCartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setCart={setCart} navigate={navigate} />
      <LSCToast show={!!toast}>{toast}</LSCToast>
      <LSCTweaks tweaks={tweaks} setTweaks={setTweaks} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
