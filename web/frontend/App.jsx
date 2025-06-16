import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavMenu } from "@shopify/app-bridge-react";

import HomePage from "./pages/index.jsx";
import Page1 from "./pages/page1.jsx";
import { QueryProvider, PolarisProvider } from "./components";

export default function App() {
  const { t } = useTranslation();

  return (
    <PolarisProvider>
      <BrowserRouter>
        <QueryProvider>
          {/* Shopify App Navigation Menu */}
          <NavMenu>
            <a href="/" rel="home">
              Home
            </a>
            <a href="/Page1">Customize</a>
            <a href="/">Help</a>
          </NavMenu>

          {/* ✅ Routing configuration */}

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Page1" element={<Page1 />} />
          </Routes>

          {/* <Route path="/Page1" element={<Page1 />} /> */}
        </QueryProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
