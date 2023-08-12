import * as React from "react";

import { RadioGroup, RadioItem } from "../dist";

export default function Component() {
  const [selected, setSelected] = React.useState("");

  const OPTIONS = [
    { label: "Option One", value: "one" },
    { label: "Option Two", value: "two" },
    { label: "Option Three", value: "three" },
  ];

  return (
    <RadioGroup
      label="Select an Option"
      description="These options don't do anything, but the Theme Selector below does!"
      value={selected}
      onChange={setSelected}>
      {OPTIONS.map((option) => (
        <RadioItem key={option.value} value={option.value}>
          {option.label}
        </RadioItem>
      ))}
    </RadioGroup>
  );
}
