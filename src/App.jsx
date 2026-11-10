import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import Contact from "./components/Contact";
import WhatsAppButton from "./components/WhatsAppButton";
import Lifestyle from "./components/Lifestyle";

import WellnessArticlePage from "./pages/WellnessArticlePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import CartDrawer from "./components/cart/CartDrawer";

import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentPendingPage from "./pages/PaymentPendingPage";
import PaymentFailurePage from "./pages/PaymentFailurePage";

import AnimatedTitle from "./components/AnimatedTitle";
import SiteFooter from "./components/SiteFooter";

import ScrollToTop from "./components/ScrollToTop";

function LandingPage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Lifestyle />
      <Contact />
      <SiteFooter />
    </>
  );
}


function App() {
  return (
    <>
      <AnimatedTitle />

      <Navbar />
      <CartDrawer />
      <WhatsAppButton />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/bienestar/mente-activa"
          element={<WellnessArticlePage />}
        />

        <Route path="/producto" element={<ProductPage />} />
        {/* /comprar quedó unificada con la nueva página de producto */}
        <Route path="/comprar" element={<Navigate to="/producto" replace />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route
          path="/politica-de-privacidad"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/pago/exitoso"
          element={<PaymentSuccessPage />}
        />

        <Route
          path="/pago/pendiente"
          element={<PaymentPendingPage />}
        />

        <Route
          path="/pago/error"
          element={<PaymentFailurePage />}
        />
      </Routes>

      <ScrollToTop/>
    </>
  );
}


export default App;
