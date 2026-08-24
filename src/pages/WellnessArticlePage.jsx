import { Link, useNavigate } from "react-router-dom";

import "../style/wellness-article.css";

const articleImage = "/images/wellness/noticia01.png";

function WellnessArticlePage() {
  const navigate = useNavigate();

  return (
    <main className="wellness-article">
      <div className="wellness-article__container">

        <button
          type="button"
          className="wellness-article__back"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </button>

        <div className="wellness-article__header">
          <span className="wellness-article__eyebrow">
            Bienestar Cerebria
          </span>

          <h1>
            5 hábitos simples para mantener la mente activa cada día
          </h1>

          <p>
            Pequeñas acciones cotidianas pueden ayudar a mantener una
            rutina más activa, organizada y estimulante.
          </p>
        </div>

        <div className="wellness-article__image">
          <img
            src={articleImage}
            alt="Adulto mayor leyendo un libro en su hogar"
          />
        </div>

        <article className="wellness-article__content">
          <section>
            <span>01</span>

            <div>
              <h2>Lee algunos minutos al día</h2>
              <p>
                Leer libros, noticias o temas de interés ayuda a mantener
                la mente ocupada y favorece una rutina de aprendizaje
                constante.
              </p>
            </div>
          </section>

          <section>
            <span>02</span>

            <div>
              <h2>Mantente en movimiento</h2>
              <p>
                Caminar, realizar actividades domésticas o incorporar
                ejercicio suave permite mantener una rutina más activa.
              </p>
            </div>
          </section>

          <section>
            <span>03</span>

            <div>
              <h2>Conversa y comparte</h2>
              <p>
                Mantener contacto con otras personas, conversar y compartir
                experiencias también estimula la atención y la comunicación.
              </p>
            </div>
          </section>

          <section>
            <span>04</span>

            <div>
              <h2>Organiza tu día</h2>
              <p>
                Usar calendarios, listas o pequeños recordatorios ayuda a
                estructurar las actividades y mantener hábitos constantes.
              </p>
            </div>
          </section>

          <section>
            <span>05</span>

            <div>
              <h2>Respeta tus horas de descanso</h2>
              <p>
                Mantener horarios regulares de descanso forma parte de una
                rutina equilibrada y ayuda a afrontar el día con mayor energía.
              </p>
            </div>
          </section>
        </article>

        <div className="wellness-article__cta">
          <div>
            <span>Bienestar diario</span>

            <h2>
              Complementa tu rutina con Cerebria®
            </h2>

            <p>
              Conoce su formato, ingredientes y características.
            </p>
          </div>

          <div className="wellness-article__actions">
            <button
              type="button"
              className="wellness-article__secondary"
              onClick={() => navigate(-1)}
            >
              ← Volver
            </button>

            <Link
              to="/comprar"
              className="wellness-article__primary"
            >
              Comprar Cerebria
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

export default WellnessArticlePage;