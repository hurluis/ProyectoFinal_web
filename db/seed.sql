-- ============================================================
-- Luis&SantiCO — Datos iniciales (seed)
-- ============================================================

-- ─── CATEGORÍAS ─────────────────────────────────────────────
INSERT INTO categories (id, name, tagline) VALUES
  ('auriculares', 'Auriculares',  'Silencio a medida.'),
  ('altavoces',   'Altavoces',    'La habitación entera como escenario.'),
  ('escritorio',  'Escritorio',   'Objetos que merecen su espacio.'),
  ('audio-hifi',  'Audio Hi-Fi',  'Para quienes escuchan con intención.')
ON CONFLICT (id) DO NOTHING;

-- ─── PRODUCTOS ──────────────────────────────────────────────
INSERT INTO products (id, slug, name, category_id, price, compare_at, badge, stock, short_desc, long_desc, hero_image) VALUES
(
  'p01', 'halo-over-ear', 'Halo Over-Ear', 'auriculares',
  1899000, 2199000, 'Edición limitada', 14,
  'Cancelación activa adaptativa · 48 h de autonomía · chasis de aluminio mecanizado.',
  'Halo es la culminación de tres años de ingeniería acústica. Sus drivers de berilio de 42 mm ofrecen una respuesta plana de 5 Hz a 28 kHz, y el chasis de aluminio fresado en Medellín equilibra peso y rigidez. Las almohadillas de piel napa son reemplazables y la diadema se ajusta sin tornillos.',
  'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1800&q=90'
),(
  'p02', 'orbit-altavoz-360', 'Orbit 360', 'altavoces',
  1299000, NULL, 'Nuevo', 8,
  'Altavoz inalámbrico de 360° con graves cerámicos y 20 h de batería.',
  'Orbit proyecta sonido uniforme en cualquier dirección. Resistente al polvo y agua (IP67), con radiador pasivo cerámico y emparejamiento estéreo entre dos unidades.',
  'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1800&q=90'
),(
  'p03', 'echo-in-ear', 'Echo In-Ear', 'auriculares',
  749000, NULL, 'Destacado', 22,
  'In-ear inalámbricos con ajuste ergonómico, ecualización adaptativa y 32 h con estuche.',
  'Tres tamaños de adaptadores y un algoritmo que ajusta la ecualización a tu conducto auditivo tras una calibración inicial.',
  'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1800&q=90'
),(
  'p04', 'prisma-monitor', 'Prisma Monitor', 'audio-hifi',
  3499000, NULL, 'Hi-Fi', 4,
  'Monitor de estudio pasivo de 2 vías con driver de 5" y tweeter de tela.',
  'Construido en nogal macizo, diseñado por Santiago Ramírez. Pensado para escucha crítica y salones pequeños.',
  'https://images.unsplash.com/photo-1558379850-24db13113c16?w=1800&q=90'
),(
  'p05', 'lamina-teclado', 'Lámina 75', 'escritorio',
  1199000, NULL, NULL, 9,
  'Teclado mecánico 75% con switches lineales silenciados y base de aluminio.',
  'Carcasa de aluminio fresado en CNC, placa interna con espuma acústica en tres capas. Cada tecla se prueba a mano antes de salir del taller.',
  'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1800&q=90'
),(
  'p06', 'faro-lampara', 'Faro', 'escritorio',
  899000, NULL, NULL, 6,
  'Lámpara de escritorio regulable con brazo articulado en tres puntos.',
  'Contrapeso interno que mantiene la posición sin fricción. Difusor de vidrio opalino y brazo de latón macizo.',
  'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1800&q=90'
)
ON CONFLICT (id) DO NOTHING;

