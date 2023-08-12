import * as React from "react";

import { Combobox, InputSize, InputState, Item, Stack } from "../dist";
import { PICKER_OPTIONS } from "./util/PickerOptions";

export default function Component() {
  const [selectedKey, setSelectedKey] = React.useState(PICKER_OPTIONS[0].value);

  const sampleVariants: Array<{ status: InputState; size: InputSize }> = [
    { status: "success", size: "small" },
    { status: "danger", size: "large" },
    { status: "info", size: "xlarge" },
  ];

  return (
    <Stack>
      {sampleVariants.map(({ status, size }) => (
        <Combobox
          key={`${status}-${size}`}
          status={status}
          size={size}
          label={size}
          items={PICKER_OPTIONS}
          selectedKey={selectedKey}
          onSelect={setSelectedKey}>
          {(item) => <Item key={item.value}>{item.name}</Item>}
        </Combobox>
      ))}
    </Stack>
  );
}
