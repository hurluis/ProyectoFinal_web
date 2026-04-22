function LSCProduct({ slug, navigate, onAddToCart }) {
  const product = window.LSC_PRODUCTS.find(p => p.slug === slug) || window.LSC_PRODUCTS[0];
  const fmt = window.LSC_FORMAT_COP;
  const [imgIdx, setImgIdx] = React.useState(0);
  const [color, setColor] = React.useState(product.colors[0]);
  const [qty, setQty] = React.useState(1);
  const [adding, setAdding] = React.useState(false);
  const [added, setAdded] = React.useState(false);
  React.useEffect(() => { setImgIdx(0); setColor(product.colors[0]); setQty(1); window.scrollTo(0, 0); }, [slug]);

  const doAdd = async () => {
    setAdding(true);
    await new Promise(r => setTimeout(r, 500));
    onAddToCart(product, color, qty);
    setAdding(false); setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = window.LSC_PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div style={{ paddingTop: 110 }}>
      <div className="lsc-container" style={{ padding: "32px 40px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-soft)", display: "flex", gap: 12 }}>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate({ path: "home" }); }} style={{ color: "inherit", textDecoration: "none" }}>Inicio</a>
        <span>/</span>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate({ path: "catalog" }); }} style={{ color: "inherit", textDecoration: "none" }}>Catálogo</a>
        <span>/</span>
        <span style={{ color: "var(--ink)" }}>{product.name}</span>
      </div>

      <section style={{ padding: "20px 0 120px" }}>
        <div className="lsc-container">
          <div className="lsc-pdp-grid" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80 }}>
            {/* Gallery */}
            <div>
              <div style={{ position: "relative", aspectRatio: "4/5", background: "var(--surface)", borderRadius: "var(--radius-xl)", overflow: "hidden", marginBottom: 16 }}>
                {product.gallery.map((src, i) => (
                  <img key={i} src={src} alt={product.name} loading={i === 0 ? "eager" : "lazy"}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === imgIdx ? 1 : 0, transform: i === imgIdx ? "scale(1)" : "scale(1.04)", transition: "opacity .7s ease, transform 1.2s cubic-bezier(.2,.8,.2,1)" }} />
                ))}
                <div style={{ position: "absolute", top: 20, left: 20, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-soft)", textTransform: "uppercase", padding: "6px 12px", background: "rgba(14,13,11,0.6)", backdropFilter: "blur(8px)", borderRadius: 999 }}>
                  {String(imgIdx + 1).padStart(2, "0")} / {String(product.gallery.length).padStart(2, "0")}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {product.gallery.map((src, i) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                    style={{ aspectRatio: "1/1", padding: 0, border: "1px solid " + (i === imgIdx ? "var(--accent)" : "var(--line)"), borderRadius: 12, overflow: "hidden", background: "var(--surface)", cursor: "pointer", opacity: i === imgIdx ? 1 : 0.7, transition: "all .2s ease" }}>
                    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="lsc-pdp-sticky" style={{ position: "sticky", top: 120 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>
                  {window.LSC_CATEGORIES.find(c => c.id === product.category)?.name} {product.badge && <span style={{ color: "var(--ink-soft)", marginLeft: 12 }}>· {product.badge}</span>}
                </div>
                <h1 style={{ margin: 0, fontSize: "clamp(44px, 5vw, 76px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}>{product.name}</h1>
                <p style={{ marginTop: 20, fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.5 }}>{product.short}</p>

                <div style={{ marginTop: 32, display: "flex", alignItems: "baseline", gap: 16 }}>
                  <span style={{ fontSize: 32, fontFamily: "var(--font-display)", fontVariantNumeric: "tabular-nums" }}>{fmt(product.price)}</span>
                  {product.compareAt && <span style={{ fontSize: 16, color: "var(--ink-faint)", textDecoration: "line-through" }}>{fmt(product.compareAt)}</span>}
                </div>

                <div style={{ marginTop: 32, paddingBlock: 24, borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 14 }}>Color — {color.name}</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {product.colors.map(c => (
                      <button key={c.id} onClick={() => setColor(c)} aria-label={c.name}
                        style={{ width: 40, height: 40, borderRadius: 999, background: c.hex, border: "2px solid " + (c.id === color.id ? "var(--accent)" : "transparent"), boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)", cursor: "pointer", outline: "3px solid " + (c.id === color.id ? "color-mix(in oklab, var(--accent) 30%, transparent)" : "transparent"), transition: "all .2s ease" }} />
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--ink-soft)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: product.stock > 5 ? "var(--accent)" : "#e87a3a", animation: "lsc-bar 2s ease infinite" }} />
                  {product.stock > 5 ? `En stock — ${product.stock} unidades` : `Solo ${product.stock} disponibles`}
                </div>

                <div style={{ marginTop: 28, display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid var(--line-strong)", borderRadius: 999, overflow: "hidden" }}>
                    <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 44, height: 48, background: "transparent", border: "none", color: "var(--ink)", cursor: "pointer", fontSize: 18 }}>−</button>
                    <span style={{ width: 40, textAlign: "center", fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums" }}>{qty}</span>
                    <button onClick={() => setQty(Math.min(product.stock, qty + 1))} style={{ width: 44, height: 48, background: "transparent", border: "none", color: "var(--ink)", cursor: "pointer", fontSize: 18 }}>+</button>
                  </div>
                  <button onClick={doAdd} disabled={adding}
                    style={{ flex: 1, height: 56, borderRadius: 999, background: added ? "oklch(0.7 0.15 145)" : "var(--accent)", color: "var(--accent-ink)", border: "none", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", cursor: adding ? "default" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "background-color .3s ease" }}>
                    {adding ? <><span className="lsc-spinner" /> Añadiendo</> : added ? <>✓ Añadido al carrito</> : <>Añadir — {fmt(product.price * qty)}</>}
                  </button>
                </div>

                <div style={{ marginTop: 40 }}>
                  <h3 style={{ margin: 0, fontSize: 20, letterSpacing: "-0.01em" }}>Características</h3>
                  <ul style={{ marginTop: 16, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {product.features.map((f, i) => (
                      <li key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, paddingBlock: 10, borderTop: "1px solid var(--line)", fontSize: 14, color: "var(--ink-soft)" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.1em" }}>{String(i + 1).padStart(2, "0")}</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 28, padding: 20, background: "var(--surface)", borderRadius: "var(--radius-md)", fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                  <strong style={{ color: "var(--ink)" }}>Envío gratis</strong> en Colombia · <strong style={{ color: "var(--ink)" }}>10 años</strong> de garantía · Devolución durante 60 días
                </div>
              </div>
            </div>
          </div>

          {/* Long description */}
          <section style={{ marginTop: 120, paddingTop: 80, borderTop: "1px solid var(--line)", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60 }} className="lsc-manifesto-row">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase" }}>— Detalles</div>
            <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(24px, 2.5vw, 34px)", lineHeight: 1.3, letterSpacing: "-0.01em", color: "var(--ink)", textWrap: "pretty" }}>{product.long}</p>
          </section>
        </div>
      </section>

      {/* Related */}
      <section style={{ padding: "80px 0 160px", background: "var(--surface)" }}>
        <div className="lsc-container">
          <h2 style={{ margin: "0 0 48px", fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em" }}>Quizás también <em style={{ color: "var(--accent)", fontWeight: 300 }}>te guste</em></h2>
          <div className="lsc-catalog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {related.map(p => (
              <LSCProductCard key={p.id} product={p} navigate={navigate} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
Object.assign(window, { LSCProduct });
