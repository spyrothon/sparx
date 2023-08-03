import * as React from "react";

import { Select, Stack } from "../dist";

export default function Component() {
  const OPTIONS = [
    { name: "Option One", value: "one" },
    { name: "Option Two", value: "two" },
    { name: "Option Three", value: "three" },
  ];

  const [selectedItem, setSelectedItem] = React.useState(OPTIONS[0]);

  return (
    <Stack>
      <Select
        size="small"
        items={OPTIONS}
        selectedItem={selectedItem}
        onSelect={(item) => (item != null ? setSelectedItem(item) : null)}
      />
      <Select
        items={OPTIONS}
        selectedItem={selectedItem}
        onSelect={(item) => (item != null ? setSelectedItem(item) : null)}
      />
      <Select
        size="large"
        items={OPTIONS}
        selectedItem={selectedItem}
        onSelect={(item) => (item != null ? setSelectedItem(item) : null)}
      />
    </Stack>
  );
}
