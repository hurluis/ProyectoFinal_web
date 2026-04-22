// Luis&SantiCO — Consultas de ejemplo para inspeccionar la BD
require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  host:     process.env.PGHOST     || "localhost",
  port:     parseInt(process.env.PGPORT || "5432"),
  database: process.env.PGDATABASE || "luisantico",
  user:     process.env.PGUSER     || "luisantico",
  password: process.env.PGPASSWORD || "luisantico2026",
});

async function run() {
  await client.connect();
  console.log("\n━━━  Productos + categoría  ━━━━━━━━━━━━━━━━━━━━━━\n");
  const { rows } = await client.query(`
    SELECT p.id, p.name, c.name AS categoria,
           to_char(p.price,'FM999G999G999') || ' COP' AS precio,
           p.stock, p.badge
    FROM products p JOIN categories c ON c.id = p.category_id
    ORDER BY p.price DESC
  `);
  console.table(rows);

  console.log("\n━━━  Colores por producto  ━━━━━━━━━━━━━━━━━━━━━━━\n");
  const { rows: colors } = await client.query(`
    SELECT p.name AS producto, pc.name AS color, pc.hex
    FROM product_colors pc JOIN products p ON p.id = pc.product_id
    ORDER BY p.id, pc.id
  `);
  console.table(colors);

  console.log("\n━━━  Órdenes  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  const { rows: orders } = await client.query(`
    SELECT order_ref, name, city,
           to_char(total,'FM999G999G999') || ' COP' AS total,
           status, to_char(created_at,'DD/MM/YYYY HH24:MI') AS fecha
    FROM orders ORDER BY created_at DESC
  `);
  if (orders.length) console.table(orders);
  else console.log("  (sin órdenes aún)");

  await client.end();
}

run().catch(e => { console.error(e.message); process.exit(1); });
