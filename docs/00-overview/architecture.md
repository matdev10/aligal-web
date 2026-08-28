# Arquitectura del sistema

## Vista general

```text
┌────────────────────┐
│      Usuario       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ React + Vite       │
│ Frontend           │
│                    │
│ - Landing          │
│ - Producto         │
│ - Carrito          │
│ - Checkout         │
└─────────┬──────────┘
          │ HTTP / JSON
          ▼
┌────────────────────┐
│ Node.js + Express  │
│ API                │
│                    │
│ - Products         │
│ - Orders           │
│ - Payments         │
│ - Geo              │
│ - Shipping         │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Prisma ORM         │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ PostgreSQL         │
└────────────────────┘

Integraciones:
- Mercado Pago
- Servicio de correo transaccional
```

## Frontend

Estructura conceptual:

```text
Page
  ├── Components
  ├── Context
  └── Services
        ↓
       API
```

Ejemplo del checkout:

```text
CheckoutPage
  ├── CustomerForm
  ├── ShippingForm
  ├── PaymentMethods
  └── OrderSummary
```

## Backend

Estructura general:

```text
server/
├── controllers/
├── routes/
├── services/
├── validators/
├── middleware/
├── database/
├── prisma/
└── index.js
```

Flujo recomendado:

```text
Route
  ↓
Controller
  ↓
Validator
  ↓
Service
  ↓
Prisma
  ↓
Database
```

## Pago

```text
Checkout
  ↓
Crear payload
  ↓
Backend crea orden / preferencia
  ↓
Mercado Pago devuelve initPoint
  ↓
Frontend redirige
  ↓
Pago
  ↓
Webhook
  ↓
Backend verifica el pago
  ↓
Orden PAID
```

## Carrito

El carrito usa Context API y persistencia local.

Clave:

```text
mw_cart
```

El objeto normalizado debe mantener datos mínimos consistentes, incluida una imagen fallback.

## Infraestructura

### Local

```text
Frontend -> localhost:5173
Backend  -> localhost:4000
```

### Producción

```text
Vercel  -> Frontend
Railway -> Backend
PostgreSQL -> Base de datos
```
