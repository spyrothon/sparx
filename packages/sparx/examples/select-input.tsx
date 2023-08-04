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
      <Select size="small" items={OPTIONS} selectedKey={selectedKey} onSelect={setSelectedKey}>
        {(item) => <Item key={item.value}>{item.name}</Item>}
      </Select>
      <Select items={OPTIONS} selectedKey={selectedKey} onSelect={setSelectedKey}>
        {(item) => <Item key={item.value}>{item.name}</Item>}
      </Select>
      <Select size="large" items={OPTIONS} selectedKey={selectedKey} onSelect={setSelectedKey}>
        {(item) => <Item key={item.value}>{item.name}</Item>}
      </Select>
    </Stack>
  );
}
