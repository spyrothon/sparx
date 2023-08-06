import * as React from "react";

import { RadioGroup } from "../dist";
import { getInjectedThemeContext } from "./util/Theming";

const { ThemeContext } = getInjectedThemeContext();

export default function Component() {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <RadioGroup
      options={[
        { label: "Light Theme", value: "light" },
        { label: "Dark Theme", value: "dark" },
      ]}
      value={theme}
      onChange={(event) => setTheme(event.target.value)}
    />
  );
}
