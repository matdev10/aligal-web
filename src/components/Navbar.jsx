import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

// Fondo claro en todos los tamaños: logo negro
const logoDark = "/images/brand/logo-negro.png";

const navLink =
  "text-lg font-medium tracking-wide text-white/85 transition-colors hover:text-white md:text-sm md:text-[#1C2822]/70 md:hover:text-[#1C2822]";

function Navbar() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 text-[#1C2822]">
      {/* FONDO DE LA BARRA
          Va en una capa aparte: si el backdrop-blur estuviera en el <header>,
          el menú lateral (position: fixed) quedaría atrapado dentro de los
          64px de alto de la barra. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-[#2D3B32]/10 bg-[#F0F4F2]/90 backdrop-blur-md md:border-line"
      />

      <div className="relative z-50 mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20">
        {/* LOGO */}
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <img src={logoDark} alt="Cerebria" className="h-8 w-auto object-contain md:h-10" />
        </Link>

        {/* NAV LINKS
            - Móvil: menú lateral verde profundo que entra desde la derecha
            - md: barra horizontal tradicional */}
        <nav
          aria-label="Navegación principal"
          className={`fixed top-0 right-0 bottom-0 flex w-72 flex-col gap-6 rounded-l-[2rem] bg-[#1C2822] p-8 pt-24 shadow-2xl transition-transform duration-300
            md:static md:w-auto md:translate-x-0 md:flex-row md:items-center md:gap-8 md:rounded-none md:bg-transparent md:p-0 md:shadow-none
            ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <a href="/#inicio" onClick={closeMenu} className={navLink}>
            Inicio
          </a>
          <a href="/#beneficios" onClick={closeMenu} className={navLink}>
            Beneficios
          </a>
          <Link to="/producto" onClick={closeMenu} className={navLink}>
            Producto
          </Link>

          {/* CTA dentro del menú (solo móvil) */}
          <Link
            to="/producto"
            onClick={closeMenu}
            className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-[#F0F4F2] px-6 text-sm font-semibold text-[#1C2822] transition hover:bg-white md:hidden"
          >
            Comprar Cerebria®
          </Link>
        </nav>

        {/* ACCIONES (CARRITO Y MENÚ HAMBURGUESA) */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            to="/carrito"
            onClick={closeMenu}
            className={`${menuOpen ? "invisible md:visible" : ""} relative flex items-center gap-2 rounded-full border border-[#2D3B32]/15 bg-white/60 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white md:border-line  md:px-4 md:py-2 `}
          >
            <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
            <span className="hidden sm:inline">Carrito</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#2D3B32] text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburguesa: oscura sobre la barra clara, blanca sobre el menú verde */}
          <button
            type="button"
            onClick={() => setMenuOpen((previousState) => !previousState)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className={`relative z-50 rounded-full p-2 transition-colors focus:outline-none md:hidden ${
              menuOpen ? "text-white" : "text-[#1C2822]"
            }`}
          >
            {menuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* FONDO OPACADOR (MÓVIL) */}
      {menuOpen && (
        <button
          type="button"
          onClick={closeMenu}
          aria-label="Cerrar menú"
          className="fixed inset-0 z-40 bg-[#1C2822]/40 backdrop-blur-sm md:hidden"
        />
      )}
    </header>
  );
}

export default Navbar;
