import * as React from "react";

import { Checkbox, Stack, Text } from "../dist";

export default function Component() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Stack>
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        label="Remember Me"
      />
      <Checkbox
        checked={checked}
        color="success"
        label={
          <>
            <Text variant="header-sm/normal">Longer labels</Text>
            <Text variant="text-sm/normal">Checkboxes can use any React Node as the label.</Text>
          </>
        }
        onChange={(event) => setChecked(event.target.checked)}
      />
    </Stack>
  );
}
