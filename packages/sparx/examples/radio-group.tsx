import * as React from "react";

import { RadioGroup } from "../dist";

export default function Component() {
  const [selected, setSelected] = React.useState("");

  return (
    <RadioGroup
      options={[
        { label: "Option One", value: "one" },
        { label: "Option Two", value: "two" },
        { label: "Option Three", value: "three" },
      ]}
      value={selected}
      onChange={(event) => setSelected(event.target.value)}
    />
  );
}
