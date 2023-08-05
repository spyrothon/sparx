import * as React from "react";
import classNames from "classnames";
import filterInvalidDOMProps from "filter-invalid-dom-props";
import { AriaButtonProps, useButton } from "react-aria";

import { useSetRef } from "@sparx/utils/RefUtils";

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

const SIZE_VARIANTS = {
  sm: styles.small,
  md: styles.medium,
  lg: styles.large,
};

export type ButtonVariantColor = keyof typeof COLOR_VARIANTS;
export type ButtonVariantLook = keyof typeof LOOK_VARIANTS;
export type ButtonVariantSize = keyof typeof SIZE_VARIANTS;
export type ButtonVariant =
  | ButtonVariantColor
  | `${ButtonVariantColor}/${ButtonVariantLook}`
  | `${ButtonVariantColor}/${ButtonVariantLook}/${ButtonVariantSize}`;

function getVariantPieces(
  variant: ButtonVariant,
): [ButtonVariantColor, ButtonVariantLook | undefined, ButtonVariantSize | undefined] {
  const [color, look, size] = variant.split("/");
  return [
    color as ButtonVariantColor,
    look as ButtonVariantLook | undefined,
    size as ButtonVariantSize | undefined,
  ];
}

export interface ButtonIconProps {
  className: string;
  size: string;
}

export interface ButtonProps extends AriaButtonProps<"button"> {
  variant?: ButtonVariant;
  icon?: (props: ButtonIconProps) => JSX.Element;
  className?: string;
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

  const [color, look = "filled", size = "md"] = getVariantPieces(variant);
  return classNames(
    styles.button,
    LOOK_VARIANTS[look],
    COLOR_VARIANTS[color],
    SIZE_VARIANTS[size],
    className,
  );
}

export const Button = React.forwardRef(function Button(
  props: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { variant = "default", icon: Icon, children, ...nativeProps } = props;
  const innerRef = React.useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(nativeProps, innerRef);
  const setRef = useSetRef(ref, innerRef);

  return (
    <button
      {...filterInvalidDOMProps(nativeProps)}
      {...buttonProps}
      ref={setRef}
      className={getButtonClassNames(variant, {
        className: classNames(props.className, {
          [styles.iconOnly]: Icon != null && React.Children.count(children) === 0,
        }),
      })}>
      {children}
      {Icon != null ? <Icon className={styles.icon} size="1em" /> : null}
    </button>
  );
});
