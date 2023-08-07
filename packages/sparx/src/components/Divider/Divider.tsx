import * as React from "react";
import classNames from "classnames";

import styles from "./Divider.module.css";

const STRENGTHS = {
  subtle: styles.subtle,
  strong: styles.strong,
} as const;

const DIRECTIONS = {
  horizontal: styles.horizontal,
  vertical: styles.vertical,
} as const;

export type DividerStrength = keyof typeof STRENGTHS;
export type DividerDirection = keyof typeof DIRECTIONS;

export interface DividerProps {
  strength?: DividerStrength;
  direction?: DividerDirection;
}

export function Divider(props: DividerProps) {
  const { strength = "strong", direction = "horizontal" } = props;

  return <div className={classNames(STRENGTHS[strength], DIRECTIONS[direction])}></div>;
}
