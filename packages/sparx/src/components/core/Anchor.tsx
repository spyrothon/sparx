import * as React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import styles from "./Anchor.module.css";

const ABSOLUTE_URL_REGEX = /^(https?:)?\/\//;

export interface AnchorProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => unknown;
}

export function Anchor(props: AnchorProps) {
  const { href, children, className, onClick } = props;

  const isAbsolute = ABSOLUTE_URL_REGEX.test(href);

  if (isAbsolute) {
    return (
      <a href={href} className={classNames(styles.anchor, className)} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={classNames(styles.anchor, className)} onClick={onClick}>
      {children}
    </Link>
  );
}
