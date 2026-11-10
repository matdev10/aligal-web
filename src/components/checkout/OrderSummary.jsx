import { Loader2 } from "lucide-react";

import { eyebrow, formatCLP, glassCard } from "../ui/glass";

// NOTA: Ya no importamos "./OrderSummary.css"; todo es Tailwind.

const fallbackImage = "/images/product/img-producto.png";

function OrderSummary({
  cartItems,
  cartTotal,
  shippingQuote,
  shippingCost = 0,
  loadingShipping,
  shippingError,
  checkoutTotal,
}) {
  const hasShipping = Boolean(shippingQuote?.available);

  return (
    <aside className={glassCard}>
      <span className={eyebrow}>Pedido</span>
      <h2 className="mt-1 text-xl font-semibold">Resumen del pedido</h2>

      {/* Productos */}
      <ul className="mt-5 flex flex-col gap-3">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={item.image || fallbackImage}
                alt=""
                className="h-14 w-14 rounded-2xl object-cover"
              />
              <span className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-olive text-white px-1 text-[0.65rem] font-bold">
                {item.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <strong className="block truncate text-sm font-semibold">{item.name}</strong>
              <span className="text-xs text-ink/50">
                {item.quantity} × {formatCLP(item.price)}
              </span>
            </div>
            <strong className="text-sm tabular-nums">
              {formatCLP(item.price * item.quantity)}
            </strong>
          </li>
        ))}
      </ul>

      {/* Totales */}
      <dl className="mt-5 flex flex-col gap-3 border-t border-line pt-5 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink/60">Subtotal</dt>
          <dd className="font-semibold tabular-nums">{formatCLP(cartTotal)}</dd>
        </div>

        <div className="flex items-start justify-between gap-4">
          <dt className="text-ink/60">Despacho</dt>
          <dd className="text-right">
            {loadingShipping && (
              <span className="inline-flex items-center gap-1.5 text-ink/60">
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                Calculando...
              </span>
            )}

            {!loadingShipping && shippingError && (
              <span className="text-rose-700">{shippingError}</span>
            )}

            {!loadingShipping && !shippingError && hasShipping && (
              <>
                <small className="block text-xs text-ink/45">{shippingQuote.label}</small>
                <span
                  className={`font-semibold tabular-nums ${
                    Number(shippingCost) === 0 ? "text-emerald-800 " : ""
                  }`}
                >
                  {Number(shippingCost) === 0 ? "Gratis" : formatCLP(shippingCost)}
                </span>
              </>
            )}

            {!loadingShipping && !shippingError && !hasShipping && (
              <span className="text-ink/45">Pendiente</span>
            )}
          </dd>
        </div>
      </dl>

      {/* Total destacado */}
      <div className="mt-5 flex items-end justify-between border-t border-line pt-5">
        <span className="text-sm text-ink/60">{hasShipping ? "Total" : "Total parcial"}</span>
        <strong className="text-4xl font-light tracking-tight tabular-nums">
          {formatCLP(checkoutTotal)}
        </strong>
      </div>
    </aside>
  );
}

export default OrderSummary;
