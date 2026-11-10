import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ArrowRight, CalendarDays, Droplets, PillBottle, Users } from "lucide-react";

// NOTA: Ya no importamos "../style/components/hero.css";
// todo el estilo vive en las clases de Tailwind.

const heroPremium = "/images/hero/hero-cerebria-premium.jpg";
const heroMobil = "/images/hero/hero-cerebria-mobil.png";

const productDetails = [
  { id: "format", title: "Formato", description: "Jarabe líquido 200 ml", Icon: PillBottle },
  { id: "dose", title: "Dosis", description: "10 ml diarios", Icon: Droplets },
  { id: "routine", title: "Rutina", description: "Uso diario", Icon: CalendarDays },
  { id: "audience", title: "Público", description: "Adultos", Icon: Users },
];

const heroPhrases = [
  { line1: "Tu mente activa,", line2: "tu vida plena" },
  { line1: "Cuida tu mente,", line2: "potencia tu bienestar" },
  { line1: "Bienestar que", line2: "acompaña tu día" },
];

// Duración del fade (ms). Debe coincidir con "duration-400" en la frase.
const FADE_MS = 400;

function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId;

    const interval = setInterval(() => {
      // 1. Fade-out
      setIsVisible(false);

      // 2. Al terminar el fade-out: cambiar texto y hacer fade-in
      timeoutId = setTimeout(() => {
        setPhraseIndex((current) => (current + 1) % heroPhrases.length);
        setIsVisible(true);
      }, FADE_MS);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section
      id="inicio"
      className="relative isolate w-full min-h-[100svh] overflow-hidden bg-[#1C2822] text-white"
    >
      {/* IMAGEN DE FONDO
          - Móvil: versión vertical
          - md+: versión panorámica premium */}
      <picture className="absolute inset-0 -z-30">
        <source media="(min-width: 768px)" srcSet={heroPremium} />
        <img
          src={heroMobil}
          alt="Cerebria, suplemento alimentario en formato de jarabe"
          className="h-full w-full object-cover object-[66%_center] md:object-center"
        />
      </picture>

      {/* VELO VERDE PROFUNDO (mismo tono que las tarjetas de Beneficios)
          - Móvil: degradado vertical (texto arriba, producto abajo)
          - md+: degradado horizontal (texto a la izquierda, frasco nítido a la derecha) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20
          bg-gradient-to-b from-[#1C2822]/95 via-[#1C2822]/70 to-[#1C2822]/90
          md:bg-gradient-to-r md:from-[#1C2822]/95 md:via-[#1C2822]/65 md:to-transparent"
      />

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between gap-10 px-4 pt-24 pb-8 md:px-8 md:pt-32 md:pb-12">
        {/* TEXTO PRINCIPAL */}
        <div className="w-full max-w-xl">
          <span className="mb-4 inline-flex items-center gap-3 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-white/75 md:text-xs">
            <span className="block h-0.5 w-6 bg-white/60 md:w-8" />
            Bienestar para tu día a día
          </span>

          <h1 className="m-0">
            <span className="mb-3 block font-['Neuropol'] text-4xl leading-none tracking-wide text-[#F0F4F2] sm:text-5xl md:mb-5">
              Cerebria
              <sup className="ml-1 align-super font-sans text-[0.45em] leading-none">®</sup>
            </span>

            {/* Frase rotativa: mismo patrón phraseIndex + isVisible */}
            <span
              className={`block min-h-[2.1em] text-[2.1rem] font-light leading-[1.05] tracking-tight transition-all duration-400 ease-out sm:text-5xl lg:text-6xl ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
              }`}
            >
              {heroPhrases[phraseIndex].line1}
              <br />
              <span className="font-semibold">{heroPhrases[phraseIndex].line2}</span>
            </span>
          </h1>

          <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-white/80 md:mt-7 md:text-base">
            Suplemento alimentario con Omega 3, vitaminas y minerales, desarrollado para
            complementar tu rutina diaria.
          </p>

          {/* BOTONES: apilados en móvil, en fila desde sm */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/producto"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F0F4F2] px-7 text-sm font-semibold text-[#1C2822] shadow-[0_10px_25px_rgba(0,0,0,0.25)] transition hover:bg-white active:scale-[0.98]"
            >
              Comprar ahora
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            {/* "Comprar ahora" ya lleva a /producto; este botón baja a Beneficios */}
            <a
              href="#beneficios"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Ver beneficios
            </a>
          </div>

          <p className="mt-4 text-xs text-white/60">Despacho en Santiago y envíos a regiones.</p>
        </div>

        {/* TARJETAS DE DETALLE (verde profundo, como Beneficios)
            - Móvil: grilla 2x2
            - lg: 4 columnas */}
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {productDetails.map(({ id, title, description, Icon }) => (
            <li
              key={id}
              className="flex items-center justify-between gap-3 rounded-[2rem] border border-white/10 bg-olive-deep p-4 text-white shadow-[0_14px_30px_rgba(0,0,0,0.25)] md:p-5"
            >
              <div className="min-w-0">
                <strong className="block text-xs font-semibold md:text-sm">{title}</strong>
                <small className="mt-0.5 block text-[0.7rem] font-light leading-tight text-white/70 md:text-xs">
                  {description}
                </small>
              </div>

              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 md:h-11 md:w-11">
                <Icon className="h-4 w-4 text-white md:h-5 md:w-5" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Hero;
