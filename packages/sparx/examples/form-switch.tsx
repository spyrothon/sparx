import * as React from "react";

import { FormSwitch } from "../dist";

export default function Component() {
  const [checked, setChecked] = React.useState(false);

  return (
    <FormSwitch
      label="Enable a super secret setting"
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      note="Do something super secret. Doesn't actually do anything, but you can pretend that it does."
    />
  );
}