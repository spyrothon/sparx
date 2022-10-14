import * as React from "react";
import classNames from "classnames";

import styles from "./Stack.module.css";

const STACK_SPACES = {
  "space-none": styles["space-none"],
  "space-xs": styles["space-xs"],
  "space-sm": styles["space-sm"],
  "space-md": styles["space-md"],
  "space-lg": styles["space-lg"],
  "space-xl": styles["space-xl"],
};

const DIRECTION_CLASSES = {
  horizontal: styles["horizontal"],
  vertical: styles["vertical"],
  "reverse-horizontal": styles["reverse-horizontal"],
  "reverse-vertical": styles["reverse-vertical"],
};

const STACK_ALIGNMENT = {
  start: styles["align-start"],
  end: styles["align-end"],
  center: styles["align-center"],
  stretch: styles["align-stretch"],
};

const STACK_JUSTIFICATION = {
  start: styles["justify-start"],
  end: styles["justify-end"],
  center: styles["justify-center"],
  stretch: styles["justify-stretch"],
  "space-between": styles["justify-space-between"],
  "space-around": styles["justify-space-around"],
};

export type Spacing = keyof typeof STACK_SPACES;
export type Alignment = keyof typeof STACK_ALIGNMENT;
export type Justification = keyof typeof STACK_JUSTIFICATION;
export type StackDirection = keyof typeof DIRECTION_CLASSES;

export interface StackProps {
  spacing?: Spacing;
  direction?: StackDirection;
  justify?: Justification;
  align?: Alignment;
  children: React.ReactNode;
  className?: string;
}

export function Stack(props: StackProps) {
  const {
    spacing = "space-md",
    direction = "vertical",
    justify,
    align,
    children,
    className,
  } = props;

  return (
    <div
      className={classNames(
        styles.stack,
        STACK_SPACES[spacing],
        justify != null ? STACK_JUSTIFICATION[justify] : undefined,
        align != null ? STACK_ALIGNMENT[align] : undefined,
        DIRECTION_CLASSES[direction],
        className,
      )}>
      {children}
    </div>
  );
}

export interface SpacerProps {
  size?: Spacing;
}

export function Spacer(props: SpacerProps) {
  const { size = "space-none" } = props;

  return <div className={classNames(styles.spacer, STACK_SPACES[size])} />;
}
