import * as React from "react";
import classNames from "classnames";

import { Text, TextVariantColor } from "@sparx/index";

import { TextVariantSize } from "../text/Text";

import styles from "./FormControl.module.css";

const LABEL_SIZES: Record<string, TextVariantSize> = {
  normal: "header-sm",
  small: "header-xs",
};

export type FormControlSize = keyof typeof LABEL_SIZES;

export interface FormControlProps {
  label?: React.ReactNode;
  note?: React.ReactNode;
  color?: TextVariantColor;
  size?: FormControlSize;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
}

export function FormControl(props: FormControlProps) {
  const {
    label,
    note,
    color = "normal",
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
    <div className={classNames(styles.control, { [styles.disabled]: disabled })}>
      {label != null ? (
        <Text tag="label" variant={`${labelSize}/${color}`} className={styles.label}>
          {label}
        </Text>
      ) : null}
      <div className={styles.inputRow}>
        {prefix != null ? <PrefixNode className={styles.attachment}>{prefix}</PrefixNode> : null}
        {children}
        {suffix != null ? <SuffixNode className={styles.attachment}>{suffix}</SuffixNode> : null}
      </div>
      {note != null ? (
        <Text className={styles.note} variant={`text-sm/${color}`}>
          {note}
        </Text>
      ) : null}
    </div>
  );
}
