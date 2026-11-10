// =========================================================
// Clases de Tailwind compartidas (estética espacial / cristal)
// Úsalas en carrito y checkout para que todo se vea igual:
//   import { glassCard, inputClass } from "../ui/glass";
// =========================================================

// Tarjeta de cristal principal
export const glassCard = "rounded-[2rem] border border-line bg-surface p-5 backdrop-blur-md md:p-7";

// Etiqueta pequeña sobre los títulos ("CARRITO", "DESPACHO"...)
export const eyebrow = "text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-accent";

// Inputs, selects y textareas oscuros
export const inputClass =
  "w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink/35 outline-none transition [color-scheme:light]  focus:border-accent/60 focus:bg-surface-strong focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50 [&>option]:bg-panel";

export const labelClass = "mb-1.5 block text-xs font-medium text-ink/70";

// Botón principal (degradado morado → fucsia)
export const primaryButton =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-olive text-white hover:bg-olive-deep    px-7 text-sm font-semibold shadow-[0_10px_25px_rgba(28,40,34,0.18)]  transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none";

// Botón secundario de cristal
export const secondaryButton =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-line bg-surface px-7 text-sm font-medium text-ink transition hover:bg-surface-strong";

// Botón circular pequeño (+, −, cerrar)
export const circleButton =
  "grid h-9 w-9 place-items-center rounded-full border border-line bg-surface-strong text-ink transition hover:bg-surface-strong active:scale-95 disabled:cursor-not-allowed disabled:opacity-40";

export const formatCLP = (value) => `$${Number(value || 0).toLocaleString("es-CL")}`;
