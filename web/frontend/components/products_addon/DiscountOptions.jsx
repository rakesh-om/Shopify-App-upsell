import {
    TextField,
    Select,
    Checkbox,
  } from "@shopify/polaris";
  import React, { useState } from "react";
  
  const DiscountOptions = () => {
    const [enabled, setEnabled] = useState(false);
    const [type, setType] = useState("percentage");
    const [value, setValue] = useState("10");
    const [text, setText] = useState("Get 10% off on add-ons");
  
    return (
      <>
        <Checkbox
          label="Enable Discount"
          checked={enabled}
          onChange={setEnabled}
        />
        {enabled && (
          <>
            <Select
              label="Discount Type"
              options={[
                { label: "Percentage", value: "percentage" },
                { label: "Fixed amount", value: "fixed" },
                { label: "Free shipping", value: "free_shipping" },
              ]}
              value={type}
              onChange={setType}
            />
            <TextField
              label="Discount Value"
              value={value}
              onChange={setValue}
              type="number"
            />
            <TextField
              label="Discount Text"
              value={text}
              onChange={setText}
            />
          </>
        )}
      </>
    );
  };
  
  export default DiscountOptions;
  