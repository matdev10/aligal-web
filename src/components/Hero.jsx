import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  CalendarDays,
  Droplets,
  PillBottle,
  Users,
} from "lucide-react";

const heroPremium =
  "/images/hero/hero-cerebria-premium.jpg";

const heroMobil =
  "/images/hero/hero-cerebria-mobil2.png";

import "../style/hero.css";

const productDetails = [
  {
    id: "format",
    title: "Formato",
    description: "Jarabe líquido 200 ml",
    Icon: PillBottle,
  },
  {
    id: "dose",
    title: "Dosis",
    description: "10 ml diarios",
    Icon: Droplets,
  },
  {
    id: "routine",
    title: "Rutina",
    description: "Uso diario",
    Icon: CalendarDays,
  },
  {
    id: "audience",
    title: "Público",
    description: "Adultos",
    Icon: Users,
  },
];

  const heroPhrases = [
  {
    line1: "Tu mente activa,",
    line2: "tu vida plena",
  },
  {
    line1: "Cuida tu mente,",
    line2: "potencia tu bienestar",
  },
  {
    line1: "Bienestar que",
    line2: "acompaña tu día",
  },

];



function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Iniciar fade-out
      setIsVisible(false);

      // 2. Cuando termina el fade-out, cambiar el texto y hacer fade-in
      setTimeout(() => {
        setPhraseIndex((current) => (current + 1) % heroPhrases.length);
        setIsVisible(true);
      }, 400); // debe coincidir con la duración del fade-out en CSS
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  return (
    <section className="hero" id="inicio">
      <picture className="hero-picture">
        <source media="(max-width: 768px)" srcSet={heroMobil} />

        <img
          className="hero-full-image"
          src={heroPremium}
          alt="Cerebria, suplemento alimentario en formato de jarabe"
        />
      </picture>

      <div className="hero-container">
        <div className="hero-copy">
          {/* Solamente este bloque se moverá en móvil */}
          <div className="hero-text">
            <span className="hero-eyebrow">Bienestar para tu día a día</span>

            <h1>
              <span className="cerebria-font">Cerebria®</span>

              <span
                className={`hero-line ${isVisible ? "hero-line-visible" : "hero-line-hidden"}`}
              >
                {heroPhrases[phraseIndex].line1}
                <br />
                {heroPhrases[phraseIndex].line2}
              </span>
            </h1>

            <p className="hero-description">
              Suplemento alimentario con Omega 3, vitaminas y minerales,
              desarrollado para complementar tu rutina diaria.
            </p>
          </div>

          {/* Los botones mantienen su posición original */}
          <div className="hero-actions">
            <Link to="/comprar" className="hero-buy-btn">
              Comprar ahora
              <ArrowRight className="hero-button-icon" aria-hidden="true" />
            </Link>

            <Link to="/producto" className="hero-secondary-btn">
              Conocer el producto
            </Link>
          </div>

          {/* La nota también conserva su posición original */}
          <p className="hero-shipping-note">
            Despacho en Santiago y envíos a regiones.
          </p>
        </div>
      </div>

      <div className="hero-info">
        {productDetails.map(({ id, title, description, Icon }) => (
          <div key={id} className="hero-info-item">
            <div className="hero-icon-wrap">
              <Icon className="hero-icon" aria-hidden="true" />
            </div>

            <div className="hero-info-content">
              <strong>{title}</strong>
              <small>{description}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;