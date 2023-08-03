import * as React from "react";

import { DropdownItem, Select, Stack } from "../dist";
import { PICKER_OPTIONS } from "./util/PickerOptions";

export default function Component() {
  const [selectedItem, setSelectedItem] = React.useState(PICKER_OPTIONS[0]);

  return (
    <Stack>
      <Select
        color="success"
        items={PICKER_OPTIONS}
        selectedItem={selectedItem}
        onSelect={(item) => (item != null ? setSelectedItem(item) : null)}>
        {(item, index, { isHighlighted, isSelected }) => (
          <DropdownItem key={item.value} item={item} index={index}>
            <DropdownItem.Icon>
              <item.icon size={20} />
            </DropdownItem.Icon>
            <DropdownItem.Label description={item.subtext}>
              {item.name} {isHighlighted ? " - hi!" : null}
            </DropdownItem.Label>
            <DropdownItem.Check isSelected={isSelected} />
          </DropdownItem>
        )}
      </Select>
    </Stack>
  );
}
