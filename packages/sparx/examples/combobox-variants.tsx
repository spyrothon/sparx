import * as React from "react";

import { Combobox, InputSize, InputState, Item, Stack } from "../dist";
import { PICKER_OPTIONS } from "./util/PickerOptions";

export default function Component() {
  const [selectedKey, setSelectedKey] = React.useState(PICKER_OPTIONS[0].value);

  const sampleVariants: Array<{ state: InputState; size: InputSize }> = [
    { state: "success", size: "small" },
    { state: "danger", size: "large" },
    { state: "info", size: "xlarge" },
  ];

  return (
    <Stack>
      {sampleVariants.map(({ state, size }) => (
        <Combobox
          key={`${state}-${size}`}
          state={state}
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
