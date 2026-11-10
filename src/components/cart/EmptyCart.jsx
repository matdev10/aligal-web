import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";

import { eyebrow, primaryButton } from "../ui/glass";

function EmptyCart() {
  const navigate = useNavigate();

  return (
    <main className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden px-4 pt-24 pb-16 text-ink">
      <section className="w-full max-w-md rounded-[2.5rem] border border-line bg-surface p-8 text-center backdrop-blur-md">
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full border border-line bg-accent-soft text-accent">
          <ShoppingCart className="h-9 w-9" strokeWidth={1.7} aria-hidden="true" />
        </div>

        <span className={eyebrow}>Tu compra</span>
        <h1 className="mt-2 text-2xl font-semibold">Tu carrito está vacío</h1>
        <p className="mt-3 text-sm font-light leading-relaxed text-ink/65">
          Aún no has agregado productos. Conoce Cerebria® y comienza tu compra de forma rápida y
          segura.
        </p>

        <button
          type="button"
          onClick={() => navigate("/producto")}
          className={`${primaryButton} group mt-7`}
        >
          Ver producto
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </section>
    </main>
  );
}

export default EmptyCart;
