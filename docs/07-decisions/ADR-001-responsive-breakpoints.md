# ADR-001 — Sistema de breakpoints

## Estado

Aceptado.

## Contexto

Durante el desarrollo existían media queries con diferentes cortes, como `1366px`, `1150px`, `980px`, `900px`, `640px`, `600px` y otros valores.

Esto generaba:

- reglas solapadas,
- dificultad para identificar qué estilo estaba activo,
- comportamiento distinto entre componentes,
- más riesgo al mantener el responsive.

## Decisión

Utilizar rangos generales no solapados:

```text
Desktop       > 1440px
Notebook      993px - 1440px
Tablet        681px - 992px
Mobile        <= 680px
Small Mobile  <= 390px solo cuando sea necesario
```

Implementación:

```css
@media (max-width: 1440px) and (min-width: 993px) {
  /* Notebook */
}

@media (max-width: 992px) and (min-width: 681px) {
  /* Tablet */
}

@media (max-width: 680px) {
  /* Mobile */
}
```

## Motivo

- Evitar solapamientos.
- Hacer más predecible el cascade de CSS.
- Compartir una arquitectura responsive común.
- Facilitar pruebas sistemáticas.

## Resoluciones de prueba

### Notebook

- 1366 × 768
- 1440 × 900
- 1536 × 864

### Tablet

- 768 × 1024
- 820 × 1180
- 912 × 1368

### Mobile

- 375 × 812
- 390 × 844
- 430 × 932

## Consecuencias

Los componentes nuevos deben seguir estos rangos salvo una excepción técnica justificada.

Un breakpoint específico adicional debe utilizarse únicamente cuando el comportamiento del componente realmente lo requiera.
