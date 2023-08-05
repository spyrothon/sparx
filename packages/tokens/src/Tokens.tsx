import type chroma from "chroma-js";

import type { ColorPalette } from "./ColorPalette";
import { FontDefinition, FontWeightMap } from "./FontPalette";
import type { Accent, Theme } from "./Theme";
import type { TokenGenerator } from "./TokenGenerator";

export interface Token {
  name: string;
}

export interface ColorToken extends Token {
  value: chroma.Color;
}

export interface SpaceToken extends Token {
  value: number;
}

export interface RadiusToken extends Token {
  value: number;
}

export interface FontStackToken extends Token {
  stack: FontDefinition[];
  weights: FontWeightMap;
}

export interface Tokens {
  colors: ColorToken[];
  accents: Accent[];
  themes: Theme[];
  fontStacks: FontStackToken[];
  spaces: SpaceToken[];
  radii: RadiusToken[];
}

export function makeTokens({
  colors,
  tokens,
}: {
  colors: ColorPalette;
  tokens: TokenGenerator;
}): Tokens {
  return {
    colors: colors.all(),
    accents: tokens.getGeneratedAccents(),
    themes: tokens.getGeneratedThemes(),
    fontStacks: tokens.getFontStackTokens(),
    spaces: tokens.getSpaceTokens(),
    radii: tokens.getRadiusTokens(),
  };
}
