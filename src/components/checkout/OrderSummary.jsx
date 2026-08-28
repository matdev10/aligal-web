import "./OrderSummary.css";

function OrderSummary({
  cartItems,
  cartTotal,
  shippingQuote,
  loadingShipping,
  shippingError,
  checkoutTotal,
}) {
  const shippingCost = shippingQuote?.available
    ? shippingQuote.cost
    : 0;

  const hasShipping = Boolean(
    shippingQuote?.available
  );

  return (
    <aside className="order-summary">
      <div className="order-summary__header">
        <span>Pedido</span>

        <h2>Resumen del pedido</h2>
      </div>

      <div className="order-summary__items">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="order-summary__item"
          >
            <strong>{item.name}</strong>

            <span>
              {item.quantity} × $
              {item.price.toLocaleString("es-CL")}
            </span>
          </div>
        ))}
      </div>

      <div className="order-summary__divider" />

      <div className="order-summary__row">
        <span>Subtotal</span>

        <strong>
          ${cartTotal.toLocaleString("es-CL")}
        </strong>
      </div>

      <div className="order-summary__shipping">
        <span className="order-summary__shipping-label">
          Despacho
        </span>

        {loadingShipping && (
          <strong className="order-summary__status">
            Calculando...
          </strong>
        )}

        {!loadingShipping &&
          shippingError && (
            <strong className="order-summary__status order-summary__status--error">
              {shippingError}
            </strong>
          )}

        {!loadingShipping &&
          !shippingError &&
          hasShipping && (
            <div className="order-summary__shipping-result">
              <small>
                {shippingQuote.label}
              </small>

              <strong>
                $
                {shippingCost.toLocaleString(
                  "es-CL"
                )}
              </strong>
            </div>
          )}

        {!loadingShipping &&
          !shippingError &&
          !hasShipping && (
            <strong className="order-summary__status">
              Pendiente
            </strong>
          )}
      </div>

      <div className="order-summary__divider" />

      <div className="order-summary__total">
        <span>
          {hasShipping
            ? "Total"
            : "Total parcial"}
        </span>

        <strong>
          $
          {checkoutTotal.toLocaleString(
            "es-CL"
          )}
        </strong>
      </div>
    </aside>
  );
}

export default OrderSummary;