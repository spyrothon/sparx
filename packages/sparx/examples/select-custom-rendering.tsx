import * as React from "react";

import { Item, PickerItem, Select } from "../dist";
import { PICKER_OPTIONS } from "./util/PickerOptions";

export default function Component() {
  const [selectedKey, setSelectedKey] = React.useState(PICKER_OPTIONS[0].value);

  return (
    <Select
      color="success"
      items={PICKER_OPTIONS}
      selectedKey={selectedKey}
      onSelect={setSelectedKey}>
      {(item) => (
        <Item key={item.value} textValue={item.name}>
          <PickerItem icon={item.icon} description={item.subtext}>
            {item.name}
          </PickerItem>
        </Item>
      )}
    </Select>
  );
}
