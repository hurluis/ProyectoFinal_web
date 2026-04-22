// Home — hero parallax, manifesto numbered, marquee, products grid, testimonials, CTA
function LSCHome({ navigate, onAddToCart }) {
  const products = window.LSC_PRODUCTS;
  const fmt = window.LSC_FORMAT_COP;
  const hero = products[0]; // Halo
  const [scrollY, setScrollY] = React.useState(0);
  React.useEffect(() => {
    const on = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        {/* Background image w/ parallax */}
        <div style={{
          position: "absolute", inset: "-10%",
          backgroundImage: `url(${hero.hero})`,
          backgroundSize: "cover", backgroundPosition: "center",
          transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
          transition: "transform .1s linear",
          filter: "brightness(0.65) contrast(1.05)",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(14,13,11,0.6) 0%, rgba(14,13,11,0.1) 30%, rgba(14,13,11,0.85) 100%)" }} />
        {/* Grain overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, mixBlendMode: "overlay",
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' /></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }} />

        {/* Top meta strip */}
        <div style={{ position: "absolute", top: 100, left: 0, right: 0, zIndex: 2 }}>
          <div className="lsc-container" style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
            <span style={{ animation: "lsc-bar 2.5s ease-in-out infinite" }}>● EN VIVO — Taller, Medellín</span>
            <span>VOL. 06 / MMXXVI</span>
            <span>04°40′N · 74°03′W</span>
          </div>
        </div>

        <div className="lsc-container" style={{ position: "relative", zIndex: 2, paddingBottom: 80, width: "100%" }}>
          <div style={{ maxWidth: 1100 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 32 }}>
              <LSCWordReveal text="— COLECCIÓN 06 · SONIDO CON INTENCIÓN" />
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(64px, 11vw, 180px)", lineHeight: 0.92, letterSpacing: "-0.04em", color: "var(--ink)", textWrap: "balance" }}>
              <LSCWordReveal text="Escucha" />{" "}
              <LSCWordReveal text="cada" delay={0.15} />{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 300 }}>
                <LSCWordReveal text="detalle." delay={0.3} />
              </span>
            </h1>
            <LSCReveal delay={0.6}>
              <p style={{ marginTop: 48, maxWidth: 560, fontSize: 17, lineHeight: 1.55, color: "var(--ink-soft)" }}>
                Audio premium fabricado en Colombia. Seis productos, ensamblados a mano, pensados para durar una década.
              </p>
            </LSCReveal>
            <LSCReveal delay={0.75}>
              <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <LSCButton variant="primary" size="lg" onClick={() => navigate({ path: "product", slug: hero.slug })}>
                  Descubrir {hero.name} <Arrow />
                </LSCButton>
                <LSCButton variant="secondary" size="lg" onClick={() => navigate({ path: "catalog" })}>
                  Ver toda la colección
                </LSCButton>
              </div>
            </LSCReveal>
          </div>

          {/* Product pill bottom-right */}
          <LSCReveal delay={0.9}>
            <div style={{ position: "absolute", right: 40, bottom: 80, display: "flex", alignItems: "center", gap: 14, background: "rgba(14,13,11,0.6)", backdropFilter: "blur(18px)", padding: 14, borderRadius: 999, border: "1px solid rgba(243,236,224,0.1)" }}>
              <img src={hero.gallery[2]} alt="" style={{ width: 56, height: 56, borderRadius: 999, objectFit: "cover" }} />
              <div style={{ paddingRight: 16 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-faint)", textTransform: "uppercase" }}>Destacado</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 17, letterSpacing: "-0.01em" }}>{hero.name}</div>
                <div style={{ fontSize: 12, color: "var(--accent)" }}>{fmt(hero.price)}</div>
              </div>
            </div>
          </LSCReveal>
        </div>
      </section>

      {/* Marquee */}
      <LSCMarquee items={["Sonido con intención", "Luis&SantiCO", "Hecho en Colombia", "Seis productos"]} />

      {/* Manifesto — numbered sections */}
      <section id="manifesto" style={{ padding: "160px 0", position: "relative" }}>
        <div className="lsc-container">
          <LSCReveal>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, marginBottom: 100, alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)" }}>— Manifiesto</span>
              <h2 style={{ margin: 0, fontSize: "clamp(44px, 6vw, 96px)", lineHeight: 0.96, letterSpacing: "-0.035em", maxWidth: 1200 }}>
                Construimos <em style={{ color: "var(--accent)", fontWeight: 300 }}>pocos</em> objetos,<br />con toda <em style={{ fontWeight: 300 }}>nuestra atención.</em>
              </h2>
            </div>
          </LSCReveal>

          {[
            { n: "01", t: "Materiales honestos", d: "Aluminio fresado, nogal macizo, piel napa, berilio. Materiales que envejecen con dignidad y se pueden reparar, no reemplazar." },
            { n: "02", t: "Seis productos, no sesenta", d: "Diseñamos una pieza por trimestre. Cada prototipo pasa doce meses en manos de músicos, ingenieros y escuchadores exigentes antes de llegar a ti." },
            { n: "03", t: "Fabricación cercana", d: "Ensamblado en nuestro taller de Medellín. Conoces el nombre de quien armó tu producto — aparece grabado en el chasis." },
            { n: "04", t: "Diez años de garantía", d: "Reparamos todo. Siempre. Incluso si lo heredaste, incluso si está fuera de producción. Piezas de repuesto durante una década." },
          ].map((b, i) => (
            <LSCReveal key={b.n} delay={i * 0.08}>
              <div className="lsc-manifesto-row" style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr 1.4fr",
                gap: 48,
                padding: "48px 0",
                borderTop: "1px solid var(--line)",
                alignItems: "start",
              }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--accent)", letterSpacing: "0.1em" }}>{b.n}</span>
                <h3 style={{ margin: 0, fontSize: "clamp(28px, 3vw, 44px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                  <em style={{ fontWeight: 300 }}>{b.t}</em>
                </h3>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: 560 }}>{b.d}</p>
              </div>
            </LSCReveal>
          ))}
        </div>
      </section>

      {/* Featured products grid */}
      <section style={{ padding: "80px 0 160px", background: "var(--surface)" }}>
        <div className="lsc-container">
          <LSCReveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>— Catálogo completo</div>
                <h2 style={{ margin: 0, fontSize: "clamp(40px, 5vw, 80px)", lineHeight: 0.98, letterSpacing: "-0.03em", maxWidth: 900 }}>
                  Seis piezas, <em style={{ color: "var(--accent)", fontWeight: 300 }}>elegidas con criterio.</em>
                </h2>
              </div>
              <LSCButton variant="invert" onClick={() => navigate({ path: "catalog" })}>Ver catálogo <Arrow /></LSCButton>
            </div>
          </LSCReveal>

          <div className="lsc-catalog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {products.map((p, i) => (
              <LSCReveal key={p.id} delay={i * 0.06}>
                <LSCProductCard product={p} navigate={navigate} onAddToCart={onAddToCart} />
              </LSCReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Big quote */}
      <section style={{ padding: "160px 0", position: "relative", overflow: "hidden" }}>
        <div className="lsc-container">
          <LSCReveal>
            <blockquote style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.05, letterSpacing: "-0.03em", textAlign: "center", maxWidth: 1100, marginInline: "auto", textWrap: "balance" }}>
              "Un buen auricular <em style={{ color: "var(--accent)", fontWeight: 300 }}>desaparece.</em>
              <br />Queda solo la música — y la sensación de que alguien, en algún lugar,
              la hizo con <em style={{ fontWeight: 300 }}>amor."</em>
            </blockquote>
            <div style={{ textAlign: "center", marginTop: 40, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
              — Santiago Ramírez, cofundador
            </div>
          </LSCReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "80px 0 160px" }}>
        <div className="lsc-container">
          <LSCReveal>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 32 }}>— Voces</div>
          </LSCReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              { q: "Cambié mis auriculares de tres mil dólares por los Halo. No he vuelto atrás.", a: "Mariana Vélez", r: "Productora · Bogotá" },
              { q: "El Orbit 360 hace que el sonido ocupe la habitación sin imponerse. Es una presencia amable.", a: "Carlos Mejía", r: "Arquitecto · Cali" },
              { q: "El Prisma Monitor es honesto. Te dice la verdad sobre tus mezclas — aunque duela.", a: "Sofía Restrepo", r: "Ingeniera de audio · Medellín" },
            ].map((t, i) => (
              <LSCReveal key={i} delay={i * 0.1}>
                <figure style={{ margin: 0, padding: 32, background: "var(--surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--line)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 28, minHeight: 260 }}>
                  <blockquote style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1.35, letterSpacing: "-0.01em", textWrap: "pretty" }}>
                    <span style={{ color: "var(--accent)", fontStyle: "italic" }}>"</span>{t.q}<span style={{ color: "var(--accent)", fontStyle: "italic" }}>"</span>
                  </blockquote>
                  <figcaption>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{t.a}</div>
                    <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{t.r}</div>
                  </figcaption>
                </figure>
              </LSCReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA banner */}
      <section style={{ padding: "40px 0 160px" }}>
        <div className="lsc-container">
          <div style={{ position: "relative", borderRadius: "var(--radius-xl)", overflow: "hidden", minHeight: 520, display: "flex", alignItems: "center" }}>
            <img src={products[1].hero} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(14,13,11,0.85) 0%, rgba(14,13,11,0.3) 100%)" }} />
            <div style={{ position: "relative", zIndex: 2, padding: 72, maxWidth: 720 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>— Pack Orbit</div>
              <h2 style={{ margin: 0, fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.03em" }}>
                Dos unidades Orbit,<br /><em style={{ color: "var(--accent)", fontWeight: 300 }}>emparejadas en estéreo.</em>
              </h2>
              <p style={{ marginTop: 24, fontSize: 17, color: "var(--ink-soft)", maxWidth: 520 }}>
                Envío incluido a toda Colombia, estuche de transporte y un cable trenzado USB-C de regalo.
              </p>
              <div style={{ marginTop: 40, display: "flex", gap: 14 }}>
                <LSCButton variant="primary" size="lg" onClick={() => navigate({ path: "product", slug: products[1].slug })}>
                  Ver el pack <Arrow />
                </LSCButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Arrow() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>;
}

Object.assign(window, { LSCHome, Arrow });
