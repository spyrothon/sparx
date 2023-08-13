import * as React from "react";
import classNames from "classnames";
import { AriaTextFieldProps, useTextField } from "react-aria";

import { useSetRef } from "@sparx/utils/RefUtils";

import { Control, ControlInputProps } from "../Control/Control";
import { InputAttachmentProps, InputWithAttachments, useInputStyleClasses } from "../Input/Input";

export interface TextInputProps
  extends AriaTextFieldProps,
    ControlInputProps,
    InputAttachmentProps {
  inputClassName?: string;
}

export const TextInput = React.forwardRef(function TextInput(
  props: TextInputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const innerRef = React.useRef<HTMLInputElement>(null);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    props,
    innerRef,
  );
  const setRef = useSetRef(innerRef, ref);
  const inputStyles = useInputStyleClasses(props);

  return (
    <Control
      {...props}
      labelProps={labelProps}
      descriptionProps={descriptionProps}
      errorMessageProps={errorMessageProps}>
      <InputWithAttachments {...props}>
        <input
          {...inputProps}
          className={classNames(inputStyles.inputReset, inputStyles.inputPadding)}
          ref={setRef}
        />
      </InputWithAttachments>
    </Control>
  );
});
