import { Link } from "react-router";

import "../style/site-footer.css";

function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">

      {/* Métodos de pago */}
      <div className="site-footer__payments">
        <p className="site-footer__payments-title">
          Métodos de pago aceptados
        </p>

        <div className="site-footer__payments-logos">

          {/* Mercado Pago */}
          <div className="site-footer__payment-item site-footer__payment-item--light site-footer__payment-item--mercadopago">
            <img
              src="/images/payments/mercado-pago.svg"
              alt="Mercado Pago"
            />
          </div>

          {/* Visa */}
          <img
            src="/images/payments/visa.svg"
            alt="Visa"
          />

          {/* Mastercard */}
          <img
            src="/images/payments/mastercard.svg"
            alt="Mastercard"
          />

          {/* American Express */}
          <img
            src="/images/payments/american-express.svg"
            alt="American Express"
          />

          {/* Transferencia bancaria */}
          <div className="site-footer__payment-item site-footer__payment-item--light site-footer__payment-item--bank">
            <img
              src="/images/payments/transferencia.svg"
              alt="Transferencia bancaria"
            />
          </div>

        </div>
      </div>

      {/* Footer inferior */}
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