-- ─── IMÁGENES ───────────────────────────────────────────────
INSERT INTO product_images (product_id, url, position) VALUES
  ('p01','https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1400&q=85',0),
  ('p01','https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1400&q=85',1),
  ('p01','https://images.unsplash.com/photo-1545127398-14699f92334b?w=1400&q=85',2),
  ('p01','https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1400&q=85',3),
  ('p02','https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1400&q=85',0),
  ('p02','https://images.unsplash.com/photo-1589003077984-894e133dabab?w=1400&q=85',1),
  ('p02','https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1400&q=85',2),
  ('p02','https://images.unsplash.com/photo-1591105575633-922c8897af9a?w=1400&q=85',3),
  ('p03','https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1400&q=85',0),
  ('p03','https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=1400&q=85',1),
  ('p03','https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=1400&q=85',2),
  ('p03','https://images.unsplash.com/photo-1631176093617-63490a3d785a?w=1400&q=85',3),
  ('p04','https://images.unsplash.com/photo-1558379850-24db13113c16?w=1400&q=85',0),
  ('p04','https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1400&q=85',1),
  ('p04','https://images.unsplash.com/photo-1516981879613-9f5da904015f?w=1400&q=85',2),
  ('p04','https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1400&q=85',3),
  ('p05','https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1400&q=85',0),
  ('p05','https://images.unsplash.com/photo-1595225476474-87563907a212?w=1400&q=85',1),
  ('p05','https://images.unsplash.com/photo-1563191911-e65f8655ebf9?w=1400&q=85',2),
  ('p05','https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=1400&q=85',3),
  ('p06','https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1400&q=85',0),
  ('p06','https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1400&q=85',1),
  ('p06','https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1400&q=85',2),
  ('p06','https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=1400&q=85',3)
ON CONFLICT DO NOTHING;

-- ─── COLORES ────────────────────────────────────────────────
INSERT INTO product_colors (product_id, color_id, name, hex) VALUES
  ('p01','obsidian','Obsidiana','#1a1a1a'),
  ('p01','sand',    'Arena',    '#d4c7b4'),
  ('p01','moss',    'Musgo',    '#4a5240'),
  ('p02','obsidian','Obsidiana','#1a1a1a'),
  ('p02','bone',    'Hueso',    '#ece4d6'),
  ('p03','obsidian','Obsidiana','#1a1a1a'),
  ('p03','bone',    'Hueso',    '#ece4d6'),
  ('p04','walnut',  'Nogal',    '#6b4a2b'),
  ('p04','obsidian','Obsidiana','#1a1a1a'),
  ('p05','obsidian','Obsidiana','#1a1a1a'),
  ('p05','bone',    'Hueso',    '#ece4d6'),
  ('p06','brass',   'Latón',    '#b08d57'),
  ('p06','obsidian','Obsidiana','#1a1a1a')
ON CONFLICT (product_id, color_id) DO NOTHING;

-- ─── CARACTERÍSTICAS ────────────────────────────────────────
INSERT INTO product_features (product_id, feature, position) VALUES
  ('p01','Drivers de berilio de 42 mm',0),
  ('p01','Cancelación activa híbrida · 3 modos',1),
  ('p01','Hasta 48 horas de autonomía',2),
  ('p01','Bluetooth 5.4 · multipunto · LDAC',3),
  ('p01','Carga rápida USB-C: 10 min = 8 h',4),
  ('p01','Almohadillas napa reemplazables',5),
  ('p02','Sonido 360° real',0),
  ('p02','IP67',1),
  ('p02','20 horas de autonomía',2),
  ('p02','Emparejamiento estéreo',3),
  ('p02','Base magnética opcional',4),
  ('p03','Hasta 32 h con estuche',0),
  ('p03','IPX4',1),
  ('p03','Ecualización adaptativa',2),
  ('p03','Carga inalámbrica Qi',3),
  ('p03','Detección de oído',4),
  ('p04','Driver de 5 pulgadas',0),
  ('p04','Tweeter de tela doblada',1),
  ('p04','Gabinete en nogal macizo',2),
  ('p04','Respuesta 48 Hz – 22 kHz',3),
  ('p04','Se vende como par',4),
  ('p05','Switches Gateron Oil Kings 45g',0),
  ('p05','Hot-swappable',1),
  ('p05','QMK/VIA',2),
  ('p05','USB-C trenzado · cable desmontable',3),
  ('p05','Keycaps PBT doubleshot',4),
  ('p06','2700K–4000K ajustable',0),
  ('p06','Memoria de última posición',1),
  ('p06','Cable textil',2),
  ('p06','Base lastrada 2.4 kg',3)
ON CONFLICT DO NOTHING;
