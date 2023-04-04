import * as React from "react";
import classNames from "classnames";

import { ButtonVariant, getButtonClassNames } from "../forms/Button";

import styles from "./Anchor.module.css";

const ABSOLUTE_URL_REGEX = /^(https?:)?\/\//;

export interface AnchorRendererProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => unknown;
}

export type AnchorRenderer = (props: AnchorRendererProps) => JSX.Element;

let renderer: AnchorRenderer | undefined = undefined;

export function setAnchorRenderer(newRenderer: AnchorRenderer) {
  renderer = newRenderer;
}

export interface AnchorProps {
  href: string;
  /**
   * Force the anchor to open in a new tab, even if it is a relative link.
   */
  newTab?: boolean;
  /**
   * Use a button style for the Anchor tag. This makes the link look like any other button.
   */
  buttonVariant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => unknown;
}

export function Anchor(props: AnchorProps) {
  const { href, buttonVariant, newTab, children, className, onClick } = props;

  const isAbsolute = ABSOLUTE_URL_REGEX.test(href);

  const anchorProps = {
    href,
    children,
    onClick,
    target: newTab ? "_blank" : "",
    className:
      buttonVariant != null
        ? getButtonClassNames(buttonVariant, { className })
        : classNames(styles.anchor, className),
  };

  if (isAbsolute || renderer == null) {
    return <a {...anchorProps}>{children}</a>;
  }

  return renderer(anchorProps);
}
