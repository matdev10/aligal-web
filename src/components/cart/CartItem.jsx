import { Minus, Plus, Trash2 } from "lucide-react";

import { circleButton, formatCLP } from "../ui/glass";

// NOTA: Ya no importamos "./CartItem.css"; todo es Tailwind.

const fallbackImage = "/images/product/img-producto.png";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const subtotal = item.price * item.quantity;
  const image = item.image || fallbackImage;

  return (
    <article className="flex gap-4 rounded-[2rem] border border-line bg-surface p-3 backdrop-blur-md sm:p-4">
      <img
        src={image}
        alt={item.name}
        className="h-24 w-24 shrink-0 rounded-[1.5rem] object-cover sm:h-28 sm:w-28"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = fallbackImage;
        }}
      />

      <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[0.6rem] uppercase tracking-widest text-accent">Producto</span>
            <h3 className="truncate font-semibold">{item.name}</h3>
            <p className="text-xs text-ink/50">{formatCLP(item.price)} c/u</p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label={`Eliminar ${item.name}`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink/40 transition hover:bg-rose-500/10 hover:text-rose-600"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-line bg-surface p-1">
            <button
              type="button"
              onClick={() => onDecrease(item.id)}
              disabled={item.quantity === 1}
              aria-label="Disminuir cantidad"
              className={circleButton}
            >
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <strong className="w-6 text-center text-sm tabular-nums">{item.quantity}</strong>

            <button
              type="button"
              onClick={() => onIncrease(item.id)}
              aria-label="Aumentar cantidad"
              className="grid h-9 w-9 place-items-center rounded-full bg-olive text-white transition hover:bg-olive-deep active:scale-95"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="text-right">
            <span className="block text-[0.65rem] text-ink/45">Subtotal</span>
            <strong className="text-lg font-semibold tabular-nums">{formatCLP(subtotal)}</strong>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
