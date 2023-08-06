import type { Tokens } from "@spyrothon/tokens/generator";

const EXPECTED = {
  accents: ["primary", "background", "foreground", "hover", "active", "text", "translucent"],
  colors: [
    "background.primary",
    "background.primary",
    "background.secondary",
    "background.tertiary",
    "background.accent",
    "background.floating",
    "background.highlight",
    "background.mod.backdrop",
    "background.mod.subtle",
    "border.primary",
    "border.subtle",
    "control.background",
    "control.foreground",
    "interactive.normal",
    "interactive.hover",
    "interactive.active",
    "interactive.background.hover",
    "interactive.background.active",
    "text.normal",
    "text.secondary",
    "text.success",
    "text.info",
    "text.warning",
    "text.danger",
    "text.default",
    "text.accent",
    "text.link",
    "status.accent.primary",
    "status.accent.background",
    "status.accent.foreground",
    "status.accent.hover",
    "status.accent.active",
    "status.accent.translucent",
    "status.success.background",
    "status.success.foreground",
    "status.success.hover",
    "status.success.active",
    "status.success.translucent",
    "status.warning.background",
    "status.warning.foreground",
    "status.warning.hover",
    "status.warning.active",
    "status.warning.translucent",
    "status.danger.background",
    "status.danger.foreground",
    "status.danger.hover",
    "status.danger.active",
    "status.danger.translucent",
    "status.info.background",
    "status.info.foreground",
    "status.info.hover",
    "status.info.active",
    "status.info.translucent",
    "status.default.background",
    "status.default.foreground",
    "status.default.hover",
    "status.default.active",
    "status.default.translucent",
  ],
  fonts: ["normal", "accent", "monospace"],
  spaces: ["xxxs", "xxs", "xs", "sm", "md", "lg", "xl", "xxl", "xxxl"],
  radii: ["flat", "minimal", "normal", "large", "full"],
};

/**
 * Validate that all of the necessary tokens for Sparx to function
 * are present in the given token set.
 */
export function validateTokens(tokens: Tokens): Tokens {
  const errors = [];

  for (const accent of tokens.accents) {
    for (const expected of EXPECTED.accents) {
      if (!accent.tokens.includes(`accent.${expected}`)) {
        errors.push({
          type: "accentToken",
          description: `Accent "${accent.name}" does not define a token value for ${expected}`,
        });
      }
    }
  }

  for (const theme of tokens.themes) {
    for (const expected of EXPECTED.colors) {
      if (theme.colors[expected] == null) {
        errors.push({
          type: "themeColor",
          description: `Token ${expected} is not defined for theme ${theme.name}`,
        });
      }
    }
  }

  const fontNames = tokens.fontStacks.map((stack) => stack.name);
  for (const expected of EXPECTED.fonts) {
    if (!fontNames.includes(expected)) {
      errors.push({
        type: "font",
        description: `Font token "${expected}" does not have a definition`,
      });
    }
  }
  const spaceNames = tokens.spaces.map((stack) => stack.name);
  for (const expected of EXPECTED.spaces) {
    if (!spaceNames.includes(expected)) {
      errors.push({
        type: "space",
        description: `Spacing token "${expected}" does not have a definition`,
      });
    }
  }
  const radiiNames = tokens.radii.map((stack) => stack.name);
  for (const expected of EXPECTED.radii) {
    if (!radiiNames.includes(expected)) {
      errors.push({
        type: "radius",
        description: `Radius ${expected} does not have a definition`,
      });
    }
  }

  if (errors.length > 0) {
    console.error(errors);
    throw errors;
  }

  return tokens;
}
