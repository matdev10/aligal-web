import { useEffect, useRef } from "react";
import { Brain, Focus, Activity, Leaf } from "lucide-react";

// NOTA: Ya no importamos "../style/components/benefits.css";
// todo el estilo vive en las clases de Tailwind.

const benefits = [
  {
    Icon: Brain,
    title: "Memoria",
    text: "Apoya la claridad mental y ayuda a mantener activos los recuerdos del día a día.",
  },
  {
    Icon: Focus,
    title: "Concentración",
    text: "Favorece el enfoque diario gracias a su combinación de Omega 3, vitaminas y minerales.",
  },
  {
    Icon: Activity,
    title: "Salud cerebral",
    text: "Contribuye al bienestar cognitivo y al cuidado del sistema nervioso.",
  },
  {
    Icon: Leaf,
    title: "Sin azúcar",
    text: "Formato líquido fácil de consumir, ideal para una rutina práctica y constante.",
  },
];

// Animación de entrada al hacer scroll (reemplaza a .scroll-fall / .is-visible).
// El observer pone data-visible="true" y Tailwind reacciona con data-[visible=true]:
const reveal = `
  opacity-0 translate-y-10 transition-all duration-[900ms] ease-out
  data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0
  motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none
`;

function Benefits() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Solo buscamos dentro de esta sección (antes era todo el documento)
    const elements = sectionRef.current?.querySelectorAll("[data-reveal]") ?? [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = "true";
            observer.unobserve(entry.target); // se anima una sola vez
          }
        });
      },
      { threshold: 0.25 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="beneficios"
      className="relative isolate w-full overflow-hidden py-20 text-ink md:py-28 lg:py-32"
    >
      {/* NEBULOSAS DE FONDO */}

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* ENCABEZADO */}
        <div data-reveal className={`mx-auto mb-12 max-w-2xl text-center md:mb-16 ${reveal}`}>
          <span className="mb-4 inline-flex items-center gap-3 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-accent md:text-xs">
            <span className="block h-0.5 w-6 bg-olive text-white" />
            Beneficios
            <span className="block h-0.5 w-6 bg-olive" />
          </span>

          <h2 className="text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Apoyo diario para <span className="font-semibold">tu mente</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-ink/70 md:text-base">
            Cerebria® acompaña tu bienestar cognitivo con una fórmula pensada para memoria,
            concentración y salud cerebral.
          </p>
        </div>

        {/* GRILLA DE BENEFICIOS
 - Móvil: 1 columna
 - sm: 2 columnas
 - lg: 4 columnas */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {benefits.map(({ Icon, title, text }, index) => (
            // El wrapper hace la animación de entrada; el article, el hover.
            <div
              key={title}
              data-reveal
              style={{ transitionDelay: `${index * 120}ms` }}
              className={reveal}
            >
              <article
                className="group relative h-full overflow-hidden rounded-[2rem] border border-transparent bg-olive-deep p-6 text-white shadow-[0_14px_30px_rgba(28,40,34,0.18)] transition duration-300
                hover:-translate-y-1 md:p-7"
              >
                {/* Brillo superior interno */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-white/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-60"
                />

                <div className="relative mb-6 flex items-start justify-between md:mb-8">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/10 md:h-14 md:w-14">
                    <Icon
                      className="h-6 w-6 text-white md:h-7 md:w-7"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  <span className="text-sm font-light tracking-widest text-white/40">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="relative text-lg font-semibold md:text-xl">{title}</h3>

                <p className="relative mt-2 text-sm font-light leading-relaxed text-white/75">
                  {text}
                </p>

                {/* Línea de acento inferior */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-6 h-1 w-24 rounded-full bg-gradient-to-r from-white/40 to-transparent transition-all duration-500 group-hover:w-36 md:left-7"
                />
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
