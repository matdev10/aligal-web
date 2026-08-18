import { Link } from "react-router";

import "../style/site-footer.css";

function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        <p className="site-footer__copyright">
          © {currentYear} Cerebria®. Todos los derechos reservados.
        </p>

        <div className="site-footer__legal">
          <Link to="/politica-de-privacidad">
            Política de Privacidad
          </Link>
        </div>

        <p className="site-footer__credit">
          Diseño y desarrollo por{" "}
          <a
            href="https://millwords.cl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar sitio web de Millwords"
          >
            Millwords
          </a>
        </p>
      </div>
    </footer>
  );
}

export default SiteFooter;