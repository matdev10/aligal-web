import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import "../style/components/scroll-to-top.css";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 550);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToHero = () => {
    const hero = document.getElementById("inicio");

    hero?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <button
      type="button"
      className={`scroll-to-top ${
        visible ? "scroll-to-top--visible" : ""
      }`}
      onClick={scrollToHero}
      aria-label="Volver al inicio"
      title="Volver al inicio"
    >
      <ArrowUp aria-hidden="true" />
    </button>
  );
}

export default ScrollToTop;