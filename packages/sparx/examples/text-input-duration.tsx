import * as React from "react";

import { DurationInput, Stack } from "../dist";

export default function Component() {
  const [value, setValue] = React.useState(1505);

  return (
    <Stack spacing="space-md">
      <DurationInput
        label="Estimate"
        value={value}
        onChange={setValue}
        description={`Duration is ${value} seconds`}
      />
      <DurationInput
        name="estimate"
        label="Uncontrolled Estimate"
        description="Duration is uncontrolled."
      />
    </Stack>
  );
}
