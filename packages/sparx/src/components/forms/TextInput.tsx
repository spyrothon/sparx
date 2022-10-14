import * as React from "react";
import classNames from "classnames";

import styles from "./TextInput.module.css";

const COLOR_VARIANTS = {
  accent: styles.accent,
  default: styles.default,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  info: styles.info,
};

export type TextInputColor = keyof typeof COLOR_VARIANTS;

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "number" | "password" | "email" | "date" | "time" | "datetime-local";
  color?: TextInputColor;
}

export const TextInput = React.forwardRef(function TextInput(
  props: TextInputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { type = "text", color = "accent", value, className, onChange, ...nativeProps } = props;

  return (
    <input
      {...nativeProps}
      ref={ref}
      type={type}
      value={value}
      onChange={onChange}
      className={classNames(styles.input, COLOR_VARIANTS[color], className)}
    />
  );
});
