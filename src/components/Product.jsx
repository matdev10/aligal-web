import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ChevronsRight,
  Info,
  Minus,
  Plus,
  RotateCcw,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";

import { getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import { FREE_SHIPPING_MIN_QUANTITY } from "../services/cart/cartService";

// NOTA: Ya no importamos "../style/components/product.css";
// todo el estilo vive en las clases de Tailwind.

const productImage = "/images/product/img-producto.png";
const nutritionImage = "/images/product/Cerebria-Etiqueta_page-0001.jpg";

const ingredients = [
  "Omega 3",
  "Vitaminas esenciales",
  "Minerales de apoyo nutricional",
  "Formato líquido de fácil consumo",
  "No contiene azúcar",
];

const presentation = [
  { label: "Contenido", value: "200 ml" },
  { label: "Formato", value: "Jarabe líquido" },
  { label: "Uso", value: "Rutina diaria" },
  { label: "Dirigido a", value: "Adultos" },
];

const formatCLP = (value) => `$${Number(value || 0).toLocaleString("es-CL")}`;

// Botón circular de cristal (volver, info, +/-)
const glassCircle =
  "grid place-items-center rounded-full border border-line bg-surface-strong text-ink backdrop-blur-md transition hover:bg-surface-strong active:scale-95 disabled:cursor-not-allowed disabled:opacity-40";

function Product() {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  /* ---------- Carga del producto (misma API que BuyPage) ---------- */
  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const products = await getProducts();
      const activeProduct = products?.[0];

      if (!activeProduct) {
        throw new Error("No se encontró el producto.");
      }

      setProduct(activeProduct);
      setQuantity(1);
    } catch (loadError) {
      console.error("Error al cargar producto:", loadError);
      setError("No pudimos cargar el producto. Revisa tu conexión e inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    loadProduct();
  }, [loadProduct]);

  /* ---------- Modal nutricional ---------- */
  useEffect(() => {
    if (!showNutrition) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowNutrition(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showNutrition]);

  /* ---------- Feedback "Agregado" ---------- */
  useEffect(() => {
    if (!justAdded) {
      return undefined;
    }

    const timeoutId = setTimeout(() => setJustAdded(false), 2000);
    return () => clearTimeout(timeoutId);
  }, [justAdded]);

  /* ---------- Cantidad, stock y precio ---------- */
  const stock = Number(product?.stock ?? 0);
  const unitPrice = Number(product?.price ?? 0);
  const isOutOfStock = !loading && stock <= 0;
  const canIncrease = !isOutOfStock && quantity < stock;
  const totalPrice = unitPrice * quantity;
  const hasFreeShipping = quantity >= FREE_SHIPPING_MIN_QUANTITY;

  const productName = product?.name?.replace(/®/g, "").trim() || "Cerebria";

  const increase = () => canIncrease && setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    if (!product || isOutOfStock) {
      return;
    }

    addToCart(product, quantity);
    setJustAdded(true);
    openCart();
  };

  const goBack = () => {
    // Si llegó desde otra página del sitio vuelve atrás; si entró directo, al inicio
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <main className="relative isolate min-h-screen w-full overflow-x-hidden bg-page text-ink">
      {/* NEBULOSAS */}

      <div className="mx-auto max-w-6xl md:grid md:grid-cols-2 md:items-start md:gap-10 md:px-8 md:pt-28 md:pb-16">
        {/* =========================================================
            IMAGEN DEL PRODUCTO
            - Móvil: ocupa la mitad superior a sangre completa
            - md: tarjeta redondeada fija a la izquierda
        ========================================================= */}
        <div className="relative h-[58svh] min-h-[380px] overflow-hidden md:sticky md:top-28 md:h-[calc(100svh-9rem)] md:max-h-[720px] md:rounded-[2.5rem] md:border md:border-line">
          <img
            src={productImage}
            alt="Frasco de Cerebria, jarabe líquido de 200 ml"
            className="h-full w-full scale-110 object-cover object-[56%_45%] md:scale-100"
          />

          {/* Tinte cósmico sobre la foto + fundido hacia el fondo oscuro */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#F0F4F2]/50 via-transparent to-[#F0F4F2] md:hidden"
          />

          {/* Barra superior: volver · título · info nutricional */}
          <div className="absolute inset-x-0 top-20 flex items-center justify-between px-4 md:top-5 md:px-5">
            <button
              type="button"
              onClick={goBack}
              aria-label="Volver"
              className={`${glassCircle} h-11 w-11`}
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <span className="rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-md">
              Detalle del producto
            </span>

            <button
              type="button"
              onClick={() => setShowNutrition(true)}
              aria-label="Ver información nutricional"
              className={`${glassCircle} h-11 w-11`}
            >
              <Info className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Chips flotantes sobre la imagen */}
          <span className="absolute top-[38%] left-4 rounded-full border border-line bg-surface-strong px-3 py-1.5 text-[0.7rem] font-medium backdrop-blur-md md:left-5">
            Omega 3
          </span>
          <span className="absolute top-[52%] right-4 rounded-full border border-line bg-surface-strong px-3 py-1.5 text-[0.7rem] font-medium backdrop-blur-md md:right-5">
            Sin azúcar
          </span>
        </div>

        {/* =========================================================
            TARJETA DE COMPRA
            - Móvil: sube sobre la imagen con margen negativo
            - md: columna derecha normal
        ========================================================= */}
        <div className="relative z-10 -mt-28 px-4 md:mt-0 md:px-0">
          <section
            aria-labelledby="product-title"
            className="rounded-[2.5rem] border border-line bg-surface p-6 shadow-[0_-12px_40px_rgba(28,40,34,0.12)] backdrop-blur-md md:p-8"
          >
            {/* Asa decorativa tipo "bottom sheet" (solo móvil) */}
            <div
              aria-hidden="true"
              className="mx-auto mb-5 h-1 w-10 rounded-full bg-ink/15 md:hidden"
            />

            {/* Título y detalles */}
            <div className="text-center md:text-left">
              <h1
                id="product-title"
                className="font-['Neuropol'] text-3xl leading-none tracking-wide text-olive sm:text-4xl"
              >
                {productName}
                <sup className="ml-1 align-super font-sans text-[0.45em]">®</sup>
              </h1>
              <p className="mt-2 text-sm font-light text-ink/60">Jarabe líquido · 200 ml</p>

              {/* Estado de stock */}
              <div className="mt-3 flex justify-center md:justify-start">
                {loading ? (
                  <span className="h-6 w-32 animate-pulse rounded-full bg-surface-strong" />
                ) : (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.7rem] font-medium ${
                      isOutOfStock
                        ? "border-rose-400/30 bg-rose-500/10 text-rose-700 "
                        : "border-emerald-400/30 bg-emerald-500/10 text-emerald-800 "
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${isOutOfStock ? "bg-rose-400" : "bg-emerald-400"}`}
                    />
                    {isOutOfStock ? "Sin stock" : `${stock} unidades disponibles`}
                  </span>
                )}
              </div>
            </div>

            {error ? (
              /* Error de carga */
              <div className="mt-6 rounded-[1.75rem] border border-rose-400/30 bg-rose-500/10 p-5 text-center">
                <p className="text-sm text-rose-700">{error}</p>
                <button
                  type="button"
                  onClick={loadProduct}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface-strong px-5 text-sm font-medium transition hover:bg-surface-strong"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Reintentar
                </button>
              </div>
            ) : (
              <>
                {/* Selector de cantidad */}
                <div className="mt-6 flex justify-center md:justify-start">
                  <div
                    role="group"
                    aria-label="Cantidad"
                    className="flex items-center gap-2 rounded-full border border-line bg-surface p-1.5"
                  >
                    <button
                      type="button"
                      onClick={decrease}
                      disabled={quantity <= 1 || loading}
                      aria-label="Disminuir cantidad"
                      className={`${glassCircle} h-11 w-11`}
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>

                    <span
                      aria-live="polite"
                      className="min-w-10 text-center text-lg font-semibold tabular-nums"
                    >
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increase}
                      disabled={!canIncrease || loading}
                      aria-label="Aumentar cantidad"
                      className="grid h-11 w-11 place-items-center rounded-full bg-olive text-white transition hover:bg-olive-deep active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Precio destacado */}
                <div className="mt-6 text-center md:text-left">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/50">
                    Precio total
                  </span>

                  {loading ? (
                    <div className="mx-auto mt-2 h-12 w-48 animate-pulse rounded-2xl bg-surface-strong md:mx-0" />
                  ) : (
                    <p className="mt-1 text-5xl font-light tracking-tight tabular-nums sm:text-6xl">
                      {formatCLP(totalPrice)}
                    </p>
                  )}

                  {!loading && quantity > 1 && (
                    <p className="mt-1 text-xs text-ink/50">{formatCLP(unitPrice)} c/u</p>
                  )}
                </div>

                {/* Aviso de despacho gratis (promoción del carrito) */}
                <div
                  className={`mt-5 flex items-center gap-3 rounded-2xl border px-4 py-3 text-xs transition ${
                    hasFreeShipping
                      ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-800 "
                      : "border-line bg-surface text-ink/65"
                  }`}
                >
                  <Truck className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {hasFreeShipping
                    ? "¡Tu pedido tiene despacho gratis!"
                    : `Lleva ${FREE_SHIPPING_MIN_QUANTITY} o más y el despacho es gratis.`}
                </div>

                {/* Botón añadir al carrito (ancho completo) */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={loading || isOutOfStock || !product}
                  className="group mt-6 flex h-16 w-full items-center gap-3 rounded-full bg-olive text-white hover:bg-olive-deep p-2 pr-5 text-left font-semibold shadow-[0_10px_25px_rgba(28,40,34,0.18)] transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15 transition group-hover:bg-white/25">
                    {justAdded ? (
                      <Check className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>

                  <span className="flex-1 text-sm">
                    {isOutOfStock
                      ? "Sin stock por ahora"
                      : justAdded
                        ? "¡Agregado al carrito!"
                        : "Añadir al carrito"}
                  </span>

                  <ChevronsRight
                    className="h-5 w-5 text-white/60 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </>
            )}
          </section>

          {/* =========================================================
 DETALLES (debajo de la tarjeta)
 ========================================================= */}
          <div className="mt-4 grid gap-4 pb-16 md:pb-0">
            <article className="rounded-[2rem] border border-line bg-surface p-5 backdrop-blur-md md:p-6">
              <h2 className="mb-4 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-accent">
                Ingredientes principales
              </h2>
              <ul className="flex flex-col gap-3">
                {ingredients.map((ingredient) => (
                  <li key={ingredient} className="flex items-center gap-3 text-sm text-ink/80">
                    <span
                      aria-hidden="true"
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent"
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[2rem] border border-line bg-surface p-5 backdrop-blur-md md:p-6">
              <h2 className="mb-4 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-accent">
                Presentación
              </h2>
              <dl className="grid grid-cols-2 gap-3">
                {presentation.map(({ label, value }) => (
                  <div key={label} className="rounded-2xl border border-line bg-surface px-4 py-3">
                    <dt className="text-[0.65rem] uppercase tracking-widest text-ink/45">
                      {label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                onClick={() => setShowNutrition(true)}
                className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-medium transition hover:bg-surface-strong"
              >
                <Info className="h-4 w-4" aria-hidden="true" />
                Ver información nutricional
              </button>
            </article>
          </div>
        </div>
      </div>

      {/* MODAL DE INFORMACIÓN NUTRICIONAL
 - Móvil: hoja que sube desde abajo
 - md: ventana centrada */}
      {showNutrition && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="nutrition-modal-title"
          onClick={() => setShowNutrition(false)}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm md:items-center md:p-6"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90svh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] border border-line bg-panel p-5 md:rounded-[2rem] md:p-6"
          >
            <header className="mb-4 flex items-start justify-between gap-4">
              <div>
                <span className="text-[0.65rem] uppercase tracking-widest text-accent">
                  Producto Cerebria®
                </span>
                <h2 id="nutrition-modal-title" className="text-xl font-semibold">
                  Información nutricional
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowNutrition(false)}
                aria-label="Cerrar información nutricional"
                className={`${glassCircle} h-10 w-10 shrink-0`}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            {/* La etiqueta conserva su fondo blanco para que se lea bien */}
            <img
              src={nutritionImage}
              alt="Tabla de información nutricional de Cerebria"
              className="w-full rounded-2xl bg-white"
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default Product;
