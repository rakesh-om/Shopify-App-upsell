import {
    ChoiceList,
    TextContainer,
  } from "@shopify/polaris";
  import React, { useState } from "react";
  
  const TriggerProductSelector = () => {
    const [selected, setSelected] = useState(["specific"]);
  
    return (
      <TextContainer>
        <ChoiceList
          title="Offer is triggered for"
          choices={[
            { label: "Specific products", value: "specific" },
            { label: "Product tags", value: "tags" },
            { label: "All products", value: "all" },
          ]}
          selected={selected}
          onChange={setSelected}
        />
      </TextContainer>
    );
  };
  
  export default TriggerProductSelector;
  