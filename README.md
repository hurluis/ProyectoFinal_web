# Luis&SantiCO

Tienda de audio premium fabricada en Colombia. E-commerce completo con catálogo, carrito, checkout y base de datos PostgreSQL.

## Integrantes

| Nombre               |
|----------------------|
| Luis Miguel Giraldo  |

## Tecnologías

| Capa          | Tecnología                                             |
|---------------|--------------------------------------------------------|
| Frontend      | React 18 (CDN) · Babel Standalone · CSS custom properties |
| Tipografía    | Fraunces · Inter Tight · JetBrains Mono (Google Fonts) |
| Servidor web  | nginx:alpine (Docker)                                  |
| Base de datos | PostgreSQL 15 (Docker)                                 |
| Cliente DB    | pg (node-postgres)                                     |
| Contenedores  | Docker · Docker Compose                                |

## Levantar la app completa

```bash
docker compose up -d
```

Eso es todo. El comando levanta dos contenedores:

| Contenedor       | Descripción                   | URL / Puerto          |
|------------------|-------------------------------|----------------------|
| `luisantico_web` | nginx sirve la tienda         | http://localhost     |
| `luisantico_db`  | PostgreSQL con datos iniciales | localhost:5432       |

Para cargar el esquema y los productos en la base de datos (primera vez):

```bash
cd db && npm install && node setup.js
```

Para parar todo:

```bash
docker compose down
```

## Estructura del proyecto

```
Luis&SantiCO.html       ← Entrada principal de la SPA
nginx.conf              ← Configuración del servidor web
docker-compose.yml      ← Levanta web + db con un solo comando
src/
  lsc-data.js           ← Catálogo de productos
  lsc/
    App.jsx             ← Router + estado del carrito
    Nav.jsx             ← Barra de navegación numerada
    Home.jsx            ← Hero parallax · Manifiesto · Testimonios
    Catalog.jsx         ← Catálogo con filtros y búsqueda
    Product.jsx         ← Página de producto (galería + colores)
    Cart.jsx            ← Drawer lateral del carrito
    Checkout.jsx        ← Formulario de compra 3 pasos
    Footer.jsx          ← Mega-logo · Newsletter · Links
    ProductCard.jsx     ← Tarjeta con tilt 3D magnético
    Primitives.jsx      ← LSCReveal · LSCMarquee · LSCButton
db/
  schema.sql            ← Tablas + 5 stored procedures
  seed.sql              ← Datos iniciales
  setup.js              ← Script de instalación y validación
  query.js              ← Consultas de ejemplo
  .env                  ← Credenciales de conexión
```

## Esquema de base de datos

### Tablas

| Tabla              | Descripción                                              |
|--------------------|----------------------------------------------------------|
| `categories`       | 4 categorías: Auriculares, Altavoces, Escritorio, Hi-Fi  |
| `products`         | 6 productos con precio COP, stock, descripciones         |
| `product_images`   | 4 imágenes por producto (24 en total)                    |
| `product_colors`   | Variantes de color por producto (13 en total)            |
| `product_features` | Características numeradas por producto (30 en total)     |
| `cart_items`       | Ítems de carrito por sesión                              |
| `orders`           | Órdenes con referencia única `LS-XXXXXX`                 |
| `order_items`      | Líneas de cada orden                                     |

### Funciones

| Función                                   | Descripción                                      |
|-------------------------------------------|--------------------------------------------------|
| `get_products(category_id?)`              | Catálogo completo o filtrado por categoría        |
| `get_product_detail(slug)`                | JSONB con imágenes, colores y características     |
| `upsert_cart_item(session, product, qty)` | Añade o actualiza un ítem en el carrito           |
| `get_cart(session)`                       | Carrito con subtotal, envío y total               |
| `create_order(session, email, name, …)`   | Crea la orden desde el carrito y lo vacía         |
