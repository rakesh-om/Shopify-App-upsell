import React from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  Divider,
} from "@shopify/polaris";

import OfferNameInput from "./OfferNameInput";
import TriggerProductSelector from "./TriggerProductSelector";
import OfferProductSelector from "./OfferProductSelector";
import AddonSettings from "./AddonSettings";
import DiscountOptions from "./DiscountOptions";
import WidgetSettings from "./WidgetSettings";
import SubmitButton from "./SubmitButton";

const UpsellOfferForm = () => {
  return (
    <Page title="Create Cart Add-on / Upsell Offer">
      <Layout>

        {/* Offer Name */}
        <Layout.Section>
          <Card sectioned title="Offer Name">
            <OfferNameInput />
          </Card>
        </Layout.Section>

        {/* Trigger + Offer Products */}
        <Layout.Section>
          <Card title="Products Selection">
            <Card.Section title="Trigger Products">
              <TriggerProductSelector />
            </Card.Section>
            <Divider />
            <Card.Section title="Add-on Products">
              <OfferProductSelector />
            </Card.Section>
          </Card>
        </Layout.Section>

        {/* Add-on Settings + Discount Options */}
        <Layout.Section>
          <Card title="Settings & Discount">
            <Card.Section title="Add-on Settings">
              <AddonSettings />
            </Card.Section>
            <Divider />
            <Card.Section title="Discount Options">
              <DiscountOptions />
            </Card.Section>
          </Card>
        </Layout.Section>

        {/* Widget Settings */}
        <Layout.Section>
          <Card sectioned title="Widget Settings">
            <WidgetSettings />
          </Card>
        </Layout.Section>

        {/* Submit Button */}
        <Layout.Section>
          <Card sectioned>
            <SubmitButton />
          </Card>
        </Layout.Section>

      </Layout>
    </Page>
  );
};

export default UpsellOfferForm;
