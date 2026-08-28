import "./PaymentMethods.css";

function PaymentMethods({
  paymentMethod,
  onChange,
}) {
  return (
    <section className="payment-methods">

      <div className="payment-methods__header">
        <span>Pago</span>

        <h2>Método de pago</h2>

        <p>
          Selecciona cómo quieres pagar tu compra.
        </p>
      </div>

      <label className="payment-method-option">
        <input
          type="radio"
          name="paymentMethod"
          value="mercado_pago"
          checked={
            paymentMethod === "mercado_pago"
          }
          onChange={(event) =>
            onChange(event.target.value)
          }
        />

        <div className="payment-method-option__content">
          <strong>Mercado Pago</strong>

          <span>
            Paga de forma segura con tarjeta
            u otros medios disponibles.
          </span>
        </div>
      </label>

    </section>
  );
}

export default PaymentMethods;