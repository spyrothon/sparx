import * as React from "react";

import { Item, Stack, Tabs, Text } from "../dist";

export default function Component() {
  const items = [
    <Item key="graphics" title="Graphics">
      <Text>Graphics</Text>
    </Item>,
    <Item key="magic" title="Magic">
      <Text>Magic</Text>
    </Item>,
    <Item key="audio" title="Audio">
      <Text>Audio</Text>
    </Item>,
  ];
  return (
    <Stack spacing="space-lg">
      <Tabs isDisabled>{items}</Tabs>
      <Tabs disabledKeys={["magic"]}>{items}</Tabs>
    </Stack>
  );
}
