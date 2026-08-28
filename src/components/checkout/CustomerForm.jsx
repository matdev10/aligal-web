import "./CustomerForm.css";

function CustomerForm({ customer, onChange }) {
  return (
    <section className="customer-form">
      <div className="customer-form__header">
        <span>Datos personales</span>

        <h2>Datos del cliente</h2>

        <p>
          Ingresa la información necesaria para procesar tu compra.
        </p>
      </div>

      <div className="customer-form__fields">
        <div className="customer-form__field">
          <label htmlFor="customer-name">
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
          />
        </div>

        <div className="customer-form__field">
          <label htmlFor="customer-email">
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
          />
        </div>

        <div className="customer-form__field">
          <label htmlFor="customer-phone">
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
          />
        </div>
      </div>
    </section>
  );
}

export default CustomerForm;