function LSCCartDrawer({ open, onClose, cart, setCart, navigate }) {
  const fmt = window.LSC_FORMAT_COP;
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 300000 || subtotal === 0 ? 0 : 18000;
  const total = subtotal + shipping;

  const setQty = (key, q) => setCart(c => c.map(i => i.key === key ? { ...i, qty: Math.max(1, q) } : i));
  const remove = (key) => setCart(c => c.filter(i => i.key !== key));

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity .4s ease", zIndex: 98, backdropFilter: "blur(8px)" }} />
      {/* Drawer */}
      <aside aria-hidden={!open}
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: "min(520px, 100vw)",
          background: "var(--bg)", borderLeft: "1px solid var(--line)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform .55s cubic-bezier(.2,.85,.2,1)",
          zIndex: 99, display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 32px", borderBottom: "1px solid var(--line)" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase" }}>— Tu selección</div>
            <h2 style={{ margin: "6px 0 0", fontFamily: "var(--font-display)", fontSize: 30, letterSpacing: "-0.02em", fontWeight: 400 }}>Carrito <span style={{ color: "var(--ink-faint)" }}>({cart.length})</span></h2>
          </div>
          <button onClick={onClose} aria-label="Cerrar" style={{ width: 44, height: 44, border: "1px solid var(--line-strong)", borderRadius: 999, background: "transparent", color: "var(--ink)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4l8 8M12 4L4 12" /></svg>
          </button>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: cart.length === 0 ? 32 : 0 }}>
          {cart.length === 0 ? (
            <div style={{ padding: 48, textAlign: "center" }}>
              <div style={{ width: 120, height: 120, margin: "0 auto 32px", borderRadius: 999, background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--line)" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ color: "var(--ink-soft)" }}><path d="M3 6h3l2 12h10l2-9H8" /><circle cx="9" cy="20" r="1" /><circle cx="17" cy="20" r="1" /></svg>
              </div>
              <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: "-0.02em" }}>Tu carrito <em style={{ color: "var(--accent)", fontWeight: 300 }}>está vacío</em></h3>
              <p style={{ marginTop: 12, color: "var(--ink-soft)", fontSize: 14 }}>Explora seis objetos hechos a mano en Medellín.</p>
              <div style={{ marginTop: 32 }}>
                <LSCButton variant="primary" onClick={() => { onClose(); navigate({ path: "catalog" }); }}>Explorar catálogo <Arrow /></LSCButton>
              </div>
            </div>
          ) : (
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {cart.map(i => (
                <li key={i.key} style={{ display: "grid", gridTemplateColumns: "92px 1fr", gap: 20, padding: "24px 32px", borderBottom: "1px solid var(--line)", alignItems: "start" }}>
                  <img src={i.heroImage} alt="" style={{ width: 92, height: 92, borderRadius: 12, objectFit: "cover", background: "var(--surface)" }} />
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <div>
                        <h4 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "-0.01em", fontWeight: 400 }}>{i.name}</h4>
                        <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>{i.colorName}</div>
                      </div>
                      <button onClick={() => remove(i.key)} aria-label="Eliminar" style={{ color: "var(--ink-soft)", background: "transparent", border: "none", cursor: "pointer", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Quitar</button>
                    </div>
                    <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                      <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid var(--line-strong)", borderRadius: 999 }}>
                        <button onClick={() => setQty(i.key, i.qty - 1)} style={{ width: 32, height: 36, background: "transparent", border: "none", color: "var(--ink)", cursor: "pointer" }}>−</button>
                        <span style={{ width: 28, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 13 }}>{i.qty}</span>
                        <button onClick={() => setQty(i.key, i.qty + 1)} style={{ width: 32, height: 36, background: "transparent", border: "none", color: "var(--ink)", cursor: "pointer" }}>+</button>
                      </div>
                      <span style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", fontSize: 13 }}>{fmt(i.price * i.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <footer style={{ padding: "24px 32px 32px", borderTop: "1px solid var(--line)", background: "var(--surface)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20, fontSize: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ink-soft)" }}><span>Subtotal</span><span style={{ fontVariantNumeric: "tabular-nums" }}>{fmt(subtotal)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ink-soft)" }}><span>Envío</span><span style={{ fontVariantNumeric: "tabular-nums" }}>{shipping === 0 ? "Gratis" : fmt(shipping)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid var(--line)", fontSize: 17 }}>
                <span style={{ fontFamily: "var(--font-display)" }}>Total</span>
                <strong style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums" }}>{fmt(total)}</strong>
              </div>
            </div>
            <LSCButton variant="primary" full size="lg" onClick={() => { onClose(); navigate({ path: "checkout" }); }}>Ir al checkout <Arrow /></LSCButton>
            <div style={{ marginTop: 14, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)" }}>Pago seguro · Entregas en 2-5 días</div>
          </footer>
        )}
      </aside>
    </>
  );
}
Object.assign(window, { LSCCartDrawer });
