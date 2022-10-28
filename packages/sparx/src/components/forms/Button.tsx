import * as React from "react";
import classNames from "classnames";

import styles from "./Button.module.css";

const COLOR_VARIANTS = {
  primary: styles.primary,
  default: styles.default,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  info: styles.info,
  link: styles.link,
};

const LOOK_VARIANTS = {
  filled: styles.filled,
  outline: styles.outline,
};

export type ButtonVariantColor = keyof typeof COLOR_VARIANTS;
export type ButtonVariantLook = keyof typeof LOOK_VARIANTS;
export type ButtonVariant = ButtonVariantColor | `${ButtonVariantColor}/${ButtonVariantLook}`;

function getVariantPieces(variant: ButtonVariant): [ButtonVariantColor, ButtonVariantLook] {
  const [size, color] = variant.split("/");
  return [size as ButtonVariantColor, color as ButtonVariantLook];
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

/**
 * Return the class name(s) used to style a button like the given variant. If
 * `variant` is undefined, no button styles will be applied, but `className` will
 * still be returned.
 */
export function getButtonClassNames(
  variant: ButtonVariant | undefined,
  { className }: { className?: string } = {},
) {
  if (variant == null) return className;

  const [color, look = "filled"] = getVariantPieces(variant);
  return classNames(styles.button, LOOK_VARIANTS[look], COLOR_VARIANTS[color], className);
}

export const Button = React.forwardRef(function Button(
  props: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { variant = "default", ...nativeProps } = props;

  return (
    <button
      {...nativeProps}
      ref={ref}
      className={getButtonClassNames(variant, { className: props.className })}
    />
  );
});
