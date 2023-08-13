import * as React from "react";
import classNames from "classnames";

import { DOMAttributes } from "@react-types/shared";
import { Stack, Text } from "@sparx/index";

import { getInputClassNames, InputSize, InputStatus } from "../Input/Input";

import styles from "./Control.module.css";

export interface ControlConditionProps {
  isDisabled?: boolean;
  isRequired?: boolean;
}

/**
 * These props come from react-aria's input hooks to attach to their respective
 * elements in the Control.
 */
export interface ControlNestedElementProps {
  labelProps: DOMAttributes | React.LabelHTMLAttributes<HTMLLabelElement>;
  descriptionProps: DOMAttributes;
  errorMessageProps: DOMAttributes;
}

export interface ControlInputProps {
  name?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  status?: InputStatus;
  size?: InputSize;
  className?: string;
}

export interface ControlProps
  extends ControlInputProps,
    ControlConditionProps,
    ControlNestedElementProps,
    React.PropsWithChildren {}

export function Control(props: ControlProps) {
  const {
    status = "default",
    size = "medium",
    label,
    description,
    errorMessage,
    labelProps,
    descriptionProps,
    errorMessageProps,
    isDisabled = false,
    isRequired = false,
    className,
    children,
  } = props;

  return (
    <Stack
      spacing="space-sm"
      className={classNames(styles.control, ...getInputClassNames(status, size), className)}
      data-disabled={isDisabled ? true : undefined}
      data-required={isRequired ? true : undefined}>
      {label != null ? (
        <Text tag="label" className={styles.label} variant="header-xs/normal" {...labelProps}>
          {label}
        </Text>
      ) : null}
      {children}
      {description != null ? (
        <Text variant="text-sm/secondary" {...descriptionProps}>
          {description}
        </Text>
      ) : null}
      {errorMessage != null ? (
        <Text variant="header-xs/danger" {...errorMessageProps}>
          {errorMessage}
        </Text>
      ) : null}
    </Stack>
  );
}
