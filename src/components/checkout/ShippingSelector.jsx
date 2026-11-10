import { SHIPPING_METHODS } from "../../services/checkoutService";
import { eyebrow, glassCard } from "../ui/glass";

// NOTA: Ya no importamos "./ShippingSelector.css"; todo es Tailwind.
// (Este componente no se usa actualmente en el checkout, pero queda migrado.)

function ShippingSelector({ shippingMethod, onChange }) {
  const methods = Object.values(SHIPPING_METHODS);

  return (
    <section className={glassCard}>
      <span className={eyebrow}>Entrega</span>
      <h2 className="mt-1 text-lg font-semibold md:text-xl">Método de entrega</h2>
      <p className="mt-0.5 text-xs font-light text-ink/55">
        Selecciona cómo quieres recibir tu pedido.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {methods.map((method) => {
          const checked = shippingMethod === method.id;

          return (
            <label
              key={method.id}
              className={`flex cursor-pointer items-center justify-between gap-4 rounded-[1.5rem] border p-4 transition ${
                checked
                  ? "border-accent/50 bg-accent-soft"
                  : "border-line bg-surface hover:bg-surface"
              }`}
            >
              <input
                type="radio"
                name="shippingMethod"
                value={method.id}
                checked={checked}
                onChange={(event) => onChange(event.target.value)}
                className="sr-only"
              />
              <strong className="text-sm font-semibold">{method.name}</strong>
              <span
                aria-hidden="true"
                className={`grid h-5 w-5 place-items-center rounded-full border-2 ${
                  checked ? "border-accent" : "border-ink/30"
                }`}
              >
                {checked && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

export default ShippingSelector;
