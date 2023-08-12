import * as React from "react";

import { CurrencyInput, Stack } from "../dist";

export default function Component() {
  const [value, setValue] = React.useState(1505);

  return (
    <Stack spacing="space-md">
      <CurrencyInput
        label="Amount"
        value={value}
        onChange={setValue}
        description={`Currency value is ${value}`}
      />
      <CurrencyInput name="amount" description={`Currency value is uncontrolled`} />
    </Stack>
  );
}
