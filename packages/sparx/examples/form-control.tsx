import * as React from "react";

import { FormControl, RadioGroup, Stack, TextInput } from "../dist";

export default function Component() {
  const [selected, setSelected] = React.useState("one");

  return (
    <Stack spacing="space-lg">
      <FormControl label="Username" note="Usernames may only contain letters and numbers.">
        <TextInput placeholder="ripto" />
      </FormControl>
      <FormControl
        label="Select an Option"
        note="Selecting an option won't do anything on this page">
        <RadioGroup
          options={[
            { label: "Option One", value: "one" },
            { label: "Option Two", value: "two" },
            { label: "Option Three", value: "three" },
          ]}
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
        />
      </FormControl>
    </Stack>
  );
}
