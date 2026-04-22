function LSCCatalog({ navigate, onAddToCart, initialCat }) {
  const [cat, setCat] = React.useState(initialCat || "all");
  const [sort, setSort] = React.useState("featured");
  const [q, setQ] = React.useState("");
  React.useEffect(() => { setCat(initialCat || "all"); }, [initialCat]);

  let items = window.LSC_PRODUCTS.filter(p => cat === "all" || p.category === cat);
  if (q.trim()) items = items.filter(p => (p.name + " " + p.short).toLowerCase().includes(q.toLowerCase()));
  if (sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
  if (sort === "name") items = [...items].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div style={{ paddingTop: 140 }}>
      <section style={{ padding: "40px 0 80px" }}>
        <div className="lsc-container">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>— Catálogo</div>
          <h1 style={{ margin: 0, fontSize: "clamp(48px, 7vw, 120px)", lineHeight: 0.94, letterSpacing: "-0.035em" }}>
            <LSCWordReveal text="La colección" /> <em style={{ color: "var(--accent)", fontWeight: 300 }}><LSCWordReveal text="completa." delay={0.1} /></em>
          </h1>
          <p style={{ marginTop: 32, maxWidth: 600, fontSize: 17, color: "var(--ink-soft)" }}>
            Seis productos, fabricados a mano en nuestro taller de Medellín. Envío gratis en Colombia superior a $300.000 COP.
          </p>
        </div>
      </section>

      <section style={{ position: "sticky", top: 80, zIndex: 20, background: "color-mix(in oklab, var(--bg) 85%, transparent)", backdropFilter: "blur(18px)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "18px 0" }}>
        <div className="lsc-container" style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[{ id: "all", name: "Todo" }, ...window.LSC_CATEGORIES].map(c => (
              <button key={c.id} onClick={() => setCat(c.id)}
                style={{ padding: "10px 18px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", borderRadius: 999, cursor: "pointer", border: "1px solid " + (cat === c.id ? "var(--accent)" : "var(--line-strong)"), background: cat === c.id ? "var(--accent)" : "transparent", color: cat === c.id ? "var(--accent-ink)" : "var(--ink)", transition: "all .25s ease" }}>{c.name}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar…"
              style={{ padding: "10px 16px", background: "var(--surface)", border: "1px solid var(--line-strong)", color: "var(--ink)", borderRadius: 999, fontSize: 13, outline: "none", minWidth: 200 }} />
            <select value={sort} onChange={e => setSort(e.target.value)}
              style={{ padding: "10px 16px", background: "var(--surface)", border: "1px solid var(--line-strong)", color: "var(--ink)", borderRadius: 999, fontSize: 12, fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase", outline: "none", cursor: "pointer" }}>
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio ↑</option>
              <option value="price-desc">Precio ↓</option>
              <option value="name">A-Z</option>
            </select>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0 160px" }}>
        <div className="lsc-container">
          {items.length === 0 ? (
            <div style={{ padding: 80, textAlign: "center", border: "1px dashed var(--line-strong)", borderRadius: "var(--radius-lg)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 48, marginBottom: 16 }}>Sin resultados</div>
              <p style={{ color: "var(--ink-soft)", marginBottom: 32 }}>No encontramos nada con "{q}". Prueba otra búsqueda.</p>
              <LSCButton variant="secondary" onClick={() => { setQ(""); setCat("all"); }}>Limpiar filtros</LSCButton>
            </div>
          ) : (
            <div className="lsc-catalog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
              {items.map((p, i) => (
                <LSCReveal key={p.id} delay={(i % 6) * 0.05}>
                  <LSCProductCard product={p} navigate={navigate} onAddToCart={onAddToCart} />
                </LSCReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
Object.assign(window, { LSCCatalog });
