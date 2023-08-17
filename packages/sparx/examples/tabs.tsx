import * as React from "react";

import { Item, Tabs, Text } from "../dist";

const ITEMS = [
  { name: "Plain Text", content: <Text>This is the first tab</Text> },
  { name: "Currency", content: <Text>This second tab has different content</Text> },
  { name: "Duration", content: <Text>Third is even more unique.</Text> },
];

export default function Component() {
  return (
    <Tabs items={ITEMS} defaultSelectedKey="Plain Text">
      {(item) => (
        <Item key={item.name} title={item.name}>
          {item.content}
        </Item>
      )}
    </Tabs>
  );
}
