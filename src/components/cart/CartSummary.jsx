import { useNavigate } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";

import { eyebrow, formatCLP, glassCard, primaryButton } from "../ui/glass";

// NOTA: Ya no importamos "./CartSummary.css"; todo es Tailwind.

function CartSummary({ cartTotal = 0, onClearCart }) {
  const navigate = useNavigate();

  return (
    <aside className={`${glassCard} lg:sticky lg:top-28`}>
      <span className={eyebrow}>Resumen</span>
      <h2 className="mt-1 text-xl font-semibold">Tu pedido</h2>

      <div className="mt-5 flex items-end justify-between border-t border-line pt-5">
        <span className="text-sm text-ink/60">Subtotal</span>
        <strong className="text-4xl font-light tracking-tight tabular-nums">
          {formatCLP(cartTotal)}
        </strong>
      </div>

      <p className="mt-4 flex gap-2 rounded-2xl border border-line bg-surface p-3 text-xs leading-relaxed text-ink/60">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        El despacho se calculará automáticamente en el checkout según tu región, provincia y comuna.
      </p>

      <button
        type="button"
        onClick={() => navigate("/checkout")}
        className={`${primaryButton} group mt-5`}
      >
        Ir al checkout
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </button>

      <button
        type="button"
        onClick={onClearCart}
        className="mt-3 w-full rounded-full py-2 text-xs text-ink/45 transition hover:text-rose-600"
      >
        Vaciar carrito
      </button>
    </aside>
  );
}

export default CartSummary;
