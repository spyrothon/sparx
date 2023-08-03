import * as React from "react";

import { Combobox } from "../dist";
import { PICKER_OPTIONS } from "./util/PickerOptions";

export default function Component() {
  const [selectedItem, setSelectedItem] = React.useState(PICKER_OPTIONS[0]);
  const [filteredItems, setFilteredItems] = React.useState(PICKER_OPTIONS);

  return (
    <Combobox
      items={filteredItems}
      selectedItem={selectedItem}
      onSelect={(item) => (item != null ? setSelectedItem(item) : null)}
      placeholder="Pick an option"
      onSearch={(query) =>
        setFilteredItems(() => PICKER_OPTIONS.filter((option) => option.name.includes(query ?? "")))
      }
    />
  );
}
