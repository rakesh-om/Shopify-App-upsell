import React from "react";
import { Card, Stack, Text, Button } from "@shopify/polaris";
import supportIllustration from "../../assets/Support-app.png";
import "../Styles/SetupHelpBanner.css";

const SetupHelpBanner = () => {
  return (
    <div className="setup-card-wrapper">
      <div className="setup-banner">
        {/* Left Side */}
        <div className="setup-banner__content">
          <Text as="h3" variant="headingMd">
            Free setup assistance
          </Text>
          <Text
            as="p"
            variant="bodyMd"
            color="subdued"
            className="setup-banner__desc"
          >
            If you need support to get started or to setup offers, please reach out to our support team.
          </Text>
          <Stack spacing="tight" className="setup-banner__buttons">
            <Button url="https://zoom.us" external>
              Schedule a Zoom meeting
            </Button>
            <Button plain url="/help">
              Get help
            </Button>
          </Stack>
        </div>

        {/* Right Side */}
        <div className="setup-banner__image">
          <img src={supportIllustration} alt="Support illustration" />
        </div>
      </div>
    </div>
  );
};

export default SetupHelpBanner;
