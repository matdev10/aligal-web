import { Link } from "react-router-dom";

const adultoMayor = "/images/wellness/noticia01.png";

import "../style/components/lifestyle.css";

function Lifestyle() {
  return (
    <section className="lifestyle">
      <div className="lifestyle-container container">

        <div className="lifestyle-content">
          <span className="section-label">
            Bienestar Cerebria
          </span>

          <h2 className="section-title">
            5 hábitos simples para mantener la mente activa cada día
          </h2>

          <p className="section-text lifestyle-description">
            Mantener una rutina activa también implica estimular la mente.
            Leer, conversar, moverse, descansar bien y organizar las
            actividades cotidianas son pequeños hábitos que pueden formar
            parte de un estilo de vida equilibrado.
          </p>

          <Link
            to="/bienestar/mente-activa"
            className="lifestyle-read-more"
          >
            Leer artículo
            <span aria-hidden="true">→</span>
          </Link>

          <div className="lifestyle-meta">
            <span>Bienestar y memoria</span>

            <span
              className="lifestyle-meta-dot"
              aria-hidden="true"
            >
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