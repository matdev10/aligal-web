import { User } from "lucide-react";

import { glassCard, inputClass, labelClass } from "../ui/glass";
import SectionHeader from "./SectionHeader";

// NOTA: Ya no importamos "./CustomerForm.css"; todo es Tailwind.

function CustomerForm({ customer, onChange }) {
  return (
    <section className={glassCard}>
      <SectionHeader
        step={1}
        label="Datos personales"
        title="Datos del cliente"
        text="Ingresa la información necesaria para procesar tu compra."
        Icon={User}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="customer-name" className={labelClass}>
            Nombre completo
          </label>
          <input
            id="customer-name"
            type="text"
            name="name"
            placeholder="Ej: Matías González"
            value={customer.name}
            onChange={onChange}
            autoComplete="name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="customer-email" className={labelClass}>
            Correo electrónico
          </label>
          <input
            id="customer-email"
            type="email"
            name="email"
            placeholder="correo@ejemplo.cl"
            value={customer.email}
            onChange={onChange}
            autoComplete="email"
            inputMode="email"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="customer-phone" className={labelClass}>
            Teléfono
          </label>
          <input
            id="customer-phone"
            type="tel"
            name="phone"
            placeholder="+56 9 1234 5678"
            value={customer.phone}
            onChange={onChange}
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
          />
        </div>
      </div>
    </section>
  );
}

export default CustomerForm;
