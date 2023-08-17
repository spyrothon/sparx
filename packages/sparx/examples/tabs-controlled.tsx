import * as React from "react";

import { Button, Item, Stack, Tabs, Text } from "../dist";

export default function Component() {
  const [selectedKey, setSelectedKey] = React.useState("Plain Text");
  const ITEMS = [
    {
      name: "First",
      content: (
        <Stack justify="start">
          <Text>This is the first tab. Use the button to go to the third tab.</Text>
          <Button onPress={() => setSelectedKey("Third")}>Go to Third</Button>
        </Stack>
      ),
    },
    {
      name: "Second",
      content: (
        <Stack justify="start">
          <Text>This button lets you go back to the first tab.</Text>
          <Button onPress={() => setSelectedKey("First")}>Go to First</Button>
        </Stack>
      ),
    },
    {
      name: "Third",
      content: (
        <Stack justify="start">
          <Text>Use this to go to the second tab.</Text>
          <Button onPress={() => setSelectedKey("Second")}>Go to Second</Button>
        </Stack>
      ),
    },
  ];
  return (
    <Tabs items={ITEMS} selectedKey={selectedKey} onSelect={setSelectedKey}>
      {(item) => (
        <Item key={item.name} title={item.name}>
          {item.content}
        </Item>
      )}
    </Tabs>
  );
}
