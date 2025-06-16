import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavMenu } from "@shopify/app-bridge-react";
import Page1 from "./pages/page1";
import { QueryProvider, PolarisProvider } from "./components";

export default function App() {
  // Auto-import all .jsx or .tsx files in /pages except test files
  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
    eager: true,
  });

  const { t } = useTranslation();

  return (
    <PolarisProvider>
      <BrowserRouter>
        <QueryProvider>
          {/* Shopify App Navigation Menu */}
          <NavMenu>
            {/* These links are only used for App Bridge navigation */}
            <a href="/" rel="home" />
            <a href="/pagename">{t("NavigationMenu.pageName")}</a>
          </NavMenu>
        
           <Page1/>
        </QueryProvider>S
      </BrowserRouter>
    </PolarisProvider>
  );
}
