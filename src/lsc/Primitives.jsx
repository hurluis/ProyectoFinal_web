// Luis&SantiCO — shared UI primitives: Reveal (IO-based), WordReveal (staggered words), Marquee, Button.
function LSCReveal({ children, delay = 0, y = 30 }) {
  const ref = React.useRef();
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }), { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: seen ? 1 : 0,
      transform: seen ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity .9s ease ${delay}s, transform 1s cubic-bezier(.2,.8,.2,1) ${delay}s`,
    }}>{children}</div>
  );
}

function LSCWordReveal({ text, className, style, delay = 0, stagger = 0.04 }) {
  const ref = React.useRef();
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }), { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingRight: "0.25em" }}>
          <span style={{
            display: "inline-block",
            transform: seen ? "translateY(0)" : "translateY(110%)",
            transition: `transform .9s cubic-bezier(.2,.8,.2,1) ${delay + i * stagger}s`,
          }}>{w}</span>
        </span>
      ))}
    </span>
  );
}

function LSCMarquee({ items, speed = 60, accent = false }) {
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "28px 0", background: accent ? "var(--accent)" : "transparent", color: accent ? "var(--accent-ink)" : "var(--ink)" }}>
      <div style={{ display: "flex", gap: 48, animation: `lsc-marquee ${speed}s linear infinite`, whiteSpace: "nowrap", width: "max-content" }}>
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 48, fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 96px)", fontWeight: 300, letterSpacing: "-0.03em", fontStyle: i % 2 ? "italic" : "normal" }}>
            {t}
            <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: 999, background: accent ? "var(--accent-ink)" : "var(--accent)", verticalAlign: "middle" }} />
          </span>
        ))}
      </div>
    </div>
  );
}

function LSCButton({ children, variant = "primary", size = "md", onClick, href, full, type = "button", as: Tag = "button" }) {
  const pads = { sm: "10px 16px", md: "14px 26px", lg: "18px 32px" };
  const fs = { sm: 12, md: 13, lg: 14 };
  const variants = {
    primary:   { background: "var(--accent)", color: "var(--accent-ink)", border: "1px solid var(--accent)" },
    secondary: { background: "transparent", color: "var(--ink)", border: "1px solid var(--line-strong)" },
    ghost:     { background: "transparent", color: "var(--ink)", border: "1px solid transparent" },
    invert:    { background: "var(--ink)", color: "var(--bg)", border: "1px solid var(--ink)" },
  };
  return (
    <Tag href={href} type={Tag === "button" ? type : undefined} onClick={onClick} className={"lsc-btn lsc-btn-" + variant}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
        padding: pads[size], fontSize: fs[size], fontFamily: "var(--font-mono)",
        textTransform: "uppercase", letterSpacing: "0.12em",
        borderRadius: 999, cursor: "pointer",
        textDecoration: "none", width: full ? "100%" : undefined,
        transition: "transform .25s ease, background-color .25s ease, color .25s ease, border-color .25s ease",
        ...variants[variant],
      }}>{children}</Tag>
  );
}

Object.assign(window, { LSCReveal, LSCWordReveal, LSCMarquee, LSCButton });
