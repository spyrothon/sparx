import { useResolvedColorToken } from "../ThemeProvider/ThemeProvider";

import styles from "./Input.module.css";

export const STATE_VARIANTS = {
  default: styles.default,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  info: styles.info,
  blank: styles.blank,
  inherit: styles.inherit,
};

export type InputState = keyof typeof STATE_VARIANTS;

export const SIZE_VARIANTS = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
  xlarge: styles.xlarge,
};

export type InputSize = keyof typeof SIZE_VARIANTS;

export function getInputClassNames(
  color: keyof typeof STATE_VARIANTS,
  size?: keyof typeof SIZE_VARIANTS,
): string[] {
  const classes = [STATE_VARIANTS[color]];
  if (size != null) classes.push(SIZE_VARIANTS[size]);
  return classes;
}

type InputColorToken = "color" | "foreground";

const INPUT_COLOR_TOKEN_MAP = {
  default: {
    color: "ACCENT_PRIMARY",
    foreground: "ACCENT_FOREGROUND",
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

export function useInputColorToken(color: InputState, token: InputColorToken) {
  const tokenName = INPUT_COLOR_TOKEN_MAP[color][token];
  const resolvedToken = useResolvedColorToken(tokenName);

  return tokenName === "transparent" ? tokenName : resolvedToken;
}
