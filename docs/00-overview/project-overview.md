# Project Overview

## Propósito

Cerebria es una tienda online orientada a la venta del suplemento alimentario Cerebria®.

El proyecto debe ofrecer un flujo completo:

```text
Landing
  ↓
Producto
  ↓
Carrito
  ↓
Checkout
  ↓
Cálculo de despacho
  ↓
Mercado Pago
  ↓
Confirmación de pago
```

## Alcance actual

### Frontend

- Landing principal
- Página `/comprar`
- Carrito
- Cart Drawer
- Checkout
- Responsive
- Footer y medios de pago
- Formulario de contacto
- Contenido editorial

### Backend

- Productos
- Órdenes
- Mercado Pago
- Webhook de pago
- Geografía
- Despacho
- Prisma/PostgreSQL

## Principios

### Lógica crítica en backend

El frontend presenta información y recoge interacción del usuario, pero no debe ser la autoridad final sobre:

- precio,
- stock,
- total,
- estado de pago,
- validación de órdenes.

### CSS organizado

Los componentes deben usar clases CSS y evitar estilos inline salvo casos excepcionales.

### Responsive coherente

Los componentes deben respetar el sistema global de breakpoints y evitar media queries solapadas.

## Navegación documental

- Arquitectura: `architecture.md`
- Estado actual: `current-status.md`
- Desarrollo local: `../05-infrastructure/local-development.md`
- Problemas frecuentes: `../06-operations/troubleshooting.md`
