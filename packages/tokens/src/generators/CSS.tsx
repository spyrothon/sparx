import { CustomFontDefinition, FontDefinition } from "../FontPalette";
import { isTokenReference } from "../Theme";
import { Tokens } from "../Tokens";
import { formatName } from "./formatName";

export function generateColors(tokens: Tokens) {
  const { colors } = tokens;

  return `
  /** Generated Color Tokens. Do not edit manually **/

  :root {
      ${colors
        .map(({ name, value }) => `${formatName(name, "css")}: ${value.css("hsl")};`)
        .join("\n")}
    }`;
}

export function generateThemeColors(tokens: Tokens) {
  const { themes, accents } = tokens;
  const accentStyles = accents.map(
    (accent) => `${formatName(`accent-${accent.name}`, "cssClass")} {
      ${accent.tokens
        .map(
          (token) =>
            `${formatName(`${token}`, "css")}: ${formatName(
              `${token}.${accent.name}`,
              "cssReference",
            )};`,
        )
        .join("\n")}
    }`,
  );

  const themeStyles = themes.map(
    (theme) =>
      `
        ${formatName(`theme-${theme.name}`, "cssClass")} {
        ${Object.entries(theme.colors)
          .map(([colorName, color]) => {
            const name = formatName(colorName, "css");
            const value = isTokenReference(color)
              ? formatName(color, "cssReference")
              : color.css("hsl");
            return `${name}: ${value};`;
          })
          .join("\n")}
        }`,
  );

  return `/** Generated Theme Tokens. Do not edit manually **/

  ${themeStyles.join("\n\n")}
  ${accentStyles.join("\n\n")}
    `;
}

function resolveFontName(font: FontDefinition) {
  const name = typeof font === "string" ? font : font.name;

  if (name.includes(" ")) return `"${name}"`;
  return name;
}

export function generateFonts(tokens: Tokens) {
  const { fontStacks } = tokens;

  const customFonts = fontStacks
    .flatMap((token) => token.stack)
    .filter((font): font is CustomFontDefinition => typeof font !== "string");

  const imports = customFonts.map((font) => `@import url(${font.importUrl});`);
  const stacks = [];
  for (const { name, stack } of fontStacks) {
    stacks.push(`${formatName(`font-${name}`, "css")}: ${stack.map(resolveFontName).join(", ")};`);
  }
  // TODO: This is intentionally lossy. Inside the design system, we want to
  // know the set of weights that can be used, but we can't know the names of
  // the fonts that will be there. So this just takes the first set of
  // definitions and uses those as the generic ones for internal use.
  const weights = [];
  for (const [weight, value] of Object.entries(fontStacks[0].weights)) {
    weights.push(`${formatName(`font-weight-${weight}`, "css")}: ${value};`);
  }

  return `
  /** Generated Font Tokens. Do not edit manually **/

  ${imports.join("\n")}

  :root {
    ${stacks.join("\n")}
    ${weights.join("\n")}
  }`;
}

export function generateSpacing(tokens: Tokens) {
  const { spaces } = tokens;

  return `
  /** Generated Space Tokens. Do not edit manually **/

  :root {
      ${spaces
        .map(({ name, value }) => `${formatName(`space-${name}`, "css")}: ${value}px;`)
        .join("\n")}
    }`;
}
export function generateRadii(tokens: Tokens) {
  const { radii } = tokens;

  return `
  /** Generated Radius Tokens. Do not edit manually **/

  :root {
      ${radii
        .map(({ name, value }) => `${formatName(`radius-${name}`, "css")}: ${value}px;`)
        .join("\n")}
    }`;
}

export function generateSystem(files: string[]) {
  return `
  ${files.map((file) => `@import "./${file}";`).join("\n")}
  `;
}
