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
