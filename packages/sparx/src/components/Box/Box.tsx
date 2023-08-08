import * as React from "react";
import classNames from "classnames";

import styles from "./Box.module.css";

const BACKGROUNDS = {
  none: styles["background-none"],
  primary: styles["background-primary"],
  secondary: styles["background-secondary"],
  tertiary: styles["background-tertiary"],
  floating: styles["background-floating"],
} as const;

const BORDERS = {
  none: styles["border-none"],
  subtle: styles["border-subtle"],
  strong: styles["border-strong"],
} as const;

const ELEVATIONS = {
  none: styles["elevation-none"],
  low: styles["elevation-low"],
  medium: styles["elevation-medium"],
  high: styles["elevation-high"],
} as const;

const RADII = {
  none: styles["radius-none"],
  small: styles["radius-small"],
  medium: styles["radius-medium"],
  large: styles["radius-large"],
  xlarge: styles["radius-xlarge"],
} as const;

export type Background = keyof typeof BACKGROUNDS;
export type Border = keyof typeof BORDERS;
export type Elevation = keyof typeof ELEVATIONS;
export type Radius = keyof typeof RADII;

export interface BoxProps extends React.PropsWithChildren {
  background?: Background;
  border?: Border;
  elevation?: Elevation;
  radius?: Radius;
  className?: string;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(function Box(props, ref) {
  const {
    background = "none",
    border = "subtle",
    elevation = "none",
    radius = "small",
    className,
    children,
  } = props;

  return (
    <div
      ref={ref}
      className={classNames(
        styles.box,
        BACKGROUNDS[background],
        BORDERS[border],
        ELEVATIONS[elevation],
        RADII[radius],
        className,
      )}>
      {children}
    </div>
  );
});
