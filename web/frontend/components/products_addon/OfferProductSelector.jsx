import { ResourceList, Checkbox, TextStyle } from "@shopify/polaris";
import React, { useState } from "react";

const sampleProducts = [
  { id: "1", name: "JACKET RONIN - BLACK (M)" },
  { id: "2", name: "Leather Wallet - Dark Brown" },
];

const OfferProductSelector = () => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectionChange = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <>
      <p className="Polaris-Label__Text">Select Add-on Products</p>
      <ResourceList
        resourceName={{ singular: "product", plural: "products" }}
        items={sampleProducts}
        renderItem={(item) => {
          const { id, name } = item;
          return (
            <Checkbox
              label={name}
              checked={selectedIds.includes(id)}
              onChange={() => handleSelectionChange(id)}
            />
          );
        }}
      />
    </>
  );
};

export default OfferProductSelector;
