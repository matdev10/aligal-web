import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Trash2, Truck, X } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { FREE_SHIPPING_MIN_QUANTITY } from "../../services/cart/cartService";
import { circleButton, formatCLP, primaryButton, secondaryButton } from "../ui/glass";

// NOTA: Ya no importamos "./CartDrawer.css"; todo es Tailwind.

const fallbackImage = "/images/product/img-producto.png";

function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    cartTotal,
    cartCount,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  // Bloquea el scroll de la página y permite cerrar con Escape
  useEffect(() => {
    if (!isCartOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeCart();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  const goTo = (path) => {
    closeCart();
    navigate(path);
  };

  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_MIN_QUANTITY - cartCount);
  const shippingProgress = Math.min(100, (cartCount / FREE_SHIPPING_MIN_QUANTITY) * 100);

  return (
    <>
      {/* FONDO OSCURO */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* PANEL
          - Móvil: ocupa todo el ancho
          - sm+: panel lateral de 26rem */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mi carrito"
        inert={!isCartOpen}
        className={`fixed top-0 right-0 bottom-0 z-[70] flex w-full flex-col border-l border-line bg-panel/95 text-ink shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out sm:w-[26rem] sm:rounded-l-[2rem] ${
          isCartOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        {/* Brillo */}

        {/* CABECERA */}
        <header className="relative flex items-center justify-between px-5 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent">
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold leading-tight">Mi carrito</h2>
              <p className="text-xs text-ink/50">
                {cartCount} {cartCount === 1 ? "producto" : "productos"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className={`${circleButton} h-10 w-10`}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        {/* BARRA DE DESPACHO GRATIS */}
        {cartItems.length > 0 && (
          <div className="relative mx-5 mb-2 rounded-2xl border border-line bg-surface p-3">
            <p className="flex items-center gap-2 text-xs text-ink/75">
              <Truck className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {missingForFreeShipping > 0
                ? `Agrega ${missingForFreeShipping} más y el despacho es gratis.`
                : "¡Tienes despacho gratis!"}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-strong">
              <div
                className="h-full rounded-full bg-olive text-white transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* PRODUCTOS */}
        <div className="relative flex-1 overflow-y-auto px-5 py-3">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="mb-4 grid h-16 w-16 place-items-center rounded-full border border-line bg-surface text-ink/50">
                <ShoppingCart className="h-7 w-7" aria-hidden="true" />
              </span>
              <p className="font-medium">Tu carrito está vacío</p>
              <p className="mt-1 text-sm text-ink/50">Agrega Cerebria® para comenzar.</p>
              <button
                type="button"
                onClick={() => goTo("/producto")}
                className={`${primaryButton} mt-6 w-auto`}
              >
                Ver producto
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-[1.5rem] border border-line bg-surface p-3"
                >
                  <img
                    src={item.image || fallbackImage}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = fallbackImage;
                    }}
                  />

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="truncate text-sm font-semibold">{item.name}</h3>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Eliminar ${item.name}`}
                        className="shrink-0 text-ink/40 transition hover:text-rose-600"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decreaseItemQuantity(item.id)}
                          disabled={item.quantity <= 1}
                          aria-label="Disminuir cantidad"
                          className={circleButton}
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseItemQuantity(item.id)}
                          aria-label="Aumentar cantidad"
                          className="grid h-9 w-9 place-items-center rounded-full bg-olive text-white transition hover:bg-olive-deep active:scale-95"
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <strong className="text-sm font-semibold tabular-nums">
                        {formatCLP(item.price * item.quantity)}
                      </strong>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* PIE */}
        {cartItems.length > 0 && (
          <footer className="relative border-t border-line px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="mb-4 flex items-end justify-between">
              <span className="text-sm text-ink/60">Subtotal</span>
              <strong className="text-3xl font-light tracking-tight tabular-nums">
                {formatCLP(cartTotal)}
              </strong>
            </div>

            <div className="flex flex-col gap-2">
              <button type="button" onClick={() => goTo("/checkout")} className={primaryButton}>
                Finalizar compra
              </button>
              <button type="button" onClick={() => goTo("/carrito")} className={secondaryButton}>
                Ver carrito
              </button>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
