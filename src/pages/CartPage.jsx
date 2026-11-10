import { useCart } from "../context/CartContext";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";
import { eyebrow } from "../components/ui/glass";

// NOTA: Ya no importamos "../style/pages/cart-page.css"; todo es Tailwind.

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    cartTotal,
    increaseItemQuantity,
    decreaseItemQuantity,
  } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="relative isolate min-h-[100svh] overflow-hidden text-ink">
      <section className="mx-auto max-w-6xl px-4 pt-24 pb-16 md:px-8 md:pt-32">
        <header className="mb-8 max-w-2xl">
          <span className={eyebrow}>Carrito</span>
          <h1 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl">
            Carrito de <span className="font-semibold">compras</span>
          </h1>
          <p className="mt-3 text-sm font-light leading-relaxed text-ink/65">
            Revisa tus productos antes de continuar al checkout. El despacho se calculará
            automáticamente según tu comuna en el siguiente paso.
          </p>
        </header>

        {/* - Móvil: productos y luego el resumen
            - lg: productos a la izquierda, resumen fijo a la derecha */}
        <div className="grid gap-4 lg:grid-cols-[1fr_22rem] lg:items-start lg:gap-6">
          <div className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={increaseItemQuantity}
                onDecrease={decreaseItemQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <CartSummary cartTotal={cartTotal} onClearCart={clearCart} />
        </div>
      </section>
    </main>
  );
}

export default CartPage;
