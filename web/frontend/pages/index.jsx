import {
  Card,
  Page,
  Layout,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

import SetupHelpBanner from "../components/Mainapp/SetupHelpBanner";
import OffersPage from "../components/Mainapp/ThemeEmbedBanner";
import "./HomePage.css";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <Page narrowWidth>
      <TitleBar title="Home" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <OffersPage />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <SetupHelpBanner />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
