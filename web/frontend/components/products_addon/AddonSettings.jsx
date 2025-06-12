import { Select, Checkbox } from "@shopify/polaris";
import React, { useState } from "react";

const AddonSettings = () => {
  const [limit, setLimit] = useState("any");
  const [randomize, setRandomize] = useState(false);

  return (
    <>
      <Select
        label="Max number of add-ons selectable"
        options={[
          { label: "Select any number", value: "any" },
          { label: "Only 1", value: "1" },
          { label: "2", value: "2" },
        ]}
        onChange={setLimit}
        value={limit}
      />
      <Checkbox
        label="Randomize order of products"
        checked={randomize}
        onChange={setRandomize}
      />
    </>
  );
};

export default AddonSettings;
