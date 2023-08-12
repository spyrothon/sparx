import * as React from "react";

import { Checkbox, Stack } from "../dist";

export default function Component() {
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);

  return (
    <Stack>
      <Checkbox checked={checked} onChange={setChecked} label="Remember Me" />
      <Checkbox label="Uncontrolled" />
      <Checkbox
        checked={checked2}
        onChange={setChecked2}
        status="success"
        label="Longer labels"
        description="Add a description with a single prop"
      />
    </Stack>
  );
}
