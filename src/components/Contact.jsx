import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

// NOTA: Ya no importamos "../style/components/contact.css";
// todo el estilo vive en las clases de Tailwind.

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const contactChannels = [
  {
    id: "whatsapp-primary",
    label: "WhatsApp principal",
    title: "Ventas y consultas",
    value: "+56 9 4563 1732",
    href: "https://wa.me/56945631732",
    action: "Abrir conversación",
    external: true,
    Icon: FaWhatsapp,
  },
  {
    id: "whatsapp-secondary",
    label: "WhatsApp alternativo",
    title: "Atención alternativa",
    value: "+56 9 2160 4900",
    href: "https://wa.me/56921604900",
    action: "Abrir conversación",
    external: true,
    Icon: FaWhatsapp,
  },
  {
    id: "email",
    label: "Correo electrónico",
    title: "Consultas por correo",
    value: "contacto@aligal.cl",
    href: "mailto:contacto@aligal.cl",
    action: "Enviar correo",
    external: false,
    Icon: FaEnvelope,
  },
  {
    id: "location",
    label: "Ubicación",
    title: "Zona de atención",
    value: "Santiago, Chile",
    href: null,
    action: null,
    external: false,
    Icon: IoLocationSharp,
  },
];

// Estilos compartidos de los inputs
const inputClass =
  "w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink/35 outline-none transition focus:border-accent/60 focus:bg-surface-strong focus:ring-2 focus:ring-accent/20";

const labelClass = "mb-1.5 block text-xs font-medium text-ink/70";

function ContactCard({ label, title, value, href, action, external, Icon }) {
  const CardElement = href ? "a" : "article";

  return (
    <CardElement
      className={`flex items-center gap-4 rounded-[1.75rem] border border-line bg-surface p-4 backdrop-blur-md transition ${
        href ? "hover:-translate-y-0.5 hover:border-accent/30 hover:bg-surface-strong" : ""
      }`}
      href={href || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={href ? `${title}: ${value}` : undefined}
    >
      <div
        className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-accent-soft text-lg text-accent"
        aria-hidden="true"
      >
        <Icon />
      </div>

      <div className="min-w-0">
        <span className="block text-[0.65rem] uppercase tracking-widest text-ink/45">{label}</span>
        <strong className="block text-sm font-semibold">{title}</strong>
        <span className="block truncate text-sm font-light text-ink/70">{value}</span>

        {action && (
          <span className="mt-1 inline-flex items-center gap-1 text-xs text-accent">
            {action}
            <span aria-hidden="true">↗</span>
          </span>
        )}
      </div>
    </CardElement>
  );
}

function Contact() {
  const form = useRef(null);

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const clearStatusLater = () => {
    window.setTimeout(() => {
      setStatus("");
    }, 4000);
  };

  const sendEmail = async (event) => {
    event.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error("Faltan variables de configuración de EmailJS.");

      setStatus("error");
      clearStatusLater();
      return;
    }

    try {
      setLoading(true);
      setStatus("");

      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY,
      );

      form.current?.reset();
      setStatus("success");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);

      setStatus("error");
    } finally {
      setLoading(false);
      clearStatusLater();
    }
  };

  return (
    <section id="contacto" className="relative isolate w-full overflow-hidden py-16 md:py-24">
      {/* NEBULOSAS */}

      {/* LAYOUT
 - Móvil: encabezado → canales → formulario (igual que antes)
 - lg: encabezado + canales a la izquierda, formulario a la derecha */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="flex flex-col gap-8">
          {/* ENCABEZADO */}
          <div>
            <span className="mb-4 inline-flex items-center gap-3 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-accent md:text-xs">
              <span className="block h-0.5 w-6 bg-olive text-white" />
              Contacto
            </span>

            <h2 className="text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Conversemos sobre <span className="font-semibold">Cerebria®</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-ink/70 md:text-base">
              Resuelve tus dudas sobre el producto, sus ingredientes, disponibilidad y alternativas
              de despacho. Elige el canal de atención que te resulte más cómodo.
            </p>
          </div>

          {/* TARJETAS DE CANALES
 - Móvil: 1 columna
 - sm: 2 columnas */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {contactChannels.map((channel) => (
              <ContactCard key={channel.id} {...channel} />
            ))}
          </div>
        </div>

        {/* FORMULARIO */}
        <form
          ref={form}
          onSubmit={sendEmail}
          aria-busy={loading}
          className="flex flex-col gap-4 rounded-[2rem] border border-line bg-surface p-5 backdrop-blur-md md:p-8 lg:self-start"
        >
          <header className="mb-1">
            <span className="text-[0.65rem] uppercase tracking-widest text-accent">
              Formulario de contacto
            </span>
            <h3 className="mt-1 text-xl font-semibold md:text-2xl">Envíanos tu consulta</h3>
            <p className="mt-1 text-sm font-light text-ink/60">
              Completa tus datos y te responderemos a la brevedad.
            </p>
          </header>

          <div>
            <label htmlFor="contact-name" className={labelClass}>
              Nombre
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Ej. Camila González"
              autoComplete="name"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClass}>
              Correo electrónico
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="nombre@correo.cl"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>
              Mensaje
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Cuéntanos cómo podemos ayudarte..."
              rows="5"
              required
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 inline-flex min-h-12 items-center justify-center rounded-full bg-olive text-white hover:bg-olive-deep px-7 text-sm font-semibold shadow-[0_10px_25px_rgba(28,40,34,0.18)] transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Enviando consulta..." : "Enviar consulta"}
          </button>

          {status === "success" && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800"
            >
              <span aria-hidden="true">✓</span>
              Consulta enviada correctamente.
            </div>
          )}

          {status === "error" && (
            <div
              role="alert"
              className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700"
            >
              No pudimos enviar tu consulta. Inténtalo nuevamente.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
