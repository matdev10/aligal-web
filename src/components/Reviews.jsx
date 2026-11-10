// NOTA: Ya no importamos "../style/components/reviews.css";
// todo el estilo vive en las clases de Tailwind.

const reviews = [
  {
    name: "Vicente Rodríguez",
    tag: "Cliente verificado",
    rating: 5,
    featured: true,
    text: "Un detalle importante: al parecer me ha ayudado a recuperar mi memoria, estoy completando mis apuntes y jugando Mahjong en tres tiempos (al levantarme, después del almuerzo y al acostarme). Resérvame 7 frascos: 5 para mí y 2 para mi hija mayor que también tiene problemas de memoria.",
  },
  {
    name: "María González",
    tag: "Usuaria verificada",
    rating: 5,
    text: "Me gustó porque es fácil de tomar y lo incorporé rápido a mi rutina. Se siente como un apoyo diario muy práctico.",
  },
  {
    name: "Carlos Muñoz",
    tag: "Cliente Cerebria®",
    rating: 5,
    text: "Lo compré para mi papá y le acomodó bastante el formato líquido. Buena presentación y fácil consumo.",
  },
  {
    name: "Andrea Silva",
    tag: "Compra reciente",
    rating: 4,
    text: "Me parece una alternativa cómoda para adultos que buscan mantener una rutina de bienestar.",
  },
];

function Stars({ rating }) {
  return (
    <div className="text-sm tracking-widest" aria-label={`${rating} de 5 estrellas`}>
      <span className="text-olive">{"★".repeat(rating)}</span>
      <span className="text-ink/20">{"★".repeat(5 - rating)}</span>
    </div>
  );
}

function Reviews() {
  return (
    // Fondo oscuro propio: así se ve bien aunque la página que lo
    // contiene (BuyPage) todavía tenga fondo claro.
    <section
      id="reseñas"
      className="relative isolate w-full overflow-hidden bg-page py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <span className="mb-4 inline-flex items-center gap-3 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-accent md:text-xs">
            <span className="block h-0.5 w-6 bg-olive text-white" />
            Opiniones reales
            <span className="block h-0.5 w-6 bg-olive" />
          </span>

          <h2 className="text-3xl font-light leading-tight tracking-tight sm:text-4xl">
            Personas que ya confían en <span className="font-semibold">Cerebria®</span>
          </h2>

          <p className="mt-4 text-sm font-light leading-relaxed text-ink/70 md:text-base">
            Experiencias de usuarios que incorporaron Cerebria® como apoyo diario para su memoria,
            concentración y bienestar.
          </p>
        </div>

        {/* GRILLA
 - Móvil: 1 columna
 - md: 2 columnas, la destacada ocupa todo el ancho
 - lg: la destacada a la izquierda en 2 filas */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {reviews.map(({ name, tag, rating, text, featured }) => (
            <article
              key={name}
              className={`flex flex-col justify-between gap-5 rounded-[2rem] border p-6 backdrop-blur-md md:p-7 ${
                featured
                  ? "border-accent/25 bg-accent-soft    md:col-span-2 lg:col-span-1 lg:row-span-2"
                  : "border-line bg-surface"
              }`}
            >
              <div>
                <Stars rating={rating} />
                <p
                  className={`mt-4 font-light leading-relaxed text-ink/80 ${
                    featured ? "text-base md:text-lg" : "text-sm"
                  }`}
                >
                  “{text}”
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-line pt-4">
                <div
                  aria-hidden="true"
                  className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent"
                >
                  {name.charAt(0)}
                </div>
                <div>
                  <strong className="block text-sm font-semibold">{name}</strong>
                  <span className="text-xs text-ink/50">{tag}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
