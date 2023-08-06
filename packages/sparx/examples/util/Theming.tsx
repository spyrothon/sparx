import type { CreateThemeContextReturn } from "../../dist";

let themeContext: CreateThemeContextReturn<string, string, string> | undefined = undefined;

export function setThemeContext(context: CreateThemeContextReturn<string, string, string>) {
  themeContext = context;
}

export function getInjectedThemeContext() {
  return themeContext!;
}
