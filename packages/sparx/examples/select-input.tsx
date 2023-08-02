import * as React from "react";

import { defaultSelectItemToString, SelectInput, Stack } from "../src";
import ExclamationOctagon from "../src/icons/ExclamationOctagon";
import ExclamationTriangle from "../src/icons/ExclamationTriangle";
import InfoCircle from "../src/icons/InfoCircle";

const OPTIONS = [
  {
    name: "Option One",
    value: "one",
    subtext: "Description for option one",
    icon: InfoCircle,
  },
  {
    name: "Option Two",
    value: "two",
    subtext: "Description for option two",
    icon: ExclamationTriangle,
  },
  {
    name: "Option Three",
    value: "three",
    subtext: "Description for option three",
    icon: ExclamationOctagon,
  },
];

export default function Component() {
  const [selectedItem, setSelectedItem] = React.useState(OPTIONS[0]);

  return (
    <Stack>
      <SelectInput
        size="small"
        items={OPTIONS}
        selectedItem={selectedItem}
        onSelect={(item) => (item != null ? setSelectedItem(item) : null)}
        itemToString={defaultSelectItemToString}
      />
      <SelectInput
        items={OPTIONS}
        selectedItem={selectedItem}
        onSelect={(item) => (item != null ? setSelectedItem(item) : null)}
        itemToString={defaultSelectItemToString}
      />
      <SelectInput
        size="large"
        items={OPTIONS}
        selectedItem={selectedItem}
        onSelect={(item) => (item != null ? setSelectedItem(item) : null)}
        itemToString={defaultSelectItemToString}
      />
    </Stack>
  );
}
