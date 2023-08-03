import * as React from "react";

import { Combobox, Stack } from "../dist";
import { InputColor, InputSize } from "../dist/components/Input/Input";
import { PICKER_OPTIONS } from "./util/PickerOptions";

export default function Component() {
  const [selectedItem, setSelectedItem] = React.useState(PICKER_OPTIONS[0]);
  const [filteredItems, setFilteredItems] = React.useState(PICKER_OPTIONS);

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
          items={filteredItems}
          selectedItem={selectedItem}
          onSelect={(item) => (item != null ? setSelectedItem(item) : null)}
          placeholder="Pick an option"
          onSearch={(query) =>
            setFilteredItems(() =>
              PICKER_OPTIONS.filter((option) => option.name.includes(query ?? "")),
            )
          }
        />
      ))}
    </Stack>
  );
}
