import * as chroma from "chroma-js";

import { ColorToken } from "./Tokens";

export interface ColorPalette<Name extends string> {
  (color: Name): ColorToken;
  all(): ColorToken[];
}

export function makeColorPalette<Name extends string>(
  definitions: Record<Name, string>,
): ColorPalette<Name> {
  const tokens = {} as Record<Name, ColorToken>;
  for (const [name, hex] of Object.entries<string>(definitions)) {
    const color = chroma(hex) as ColorToken;
    color.tokenName = name;
    tokens[name] = color;
  }

  const palette = (color: Name) => tokens[color];
  palette.all = () => Object.values<ColorToken>(tokens);

  return palette;
}
