import * as React from "react";
import classNames from "classnames";

import styles from "./Box.module.css";

const ELEVATIONS = {
  border: styles["elevation-border"],
  low: styles["elevation-low"],
  medium: styles["elevation-medium"],
  high: styles["elevation-high"],
} as const;

export type Elevation = keyof typeof ELEVATIONS;

export interface BoxProps extends React.PropsWithChildren {
  elevation: Elevation;
  className?: string;
}

export function Box(props: BoxProps) {
  const { elevation = "border", className, children } = props;

  return <div className={classNames(styles.box, ELEVATIONS[elevation], className)}>{children}</div>;
}
