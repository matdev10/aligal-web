# Desarrollo local

## Requisito principal

Cerebria necesita **frontend y backend activos al mismo tiempo**.

## Terminal 1 — Frontend

Desde:

```text
C:\gg-proyectos\cerebria-web
```

ejecutar:

```bash
npm run dev
```

Resultado esperado:

```text
http://localhost:5173
```

## Terminal 2 — Backend

Desde:

```text
C:\gg-proyectos\cerebria-web\server
```

ejecutar:

```bash
npm run dev
```

Resultado esperado:

```text
Servidor activo en http://localhost:4000
```

## Verificación rápida

### Producto

```text
http://localhost:4000/api/products
```

### Regiones de Chile

```text
http://localhost:4000/api/geo/countries/CL/regions
```

Respuesta geográfica esperada:

```json
{
  "success": true,
  "data": []
}
```

## Frontend API URL

Los servicios frontend utilizan una configuración similar a:

```js
const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:4000/api";
```

En local, verificar que `.env` no esté sobrescribiendo accidentalmente la URL con otro entorno.

## Error típico

```text
ERR_CONNECTION_REFUSED
```

Significa que no existe un servidor escuchando en la URL/puerto solicitado.

En Cerebria normalmente se debe comprobar primero que el backend esté activo en `localhost:4000`.

## Antes de trabajar

Checklist rápido:

- [ ] Terminal frontend abierta
- [ ] Terminal backend abierta
- [ ] `/api/products` responde
- [ ] `/api/geo/countries/CL/regions` responde
- [ ] Vite responde en `5173`
