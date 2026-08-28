import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";

/* =========================================================
   ESTILOS GLOBALES
========================================================= */

import "./style/base/reset.css";
import "./style/base/variables.css";
import "./style/base/fonts.css";
import "./style/base/global.css";

/* =========================================================
   LAYOUT GLOBAL
========================================================= */

import "./style/layout/container.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);