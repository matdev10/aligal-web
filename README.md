# Cerebria®

Sitio web y flujo de comercio electrónico para Cerebria®, desarrollado con React/Vite en frontend y Node.js/Express + Prisma/PostgreSQL en backend.

## Stack principal

- Frontend: React + Vite
- Routing: React Router
- Estado de carrito: Context API + `localStorage`
- Backend: Node.js + Express
- ORM: Prisma
- Base de datos: PostgreSQL
- Pagos: Mercado Pago
- Frontend en producción: Vercel
- Backend en producción: Railway

## Desarrollo local

El proyecto necesita dos procesos activos.

### Frontend

Desde la raíz:

```bash
npm run dev
```

Disponible normalmente en:

```text
http://localhost:5173
```

### Backend

Desde:

```text
server/
```

ejecutar:

```bash
npm run dev
```

Disponible normalmente en:

```text
http://localhost:4000
```

Si el backend no está activo, pueden fallar productos, geografía, despacho, checkout, órdenes y pagos.

## Documentación

La documentación técnica vive en [`docs/`](./docs/).

Puntos de entrada recomendados:

- [`docs/00-overview/project-overview.md`](./docs/00-overview/project-overview.md)
- [`docs/00-overview/architecture.md`](./docs/00-overview/architecture.md)
- [`docs/00-overview/current-status.md`](./docs/00-overview/current-status.md)
- [`docs/05-infrastructure/local-development.md`](./docs/05-infrastructure/local-development.md)
- [`docs/06-operations/troubleshooting.md`](./docs/06-operations/troubleshooting.md)
- [`docs/07-decisions/ADR-001-responsive-breakpoints.md`](./docs/07-decisions/ADR-001-responsive-breakpoints.md)

## Responsive

Sistema general acordado:

```text
Desktop       > 1440px
Notebook      993px - 1440px
Tablet        681px - 992px
Mobile        <= 680px
Small Mobile  <= 390px solo cuando sea necesario
```

## Importante

No subir secretos reales al repositorio. Variables como tokens de Mercado Pago, credenciales de base de datos y servicios de correo deben permanecer en variables de entorno.
