import { isTokenReference, TokenReference } from "../Theme";
import { Tokens } from "../Tokens";
import { formatName } from "./formatName";

export function generateThemes(tokens: Tokens) {
  const { accents, colors, themes } = tokens;
  const accentNames = accents.map((accent) => accent.name);

  const tokensByColor = {} as Record<string, Record<string, chroma.Color | TokenReference>>;
  for (const { name, colors } of themes) {
    for (const colorName in colors) {
      const color = colors[colorName];
      tokensByColor[colorName] ??= {};
      tokensByColor[colorName][name] = color;
    }
  }

  function renderThemeTokenColorValue(color: chroma.Color) {
    return `{rawColor: '${color.hex("rgb")}', opacity: ${color.alpha()}, rgba: '${color.css(
      // @ts-expect-error chroma can do this but the types don't agree
      "rgba",
    )}', hsla: '${color.css(
      // @ts-expect-error chroma can do this but the types don't agree
      "hsla",
    )}'}`;
  }

  function resolveAccentedValue(token: TokenReference, theme: string, accent: string) {
    const tokenName = `${token}.${accent}`;
    return renderThemeTokenColorValue(tokensByColor[tokenName][theme] as chroma.Color);
  }

  return `
  /** Generated Theme Tokens. Do not edit manually **/

  export interface RawColorValue {
    name: string;
    hsl: string;
    rgb: string;
    hslCSS: string;
    rgbCSS: string;
  }

  export const rawColors = {
    ${colors
      .map(
        ({ name, value }) =>
          `${formatName(name, "constant")}: { name: "${formatName(
            name,
            "original",
          )}", rgb: "${value.hex()}"}`,
      )
      .join(",\n")}
  } as const;

  export type RawColorName = keyof typeof rawColors;

  export const Themes = [
    ${themes.map(({ name }) => `'${formatName(name, "kebab")}'`).join(",\n")}
  ] as const;
  export type Theme = typeof Themes[number];

  export const Accents = [
    ${accents.map(({ name }) => `'${formatName(name, "kebab")}'`).join(",\n")}
  ] as const;
  export type Accent = typeof Accents[number];

  export type ThemeTokenValue = {rawColor: string, opacity: number, rgba: string, hsla: string};

  export type ThemeToken = {
    [K in Theme]: ThemeTokenValue | {[A in Accent]: ThemeTokenValue};
  }

  export const themeTokens = {
    ${Object.entries(tokensByColor).map(
      ([name, themeValues]) =>
        `${formatName(name, "constant")}: {
          ${Object.entries(themeValues)
            .map(([themeName, color]) => {
              const key = `"${formatName(themeName, "kebab")}"`;
              const value = isTokenReference(color)
                ? `{${accentNames
                    .map(
                      (accentName) =>
                        `"${formatName(accentName, "kebab")}": ${resolveAccentedValue(
                          color,
                          themeName,
                          accentName,
                        )}`,
                    )
                    .join(",\n")}}`
                : renderThemeTokenColorValue(color);
              return `${key}: ${value}`;
            })
            .join(",\n")}
        }`,
    )}
  };

  export type ThemeTokenName = keyof typeof themeTokens;

  export function resolveThemeColorToken(name: ThemeTokenName, theme: Theme, accent: Accent): ThemeTokenValue {
    const token = themeTokens[name][theme];
    if ("rawColor" in token) return token;

    return token[accent];
  }
`;
}

export function generateTokens() {
  return `
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

  const tokens = {
    rawColors,
    colors,
    themes: Themes,
    accents: Accents,
    resolveThemeColorToken,
  } as const;

  export type Tokens = typeof tokens;

  export { tokens, type Accent, type Theme };
  `;
}
