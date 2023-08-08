import * as React from "react";

import { Card, Stack, Text } from "../dist";

export default function Component() {
  const content = (
    <Card floating>
      <Text>Hello</Text>
      <Text>This Button has complex content</Text>
    </Card>
  );
  return (
    <Stack>
      <Stack spacing="space-lg" align="start">
        {content}
      </Stack>
      <Stack asChild spacing="space-lg" align="start">
        {content}
      </Stack>
    </Stack>
  );
}
