import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

import CustomerForm from "../components/checkout/CustomerForm";
import ShippingForm from "../components/checkout/ShippingForm";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentMethods from "../components/checkout/PaymentMethods";

import { getShippingQuote } from "../services/shippingApiService";
import { buildOrderPayload } from "../services/checkoutService";
import { createPaymentPreference } from "../services/paymentApiService";
import {
  applyLaunchShippingPromotion,
  calculateCartCount,
  qualifiesForFreeShipping,
} from "../services/cart/cartService";

import { Link } from "react-router-dom";
import { ArrowRight, Loader2, Lock, ShoppingCart, Truck } from "lucide-react";

import { eyebrow, primaryButton } from "../components/ui/glass";

// NOTA: Ya no importamos "../style/pages/checkout.css"; todo es Tailwind.

function CheckoutPage() {
  const { cartItems = [], cartTotal = 0 } = useCart();

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

  const [paymentMethod, setPaymentMethod] = useState("mercado_pago");

  const [shippingQuote, setShippingQuote] = useState(null);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [shippingError, setShippingError] = useState("");

  const [processingOrder, setProcessingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");

  const unitCount = calculateCartCount(cartItems);
  const freeShipping = qualifiesForFreeShipping(cartItems);

  const quotedShippingCost = shippingQuote?.available ? Number(shippingQuote.cost) : 0;

  const shippingCost = applyLaunchShippingPromotion(quotedShippingCost, cartItems);

  const checkoutTotal = Number(cartTotal) + shippingCost;

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
        console.error("Error calculando envío:", error);

        setShippingQuote(null);
        setShippingError("No se pudo calcular el envío.");
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
      setOrderError("Debes ingresar el nombre del cliente.");
      return;
    }

    if (!customer.email.trim()) {
      setOrderError("Debes ingresar un correo electrónico.");
      return;
    }

    if (!customer.phone.trim()) {
      setOrderError("Debes ingresar un teléfono.");
      return;
    }

    if (!shipping.address.trim()) {
      setOrderError("Debes ingresar una dirección.");
      return;
    }

    if (!shipping.regionId) {
      setOrderError("Debes seleccionar una región.");
      return;
    }

    if (!shipping.provinceId) {
      setOrderError("Debes seleccionar una provincia.");
      return;
    }

    if (!shipping.communeId) {
      setOrderError("Debes seleccionar una comuna para calcular el despacho.");
      return;
    }

    if (loadingShipping) {
      setOrderError("Espera mientras terminamos de calcular el despacho.");
      return;
    }

    if (!shippingQuote?.available) {
      setOrderError("No se pudo calcular el despacho para esta dirección.");
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

      const response = await createPaymentPreference(orderData);

      const paymentUrl = response.initPoint;

      if (!paymentUrl) {
        throw new Error("Mercado Pago no devolvió una dirección para continuar el pago.");
      }

      window.location.assign(paymentUrl);
    } catch (error) {
      console.error("Error registrando pedido:", error);

      setOrderError(error instanceof Error ? error.message : "No fue posible registrar el pedido.");
    } finally {
      setProcessingOrder(false);
    }
  };

  /*
    Estado cuando el carrito está vacío.
  */
  if (cartItems.length === 0) {
    return (
      <main className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden px-4 pt-24 pb-16 text-ink">
        <section className="w-full max-w-md rounded-[2.5rem] border border-line bg-surface p-8 text-center backdrop-blur-md">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full border border-line bg-accent-soft text-accent">
            <ShoppingCart className="h-9 w-9" strokeWidth={1.7} aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-semibold">Tu carrito está vacío</h1>
          <p className="mt-3 text-sm font-light text-ink/65">
            Agrega un producto antes de continuar con el checkout.
          </p>
          <Link to="/producto" className={`${primaryButton} mt-7`}>
            Ver producto
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </main>
    );
  }

  const orderButtonDisabled = processingOrder || loadingShipping || !shippingQuote?.available;

  return (
    <main className="relative isolate min-h-[100svh] overflow-hidden text-ink">
      {/* NEBULOSAS */}

      <div className="mx-auto max-w-6xl px-4 pt-24 pb-16 md:px-8 md:pt-32">
        <header className="mb-8 max-w-2xl">
          <span className={`${eyebrow} inline-flex items-center gap-2`}>
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            Checkout seguro
          </span>
          <h1 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl">
            Finalizar <span className="font-semibold">pedido</span>
          </h1>
          <p className="mt-3 text-sm font-light leading-relaxed text-ink/65">
            Completa tus datos de contacto y dirección para calcular el despacho y continuar con el
            pago.
          </p>
        </header>

        {/* - Móvil: formularios → resumen → botón de pago
            - lg: formularios a la izquierda, resumen + pago fijos a la derecha */}
        <div className="grid gap-4 lg:grid-cols-[1fr_24rem] lg:items-start lg:gap-6">
          <div className="flex flex-col gap-4">
            <CustomerForm customer={customer} onChange={handleCustomerChange} />

            <ShippingForm shipping={shipping} onChange={handleShippingChange} />

            <PaymentMethods paymentMethod={paymentMethod} onChange={setPaymentMethod} />
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-28">
            {freeShipping ? (
              <p
                role="status"
                className="flex items-center gap-3 rounded-[1.5rem] border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800"
              >
                <Truck className="h-5 w-5 shrink-0" aria-hidden="true" />
                ¡Promoción de Lanzamiento: Envío gratis aplicado!
              </p>
            ) : unitCount === 1 ? (
              <p
                role="status"
                className="flex items-center gap-3 rounded-[1.5rem] border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-accent"
              >
                <Truck className="h-5 w-5 shrink-0" aria-hidden="true" />
                ¡Agrega 1 frasco más de Cerebria y tu envío a todo Chile será completamente GRATIS!
              </p>
            ) : null}

            <OrderSummary
              cartItems={cartItems}
              cartTotal={cartTotal}
              shippingQuote={shippingQuote}
              shippingCost={shippingCost}
              loadingShipping={loadingShipping}
              shippingError={shippingError}
              checkoutTotal={checkoutTotal}
            />

            {orderError && (
              <div
                role="alert"
                className="rounded-[1.5rem] border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700"
              >
                {orderError}
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmitOrder}
              disabled={orderButtonDisabled}
              className={`${primaryButton} h-14`}
            >
              {(processingOrder || loadingShipping) && (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              )}
              {processingOrder
                ? "Registrando pedido..."
                : loadingShipping
                  ? "Calculando despacho..."
                  : "Continuar con Mercado Pago"}
              {!processingOrder && !loadingShipping && (
                <Lock className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <p className="text-center text-xs text-ink/45">
              Al continuar, serás redirigido de forma segura a Mercado Pago para completar el pago.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;
