import * as React from "react";

import { DurationInput, Stack, Text } from "../dist";

export default function Component() {
  const [value, setValue] = React.useState(1505);

  return (
    <Stack spacing="space-md">
      <DurationInput value={value} onValueChange={setValue} />
      <Text>Duration is {value} seconds</Text>
    </Stack>
  );
}
