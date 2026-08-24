import { Routes, Route } from "react-router-dom";

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
import BuyPage from "./pages/BuyPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import CartDrawer from "./components/cart/CartDrawer";

import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentPendingPage from "./pages/PaymentPendingPage";
import PaymentFailurePage from "./pages/PaymentFailurePage";

import AnimatedTitle from "./components/AnimatedTitle";
import SiteFooter from "./components/SiteFooter";


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
        <Route path="/comprar" element={<BuyPage />} />
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
    </>
  );
}


export default App;