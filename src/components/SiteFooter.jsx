import { Link } from "react-router";

// NOTA: Ya no importamos "../style/components/site-footer.css";
// todo el estilo vive en las clases de Tailwind.

// Logos que necesitan fondo blanco para verse sobre el tema oscuro
const lightPill = "flex h-8 items-center rounded-md bg-white px-2";

function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-line bg-panel px-4 pt-10 pb-28 text-ink backdrop-blur-md md:px-8 md:pb-10">
      <div className="mx-auto max-w-7xl">
        {/* MÉTODOS DE PAGO */}
        <div className="rounded-[2rem] border border-line bg-surface p-5 text-center">
          <p className="mb-4 text-[0.65rem] uppercase tracking-[0.2em] text-ink/50">
            Métodos de pago aceptados
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className={lightPill}>
              <img
                src="/images/payments/mercado-pago.svg"
                alt="Mercado Pago"
                className="h-6 w-auto"
              />
            </div>

            <img src="/images/payments/visa.svg" alt="Visa" className="h-7 w-auto" />
            <img src="/images/payments/mastercard.svg" alt="Mastercard" className="h-7 w-auto" />
            <img
              src="/images/payments/american-express.svg"
              alt="American Express"
              className="h-7 w-auto"
            />

            <div className={lightPill}>
              <img
                src="/images/payments/transferencia.svg"
                alt="Transferencia bancaria"
                className="h-6 w-auto"
              />
            </div>
          </div>
        </div>

        {/* FOOTER INFERIOR
            - Móvil: apilado y centrado
            - md: en una fila */}
        <div className="mt-8 flex flex-col items-center gap-3 text-center text-xs text-ink/50 md:flex-row md:justify-between md:text-left">
          <p>© {currentYear} Cerebria®. Todos los derechos reservados.</p>

          <Link to="/politica-de-privacidad" className="transition hover:text-ink">
            Política de Privacidad
          </Link>

          <p>
            Diseño y desarrollo por{" "}
            <a
              href="https://nuvcore.cl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar sitio web de nuvcore"
              className="font-medium text-accent transition hover:text-ink"
            >
              nuvcore
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
