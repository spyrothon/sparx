import * as React from "react";

import { RadioGroup, Theme, ThemeContext } from "../dist";

export default function Component() {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <RadioGroup
      options={[
        { label: "Light Theme", value: Theme.LIGHT },
        { label: "Dark Theme", value: Theme.DARK },
      ]}
      value={theme}
      onChange={(event) => setTheme(event.target.value as Theme)}
    />
  );
}
