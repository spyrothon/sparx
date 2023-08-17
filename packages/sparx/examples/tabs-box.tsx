import * as React from "react";

import { Box, Item, Tabs, Text } from "../dist";

const ITEMS = [
  {
    name: "Secondary Background",
    content: <Text>This is the first tab</Text>,
    backgroundColor: "var(--background-secondary)",
  },
  {
    name: "Tertiary",
    content: <Text>This second tab has different content</Text>,
    backgroundColor: "var(--background-tertiary)",
  },
  {
    name: "Transparent",
    content: <Text>Third is even more unique.</Text>,
    backgroundColor: "transparent",
  },
];

export default function Component() {
  return (
    <Box elevation="low" background="primary" radius="medium">
      <Tabs items={ITEMS} defaultSelectedKey="Plain Text" justify="stretch">
        {(item) => (
          <Item key={item.name} title={item.name}>
            <div
              style={{
                padding: "var(--space-md)",
                backgroundColor: item.backgroundColor,
              }}>
              {item.content}
            </div>
          </Item>
        )}
      </Tabs>
    </Box>
  );
}
