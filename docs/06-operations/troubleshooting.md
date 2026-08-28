# Troubleshooting

## Producto no carga

Síntoma:

```text
No pudimos cargar el producto
```

Revisar:

1. Backend local activo.
2. `VITE_API_URL`.
3. `/api/products`.
4. DevTools > Network.
5. Consola del navegador.

`productService` dispone de reintentos automáticos para tolerar fallos breves, pero esto no reemplaza corregir un backend apagado.

---

## Regiones no cargan

Síntoma:

```text
No se pudieron cargar las regiones.
```

Probar directamente:

```text
http://localhost:4000/api/geo/countries/CL/regions
```

Si devuelve:

```text
ERR_CONNECTION_REFUSED
```

iniciar backend:

```bash
cd server
npm run dev
```

---

## Imagen rota en carrito

El carrito normaliza la imagen:

```js
image:
  product.imageUrl ??
  product.image ??
  "/images/product/img-producto.png"
```

`CartItem` además debe conservar un `onError` para usar el fallback si la URL guardada existe pero falla.

Después de modificar la normalización puede ser necesario:

1. vaciar carrito,
2. volver a `/comprar`,
3. agregar producto nuevamente.

---

## CSS mobile no se aplica

Revisar:

1. llaves `{}` correctamente cerradas,
2. media queries no anidadas accidentalmente,
3. breakpoint correcto,
4. regla posterior sobrescribiendo el estilo,
5. selector con mayor especificidad.

Sistema:

```text
Desktop  > 1440
Notebook 993-1440
Tablet   681-992
Mobile   <=680
```

---

## Backend local no inicia

Desde:

```text
cerebria-web/server
```

ejecutar:

```bash
npm run dev
```

Si funciona:

```text
Servidor activo en http://localhost:4000
```

---

## Datos viejos en carrito

Persistencia:

```text
localStorage["mw_cart"]
```

Al cambiar la forma del objeto del carrito, vaciar el carrito para evitar que objetos antiguos sigan persistiendo.

---

## Antes de reportar un bug

Guardar:

- ruta,
- resolución,
- mensaje visible,
- error de consola,
- request fallida en Network,
- status HTTP,
- pasos para reproducir.
