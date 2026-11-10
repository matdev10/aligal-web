import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";

// NOTA: Ya no importamos "../style/components/lifestyle.css";
// todo el estilo vive en las clases de Tailwind.

const adultoMayor = "/images/wellness/noticia01.png";

function Lifestyle() {
  return (
    <section className="relative isolate w-full overflow-hidden py-16 text-ink md:py-24">
      {/* NEBULOSA */}

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Tarjeta contenedora de cristal
            - Móvil: imagen arriba, texto abajo
            - lg: texto a la izquierda, imagen a la derecha */}
        <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-line bg-surface p-4 backdrop-blur-md md:p-6 lg:grid-cols-2 lg:gap-14 lg:p-10">
          {/* IMAGEN */}
          <div className="relative order-first lg:order-last">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] lg:aspect-[5/4]">
              <img
                src={adultoMayor}
                alt="Adulto mayor leyendo un libro en su hogar"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="absolute bottom-4 left-4 flex flex-col rounded-2xl border border-line bg-panel/60 px-4 py-2.5 backdrop-blur-md">
              <span className="text-[0.65rem] uppercase tracking-widest text-ink/60">
                Lectura recomendada
              </span>
              <strong className="text-lg font-semibold">5 min</strong>
            </div>
          </div>

          {/* TEXTO */}
          <div className="px-2 pb-4 md:px-4 lg:p-0">
            <span className="mb-4 inline-flex items-center gap-3 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-accent md:text-xs">
              <span className="block h-0.5 w-6 bg-olive text-white" />
              Bienestar Cerebria
            </span>

            <h2 className="text-2xl font-light leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              5 hábitos simples para mantener <span className="font-semibold">la mente activa</span>{" "}
              cada día
            </h2>

            <p className="mt-4 text-sm font-light leading-relaxed text-ink/70 md:text-base">
              Mantener una rutina activa también implica estimular la mente. Leer, conversar,
              moverse, descansar bien y organizar las actividades cotidianas son pequeños hábitos
              que pueden formar parte de un estilo de vida equilibrado.
            </p>

            <Link
              to="/bienestar/mente-activa"
              className="group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-line bg-surface px-7 text-sm font-medium backdrop-blur-md transition hover:bg-surface-strong sm:w-auto"
            >
              Leer artículo
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <div className="mt-5 flex items-center gap-2 text-xs text-ink/50">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Bienestar y memoria</span>
              <span aria-hidden="true">•</span>
              <span>5 min de lectura</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Lifestyle;
