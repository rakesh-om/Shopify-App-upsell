import {
  ChoiceList,
  TextContainer,
  Button,
  Tag,
  TextField
} from "@shopify/polaris";
import React, { useState } from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";

import { ResourcePicker } from "@shopify/app-bridge-react/components";

const TriggerProductSelector = () => {
  const [selected, setSelected] = useState(["specific"]);
  const [modalActive, setModalActive] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleChoiceChange = (value) => {
    setSelected(value);
    setSelectedProducts([]);
    setSelectedTags([]);
  };

  const toggleModal = () => setModalActive(!modalActive);

  const handleTagAdd = () => {
    if (tagInput && !selectedTags.includes(tagInput)) {
      setSelectedTags([...selectedTags, tagInput]);
      setTagInput("");
    }
  };

  const handleTagRemove = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

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
        onChange={handleChoiceChange}
      />

      {selected[0] === "specific" && (
        <>
          <Button onClick={toggleModal}>View Products</Button>

          {modalActive && (
            <ResourcePicker
              resourceType="Product"
              showVariants={false}
              open={modalActive}
              onCancel={toggleModal}
              onSelection={({ selection }) => {
                const titles = selection.map((item) => item.title);
                setSelectedProducts(titles);
                setModalActive(false);
              }}
              allowMultiple
            />
          )}

          <div style={{ marginTop: 10 }}>
            {selectedProducts.map((p, index) => (
              <Tag key={index}>{p}</Tag>
            ))}
          </div>
        </>
      )}

      {selected[0] === "tags" && (
        <>
          <TextField
            label="Select Tags"
            value={tagInput}
            onChange={setTagInput}
            placeholder="Eg. Vintage, Summer"
            onBlur={handleTagAdd}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleTagAdd();
              }
            }}
          />
          <div style={{ marginTop: 10 }}>
            {selectedTags.map((tag, index) => (
              <Tag key={index} onRemove={() => handleTagRemove(tag)}>
                {tag}
              </Tag>
            ))}
          </div>
        </>
      )}
    </TextContainer>
  );
};

export default TriggerProductSelector;
