import * as React from "react";
import classNames from "classnames";

import { getInputClassNames, InputColor, InputSize } from "../Input/Input";

import styles from "./TextInput.module.css";

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  type?: "text" | "number" | "password" | "email" | "date" | "time" | "datetime-local";
  color?: InputColor;
  size?: InputSize;
}

export const TextInput = React.forwardRef(function TextInput(
  props: TextInputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    type = "text",
    color = "accent",
    size = "medium",
    value,
    className,
    onChange,
    ...nativeProps
  } = props;

  return (
    <input
      {...nativeProps}
      ref={ref}
      type={type}
      value={value}
      onChange={onChange}
      className={classNames(styles.input, ...getInputClassNames(color, size), className)}
    />
  );
});
