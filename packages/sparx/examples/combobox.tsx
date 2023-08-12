import * as React from "react";

import { Combobox, Item, Stack } from "../dist";
import { PICKER_OPTIONS } from "./util/PickerOptions";

export default function Component() {
  const [selectedKey, setSelectedKey] = React.useState(PICKER_OPTIONS[0].value);

  return (
    <Stack>
      <Combobox
        label="Combobox Selection"
        items={PICKER_OPTIONS}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}>
        {(item) => <Item key={item.value}>{item.name}</Item>}
      </Combobox>
    </Stack>
  );
}
