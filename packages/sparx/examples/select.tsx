import * as React from "react";

import { Item, Select, Stack } from "../dist";

export default function Component() {
  const [OPTIONS] = React.useState(() => [
    { name: "Option One", value: "one" },
    { name: "Option Two", value: "two" },
    { name: "Option Three", value: "three" },
  ]);

  const [selectedKey, setSelectedKey] = React.useState(OPTIONS[0].value);

  return (
    <Stack>
      <Select
        label="Small"
        size="small"
        items={OPTIONS}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}>
        {(item) => <Item key={item.value}>{item.name}</Item>}
      </Select>
      <Select
        label="Medium"
        description="Medium is the default input size."
        items={OPTIONS}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}>
        {(item) => <Item key={item.value}>{item.name}</Item>}
      </Select>
      <Select
        label="Large"
        size="large"
        items={OPTIONS}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}>
        {(item) => <Item key={item.value}>{item.name}</Item>}
      </Select>
    </Stack>
  );
}
