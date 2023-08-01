import * as React from "react";
import classNames from "classnames";

import styles from "./Hero.module.css";

const HERO_STYLES = {
  primary: styles.primary,
  success: styles.success,
  info: styles.info,
  warning: styles.warning,
  danger: styles.danger,
  default: styles.default,
};

export type HeroType = keyof typeof HERO_STYLES;

export interface HeroProps {
  type?: HeroType;
  children: React.ReactNode;
  className?: string;
}

export function Hero(props: HeroProps) {
  const { type = "primary", children, className } = props;

  return (
    <div className={classNames(styles.container, HERO_STYLES[type], className)}>{children}</div>
  );
}
