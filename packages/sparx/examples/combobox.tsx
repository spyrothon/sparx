import * as React from "react";

import { Combobox, defaultSelectItemToString, DropdownItem, Stack, Text } from "../dist";
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
  const [query, setQuery] = React.useState<string | undefined>("");

  const filteredItems = React.useMemo(() => {
    if (query == null) return OPTIONS;

    return OPTIONS.filter((option) => option.name.includes(query) || option.value.includes(query));
  }, [query]);

  return (
    <Stack>
      <Combobox
        items={filteredItems}
        selectedItem={selectedItem}
        onSelect={(item) => (item != null ? setSelectedItem(item) : null)}
        itemToString={defaultSelectItemToString}
        renderEmptyState={(query) => (
          <Text variant="text-md/secondary">
            <em>No results for {query}</em>
          </Text>
        )}
        onSearch={setQuery}>
        {(item, index) => (
          <DropdownItem key={index} item={item} index={index}>
            <DropdownItem.Icon>
              <item.icon size="1.2em" />
            </DropdownItem.Icon>
            <DropdownItem.Label description={item.subtext}>{item.name}</DropdownItem.Label>
          </DropdownItem>
        )}
      </Combobox>
    </Stack>
  );
}
