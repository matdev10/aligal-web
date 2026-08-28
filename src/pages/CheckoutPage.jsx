import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

import CustomerForm from "../components/checkout/CustomerForm";
import ShippingForm from "../components/checkout/ShippingForm";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentMethods from "../components/checkout/PaymentMethods";

import { getShippingQuote } from "../services/shippingApiService";
import { buildOrderPayload } from "../services/checkoutService";
import { createPaymentPreference } from "../services/paymentApiService";

import "../style/pages/checkout.css";

function CheckoutPage() {
  const {
    cartItems = [],
    cartTotal = 0,
  } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [shipping, setShipping] = useState({
    address: "",
    countryIso: "CL",
    regionId: "",
    provinceId: "",
    communeId: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("mercado_pago");

  const [shippingQuote, setShippingQuote] = useState(null);
  const [loadingShipping, setLoadingShipping] =
    useState(false);
  const [shippingError, setShippingError] = useState("");

  const [processingOrder, setProcessingOrder] =
    useState(false);
  const [orderError, setOrderError] = useState("");

  const shippingCost = shippingQuote?.available
    ? Number(shippingQuote.cost)
    : 0;

  const checkoutTotal =
    Number(cartTotal) + shippingCost;

  /*
    Lleva el checkout al comienzo cuando se abre la ruta.
  */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  /*
    Calcula el despacho cuando el usuario selecciona
    una comuna.
  */
  useEffect(() => {
    const loadShippingQuote = async () => {
      if (!shipping.communeId) {
        setShippingQuote(null);
        setShippingError("");
        return;
      }

      try {
        setLoadingShipping(true);
        setShippingError("");
        setOrderError("");

        const quote = await getShippingQuote({
          communeId: shipping.communeId,
        });

        setShippingQuote(quote);
      } catch (error) {
        console.error(
          "Error calculando envío:",
          error
        );

        setShippingQuote(null);
        setShippingError(
          "No se pudo calcular el envío."
        );
      } finally {
        setLoadingShipping(false);
      }
    };

    loadShippingQuote();
  }, [shipping.communeId]);

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((previousCustomer) => ({
      ...previousCustomer,
      [name]: value,
    }));

    setOrderError("");
  };

  const handleShippingChange = (event) => {
    const { name, value } = event.target;

    setOrderError("");

    setShipping((previousShipping) => {
      if (name === "regionId") {
        return {
          ...previousShipping,
          regionId: value,
          provinceId: "",
          communeId: "",
        };
      }

      if (name === "provinceId") {
        return {
          ...previousShipping,
          provinceId: value,
          communeId: "",
        };
      }

      return {
        ...previousShipping,
        [name]: value,
      };
    });
  };

  const handleSubmitOrder = async () => {
    if (processingOrder) {
      return;
    }

    if (!customer.name.trim()) {
      setOrderError(
        "Debes ingresar el nombre del cliente."
      );
      return;
    }

    if (!customer.email.trim()) {
      setOrderError(
        "Debes ingresar un correo electrónico."
      );
      return;
    }

    if (!customer.phone.trim()) {
      setOrderError(
        "Debes ingresar un teléfono."
      );
      return;
    }

    if (!shipping.address.trim()) {
      setOrderError(
        "Debes ingresar una dirección."
      );
      return;
    }

    if (!shipping.regionId) {
      setOrderError(
        "Debes seleccionar una región."
      );
      return;
    }

    if (!shipping.provinceId) {
      setOrderError(
        "Debes seleccionar una provincia."
      );
      return;
    }

    if (!shipping.communeId) {
      setOrderError(
        "Debes seleccionar una comuna para calcular el despacho."
      );
      return;
    }

    if (loadingShipping) {
      setOrderError(
        "Espera mientras terminamos de calcular el despacho."
      );
      return;
    }

    if (!shippingQuote?.available) {
      setOrderError(
        "No se pudo calcular el despacho para esta dirección."
      );
      return;
    }

    try {
      setProcessingOrder(true);
      setOrderError("");

      const orderData = buildOrderPayload({
        customer,
        shippingAddress: shipping,
        shippingQuote,
        paymentMethod,
        cartItems,
      });

      const response =
        await createPaymentPreference(orderData);

      const paymentUrl = response.initPoint;

      if (!paymentUrl) {
        throw new Error(
          "Mercado Pago no devolvió una dirección para continuar el pago."
        );
      }

      window.location.assign(paymentUrl);
    } catch (error) {
      console.error(
        "Error registrando pedido:",
        error
      );

      setOrderError(
        error instanceof Error
          ? error.message
          : "No fue posible registrar el pedido."
      );
    } finally {
      setProcessingOrder(false);
    }
  };

/*
  Estado cuando el carrito está vacío.
*/
if (cartItems.length === 0) {
  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <section className="checkout-empty">
          <h1 className="checkout-title">
            Tu carrito está vacío
          </h1>

          <p>
            Agrega un producto antes de continuar con el checkout.
          </p>

          <a
            href="/comprar"
            className="checkout-empty__button"
          >
            Ver producto
          </a>
        </section>
      </div>
    </main>
  );
}

const orderButtonDisabled =
  processingOrder ||
  loadingShipping ||
  !shippingQuote?.available;

return (
  <main className="checkout-page">
    <div className="checkout-container">
      <header className="checkout-header">
        <h1 className="checkout-title">
          Finalizar pedido
        </h1>

        <p className="checkout-subtitle">
          Completa tus datos de contacto y dirección
          para calcular el despacho y continuar con el
          pago.
        </p>
      </header>

      <div className="checkout-layout">

        {/* Columna de formularios */}
        <div className="checkout-form-column">

          <CustomerForm
            customer={customer}
            onChange={handleCustomerChange}
          />

          <ShippingForm
            shipping={shipping}
            onChange={handleShippingChange}
          />

          <PaymentMethods
            paymentMethod={paymentMethod}
            onChange={setPaymentMethod}
          />

          {orderError && (
            <div
              className="checkout-error"
              role="alert"
            >
              {orderError}
            </div>
          )}

          <button
            type="button"
            className="checkout-submit"
            onClick={handleSubmitOrder}
            disabled={orderButtonDisabled}
          >
            {processingOrder
              ? "Registrando pedido..."
              : loadingShipping
                ? "Calculando despacho..."
                : "Continuar con Mercado Pago"}
          </button>

          <p className="checkout-payment-note">
            Al continuar, serás redirigido de forma
            segura a Mercado Pago para completar el
            pago.
          </p>

        </div>

        {/* Columna del resumen */}
        <aside className="checkout-summary-column">
          <OrderSummary
            cartItems={cartItems}
            cartTotal={cartTotal}
            shippingQuote={shippingQuote}
            loadingShipping={loadingShipping}
            shippingError={shippingError}
            checkoutTotal={checkoutTotal}
          />
        </aside>

      </div>
    </div>
  </main>
);
}

export default CheckoutPage;