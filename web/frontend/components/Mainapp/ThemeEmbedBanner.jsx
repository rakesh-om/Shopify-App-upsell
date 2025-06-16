import React from "react";
import {
  Banner,
  Text,
  Button,
  Box,
  Stack,
} from "@shopify/polaris";

export default function OffersPage() {
  return (
    <Banner
      title="Enable Selleasy in your theme editor"
      status="warning"
    >
      <Text as="p" variant="bodyMd">
        Product & Cart page widgets will only work when the Selleasy app embed is enabled in your theme. This is Shopify's recommended way to use an app in the online store.
      </Text>
      <Box paddingBlockStart="4">
        <Stack spacing="tight">
          <Button primary onClick={() => alert("Enable Clicked")}>
            Enable Selleasy
          </Button>
          <Button plain onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </Stack>
      </Box>
    </Banner>
  );
}
