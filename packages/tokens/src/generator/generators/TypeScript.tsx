import { isTokenReference, TokenReference } from "../Theme";
import { ColorToken, Tokens } from "../Tokens";
import { formatName } from "./formatName";

export function generateThemes(tokens: Tokens) {
  const { accents, colors, themes } = tokens;
  const accentNames = accents.map((accent) => accent.name);

  // {[token]: {[theme]: color|reference}}
  const tokensByColor = {} as Record<string, Record<string, ColorToken | TokenReference>>;
  // {[token]: {[theme]: stack[]}}
  const tokensByShadow = {} as Record<string, Record<string, string[]>>;
  for (const { name, colors, shadows } of themes) {
    for (const colorName in colors) {
      const color = colors[colorName];
      tokensByColor[colorName] ??= {};
      tokensByColor[colorName][name] = color;
    }

    for (const shadowName in shadows) {
      const shadow = shadows[shadowName];
      tokensByShadow[shadowName] ??= {};
      tokensByShadow[shadowName][name] = shadow;
    }
  }

  // {[token]: {[theme]: {[accent]: color}}}
  const themedAccentColorTokens = {} as Record<string, Record<string, Record<string, ColorToken>>>;
  for (const { name: themeName, colors } of themes) {
    for (const { name: accentName, tokens } of accents) {
      for (const accentToken of tokens) {
        // Accent tokens can't/shouldn't be references themselves, so this
        // cast is "safe" for now.
        const value = colors[`${accentToken}.${accentName}`] as ColorToken;

        themedAccentColorTokens[accentToken] ??= {};
        themedAccentColorTokens[accentToken][themeName] ??= {};
        themedAccentColorTokens[accentToken][themeName][accentName] = value;
      }
    }
  }

  function renderRawColorValue(color: chroma.Color) {
    return `{rawColor: '${color.hex("rgb")}', opacity: ${color.alpha()}, rgba: '${color.css(
      // @ts-expect-error chroma can do this but the types don't agree
      "rgba",
    )}', hsla: '${color.css(
      // @ts-expect-error chroma can do this but the types don't agree
      "hsla",
    )}'}`;
  }

  function renderThemeTokenColorValue(color: ColorToken) {
    if (typeof color.tokenName === "string") {
      return `rawColors.${formatName(color.tokenName, "constant")}`;
    } else {
      return renderRawColorValue(color);
    }
  }

  function resolveAccentedValue(token: TokenReference, theme: string, accent: string) {
    const tokenName = `${token}.${accent}`;
    return renderThemeTokenColorValue(tokensByColor[tokenName][theme] as ColorToken);
  }

  return `
    /** Generated Theme Tokens. Do not edit manually **/

    export type ColorTokenValue = {rawColor: string, opacity: number, rgba: string, hsla: string};

    export const rawColors = {
      ${colors
        .map((token) => `${formatName(token.tokenName, "constant")}: ${renderRawColorValue(token)}`)
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

    export type ThemeToken = {
      [K in Theme]: ColorTokenValue | {[A in Accent]: ColorTokenValue};
    }

    export const themeTokens = {
      ${Object.entries(themedAccentColorTokens).map(
        ([tokenName, themeValues]) =>
          `${formatName(tokenName, "constant")}: {
            ${Object.entries(themeValues)
              .map(
                ([themeName, accentValues]) =>
                  `${formatName(themeName, "kebab")}: {
                    ${Object.entries(accentValues)
                      .map(
                        ([accentName, color]) =>
                          `${formatName(accentName, "kebab")}: ${renderThemeTokenColorValue(
                            color,
                          )}`,
                      )
                      .join(",")}
              }`,
              )
              .join(", ")}
        }`,
      )},
      ${Object.entries(tokensByColor).map(
        ([name, themeValues]) =>
          `${formatName(name, "constant")}: { ${Object.entries(themeValues)
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
                    .join(",")}}`
                : renderThemeTokenColorValue(color);
              return `${key}: ${value}`;
            })
            .join(",")}}`,
      )}
    };

    export type ThemeTokenName = keyof typeof themeTokens;

    export function resolveThemeColorToken(name: ThemeTokenName, theme: Theme, accent: Accent): ColorTokenValue {
      const token = themeTokens[name][theme];
      if ("rawColor" in token) return token;

      return token[accent];
    }

    export const shadowTokens = {
      ${Object.entries(tokensByShadow).map(
        ([name, themeValues]) =>
          `${formatName(name, "constant")}: {
            ${Object.entries(themeValues)
              .map(([themeName, shadowStack]) => {
                const key = `"${formatName(themeName, "kebab")}"`;
                return `${key}: [${shadowStack.map((text) => `"${text}"`).join(", ")}]`;
              })
              .join(",\n")}
          }`,
      )}
    }

    export type ShadowTokenName = keyof typeof shadowTokens;

    export type ShadowTokenValue = string[]

    export function resolveThemeShadowToken(name: ShadowTokenName, theme: Theme): ShadowTokenValue {
      return shadowTokens[name][theme];
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
    resolveThemeShadowToken,
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
    resolveThemeShadowToken,
  } as const;

  export type Tokens = typeof tokens;

  export { tokens };
  export type { Accent, Theme };
  `;
}
