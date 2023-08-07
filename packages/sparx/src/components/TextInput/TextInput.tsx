import * as React from "react";
import classNames from "classnames";

import { getInputClassNames, InputSize, InputState } from "../Input/Input";

import styles from "../Input/Input.module.css";

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  type?: "text" | "number" | "password" | "email" | "date" | "time" | "datetime-local";
  state?: InputState;
  size?: InputSize;
}

export const TextInput = React.forwardRef(function TextInput(
  props: TextInputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    type = "text",
    state = "accent",
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
      className={classNames(styles.input, ...getInputClassNames(state, size), className)}
    />
  );
});
