import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";

import { getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";

import Reviews from "../components/Reviews";

import "../style/pages/buyPage.css";
import SiteFooter from "../components/SiteFooter";

const productImage =
  "/images/product/img-producto.png";

const nutritionImage =
  "/images/product/Cerebria-Etiqueta_page-0001.jpg";


function BuyPage() {
  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showNutrition, setShowNutrition] =
    useState(false);

  const navigate = useNavigate();

  const {
    addToCart,
    openCart,
  } = useCart();


  /* =========================================================
     CARGA DEL PRODUCTO
  ========================================================= */

  const loadProduct = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const products =
          await getProducts();

        const activeProduct =
          products?.[0];

        if (!activeProduct) {
          throw new Error(
            "No se encontró el producto."
          );
        }

        setProduct(activeProduct);
        setQuantity(1);

      } catch (loadError) {
        console.error(
          "Error al cargar producto:",
          loadError
        );

        setError(
          "No pudimos cargar el producto. Revisa tu conexión e inténtalo nuevamente."
        );

      } finally {
        setLoading(false);
      }
    },
    []
  );


  useEffect(() => {
    loadProduct();
  }, [loadProduct]);


  /* =========================================================
     MODAL NUTRICIONAL
  ========================================================= */

  useEffect(() => {
    if (!showNutrition) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowNutrition(false);
      }
    };

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [showNutrition]);


  /* =========================================================
     PRODUCTO
  ========================================================= */

  const stock = Number(
    product?.stock ?? 0
  );

  const unitPrice = Number(
    product?.price ?? 0
  );

  const isOutOfStock =
    stock <= 0;

  const canIncreaseQuantity =
    !isOutOfStock &&
    quantity < stock;


  const increaseQuantity = () => {
    if (!canIncreaseQuantity) {
      return;
    }

    setQuantity(
      (currentQuantity) =>
        currentQuantity + 1
    );
  };


  const decreaseQuantity = () => {
    setQuantity(
      (currentQuantity) =>
        Math.max(
          1,
          currentQuantity - 1
        )
    );
  };


  /* =========================================================
     CARRITO
  ========================================================= */

  const handleAddToCart = () => {
    if (
      !product ||
      isOutOfStock
    ) {
      return;
    }

    addToCart(
      product,
      quantity
    );

    openCart();
  };


  const handleBuyNow = () => {
    if (
      !product ||
      isOutOfStock
    ) {
      return;
    }

    addToCart(
      product,
      quantity
    );

    navigate("/carrito");
  };


  /* =========================================================
     ESTADO DE CARGA
  ========================================================= */

  if (loading) {
    return (
      <main className="buy-status-page">

        <div
          className="buy-status-card"
          role="status"
          aria-live="polite"
        >

          <span
            className="buy-loader"
            aria-hidden="true"
          />

          <h1>
            Cargando Cerebria®
          </h1>

          <p>
            Estamos preparando la
            información del producto.
          </p>

        </div>

      </main>
    );
  }


  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !product) {
    return (
      <main className="buy-status-page">

        <div
          className="
            buy-status-card
            buy-status-card--error
          "
        >

          <span
            className="buy-status-icon"
            aria-hidden="true"
          >
            !
          </span>

          <h1>
            No pudimos cargar el producto
          </h1>

          <p>
            {error ||
              "El producto solicitado no se encuentra disponible."}
          </p>

          <button
            type="button"
            className="buy-retry-button"
            onClick={loadProduct}
          >
            Intentar nuevamente
          </button>

        </div>

      </main>
    );
  }


  const productName =
    product.name
      .replace(/®/g, "")
      .trim();


  return (
    <main className="buy-page">

      {/* =====================================================
          PRODUCTO
      ====================================================== */}

      <section
        className="
          buy-page__container
          container
        "
        id="producto"
      >

        {/* ===================================================
            VOLVER
        =================================================== */}

        <button
          type="button"
          className="buy-page__back"
          onClick={() =>
            navigate("/")
          }
        >
          <ArrowLeft
            aria-hidden="true"
          />

          <span>
            Volver al inicio
          </span>
        </button>


        {/* ===================================================
            PRODUCT CARD
        =================================================== */}

        <article className="buy-product">


          {/* =================================================
              VISUAL
          ================================================= */}

          <div className="buy-product__visual">

            <div
              className={`
                buy-product__badge
                ${
                  isOutOfStock
                    ? "buy-product__badge--empty"
                    : ""
                }
              `}
            >
              {isOutOfStock
                ? "Sin stock"
                : "Disponible"}
            </div>


            <div className="buy-product__image-wrapper">

              <img
                className="buy-product__image"
                src={productImage}
                alt={`Frasco de ${productName}`}
              />

            </div>


            <div className="buy-product__visual-footer">

              <span>
                <ShieldCheck
                  aria-hidden="true"
                />

                Compra protegida
              </span>

              <span>
                <Check
                  aria-hidden="true"
                />

                Pago seguro
              </span>

            </div>

          </div>


          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="buy-product__content">


            {/* ===============================================
                HEADER
            =============================================== */}

            <header className="buy-product__header">

              <span className="buy-product__eyebrow">
                Suplemento alimenticio
              </span>

              <h1>
                <span>
                  {productName}®
                </span>

                <small>
                  Jarabe 200 ml
                </small>
              </h1>

              <p className="buy-product__description">
                {product.description}
              </p>

            </header>


            {/* ===============================================
                PRECIO + STOCK
            =============================================== */}

            <div className="buy-product__price-row">

              <div className="buy-product__price-group">

                <span className="buy-product__price-label">
                  Precio unitario
                </span>

                <p className="buy-product__price">
                  $
                  {unitPrice.toLocaleString(
                    "es-CL"
                  )}
                </p>

              </div>


              <span
                className={`
                  buy-product__stock
                  ${
                    isOutOfStock
                      ? "buy-product__stock--empty"
                      : ""
                  }
                `}
              >
                {isOutOfStock
                  ? "Producto agotado"
                  : `${stock} unidades disponibles`}
              </span>

            </div>


            {/* ===============================================
                BENEFICIOS
            =============================================== */}

            <div className="buy-product__features">

              <div className="buy-product__feature">

                <span className="buy-product__feature-icon">
                  <Check
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <strong>
                    Formato práctico
                  </strong>

                  <p>
                    Frasco de 200 ml.
                  </p>
                </div>

              </div>


              <div className="buy-product__feature">

                <span className="buy-product__feature-icon">
                  <Check
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <strong>
                    Despacho disponible
                  </strong>

                  <p>
                    Entrega en Santiago
                    y envío a regiones.
                  </p>
                </div>

              </div>

            </div>


            {/* ===============================================
                COMPOSICIÓN
            =============================================== */}

            <section className="buy-product__details">

              <div className="buy-product__details-header">

                <div>
                  <span>
                    Composición
                  </span>

                  <h2>
                    Ingredientes principales
                  </h2>
                </div>


                <button
                  type="button"
                  className="buy-product__nutrition-button"
                  onClick={() =>
                    setShowNutrition(true)
                  }
                >
                  Ver información nutricional

                  <ExternalLink
                    aria-hidden="true"
                  />
                </button>

              </div>


              <ul className="buy-product__ingredients">

                <li>
                  Omega 3
                </li>

                <li>
                  Vitaminas esenciales
                </li>

                <li>
                  Minerales de apoyo nutricional
                </li>

                <li>
                  Formato líquido de fácil consumo
                </li>

                <li>
                  No contiene azúcar
                </li>

              </ul>

            </section>


            {/* ===============================================
                COMPRA
            =============================================== */}

            <section className="buy-product__purchase">

              <div className="buy-product__quantity-section">

                <div>
                  <span className="buy-product__quantity-label">
                    Cantidad
                  </span>

                  <p className="buy-product__quantity-help">
                    Selecciona cuántas unidades
                    deseas comprar.
                  </p>
                </div>


                <div
                  className="buy-product__quantity-control"
                  role="group"
                  aria-label="Selector de cantidad"
                >

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={
                      quantity === 1 ||
                      isOutOfStock
                    }
                    aria-label="Disminuir cantidad"
                  >
                    <Minus
                      aria-hidden="true"
                    />
                  </button>


                  <strong aria-live="polite">
                    {quantity}
                  </strong>


                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={
                      !canIncreaseQuantity ||
                      isOutOfStock
                    }
                    aria-label="Aumentar cantidad"
                  >
                    <Plus
                      aria-hidden="true"
                    />
                  </button>

                </div>

              </div>


              <p className="buy-product__checkout-note">
                El valor del despacho se calculará
                durante el checkout.
              </p>


              <div className="buy-product__actions">

                <button
                  type="button"
                  className="
                    buy-product__button
                    buy-product__button--secondary
                  "
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                >
                  <ShoppingCart
                    aria-hidden="true"
                  />

                  Agregar al carrito
                </button>


                <button
                  type="button"
                  className="
                    buy-product__button
                    buy-product__button--primary
                  "
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                >
                  Comprar ahora

                  <ArrowRight
                    aria-hidden="true"
                  />
                </button>

              </div>


              <div className="buy-product__security">

                <span className="buy-product__security-icon">
                  <ShieldCheck
                    aria-hidden="true"
                  />
                </span>

                <p>
                  Pago procesado de forma segura
                  mediante Mercado Pago.
                </p>

              </div>

            </section>

          </div>

        </article>

      </section>


      {/* =====================================================
          REVIEWS
      ====================================================== */}

      <Reviews />

      <SiteFooter />


      {/* =====================================================
          MODAL NUTRICIONAL
      ====================================================== */}

      {showNutrition && (

        <div
          className="buy-nutrition-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="buy-nutrition-title"
          onClick={() =>
            setShowNutrition(false)
          }
        >

          <div
            className="buy-nutrition-modal__panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <header className="buy-nutrition-modal__header">

              <div>
                <span>
                  Producto Cerebria®
                </span>

                <h2 id="buy-nutrition-title">
                  Información nutricional
                </h2>
              </div>


              <button
                type="button"
                className="buy-nutrition-modal__close"
                onClick={() =>
                  setShowNutrition(false)
                }
                aria-label="Cerrar información nutricional"
              >
                ×
              </button>

            </header>


            <img
              src={nutritionImage}
              alt="Tabla de información nutricional de Cerebria"
            />

          </div>

        </div>

      )}

    </main>
  );
}

export default BuyPage;