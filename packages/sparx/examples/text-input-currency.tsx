import * as React from "react";

import { CurrencyInput, Stack, Text } from "../dist";

export default function Component() {
  const [value, setValue] = React.useState(1505);
  return (
    <Stack spacing="space-md">
      <CurrencyInput value={value} onValueChange={setValue} />
      <Text>Currency value is {value}</Text>
    </Stack>
  );
}
