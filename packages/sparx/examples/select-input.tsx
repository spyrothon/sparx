import * as React from "react";

import { Select, Stack } from "../dist";

export default function Component() {
  const [OPTIONS] = React.useState(() => [
    { name: "Option One", value: "one" },
    { name: "Option Two", value: "two" },
    { name: "Option Three", value: "three" },
  ]);

  const [selectedItem, setSelectedItem] = React.useState<typeof OPTIONS[number] | undefined>(
    OPTIONS[0],
  );

  return (
    <Stack>
      <Select size="small" items={OPTIONS} selectedItem={selectedItem} onSelect={setSelectedItem} />
      <Select items={OPTIONS} selectedItem={selectedItem} onSelect={setSelectedItem} />
      <Select size="large" items={OPTIONS} selectedItem={selectedItem} onSelect={setSelectedItem} />
    </Stack>
  );
}
