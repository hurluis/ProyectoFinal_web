// Luis&SantiCO — ProductCard with magnetic tilt hover, image reveal.
function LSCProductCard({ product, navigate, onAddToCart, featured }) {
  const ref = React.useRef();
  const [hover, setHover] = React.useState(false);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const fmt = window.LSC_FORMAT_COP;

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: x * 10, y: y * -10 });
  };
  const reset = () => { setHover(false); setTilt({ x: 0, y: 0 }); };

  return (
    <article
      ref={ref}
      onClick={() => navigate({ path: "product", slug: product.slug })}
      onMouseEnter={() => setHover(true)}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        cursor: "pointer", position: "relative",
        display: "flex", flexDirection: "column", gap: 16,
        transformStyle: "preserve-3d",
        transform: `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: "transform .4s cubic-bezier(.2,.8,.2,1)",
      }}
    >
      <div style={{
        position: "relative", aspectRatio: featured ? "4/5" : "3/4",
        overflow: "hidden",
        borderRadius: "var(--radius-lg)",
        background: "var(--surface)",
      }}>
        <img src={product.gallery[0]} alt={product.name} loading="lazy"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover",
            transform: hover ? "scale(1.06)" : "scale(1)",
            opacity: hover ? 0 : 1,
            transition: "transform 1.2s cubic-bezier(.2,.8,.2,1), opacity .6s ease",
          }} />
        <img src={product.gallery[1]} alt="" loading="lazy"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover",
            transform: hover ? "scale(1.02)" : "scale(1.1)",
            opacity: hover ? 1 : 0,
            transition: "transform 1.2s cubic-bezier(.2,.8,.2,1), opacity .6s ease",
          }} />
        {/* Top-left badge */}
        {product.badge && (
          <div style={{
            position: "absolute", top: 18, left: 18,
            padding: "6px 12px",
            fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
            background: product.badge === "Edición limitada" ? "var(--accent)" : "rgba(14,13,11,0.7)",
            color: product.badge === "Edición limitada" ? "var(--accent-ink)" : "var(--ink)",
            border: product.badge === "Edición limitada" ? "none" : "1px solid rgba(255,255,255,0.15)",
            borderRadius: 999, backdropFilter: "blur(8px)",
          }}>{product.badge}</div>
        )}
        {/* Cat label top-right */}
        <div style={{
          position: "absolute", top: 18, right: 18,
          fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(243,236,224,0.8)", mixBlendMode: "difference",
        }}>
          {window.LSC_CATEGORIES.find(c => c.id === product.category)?.name}
        </div>
        {/* Quick add */}
        <div style={{
          position: "absolute", left: 18, right: 18, bottom: 18,
          transform: hover ? "translateY(0)" : "translateY(16px)",
          opacity: hover ? 1 : 0,
          transition: "transform .4s cubic-bezier(.2,.8,.2,1), opacity .3s ease",
          pointerEvents: hover ? "auto" : "none",
        }}>
          <button onClick={(e) => { e.stopPropagation(); onAddToCart(product, product.colors[0], 1); }}
            style={{ width: "100%", padding: "14px 20px", borderRadius: 999, background: "var(--ink)", color: "var(--bg)", border: "none", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer" }}>
            Añadir — {fmt(product.price)}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: featured ? 28 : 22, fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}>{product.name}</h3>
          <p style={{ margin: 0, fontSize: 13, color: "var(--ink-soft)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 340 }}>{product.short}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          {product.compareAt && <span style={{ fontSize: 12, color: "var(--ink-faint)", textDecoration: "line-through" }}>{fmt(product.compareAt)}</span>}
          <span style={{ fontSize: 14, fontVariantNumeric: "tabular-nums", color: "var(--ink)" }}>{fmt(product.price)}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {product.colors.map(c => (
          <span key={c.id} title={c.name} style={{ width: 14, height: 14, borderRadius: 999, background: c.hex, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)" }} />
        ))}
      </div>
    </article>
  );
}
Object.assign(window, { LSCProductCard });
