import * as chroma from "chroma-js";

import { FontDefinition, FontWeightMap } from "./FontPalette";
import { Accent, Theme } from "./Theme";
import { FontStackToken, RadiusToken, SpaceToken } from "./Tokens";

function makeThemeObjects<ThemeName extends string>(
  names: readonly string[],
): Record<ThemeName, Theme> {
  return names.reduce(
    (acc, name) => {
      acc[name] = { name, colors: {} };
      return acc;
    },
    {} as Record<string, Theme>,
  );
}

export class TokenGenerator<
  const T extends readonly string[] = readonly string[],
  const AT extends readonly string[] = readonly string[],
  ThemeName extends T[number] = T[number],
  AccentToken extends AT[number] = AT[number],
  AccentReference extends `accent.${AccentToken}` = `accent.${AccentToken}`,
> {
  /**
   * List of names for the themes that this generator is creating.
   */
  themeNames: T;
  /**
   * List of names for the accents that this generator is creating.
   */
  accentNames: string[];
  /**
   * List of token names that each accent must define.
   */
  accentTokens: string[];
  /**
   * List of font tokens.
   */
  #fontStacks: FontStackToken[];
  /**
   * List of spacing tokens.
   */
  #spaceTokens: SpaceToken[];
  /**
   * List of radius tokens.
   */
  #radiusTokens: RadiusToken[];

  /**
   * Internal map of themed token definitions. Use `getGeneratedThemes` to
   * retrieve these instead.
   */
  #themes: Record<ThemeName, Theme>;

  constructor(options: { themeNames: T; accentTokens: AT }) {
    this.themeNames = options.themeNames;
    this.#themes = makeThemeObjects<ThemeName>(options.themeNames);

    this.accentTokens = options.accentTokens.map((token) => `accent.${token}`);
    this.accentNames = [];

    this.#fontStacks = [];
    this.#spaceTokens = [];
    this.#radiusTokens = [];
  }

  /**
   * Define a new color token and its values for each theme.
   *
   * @param name Name of the token, using `dot.specifier.syntax`.
   * @param values Map of the value the token will take for each theme.
   */
  color(name: string, values: Record<ThemeName, chroma.Color | AccentReference>) {
    for (const theme in values) {
      this.#themes[theme].colors[name] = values[theme];
    }
  }

  /**
   * Define a new accent and the values for all of the accent tokens for each theme.
   *
   * @param name Name of the accent. This should just be a simple name with no specifiers or nesting.
   * @param values Map of the values that each accent token will take in each theme.
   */
  accent(name: string, values: Record<AccentToken, Record<ThemeName, chroma.Color>>) {
    this.accentNames.push(name);
    for (const definition in values) {
      this.color(`accent.${definition}.${name}`, values[definition]);
    }
  }

  fontStack(name: string, { stack, weights }: { stack: FontDefinition[]; weights: FontWeightMap }) {
    this.#fontStacks.push({ name, stack, weights });
  }

  /**
   * Define a new spacing token and its value. Right now the value is assumed to be pixels.
   */
  space(name: string, value: number) {
    this.#spaceTokens.push({ name, value });
  }

  /**
   * Define a new radius token and its value. Right now the value is assumed to be pixels.
   */
  radius(name: string, value: number) {
    this.#radiusTokens.push({ name, value });
  }

  /**
   * Returns the list of generated themes, with all of the colors and accent
   * values computed.
   */
  getGeneratedThemes(): Theme[] {
    return Object.values(this.#themes);
  }

  /**
   * Returns the list of generated accents, but not their values. Used for
   * creating token mappings from accent-specific tokens to accent-agnostic
   * tokens, allowing themes to reference accent colors without having to know
   * all of the available accents.
   */
  getGeneratedAccents(): Accent[] {
    return this.accentNames.map((name) => ({ name, tokens: this.accentTokens }));
  }

  getFontStackTokens(): FontStackToken[] {
    return this.#fontStacks;
  }

  getSpaceTokens(): SpaceToken[] {
    return this.#spaceTokens;
  }

  getRadiusTokens(): RadiusToken[] {
    return this.#radiusTokens;
  }
}
