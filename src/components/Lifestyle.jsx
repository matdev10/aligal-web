const adultoMayor = "/images/wellness/noticia01.png";

import "../style/lifestyle.css";

function Lifestyle() {
  return (
    <section className="lifestyle">
      <div className="lifestyle-container">

        <div className="lifestyle-content">
          <span className="lifestyle-eyebrow">
            Bienestar Cerebria
          </span>

          <h2>
            5 hábitos simples para mantener la mente activa cada día
          </h2>

          <p className="lifestyle-description">
            Mantener una rutina activa también implica estimular la mente.
            Leer, conversar, moverse, descansar bien y organizar las
            actividades cotidianas son pequeños hábitos que pueden formar
            parte de un estilo de vida equilibrado.
          </p>

          <a
            href="/bienestar/mente-activa"
            className="lifestyle-read-more"
          >
            Leer artículo
            <span aria-hidden="true">→</span>
          </a>

          <div className="lifestyle-meta">
            <span>Bienestar y memoria</span>

            <span className="lifestyle-meta-dot">
              •
            </span>

            <span>5 min de lectura</span>
          </div>
        </div>

        <div className="lifestyle-image-wrapper">
          <div className="lifestyle-image">
            <img
              src={adultoMayor}
              alt="Adulto mayor leyendo un libro en su hogar"
            />

            <div className="lifestyle-reading-badge">
              <span>Lectura recomendada</span>
              <strong>5 min</strong>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Lifestyle;