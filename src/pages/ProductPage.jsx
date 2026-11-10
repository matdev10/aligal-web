import Product from "../components/Product";
import Reviews from "../components/Reviews";
import SiteFooter from "../components/SiteFooter";

// Página única de producto y compra (/producto; /comprar redirige aquí).
// Incluye las reseñas y el footer que antes estaban en BuyPage.

function ProductPage() {
  return (
    <>
      <Product />
      <Reviews />
      <SiteFooter />
    </>
  );
}

export default ProductPage;
