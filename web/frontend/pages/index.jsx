import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page narrowWidth>
      <TitleBar title ="Home Page" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <h1 className="heading-samir">hello my namis iks khan </h1>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
