import { TextField, Select } from "@shopify/polaris";
import React, { useState } from "react";

const WidgetSettings = () => {
  const [title, setTitle] = useState("Complete Your Look with These Accessories");
  const [priority, setPriority] = useState("10");
  const [status, setStatus] = useState("active");

  return (
    <>
      <TextField
        label="Widget Title"
        value={title}
        onChange={setTitle}
      />
      <TextField
        label="Offer Priority"
        value={priority}
        onChange={setPriority}
        type="number"
      />
      <Select
        label="Status"
        options={[
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ]}
        value={status}
        onChange={setStatus}
      />
    </>
  );
};

export default WidgetSettings;
