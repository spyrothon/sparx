import * as React from "react";
import classNames from "classnames";

import { getInputClassNames, InputColor } from "./Input";

import styles from "./TextInput.module.css";

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "number" | "password" | "email" | "date" | "time" | "datetime-local";
  color?: InputColor;
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
      className={classNames(styles.input, ...getInputClassNames(color), className)}
    />
  );
});
