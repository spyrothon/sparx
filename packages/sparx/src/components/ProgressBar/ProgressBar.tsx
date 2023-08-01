import * as React from "react";
import classNames from "classnames";

import styles from "./ProgressBar.module.css";

const COLOR_VARIANTS = {
  accent: styles["color-accent"],
  success: styles["color-success"],
  info: styles["color-info"],
  warning: styles["color-warning"],
  danger: styles["color-danger"],
  default: styles["color-default"],
  inherit: styles["color-inherit"],
};

const SIZE_VARIANTS = {
  normal: styles["size-normal"],
  large: styles["size-large"],
};

export type ProgressBarColor = keyof typeof COLOR_VARIANTS;
export type ProgressBarSize = keyof typeof SIZE_VARIANTS;

export interface ProgressValue {
  value: number;
  color?: ProgressBarColor;
}

export interface ProgressBarProps {
  progress: ProgressValue[];
  className?: string;
  color?: ProgressBarColor;
  size?: ProgressBarSize;
}

export function ProgressBar(props: ProgressBarProps) {
  const { progress, color: defaultColor = "accent", size = "normal", className } = props;
  const bars = Array.isArray(progress) ? progress : [progress];

  return (
    <div className={classNames(styles.container, SIZE_VARIANTS[size], className)}>
      {bars.map(({ value, color }, index) => (
        <div
          key={index}
          className={classNames(styles.bar, COLOR_VARIANTS[color ?? defaultColor])}
          style={{ width: `${value}%` }}
        />
      ))}
    </div>
  );
}
