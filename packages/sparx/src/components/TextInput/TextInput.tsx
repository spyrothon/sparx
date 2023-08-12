import * as React from "react";
import classNames from "classnames";
import { AriaTextFieldProps, useTextField } from "react-aria";

import { useSetRef } from "@sparx/utils/RefUtils";

import { Control, ControlInputProps } from "../FormControl/Control";

import styles from "../Input/Input.module.css";

export interface TextInputProps extends AriaTextFieldProps, ControlInputProps {
  inputClassName?: string;
}

export const TextInput = React.forwardRef(function TextInput(
  props: TextInputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { inputClassName } = props;
  const innerRef = React.useRef<HTMLInputElement>(null);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    props,
    innerRef,
  );
  const setRef = useSetRef(innerRef, ref);

  return (
    <Control
      {...props}
      labelProps={labelProps}
      descriptionProps={descriptionProps}
      errorMessageProps={errorMessageProps}>
      <input {...inputProps} ref={setRef} className={classNames(styles.input, inputClassName)} />
    </Control>
  );
});
