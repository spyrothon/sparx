import * as React from "react";

import { defaultSelectItemToString, SelectInput, Stack, Text } from "../dist";
import ExclamationOctagon from "../dist/icons/ExclamationOctagon";
import ExclamationTriangle from "../dist/icons/ExclamationTriangle";
import InfoCircle from "../dist/icons/InfoCircle";

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

  function customRenderItem(item: typeof OPTIONS[0]) {
    return (
      <Stack direction="horizontal" spacing="space-md">
        <item.icon color="var(--text-normal)" size={20} style={{ marginTop: 2, marginLeft: 2 }} />
        <div>
          <Text>{item.name}</Text>
          <Text variant="text-xs/normal">{item.subtext}</Text>
        </div>
      </Stack>
    );
  }

  return (
    <Stack>
      <SelectInput
        color="success"
        items={OPTIONS}
        itemToString={defaultSelectItemToString}
        selectedItem={selectedItem}
        onSelect={(item) => (item != null ? setSelectedItem(item) : null)}
        renderItem={customRenderItem}
      />
      <SelectInput
        color="success"
        items={OPTIONS}
        itemToString={defaultSelectItemToString}
        selectedItem={selectedItem}
        onSelect={(item) => (item != null ? setSelectedItem(item) : null)}
        renderItem={(item) => (
          <Stack direction="horizontal" spacing="space-md">
            <item.icon
              color="var(--text-normal)"
              size={20}
              style={{ marginTop: 2, marginLeft: 2 }}
            />
            <div>
              <Text>{item.name}</Text>
              <Text variant="text-xs/normal">{item.subtext}</Text>
            </div>
          </Stack>
        )}
      />
    </Stack>
  );
}
