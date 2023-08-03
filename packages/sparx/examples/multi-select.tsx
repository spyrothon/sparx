import * as React from "react";

import { DropdownItem, MultiSelect, Stack } from "../dist";
import { PICKER_OPTIONS } from "./util/PickerOptions";

export default function Component() {
  const [selectedItems, setSelectedItems] = React.useState(() => PICKER_OPTIONS.slice(0, 2));

  return (
    <Stack>
      <MultiSelect
        color="success"
        items={PICKER_OPTIONS}
        initialSelectedItems={selectedItems}
        onSelect={setSelectedItems}>
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
      </MultiSelect>
    </Stack>
  );
}
