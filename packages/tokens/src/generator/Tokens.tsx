import type chroma from "chroma-js";

import type { ColorPalette } from "./ColorPalette";
import { FontDefinition, FontWeightMap } from "./FontPalette";
import type { Accent, Theme } from "./Theme";
import type { TokenGenerator } from "./TokenGenerator";

export interface Token {
  name: string;
}

export type ColorToken = chroma.Color & { tokenName?: string };

export interface ShadowToken extends Token {
  value: string[];
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

interface MakeTokensOptions<T extends string> {
  colors: ColorPalette<T>;
  tokens: TokenGenerator;
}

export function makeTokens<T extends string>({ colors, tokens }: MakeTokensOptions<T>): Tokens {
  const computedTokens = {
    colors: colors.all(),
    accents: tokens.getGeneratedAccents(),
    themes: tokens.getGeneratedThemes(),
    fontStacks: tokens.getFontStackTokens(),
    spaces: tokens.getSpaceTokens(),
    radii: tokens.getRadiusTokens(),
  };

  return computedTokens;
}
