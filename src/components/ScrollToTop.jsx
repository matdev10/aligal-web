import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// NOTA: Ya no importamos "../style/components/scroll-to-top.css";
// todo el estilo vive en las clases de Tailwind.

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 550);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToHero = () => {
    const hero = document.getElementById("inicio");

    if (hero) {
      hero.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // En páginas sin Hero (producto, carrito...) sube al inicio igual
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToHero}
      aria-label="Volver al inicio"
      title="Volver al inicio"
      // Queda justo encima del botón de WhatsApp
      className={`fixed right-[1.375rem] bottom-22 z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-surface-strong text-ink backdrop-blur-md transition duration-300 hover:bg-surface-strong md:right-[2.625rem] md:bottom-28 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4" strokeWidth={2.3} aria-hidden="true" />
    </button>
  );
}

export default ScrollToTop;
