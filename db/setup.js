// Luis&SantiCO — Database setup: create schema + seed + validate
require("dotenv").config();
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const config = {
  host:     process.env.PGHOST     || "localhost",
  port:     parseInt(process.env.PGPORT || "5432"),
  database: process.env.PGDATABASE || "luisantico",
  user:     process.env.PGUSER     || "luisantico",
  password: process.env.PGPASSWORD || "luisantico2026",
};

const log   = (msg) => console.log(`  ✓  ${msg}`);
const error = (msg) => console.error(`  ✗  ${msg}`);
const sep   = () => console.log("─".repeat(52));

async function run() {
  console.log("\n╔══════════════════════════════════════════════════╗");
  console.log("║   Luis&SantiCO — Database Setup                 ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  const client = new Client(config);
  try {
    await client.connect();
    log(`Conectado a PostgreSQL @ ${config.host}:${config.port}/${config.database}`);
  } catch (e) {
    error(`No se pudo conectar: ${e.message}`);
    process.exit(1);
  }

  // ─── 1. SCHEMA ─────────────────────────────────────────
  sep();
  console.log("  Creando tablas y funciones…");
  try {
    const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
    await client.query(schema);
    log("schema.sql ejecutado");
  } catch (e) {
    error(`schema.sql falló: ${e.message}`);
    await client.end();
    process.exit(1);
  }

  // ─── 2. SEED ───────────────────────────────────────────
  sep();
  console.log("  Cargando datos iniciales…");
  try {
    const seed = fs.readFileSync(path.join(__dirname, "seed.sql"), "utf8");
    await client.query(seed);
    log("seed.sql ejecutado");
  } catch (e) {
    error(`seed.sql falló: ${e.message}`);
    await client.end();
    process.exit(1);
  }

  // ─── 3. VALIDATE ───────────────────────────────────────
  sep();
  console.log("  Validando datos…");

  const { rows: cats } = await client.query("SELECT id, name FROM categories ORDER BY id");
  log(`Categorías: ${cats.length} → ${cats.map(c => c.name).join(", ")}`);

  const { rows: prods } = await client.query("SELECT id, name, price FROM products ORDER BY id");
  log(`Productos: ${prods.length}`);
  prods.forEach(p => console.log(`       ${p.id}  ${p.name.padEnd(22)} $${Number(p.price).toLocaleString("es-CO")} COP`));

  const { rows: imgs }  = await client.query("SELECT COUNT(*)::int AS n FROM product_images");
  const { rows: cols }  = await client.query("SELECT COUNT(*)::int AS n FROM product_colors");
  const { rows: feats } = await client.query("SELECT COUNT(*)::int AS n FROM product_features");
  log(`Imágenes: ${imgs[0].n}  ·  Colores: ${cols[0].n}  ·  Características: ${feats[0].n}`);

  // ─── 4. FUNCIONES ──────────────────────────────────────
  sep();
  console.log("  Probando funciones…");

  // get_products() — catálogo completo
  const { rows: catalog } = await client.query("SELECT id, name, category FROM get_products()");
  log(`get_products(): ${catalog.length} productos`);

  // get_products('auriculares') — filtro por categoría
  const { rows: auric } = await client.query("SELECT name FROM get_products('auriculares')");
  log(`get_products('auriculares'): ${auric.map(r => r.name).join(", ")}`);

  // get_product_detail() — detalle con JSONB
  const { rows: detail } = await client.query("SELECT get_product_detail('halo-over-ear') AS d");
  const d = detail[0].d;
  log(`get_product_detail('halo-over-ear'): ${d.name} · ${d.gallery.length} imágenes · ${d.colors.length} colores`);

  // upsert_cart_item() — carrito
  const session = "test-session-001";
  await client.query("SELECT upsert_cart_item($1,'p01',1)", [session]);
  await client.query("SELECT upsert_cart_item($1,'p02',2)", [session]);
  const { rows: cart } = await client.query("SELECT get_cart($1) AS c", [session]);
  const c = cart[0].c;
  log(`upsert_cart_item(): ${c.items.length} items · subtotal $${Number(c.subtotal).toLocaleString("es-CO")} COP`);

  // create_order() — orden desde carrito
  const { rows: orderRow } = await client.query(
    "SELECT * FROM create_order($1,'luis@example.com','Luis Santiago','+57 300 000 0000','Cra 11 #93-42','Bogotá','Cundinamarca','110221')",
    [session]
  );
  const order = orderRow[0];
  log(`create_order(): ref ${order.order_ref} · total $${Number(order.total).toLocaleString("es-CO")} COP · status: ${order.status}`);

  // ─── 5. TABLA products ─────────────────────────────────
  sep();
  console.log("  Tabla: products\n");
  const { rows: tableView } = await client.query(`
    SELECT
      p.id,
      p.name,
      c.name AS categoria,
      to_char(p.price,'FM999G999G999') || ' COP' AS precio,
      p.badge,
      p.stock
    FROM products p
    JOIN categories c ON c.id = p.category_id
    ORDER BY p.id
  `);
  console.table(tableView);

  sep();
  console.log("  ✓  Setup completado sin errores.\n");
  await client.end();
}

run().catch(e => { error(e.message); process.exit(1); });
