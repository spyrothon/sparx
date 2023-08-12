import * as React from "react";

import { RadioGroup, RadioItem } from "../dist";
import { getInjectedThemeContext } from "./util/Theming";

const { ThemeContext } = getInjectedThemeContext();

export default function Component() {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const OPTIONS = [
    { label: "Light Theme", value: "light" },
    { label: "Dark Theme", value: "dark" },
  ];

  return (
    <RadioGroup value={theme} onChange={setTheme}>
      {OPTIONS.map((option) => (
        <RadioItem key={option.value} value={option.value}>
          {option.label}
        </RadioItem>
      ))}
    </RadioGroup>
  );
}
