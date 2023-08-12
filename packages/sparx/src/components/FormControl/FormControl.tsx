import * as React from "react";
import classNames from "classnames";

import { Text, TextVariantColor } from "@sparx/index";

import { getInputClassNames, InputStatus } from "../Input/Input";
import { TextVariantSize } from "../Text/Text";

import styles from "./FormControl.module.css";

const LABEL_SIZES: Record<string, TextVariantSize> = {
  normal: "header-xs",
};

export type FormControlSize = keyof typeof LABEL_SIZES;

function getErrorTextVariantColor(state: InputStatus): TextVariantColor {
  switch (state) {
    case "danger":
    case "warning":
      return "danger";
    default:
      return "normal";
  }
}

export interface FormControlProps {
  label?: React.ReactNode;
  state?: InputStatus;
  /**
   * Conditional error text to display above the input
   */
  error?: React.ReactNode;
  note?: React.ReactNode;
  size?: FormControlSize;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
}

export function FormControl(props: FormControlProps) {
  const {
    label,
    state = "default",
    error,
    note,
    size = "normal",
    prefix,
    suffix,
    disabled = false,
    children,
  } = props;
  const labelSize = LABEL_SIZES[size];

  const PrefixNode = typeof prefix === "string" ? Text : "div";
  const SuffixNode = typeof suffix === "string" ? Text : "div";

  return (
    <div
      className={classNames(styles.control, ...getInputClassNames(state), {
        [styles.disabled]: disabled,
      })}>
      {label != null ? (
        <Text tag="label" className={styles.label} variant={`${labelSize}/normal`}>
          {label}
        </Text>
      ) : null}
      <div className={styles.inputRow}>
        {prefix != null ? <PrefixNode className={styles.prefix}>{prefix}</PrefixNode> : null}
        {children}
        {suffix != null ? <SuffixNode className={styles.suffix}>{suffix}</SuffixNode> : null}
      </div>
      {error != null ? (
        <Text variant={`header-xs/${getErrorTextVariantColor(state)}`}>{error}</Text>
      ) : null}
      {note != null ? <Text variant="text-sm/secondary">{note}</Text> : null}
    </div>
  );
}
