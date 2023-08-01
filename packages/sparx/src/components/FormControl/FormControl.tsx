import * as React from "react";
import classNames from "classnames";

import { Text, TextVariantColor } from "@sparx/index";

import { getInputClassNames, InputColor } from "../Input/Input";
import { TextVariantSize } from "../Text/Text";

import styles from "./FormControl.module.css";

const LABEL_SIZES: Record<string, TextVariantSize> = {
  normal: "header-xs",
};

export type FormControlSize = keyof typeof LABEL_SIZES;

export interface FormControlProps {
  label?: React.ReactNode;
  /**
   * Color to use for the label text above the input.
   */
  labelColor?: TextVariantColor;
  /**
   * Color to use across the input and it's prefix/suffix.
   */
  color?: InputColor;
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
    labelColor = "normal",
    color = "accent",
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
      className={classNames(styles.control, ...getInputClassNames(color), {
        [styles.disabled]: disabled,
      })}>
      {label != null ? (
        <Text tag="label" variant={`${labelSize}/${labelColor}`} className={styles.label}>
          {label}
        </Text>
      ) : null}
      <div className={styles.inputRow}>
        {prefix != null ? <PrefixNode className={styles.prefix}>{prefix}</PrefixNode> : null}
        {children}
        {suffix != null ? <SuffixNode className={styles.suffix}>{suffix}</SuffixNode> : null}
      </div>
      {note != null ? (
        <Text className={styles.note} variant={`text-sm/${labelColor}`}>
          {note}
        </Text>
      ) : null}
    </div>
  );
}
