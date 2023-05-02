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

export function getInputClassNames(color: keyof typeof COLOR_VARIANTS): string[] {
  return [COLOR_VARIANTS[color]];
}
