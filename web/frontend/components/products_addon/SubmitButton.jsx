import { Button } from "@shopify/polaris";
import React from "react";

const SubmitButton = () => {
  const handleSubmit = () => {
    // Integrate with backend later
    console.log("Offer Submitted!");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Button primary onClick={handleSubmit}>
        Submit Offer
      </Button>
    </div>
  );
};

export default SubmitButton;
