import { TextField } from "@shopify/polaris";
import React, { useState } from "react";

const OfferNameInput = () => {
  const [offerName, setOfferName] = useState("");

  return (
    <TextField
      label="Offer Name"
      value={offerName}
      onChange={setOfferName}
      helpText="This name is for your internal reference only."
      placeholder="Add-ons for Burger"
    />
  );
};

export default OfferNameInput;
