/** Generated file. Do not edit manually */

import {
  Accent,
  Accents,
  rawColors,
  resolveThemeColorToken,
  Theme,
  Themes,
  themeTokens as colors,
} from "./Themes";

let tokens = {
  rawColors,
  colors,
  themes: Themes,
  accents: Accents,
  resolveThemeColorToken,
} as const;

export type Tokens = typeof tokens;

export { tokens, type Accent, type Theme };