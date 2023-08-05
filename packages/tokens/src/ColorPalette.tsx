import * as chroma from "chroma-js";

import { ColorToken } from "./Tokens";

export interface ColorPalette<Name extends string = string> {
  (color: Name): chroma.Color;
  all(): ColorToken[];
}

export function makeColorPalette<Name extends string>(
  definitions: Record<Name, string>,
): ColorPalette<Name> {
  const tokens = {} as Record<Name, ColorToken>;
  for (const [name, hex] of Object.entries<string>(definitions)) {
    tokens[name] = { name, value: chroma(hex) };
  }

  const palette = (color: Name) => tokens[color].value;
  palette.all = () => Object.values<ColorToken>(tokens);

  return palette;
}
