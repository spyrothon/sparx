import * as React from "react";

import { Combobox, Item, Stack } from "../dist";
import { InputColor, InputSize } from "../dist/components/Input/Input";
import { PICKER_OPTIONS } from "./util/PickerOptions";

export default function Component() {
  const [selectedKey, setSelectedKey] = React.useState(PICKER_OPTIONS[0].value);

  const sampleVariants: Array<{ color: InputColor; size: InputSize }> = [
    { color: "success", size: "small" },
    { color: "danger", size: "large" },
    { color: "info", size: "xlarge" },
  ];

  return (
    <Stack>
      {sampleVariants.map(({ color, size }) => (
        <Combobox
          key={`${color}-${size}`}
          color={color}
          size={size}
          items={PICKER_OPTIONS}
          selectedKey={selectedKey}
          onSelect={setSelectedKey}>
          {(item) => <Item key={item.value}>{item.name}</Item>}
        </Combobox>
      ))}
    </Stack>
  );
}
