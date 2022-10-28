import * as React from "react";
import classNames from "classnames";

import styles from "./Text.module.css";

const SIZE_VARIANTS = {
  "header-xs": styles["header-xs"],
  "header-sm": styles["header-sm"],
  "header-md": styles["header-md"],
  "header-lg": styles["header-lg"],
  "header-xl": styles["header-xl"],
  "header-xxl": styles["header-xxl"],
  "text-xs": styles["text-xs"],
  "text-sm": styles["text-sm"],
  "text-md": styles["text-md"],
  "text-lg": styles["text-lg"],
};

const COLOR_VARIANTS = {
  normal: styles["color-normal"],
  secondary: styles["color-secondary"],
  accent: styles["color-accent"],
  success: styles["color-success"],
  info: styles["color-info"],
  warning: styles["color-warning"],
  danger: styles["color-danger"],
  inherit: styles["color-inherit"],
};

export type TextVariantSize = keyof typeof SIZE_VARIANTS;
export type TextVariantColor = keyof typeof COLOR_VARIANTS;

export type TextVariant = `${TextVariantSize}/${TextVariantColor}`;

function getVariantPieces(variant: TextVariant): [TextVariantSize, TextVariantColor] {
  const [size, color] = variant.split("/");
  return [size as TextVariantSize, color as TextVariantColor];
}

export interface TextProps {
  tag?: "div" | "span" | "label" | "p";
  variant?: TextVariant;
  lineClamp?: 1;
  className?: string;
  id?: string;
  children: React.ReactNode;
}

export function Text(props: TextProps) {
  const { tag: Tag = "p", variant = "text-md/normal", lineClamp, children, className, id } = props;
  const [size, color] = getVariantPieces(variant);

  return (
    <Tag
      id={id}
      className={classNames(styles.text, SIZE_VARIANTS[size], COLOR_VARIANTS[color], className, {
        [styles.lineClamp]: lineClamp === 1,
      })}>
      {children}
    </Tag>
  );
}

export interface HeaderProps {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: TextVariant;
  lineClamp?: 1;
  uppercase?: boolean;
  withMargin?: boolean;
  className?: string;
  id?: string;
  children: React.ReactNode;
}

export function Header(props: HeaderProps) {
  const {
    tag: Tag,
    variant = "header-lg/normal",
    lineClamp,
    uppercase = false,
    withMargin = false,
    children,
    className,
    id,
  } = props;
  const [size, color] = getVariantPieces(variant);

  return (
    <Tag
      id={id}
      className={classNames(styles.header, SIZE_VARIANTS[size], COLOR_VARIANTS[color], className, {
        [styles.lineClamp]: lineClamp === 1,
        [styles.uppercase]: uppercase,
        [styles.withMargin]: withMargin,
      })}>
      {children}
    </Tag>
  );
}
