import { FaWhatsapp } from "react-icons/fa";

// NOTA: Ya no importamos "../style/components/whatsapp.css";
// todo el estilo vive en las clases de Tailwind.

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/56945631732"
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed right-4 bottom-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#25D366] to-[#1da851] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] ring-1 ring-line transition hover:scale-105 md:right-8 md:bottom-8 md:h-16 md:w-16"
    >
      {/* Halo pulsante */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 motion-reduce:hidden"
      />

      <FaWhatsapp className="h-7 w-7 md:h-8 md:w-8" />

      {/* Punto "en línea" */}
      <span
        aria-hidden="true"
        className="absolute top-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-page bg-green-400"
      />

      {/* Tooltip: solo en escritorio (en móvil no hay hover) */}
      <span className="pointer-events-none absolute right-[calc(100%+12px)] hidden whitespace-nowrap rounded-full border border-line bg-panel/90 px-4 py-2 text-xs font-medium opacity-0 backdrop-blur-md transition group-hover:opacity-100 md:block">
        ¿Necesitas ayuda?
      </span>
    </a>
  );
}

export default WhatsAppButton;
