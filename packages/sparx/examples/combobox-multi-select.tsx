import * as React from "react";
import { Close } from "@spyrothon/sparx-icons/icons/Close";

import { Button, Combobox, Item, PickerItem, Spacer, Stack } from "../dist";
import { PICKER_OPTIONS, PickerOption } from "./util/PickerOptions";

export default function Component() {
  const selectedItems = React.useRef(new Set([PICKER_OPTIONS[0]]));
  const [filteredItems, setFilteredItems] = React.useState<PickerOption[]>(() =>
    PICKER_OPTIONS.filter((item) => !selectedItems.current.has(item)),
  );

  function handleSelect(key: string) {
    const item = PICKER_OPTIONS.find((item) => item.value === key);
    if (item != null) selectedItems.current.add(item);

    setFilteredItems(PICKER_OPTIONS.filter((item) => !selectedItems.current.has(item)));
  }

  function removeSelectedItem(item: PickerOption) {
    selectedItems.current.delete(item);
    setFilteredItems(PICKER_OPTIONS.filter((item) => !selectedItems.current.has(item)));
  }

  return (
    <Stack>
      {Array.from(selectedItems.current).map((item) => (
        <Stack key={item.value} direction="horizontal" wrap={false} align="center">
          <PickerItem icon={item.icon} description={item.subtext}>
            {item.name}
          </PickerItem>
          <Button
            variant="danger/filled"
            onPress={() => removeSelectedItem(item)}
            icon={Close}></Button>
        </Stack>
      ))}
      <Spacer />
      <Combobox
        items={filteredItems}
        selectedKey={undefined}
        onSelect={handleSelect}
        placeholder="Search for options"
        allowsEmptyCollection>
        {(item) => (
          <Item key={item.value} textValue={item.name}>
            <PickerItem icon={item.icon} description={item.subtext}>
              {item.name}
            </PickerItem>
          </Item>
        )}
      </Combobox>
    </Stack>
  );
}
