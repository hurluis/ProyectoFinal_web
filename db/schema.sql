-- ============================================================
-- Luis&SantiCO — Esquema de base de datos PostgreSQL
-- ============================================================

-- ─── EXTENSIONES ────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── TABLAS PRINCIPALES ─────────────────────────────────────

CREATE TABLE IF NOT EXISTS categories (
  id         VARCHAR(50)  PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  tagline    TEXT
);

CREATE TABLE IF NOT EXISTS products (
  id          VARCHAR(10)  PRIMARY KEY,
  slug        VARCHAR(100) UNIQUE NOT NULL,
  name        VARCHAR(200) NOT NULL,
  category_id VARCHAR(50)  REFERENCES categories(id),
  price       INTEGER      NOT NULL CHECK (price > 0),
  compare_at  INTEGER,
  badge       VARCHAR(50),
  stock       INTEGER      NOT NULL DEFAULT 0 CHECK (stock >= 0),
  short_desc  TEXT,
  long_desc   TEXT,
  hero_image  TEXT,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_images (
  id         SERIAL      PRIMARY KEY,
  product_id VARCHAR(10) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url        TEXT        NOT NULL,
  position   INTEGER     NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS product_colors (
  id         SERIAL      PRIMARY KEY,
  product_id VARCHAR(10) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  color_id   VARCHAR(50) NOT NULL,
  name       VARCHAR(100) NOT NULL,
  hex        VARCHAR(7)  NOT NULL,
  UNIQUE(product_id, color_id)
);

CREATE TABLE IF NOT EXISTS product_features (
  id         SERIAL      PRIMARY KEY,
  product_id VARCHAR(10) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  feature    TEXT        NOT NULL,
  position   INTEGER     NOT NULL DEFAULT 0
);

-- ─── CARRITO ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS cart_items (
  id          SERIAL      PRIMARY KEY,
  session_key VARCHAR(100) NOT NULL,
  product_id  VARCHAR(10) NOT NULL REFERENCES products(id),
  name        VARCHAR(200) NOT NULL,
  hero_image  TEXT,
  price       INTEGER     NOT NULL,
  qty         INTEGER     NOT NULL DEFAULT 1 CHECK (qty > 0),
  color_id    VARCHAR(50),
  color_name  VARCHAR(100),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(session_key, product_id, color_id)
);

-- ─── ÓRDENES ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS orders (
  id         SERIAL       PRIMARY KEY,
  order_ref  VARCHAR(20)  UNIQUE NOT NULL,
  email      VARCHAR(255),
  name       VARCHAR(255),
  phone      VARCHAR(50),
  address    TEXT,
  city       VARCHAR(100),
  dept       VARCHAR(100),
  zip        VARCHAR(20),
  subtotal   INTEGER      NOT NULL,
  shipping   INTEGER      NOT NULL DEFAULT 0,
  total      INTEGER      NOT NULL,
  status     VARCHAR(50)  NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id          SERIAL      PRIMARY KEY,
  order_id    INTEGER     NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  VARCHAR(10),
  name        VARCHAR(200) NOT NULL,
  hero_image  TEXT,
  price       INTEGER     NOT NULL,
  qty         INTEGER     NOT NULL,
  color_id    VARCHAR(50),
  color_name  VARCHAR(100)
);

-- ─── ÍNDICES ────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_products_category    ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_product_images_pid   ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_colors_pid   ON product_colors(product_id);
CREATE INDEX IF NOT EXISTS idx_product_features_pid ON product_features(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_session         ON cart_items(session_key);
CREATE INDEX IF NOT EXISTS idx_orders_email         ON orders(email);
CREATE INDEX IF NOT EXISTS idx_order_items_oid      ON order_items(order_id);

-- ============================================================
-- FUNCIONES / STORED PROCEDURES
-- ============================================================

-- 1. Catálogo con primera imagen incluida
CREATE OR REPLACE FUNCTION get_products(p_category_id VARCHAR DEFAULT NULL)
RETURNS TABLE (
  id          VARCHAR,
  slug        VARCHAR,
  name        VARCHAR,
  category_id VARCHAR,
  category    VARCHAR,
  price       INTEGER,
  compare_at  INTEGER,
  badge       VARCHAR,
  stock       INTEGER,
  short_desc  TEXT,
  hero_image  TEXT
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id, p.slug, p.name,
    p.category_id,
    c.name  AS category,
    p.price, p.compare_at, p.badge, p.stock,
    p.short_desc, p.hero_image
  FROM products p
  JOIN categories c ON c.id = p.category_id
  WHERE (p_category_id IS NULL OR p.category_id = p_category_id)
  ORDER BY p.id;
END;
$$;

-- 2. Detalle completo de un producto por slug
CREATE OR REPLACE FUNCTION get_product_detail(p_slug VARCHAR)
RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE
  v_product JSONB;
  v_id VARCHAR(10);
BEGIN
  SELECT id INTO v_id FROM products WHERE slug = p_slug;
  IF v_id IS NULL THEN RETURN NULL; END IF;

  SELECT jsonb_build_object(
    'id',         p.id,
    'slug',       p.slug,
    'name',       p.name,
    'category',   c.name,
    'price',      p.price,
    'compare_at', p.compare_at,
    'badge',      p.badge,
    'stock',      p.stock,
    'short_desc', p.short_desc,
    'long_desc',  p.long_desc,
    'hero_image', p.hero_image,
    'gallery',    (SELECT jsonb_agg(url ORDER BY position)
                   FROM product_images WHERE product_id = v_id),
    'colors',     (SELECT jsonb_agg(jsonb_build_object('id', color_id, 'name', name, 'hex', hex))
                   FROM product_colors WHERE product_id = v_id),
    'features',   (SELECT jsonb_agg(feature ORDER BY position)
                   FROM product_features WHERE product_id = v_id)
  )
  INTO v_product
  FROM products p JOIN categories c ON c.id = p.category_id
  WHERE p.id = v_id;

  RETURN v_product;
END;
$$;

-- 3. Añadir / actualizar item en el carrito (upsert)
CREATE OR REPLACE FUNCTION upsert_cart_item(
  p_session_key VARCHAR,
  p_product_id  VARCHAR,
  p_qty         INTEGER DEFAULT 1
) RETURNS cart_items LANGUAGE plpgsql AS $$
DECLARE
  v_product products%ROWTYPE;
  v_color   product_colors%ROWTYPE;
  v_item    cart_items%ROWTYPE;
BEGIN
  SELECT * INTO v_product FROM products WHERE id = p_product_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Product % not found', p_product_id; END IF;

  SELECT * INTO v_color FROM product_colors
  WHERE product_id = p_product_id ORDER BY id LIMIT 1;

  INSERT INTO cart_items(session_key, product_id, name, hero_image, price, qty, color_id, color_name)
  VALUES (p_session_key, p_product_id, v_product.name, v_product.hero_image,
          v_product.price, p_qty, v_color.color_id, v_color.name)
  ON CONFLICT (session_key, product_id, color_id)
  DO UPDATE SET qty = cart_items.qty + EXCLUDED.qty
  RETURNING * INTO v_item;

  RETURN v_item;
END;
$$;

-- 4. Obtener carrito con totales
CREATE OR REPLACE FUNCTION get_cart(p_session_key VARCHAR)
RETURNS JSONB LANGUAGE plpgsql AS $$
DECLARE
  v_items    JSONB;
  v_subtotal INTEGER;
  v_shipping INTEGER;
BEGIN
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', id, 'product_id', product_id, 'name', name,
      'hero_image', hero_image, 'price', price, 'qty', qty,
      'color_id', color_id, 'color_name', color_name,
      'line_total', price * qty
    )
  )
  INTO v_items
  FROM cart_items WHERE session_key = p_session_key;

  SELECT COALESCE(SUM(price * qty), 0) INTO v_subtotal
  FROM cart_items WHERE session_key = p_session_key;

  v_shipping := CASE WHEN v_subtotal > 300000 OR v_subtotal = 0 THEN 0 ELSE 18000 END;

  RETURN jsonb_build_object(
    'items',     COALESCE(v_items, '[]'::jsonb),
    'subtotal',  v_subtotal,
    'shipping',  v_shipping,
    'total',     v_subtotal + v_shipping
  );
END;
$$;

-- 5. Crear orden desde el carrito
CREATE OR REPLACE FUNCTION create_order(
  p_session_key VARCHAR,
  p_email       VARCHAR,
  p_name        VARCHAR,
  p_phone       VARCHAR,
  p_address     TEXT,
  p_city        VARCHAR,
  p_dept        VARCHAR,
  p_zip         VARCHAR
) RETURNS orders LANGUAGE plpgsql AS $$
DECLARE
  v_cart    JSONB;
  v_item    JSONB;
  v_order   orders%ROWTYPE;
  v_ref     VARCHAR(20);
BEGIN
  v_cart := get_cart(p_session_key);

  IF jsonb_array_length(v_cart->'items') = 0 THEN
    RAISE EXCEPTION 'El carrito está vacío para la sesión %', p_session_key;
  END IF;

  v_ref := 'LS-' || UPPER(encode(gen_random_bytes(3), 'hex'));

  INSERT INTO orders(order_ref, email, name, phone, address, city, dept, zip,
                     subtotal, shipping, total)
  VALUES (v_ref, p_email, p_name, p_phone, p_address, p_city, p_dept, p_zip,
          (v_cart->>'subtotal')::INTEGER,
          (v_cart->>'shipping')::INTEGER,
          (v_cart->>'total')::INTEGER)
  RETURNING * INTO v_order;

  FOR v_item IN SELECT * FROM jsonb_array_elements(v_cart->'items')
  LOOP
    INSERT INTO order_items(order_id, product_id, name, hero_image, price, qty, color_id, color_name)
    VALUES (v_order.id,
            v_item->>'product_id', v_item->>'name', v_item->>'hero_image',
            (v_item->>'price')::INTEGER, (v_item->>'qty')::INTEGER,
            v_item->>'color_id', v_item->>'color_name');
  END LOOP;

  DELETE FROM cart_items WHERE session_key = p_session_key;

  RETURN v_order;
END;
$$;
