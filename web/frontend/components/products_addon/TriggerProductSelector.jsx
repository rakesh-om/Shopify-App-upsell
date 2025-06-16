import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Modal,
  ChoiceList,
  TextContainer,
  Tag,
  TextField,
  Spinner,
  ResourceList,
  ResourceItem,
  Thumbnail,
  Card,
  Select,
  Popover,
  ActionList,
  Box,
  Text,
} from "@shopify/polaris";
import { FilterIcon } from "@shopify/polaris-icons";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";

const TriggerProductSelector = () => {
  const app = useAppBridge();
  const fetch = authenticatedFetch(app);

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(["specific"]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterPopoverActive, setFilterPopoverActive] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState([]);

  const toggleFilterPopover = () => setFilterPopoverActive(!filterPopoverActive);
  const toggleModal = () => setModalOpen(!modalOpen);

  const searchOptions = [
    { label: "All", value: "all" },
    { label: "Product title", value: "title" },
    { label: "Product ID", value: "id" },
    { label: "Barcode", value: "barcode" },
    { label: "SKU", value: "sku" },
  ];

  const filterOptions = [
    { content: "Categories", value: "categories" },
    { content: "Collection", value: "collection" },
    { content: "Types", value: "product_type" },
    { content: "Tags", value: "tags" },
    { content: "Vendors", value: "vendor" },
  ];

  const handleChoiceChange = (value) => {
    setSelected(value);
    setSelectedProducts([]);
    setSelectedTags([]);
  };

  const handleSearchChange = useCallback((value) => setSearch(value), []);
  const handleSearchByChange = useCallback((value) => setSearchBy(value), []);

  const handleProductSelect = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleTagAdd = () => {
    if (tagInput && !selectedTags.includes(tagInput)) {
      setSelectedTags([...selectedTags, tagInput]);
      setTagInput("");
    }
  };

  const handleTagRemove = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleFilterSelect = (filterKey) => {
    if (!appliedFilters.includes(filterKey)) {
      setAppliedFilters([...appliedFilters, filterKey]);
    }
    setFilterPopoverActive(false);
  };

  const filteredProducts = products.filter((product) => {
    const value = search.toLowerCase();
    if (!value) return true;
    switch (searchBy) {
      case "title":
        return product.title.toLowerCase().includes(value);
      case "id":
        return product.id.toString().includes(value);
      case "sku":
        return product.sku?.toLowerCase().includes(value);
      case "barcode":
        return product.barcode?.toLowerCase().includes(value);
      default:
        return (
          product.title.toLowerCase().includes(value) ||
          product.id.toString().includes(value) ||
          product.sku?.toLowerCase().includes(value) ||
          product.barcode?.toLowerCase().includes(value)
        );
    }
  });

  useEffect(() => {
    if (modalOpen && selected[0] === "specific") {
      setLoading(true);
      fetch("/api/products")
        .then((res) => {
          if (!res.ok) throw new Error("Fetch failed with status " + res.status);
          return res.json();
        })
        .then((data) => {
          setProducts(data.products || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ Product fetch failed:", err);
          setLoading(false);
        });
    }
  }, [modalOpen, selected]);

  return (
    <div className="trigger-selector">
      <Box marginBlockEnd="4">
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
      </Box>

      <Button onClick={toggleModal} className="open-modal-button">
        View Products
      </Button>

      <Modal
        open={modalOpen}
        onClose={toggleModal}
        title="Add Products"
        primaryAction={{
          content: "Add",
          onAction: () => {
            console.log("Final selected products:", selectedProducts);
            toggleModal();
          },
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: toggleModal,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer spacing="loose" className="modal-content">
            {selected[0] === "specific" && (
              <>
                <Box className="search-filters" display="flex" alignItems="center" gap="4">
                  <TextField
                    placeholder="Search products"
                    value={search}
                    onChange={handleSearchChange}
                    autoComplete="off"
                    labelHidden
                    className="search-input"
                  />
                  <Select
                    options={searchOptions}
                    value={searchBy}
                    onChange={handleSearchByChange}
                    labelHidden
                    className="select-field"
                  />
                  <Popover
                    active={filterPopoverActive}
                    activator={
                      <Button icon={FilterIcon} onClick={toggleFilterPopover}>
                        Add filter +
                      </Button>
                    }
                    onClose={toggleFilterPopover}
                  >
                    <ActionList
                      items={filterOptions.map((opt) => ({
                        ...opt,
                        onAction: () => handleFilterSelect(opt.value),
                      }))}
                    />
                  </Popover>
                </Box>

                {appliedFilters.length > 0 && (
                  <Box marginBlockStart="2" className="applied-filters">
                    <Text>Filters Applied:</Text>
                    <Box display="flex" flexWrap="wrap" gap="2">
                      {appliedFilters.map((filter, idx) => (
                        <Tag
                          key={idx}
                          onRemove={() =>
                            setAppliedFilters(appliedFilters.filter((f) => f !== filter))
                          }
                        >
                          {filter}
                        </Tag>
                      ))}
                    </Box>
                  </Box>
                )}

                <Box marginBlockStart="4" className="product-list">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <Card>
                      <ResourceList
                        resourceName={{ singular: "product", plural: "products" }}
                        items={filteredProducts}
                        renderItem={(item) => {
                          const { id, title, image } = item;
                          const isSelected = selectedProducts.includes(id);

                          return (
                            <ResourceItem id={id}>
                              <Box display="flex" alignItems="center" gap="4">
                                <Thumbnail source={image || ""} alt={title} />
                                <Text variant="bodyMd">{title}</Text>
                                <Button
                                  size="slim"
                                  onClick={() => handleProductSelect(id)}
                                  primary={isSelected}
                                  className="add-remove-btn"
                                >
                                  {isSelected ? "Remove" : "Add"}
                                </Button>
                              </Box>
                            </ResourceItem>
                          );
                        }}
                      />
                    </Card>
                  )}
                </Box>

                {selectedProducts.length > 0 && (
                  <Box marginBlockStart="4" className="selected-products">
                    <Text>Selected Products:</Text>
                    <Box display="flex" flexWrap="wrap" gap="2" marginBlockStart="2">
                      {selectedProducts.map((id) => {
                        const product = products.find((p) => p.id === id);
                        return product ? <Tag key={id}>{product.title}</Tag> : null;
                      })}
                    </Box>
                    <Text alignment="end" variant="bodySm">
                      {selectedProducts.length}/50 product selected
                    </Text>
                  </Box>
                )}
              </>
            )}

            {selected[0] === "tags" && (
              <div className="tag-section">
                <TextField
                  label="Enter product tags"
                  value={tagInput}
                  onChange={setTagInput}
                  placeholder="Eg. Summer, Sale"
                  onBlur={handleTagAdd}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleTagAdd();
                    }
                  }}
                />
                <Box display="flex" flexWrap="wrap" gap="2" marginBlockStart="2">
                  {selectedTags.map((tag, index) => (
                    <Tag key={index} onRemove={() => handleTagRemove(tag)}>
                      {tag}
                    </Tag>
                  ))}
                </Box>
              </div>
            )}
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default TriggerProductSelector;
