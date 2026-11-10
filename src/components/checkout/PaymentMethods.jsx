import { CreditCard, ShieldCheck } from "lucide-react";

import { glassCard } from "../ui/glass";
import SectionHeader from "./SectionHeader";

// NOTA: Ya no importamos "./PaymentMethods.css"; todo es Tailwind.

function PaymentMethods({ paymentMethod, onChange }) {
  const checked = paymentMethod === "mercado_pago";

  return (
    <section className={glassCard}>
      <SectionHeader
        step={3}
        label="Pago"
        title="Método de pago"
        text="Selecciona cómo quieres pagar tu compra."
        Icon={CreditCard}
      />

      {/* Opción tipo tarjeta: el radio real queda oculto (sr-only) pero accesible */}
      <label
        className={`flex cursor-pointer items-center gap-4 rounded-[1.5rem] border p-4 transition ${
          checked
            ? "border-accent/50 bg-accent-soft ring-2 ring-accent/20"
            : "border-line bg-surface hover:bg-surface"
        }`}
      >
        <input
          type="radio"
          name="paymentMethod"
          value="mercado_pago"
          checked={checked}
          onChange={(event) => onChange(event.target.value)}
          className="peer sr-only"
        />

        <span className="flex h-11 shrink-0 items-center rounded-xl bg-white px-2">
          <img src="/images/payments/mercado-pago.svg" alt="" className="h-7 w-auto" />
        </span>

        <span className="min-w-0 flex-1">
          <strong className="block text-sm font-semibold">Mercado Pago</strong>
          <span className="block text-xs font-light text-ink/55">
            Paga de forma segura con tarjeta u otros medios disponibles.
          </span>
        </span>

        {/* Indicador circular de selección */}
        <span
          aria-hidden="true"
          className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition peer-focus-visible:ring-2 peer-focus-visible:ring-accent ${
            checked ? "border-accent" : "border-ink/30"
          }`}
        >
          {checked && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
        </span>
      </label>

      <p className="mt-3 flex items-center gap-2 text-xs text-ink/45">
        <ShieldCheck className="h-4 w-4 text-emerald-800" aria-hidden="true" />
        Pago procesado de forma segura por Mercado Pago.
      </p>
    </section>
  );
}

export default PaymentMethods;
