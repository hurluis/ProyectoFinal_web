function LSCFooter({ navigate }) {
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--line)", paddingTop: 80, paddingBottom: 40 }}>
      <div className="lsc-container">
        {/* Mega logo */}
        <div style={{ borderBottom: "1px solid var(--line)", paddingBottom: 60, marginBottom: 60 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(80px, 16vw, 280px)", fontWeight: 300, letterSpacing: "-0.05em", lineHeight: 0.85, textWrap: "balance" }}>
            Luis<span style={{ color: "var(--accent)", fontStyle: "italic" }}>&amp;</span>Santi<span style={{ fontSize: "0.3em", verticalAlign: "super", color: "var(--ink-soft)" }}>CO</span>
          </h2>
        </div>
        <div className="lsc-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, marginBottom: 80 }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 18 }}>— Suscríbete</div>
            <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "-0.01em", lineHeight: 1.3, maxWidth: 380 }}>
              Historias de taller, nuevos lanzamientos y notas de sonido una vez al mes.
            </p>
            <form onSubmit={e => { e.preventDefault(); alert("¡Gracias por suscribirte!"); }} style={{ marginTop: 24, display: "flex", gap: 8, maxWidth: 420 }}>
              <input type="email" placeholder="tu@correo.com" required
                style={{ flex: 1, padding: "14px 18px", borderRadius: 999, background: "var(--surface)", border: "1px solid var(--line-strong)", color: "var(--ink)", fontSize: 14, outline: "none" }} />
              <button type="submit" style={{ padding: "0 22px", borderRadius: 999, background: "var(--accent)", color: "var(--accent-ink)", border: "none", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer" }}>Enviar</button>
            </form>
          </div>
          {[
            { t: "Tienda", links: [["Todos", { path: "catalog" }], ["Auriculares", { path: "catalog", cat: "auriculares" }], ["Altavoces", { path: "catalog", cat: "altavoces" }], ["Hi-Fi", { path: "catalog", cat: "audio-hifi" }]] },
            { t: "Compañía", links: [["Manifiesto", { path: "home", hash: "manifesto" }], ["Taller", { path: "home" }], ["Prensa", { path: "home" }]] },
            { t: "Soporte", links: [["Contacto", { path: "home" }], ["Envíos", { path: "home" }], ["Garantía", { path: "home" }], ["Devoluciones", { path: "home" }]] },
          ].map(col => (
            <div key={col.t}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 18 }}>{col.t}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(([n, to]) => (
                  <li key={n}><a href="#" onClick={e => { e.preventDefault(); navigate(to); }} style={{ color: "var(--ink)", textDecoration: "none", fontSize: 14 }}>{n}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap", paddingTop: 28, borderTop: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
          <span>© MMXXVI LUIS&amp;SANTICO · MEDELLÍN, COLOMBIA</span>
          <span>Precios en pesos colombianos (COP) · IVA incluido</span>
        </div>
      </div>
    </footer>
  );
}
Object.assign(window, { LSCFooter });
