import * as React from "react";

import { DropdownItem, MultiSelect, Stack, Text } from "../dist";
import { PICKER_OPTIONS } from "./util/PickerOptions";

export default function Component() {
  const [selectedItems, setSelectedItems] = React.useState(() => PICKER_OPTIONS.slice(0, 2));

  return (
    <Stack>
      <Text>{selectedItems.length} items are currently selected</Text>
      <MultiSelect
        color="success"
        items={PICKER_OPTIONS}
        initialSelectedItems={selectedItems}
        onSelect={setSelectedItems}>
        {(item, index, { isHighlighted }) => (
          <DropdownItem
            key={item.value}
            item={item}
            index={index}
            icon={<item.icon size={20} />}
            description={item.subtext}>
            {item.name} {isHighlighted ? " - hi!" : null}
          </DropdownItem>
        )}
      </MultiSelect>
    </Stack>
  );
}
