function LSCCheckout({ cart, setCart, navigate }) {
  const fmt = window.LSC_FORMAT_COP;
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({ email: "", name: "", phone: "", address: "", city: "Bogotá", dept: "Cundinamarca", zip: "", card: "4242 4242 4242 4242", cardName: "", expiry: "", cvc: "" });
  const [done, setDone] = React.useState(false);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 300000 ? 0 : 18000;
  const total = subtotal + shipping;
  const orderId = React.useMemo(() => "LS-" + Math.random().toString(36).slice(2, 8).toUpperCase(), []);

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const next = () => setStep(s => Math.min(3, s + 1));
  const back = () => setStep(s => Math.max(1, s - 1));
  const submit = () => { setDone(true); setCart([]); };

  if (cart.length === 0 && !done) {
    return (
      <div style={{ paddingTop: 180, minHeight: "80vh" }}>
        <div className="lsc-container" style={{ textAlign: "center", maxWidth: 540, marginInline: "auto" }}>
          <h1 style={{ margin: 0, fontSize: 56, letterSpacing: "-0.03em" }}>Nada que <em style={{ color: "var(--accent)", fontWeight: 300 }}>comprar</em></h1>
          <p style={{ color: "var(--ink-soft)", marginTop: 20, fontSize: 17 }}>Añade productos al carrito para continuar.</p>
          <div style={{ marginTop: 32 }}><LSCButton variant="primary" onClick={() => navigate({ path: "catalog" })}>Ver catálogo <Arrow /></LSCButton></div>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div style={{ paddingTop: 180, paddingBottom: 160, minHeight: "80vh" }}>
        <div className="lsc-container" style={{ maxWidth: 700, marginInline: "auto", textAlign: "center" }}>
          <div style={{ width: 88, height: 88, margin: "0 auto 32px", borderRadius: 999, background: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", animation: "lsc-pop .6s cubic-bezier(.2,.9,.2,1.2) both" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ink)" strokeWidth="2" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 16 }}>— Pedido confirmado</div>
          <h1 style={{ margin: 0, fontSize: "clamp(44px, 6vw, 80px)", letterSpacing: "-0.03em", lineHeight: 1 }}>
            Gracias, <em style={{ color: "var(--accent)", fontWeight: 300 }}>{form.name.split(" ")[0] || "amigo"}.</em>
          </h1>
          <p style={{ marginTop: 24, fontSize: 17, color: "var(--ink-soft)", maxWidth: 480, marginInline: "auto" }}>
            Tu pedido <strong style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{orderId}</strong> fue recibido. Te enviaremos la guía de seguimiento a <strong style={{ color: "var(--ink)" }}>{form.email || "tu correo"}</strong> en las próximas horas.
          </p>
          <div style={{ marginTop: 48, padding: 28, background: "var(--surface)", borderRadius: "var(--radius-lg)", textAlign: "left" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-soft)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>Total pagado</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 40, letterSpacing: "-0.02em" }}>{fmt(total)}</div>
          </div>
          <div style={{ marginTop: 40 }}><LSCButton variant="secondary" onClick={() => navigate({ path: "home" })}>Volver al inicio</LSCButton></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 140, paddingBottom: 120 }}>
      <div className="lsc-container">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>— Checkout</div>
        <h1 style={{ margin: 0, fontSize: "clamp(48px, 6vw, 88px)", letterSpacing: "-0.035em", lineHeight: 0.98 }}>Finalizar compra</h1>

        {/* Stepper */}
        <div style={{ display: "flex", gap: 16, marginTop: 48, marginBottom: 48, flexWrap: "wrap" }}>
          {["Contacto", "Envío", "Pago"].map((s, i) => {
            const n = i + 1;
            const active = step === n, pass = step > n;
            return (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 999, border: "1px solid " + (active ? "var(--accent)" : pass ? "var(--line-strong)" : "var(--line)"), color: active ? "var(--accent)" : pass ? "var(--ink)" : "var(--ink-faint)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", transition: "all .3s ease" }}>
                <span style={{ width: 20, height: 20, borderRadius: 999, background: active ? "var(--accent)" : pass ? "var(--ink)" : "transparent", color: active ? "var(--accent-ink)" : pass ? "var(--bg)" : "inherit", display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid currentColor", fontSize: 10 }}>{pass ? "✓" : n}</span>
                {s}
              </div>
            );
          })}
        </div>

        <div className="lsc-checkout-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 60 }}>
          <div>
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Field label="Correo electrónico"><input className="lsc-input" type="email" value={form.email} onChange={e => upd("email", e.target.value)} placeholder="tu@correo.com" /></Field>
                <Field label="Nombre completo"><input className="lsc-input" value={form.name} onChange={e => upd("name", e.target.value)} placeholder="Luis Santiago" /></Field>
                <Field label="Teléfono"><input className="lsc-input" value={form.phone} onChange={e => upd("phone", e.target.value)} placeholder="+57 300 000 0000" /></Field>
                <div style={{ marginTop: 16 }}><LSCButton variant="primary" onClick={next} full size="lg">Continuar al envío <Arrow /></LSCButton></div>
              </div>
            )}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Field label="Dirección"><input className="lsc-input" value={form.address} onChange={e => upd("address", e.target.value)} placeholder="Cra 11 #93-42, Apto 301" /></Field>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Field label="Ciudad"><input className="lsc-input" value={form.city} onChange={e => upd("city", e.target.value)} /></Field>
                  <Field label="Departamento"><input className="lsc-input" value={form.dept} onChange={e => upd("dept", e.target.value)} /></Field>
                </div>
                <Field label="Código postal"><input className="lsc-input" value={form.zip} onChange={e => upd("zip", e.target.value)} placeholder="110221" /></Field>
                <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
                  <LSCButton variant="secondary" onClick={back}>Volver</LSCButton>
                  <LSCButton variant="primary" onClick={next} full size="lg">Continuar al pago <Arrow /></LSCButton>
                </div>
              </div>
            )}
            {step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Field label="Número de tarjeta"><input className="lsc-input" value={form.card} onChange={e => upd("card", e.target.value)} /></Field>
                <Field label="Nombre en la tarjeta"><input className="lsc-input" value={form.cardName} onChange={e => upd("cardName", e.target.value)} /></Field>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Field label="MM/AA"><input className="lsc-input" value={form.expiry} onChange={e => upd("expiry", e.target.value)} placeholder="12/28" /></Field>
                  <Field label="CVC"><input className="lsc-input" value={form.cvc} onChange={e => upd("cvc", e.target.value)} placeholder="123" /></Field>
                </div>
                <div style={{ padding: 16, background: "var(--surface)", borderRadius: 12, fontSize: 12, color: "var(--ink-soft)", marginTop: 8 }}>🔒 Pago cifrado. Nunca guardamos los datos de tu tarjeta.</div>
                <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
                  <LSCButton variant="secondary" onClick={back}>Volver</LSCButton>
                  <LSCButton variant="primary" onClick={submit} full size="lg">Pagar {fmt(total)} <Arrow /></LSCButton>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <aside style={{ position: "sticky", top: 120, alignSelf: "start", padding: 28, background: "var(--surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--line)", height: "fit-content" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>— Resumen</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14, paddingBottom: 20, borderBottom: "1px solid var(--line)" }}>
              {cart.map(i => (
                <li key={i.key} style={{ display: "grid", gridTemplateColumns: "52px 1fr auto", gap: 12, alignItems: "center" }}>
                  <img src={i.heroImage} alt="" style={{ width: 52, height: 52, borderRadius: 10, objectFit: "cover" }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontFamily: "var(--font-display)", letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.name}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-soft)", fontFamily: "var(--font-mono)" }}>× {i.qty} · {i.colorName}</div>
                  </div>
                  <span style={{ fontVariantNumeric: "tabular-nums", fontSize: 13, fontFamily: "var(--font-mono)" }}>{fmt(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ink-soft)" }}><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ink-soft)" }}><span>Envío</span><span>{shipping === 0 ? "Gratis" : fmt(shipping)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid var(--line)", fontSize: 17 }}><span style={{ fontFamily: "var(--font-display)" }}>Total</span><strong style={{ fontFamily: "var(--font-mono)" }}>{fmt(total)}</strong></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
function Field({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-soft)" }}>{label}</span>
      {children}
    </label>
  );
}
Object.assign(window, { LSCCheckout });
