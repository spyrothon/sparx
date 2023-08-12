import * as React from "react";
import { FormControl, Item, Select } from "@spyrothon/sparx";

import { ThemeContext } from "../app/theming";
import { Accent, Theme } from "../../design/generated/Tokens";

const THEME_OPTIONS = [
  { name: "Dark", value: "dark" },
  { name: "Light", value: "light" },
];

const ACCENT_OPTIONS = [
  { name: "Purple", value: "purple" },
  { name: "Pink", value: "pink" },
];

export function ThemeSelector() {
  const { theme, accent, setTheme, setAccent } = React.useContext(ThemeContext);
  return (
    <>
      <Select
        label="Theme"
        items={THEME_OPTIONS}
        selectedKey={theme}
        onSelect={(theme) => setTheme(theme as Theme)}>
        {(item) => <Item key={item.value}>{item.name}</Item>}
      </Select>
      <Select
        label="Accent Color"
        items={ACCENT_OPTIONS}
        selectedKey={accent}
        onSelect={(accent) => setAccent(accent as Accent)}>
        {(item) => <Item key={item.value}>{item.name}</Item>}
      </Select>
    </>
  );
}
