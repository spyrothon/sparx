import * as React from "react";

import { Combobox, Item, PickerItem } from "../dist";
import { PICKER_OPTIONS } from "./util/PickerOptions";

export default function Component() {
  const [selectedKey, setSelectedKey] = React.useState(PICKER_OPTIONS[0].value);

  return (
    <Combobox
      label="Fancy Items"
      description="Use PickerItem for rich, consistent options"
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
    </Combobox>
  );
}
