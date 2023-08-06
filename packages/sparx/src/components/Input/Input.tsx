import { useResolvedColorToken } from "../ThemeProvider/ThemeProvider";

import styles from "./Input.module.css";

export const COLOR_VARIANTS = {
  accent: styles.accent,
  default: styles.default,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  info: styles.info,
  blank: styles.blank,
  inherit: styles.inherit,
};

export type InputColor = keyof typeof COLOR_VARIANTS;

export const SIZE_VARIANTS = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
  xlarge: styles.xlarge,
};

export type InputSize = keyof typeof SIZE_VARIANTS;

export function getInputClassNames(
  color: keyof typeof COLOR_VARIANTS,
  size?: keyof typeof SIZE_VARIANTS,
): string[] {
  const classes = [COLOR_VARIANTS[color]];
  if (size != null) classes.push(SIZE_VARIANTS[size]);
  return classes;
}

type InputColorToken = "color" | "foreground";

const INPUT_COLOR_TOKEN_MAP = {
  accent: {
    color: "STATUS_ACCENT_PRIMARY",
    foreground: "STATUS_ACCENT_FOREGROUND",
  },
  default: {
    color: "STATUS_DEFAULT_BACKGROUND",
    foreground: "STATUS_DEFAULT_FOREGROUND",
  },
  success: {
    color: "STATUS_SUCCESS_BACKGROUND",
    foreground: "STATUS_SUCCESS_FOREGROUND",
  },
  warning: {
    color: "STATUS_WARNING_BACKGROUND",
    foreground: "STATUS_WARNING_FOREGROUND",
  },
  danger: {
    color: "STATUS_DANGER_BACKGROUND",
    foreground: "STATUS_DANGER_FOREGROUND",
  },
  info: {
    color: "STATUS_INFO_BACKGROUND",
    foreground: "STATUS_INFO_FOREGROUND",
  },
  blank: {
    color: "transparent",
    foreground: "INTERACTIVE_NORMAL",
  },
  inherit: {
    color: "transparent",
    foreground: "transparent",
  },
};

export function useInputColorToken(color: InputColor, token: InputColorToken) {
  const tokenName = INPUT_COLOR_TOKEN_MAP[color][token];
  const resolvedToken = useResolvedColorToken(tokenName);

  return tokenName === "transparent" ? tokenName : resolvedToken;
}
