import { SHIPPING_METHODS } from "../../services/checkoutService";

import "./ShippingSelector.css";

function ShippingSelector({
  shippingMethod,
  onChange,
}) {
  const methods = Object.values(
    SHIPPING_METHODS
  );

  return (
    <section className="shipping-selector">

      <div className="shipping-selector__header">
        <span>Entrega</span>

        <h2>Método de entrega</h2>

        <p>
          Selecciona cómo quieres recibir tu pedido.
        </p>
      </div>

      <div className="shipping-selector__options">
        {methods.map((method) => (
          <label
            key={method.id}
            className="shipping-selector__option"
          >
            <input
              type="radio"
              name="shippingMethod"
              value={method.id}
              checked={
                shippingMethod === method.id
              }
              onChange={(event) =>
                onChange(event.target.value)
              }
            />

            <div className="shipping-selector__option-content">
              <strong>
                {method.name}
              </strong>
            </div>
          </label>
        ))}
      </div>

    </section>
  );
}

export default ShippingSelector;