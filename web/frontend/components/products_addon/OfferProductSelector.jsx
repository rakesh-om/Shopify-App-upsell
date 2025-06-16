import React, { useState } from "react";
import {
  Page,
  Button,
  ResourceList,
  ResourceItem,
  Text,
  Card,
} from "@shopify/polaris";

const sampleProducts = [
  { id: "1", name: "JACKET RONIN - BLACK (M)" },
  { id: "2", name: "Leather Wallet - Dark Brown" },
];

const OfferProductSelector = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectionChange = (selected) => {
    setSelectedItems(selected);
  };

  return (
    <Page title="Offer Products">
      <Card title="Select Products" sectioned>
        <ResourceList
          resourceName={{ singular: "product", plural: "products" }}
          items={sampleProducts}
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
          selectable
          renderItem={(item) => {
            return (
              <ResourceItem id={item.id}>
                <Text variant="bodyMd" fontWeight="bold">
                  {item.name}
                </Text>
              </ResourceItem>
            );
          }}
        />
        <div style={{ marginTop: 16 }}>
          <Button primary onClick={() => console.log("Selected:", selectedItems)}>
            Confirm Selection
          </Button>
        </div>
      </Card>
    </Page>
  );
};

export default OfferProductSelector;
