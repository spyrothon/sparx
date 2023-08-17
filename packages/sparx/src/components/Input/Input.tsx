import * as React from "react";
import classNames from "classnames";

import { useResolvedColorToken } from "../ThemeProvider/ThemeProvider";

import styles from "./Input.module.css";

export const STATUS_VARIANTS = {
  default: styles.default,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  info: styles.info,
  blank: styles.blank,
  inherit: styles.inherit,
};

export type InputStatus = keyof typeof STATUS_VARIANTS;

export const SIZE_VARIANTS = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
  xlarge: styles.xlarge,
};

export type InputSize = keyof typeof SIZE_VARIANTS;

export function getInputClassNames(
  color: keyof typeof STATUS_VARIANTS,
  size: keyof typeof SIZE_VARIANTS = "medium",
): string[] {
  const classes = [STATUS_VARIANTS[color], SIZE_VARIANTS[size]];
  return classes;
}

interface UseInputStylePropsOptions {
  status?: InputStatus;
  size?: InputSize;
  inputClassName?: string;
}

export function useInputStyleClasses(options: UseInputStylePropsOptions) {
  const { status = "default", size = "medium", inputClassName } = options;

  return {
    /** Classes to fully style an input. */
    input: classNames(styles.input, ...getInputClassNames(status, size), inputClassName),
    /** Only contextual classes to provide input styling within the container. */
    inputContainer: classNames(...getInputClassNames(status, size), inputClassName),
    /** Base input classes to match the colors and typography of all other inputs. */
    inputBase: styles.inputBase,
    /** Classes to render the border of an input. */
    inputBorder: styles.inputBorder,
    /** Classes to render the spacing around the input content. */
    inputPadding: styles.inputPadding,
    /** Classes to reset default styles as needed for all of the other classes. */
    inputReset: styles.inputReset,
  };
}

type InputColorToken = "color" | "foreground";

const INPUT_COLOR_TOKEN_MAP = {
  default: {
    color: "ACCENT_PRIMARY",
    foreground: "ACCENT_FOREGROUND",
  },
  success: {
    color: "STATUS_SUCCESS_BACKGROUND",
    foreground: "STATUS_SUCCESS_FOREGROUND",
  },
  warning: {
    color: "STATUS_WARNING_BACKGROUND",
    foreground: "STATUS_WARNING_FOREGROUND",
  },
  danger: {
    color: "STATUS_DANGER_BACKGROUND",
    foreground: "STATUS_DANGER_FOREGROUND",
  },
  info: {
    color: "STATUS_INFO_BACKGROUND",
    foreground: "STATUS_INFO_FOREGROUND",
  },
  blank: {
    color: "transparent",
    foreground: "INTERACTIVE_NORMAL",
  },
  inherit: {
    color: "transparent",
    foreground: "transparent",
  },
};

export function useInputColorToken(status: InputStatus, token: InputColorToken) {
  const tokenName = INPUT_COLOR_TOKEN_MAP[status][token];
  const resolvedToken = useResolvedColorToken(tokenName);

  return tokenName === "transparent" ? tokenName : resolvedToken;
}

function renderAttachment(node?: React.ReactNode) {
  if (node == null) return null;
  if (node === "") return null;

  return <div className={styles.attachment}>{node}</div>;
}

export interface InputAttachmentProps {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export interface InputWithAttachmentProps extends InputAttachmentProps {
  children: React.ReactElement;
  asChild?: boolean;
}

export function InputWithAttachments(props: InputWithAttachmentProps) {
  const { prefix, suffix, children } = props;

  return (
    <div className={classNames(styles.inputAttachmentRow, styles.inputBase, styles.inputBorder)}>
      {renderAttachment(prefix)}
      {children}
      {renderAttachment(suffix)}
    </div>
  );
}
