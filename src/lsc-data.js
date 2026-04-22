// ─────────────────────────────────────────────────────────────────────────────
// Luis&SantiCO — data layer (COP, imágenes Unsplash reales)
// ─────────────────────────────────────────────────────────────────────────────

window.LSC_CATEGORIES = [
  { id: "auriculares", name: "Auriculares",   tagline: "Silencio a medida." },
  { id: "altavoces",   name: "Altavoces",     tagline: "La habitación entera como escenario." },
  { id: "escritorio",  name: "Escritorio",    tagline: "Objetos que merecen su espacio." },
  { id: "audio-hifi",  name: "Audio Hi-Fi",   tagline: "Para quienes escuchan con intención." },
];

// Product images: curated Unsplash photos (free to use).
// "gallery" = array of 4 direct Unsplash URLs, each product.
window.LSC_PRODUCTS = [
  {
    id: "p01", slug: "halo-over-ear", name: "Halo Over-Ear",
    category: "auriculares", price: 1899000, compareAt: 2199000,
    badge: "Edición limitada",
    colors: [
      { id: "obsidian", name: "Obsidiana", hex: "#1a1a1a" },
      { id: "sand",     name: "Arena",     hex: "#d4c7b4" },
      { id: "moss",     name: "Musgo",     hex: "#4a5240" },
    ],
    stock: 14,
    short: "Cancelación activa adaptativa · 48 h de autonomía · chasis de aluminio mecanizado.",
    long:  "Halo es la culminación de tres años de ingeniería acústica. Sus drivers de berilio de 42 mm ofrecen una respuesta plana de 5 Hz a 28 kHz, y el chasis de aluminio fresado en Medellín equilibra peso y rigidez. Las almohadillas de piel napa son reemplazables y la diadema se ajusta sin tornillos.",
    features: [
      "Drivers de berilio de 42 mm",
      "Cancelación activa híbrida · 3 modos",
      "Hasta 48 horas de autonomía",
      "Bluetooth 5.4 · multipunto · LDAC",
      "Carga rápida USB-C: 10 min = 8 h",
      "Almohadillas napa reemplazables",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1400&q=85",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1400&q=85",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=1400&q=85",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1400&q=85",
    ],
    hero: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1800&q=90",
  },
  {
    id: "p02", slug: "orbit-altavoz-360", name: "Orbit 360",
    category: "altavoces", price: 1299000,
    badge: "Nuevo",
    colors: [
      { id: "obsidian", name: "Obsidiana", hex: "#1a1a1a" },
      { id: "bone",     name: "Hueso",     hex: "#ece4d6" },
    ],
    stock: 8,
    short: "Altavoz inalámbrico de 360° con graves cerámicos y 20 h de batería.",
    long:  "Orbit proyecta sonido uniforme en cualquier dirección. Resistente al polvo y agua (IP67), con radiador pasivo cerámico y emparejamiento estéreo entre dos unidades.",
    features: ["Sonido 360° real", "IP67", "20 horas de autonomía", "Emparejamiento estéreo", "Base magnética opcional"],
    gallery: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1400&q=85",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=1400&q=85",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1400&q=85",
      "https://images.unsplash.com/photo-1591105575633-922c8897af9a?w=1400&q=85",
    ],
    hero: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1800&q=90",
  },
  {
    id: "p03", slug: "echo-in-ear", name: "Echo In-Ear",
    category: "auriculares", price: 749000,
    badge: "Destacado",
    colors: [
      { id: "obsidian", name: "Obsidiana", hex: "#1a1a1a" },
      { id: "bone",     name: "Hueso",     hex: "#ece4d6" },
    ],
    stock: 22,
    short: "In-ear inalámbricos con ajuste ergonómico, ecualización adaptativa y 32 h con estuche.",
    long:  "Tres tamaños de adaptadores y un algoritmo que ajusta la ecualización a tu conducto auditivo tras una calibración inicial.",
    features: ["Hasta 32 h con estuche", "IPX4", "Ecualización adaptativa", "Carga inalámbrica Qi", "Detección de oído"],
    gallery: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1400&q=85",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=1400&q=85",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=1400&q=85",
      "https://images.unsplash.com/photo-1631176093617-63490a3d785a?w=1400&q=85",
    ],
    hero: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1800&q=90",
  },
  {
    id: "p04", slug: "prisma-monitor", name: "Prisma Monitor",
    category: "audio-hifi", price: 3499000,
    badge: "Hi-Fi",
    colors: [
      { id: "walnut",   name: "Nogal",     hex: "#6b4a2b" },
      { id: "obsidian", name: "Obsidiana", hex: "#1a1a1a" },
    ],
    stock: 4,
    short: "Monitor de estudio pasivo de 2 vías con driver de 5\" y tweeter de tela.",
    long:  "Construido en nogal macizo, diseñado por Santiago Ramírez. Pensado para escucha crítica y salones pequeños.",
    features: ["Driver de 5 pulgadas", "Tweeter de tela doblada", "Gabinete en nogal macizo", "Respuesta 48 Hz – 22 kHz", "Se vende como par"],
    gallery: [
      "https://images.unsplash.com/photo-1558379850-24db13113c16?w=1400&q=85",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1400&q=85",
      "https://images.unsplash.com/photo-1516981879613-9f5da904015f?w=1400&q=85",
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1400&q=85",
    ],
    hero: "https://images.unsplash.com/photo-1558379850-24db13113c16?w=1800&q=90",
  },
  {
    id: "p05", slug: "lamina-teclado", name: "Lámina 75",
    category: "escritorio", price: 1199000,
    badge: null,
    colors: [
      { id: "obsidian", name: "Obsidiana", hex: "#1a1a1a" },
      { id: "bone",     name: "Hueso",     hex: "#ece4d6" },
    ],
    stock: 9,
    short: "Teclado mecánico 75% con switches lineales silenciados y base de aluminio.",
    long:  "Carcasa de aluminio fresado en CNC, placa interna con espuma acústica en tres capas. Cada tecla se prueba a mano antes de salir del taller.",
    features: ["Switches Gateron Oil Kings 45g", "Hot-swappable", "QMK/VIA", "USB-C trenzado · cable desmontable", "Keycaps PBT doubleshot"],
    gallery: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1400&q=85",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=1400&q=85",
      "https://images.unsplash.com/photo-1563191911-e65f8655ebf9?w=1400&q=85",
      "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=1400&q=85",
    ],
    hero: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1800&q=90",
  },
  {
    id: "p06", slug: "faro-lampara", name: "Faro",
    category: "escritorio", price: 899000,
    badge: null,
    colors: [
      { id: "brass",    name: "Latón",     hex: "#b08d57" },
      { id: "obsidian", name: "Obsidiana", hex: "#1a1a1a" },
    ],
    stock: 6,
    short: "Lámpara de escritorio regulable con brazo articulado en tres puntos.",
    long:  "Contrapeso interno que mantiene la posición sin fricción. Difusor de vidrio opalino y brazo de latón macizo.",
    features: ["2700K–4000K ajustable", "Memoria de última posición", "Cable textil", "Base lastrada 2.4 kg"],
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1400&q=85",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1400&q=85",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1400&q=85",
      "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=1400&q=85",
    ],
    hero: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1800&q=90",
  },
];

// COP formatter — no decimals.
window.LSC_FORMAT_COP = (n) =>
  "$" + new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(n) + " COP";
