import * as React from "react";
import classNames from "classnames";
import { mergeProps } from "react-aria";

import type { AsChildProps } from "@sparx/utils/TypeUtils";

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

export interface StackChildProps {
  className: string;
}

/**
 * Props that apply to the Stack itself, regardless of how it's rendered.
 */
interface StackOwnProps {
  spacing?: Spacing;
  direction?: StackDirection;
  justify?: Justification;
  align?: Alignment;
  wrap?: boolean;
  className?: string;
}

/**
 * Props that are allowed when Stack is not rendered with `asChild`
 */
interface StackDistinctProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, "style" | "children"> {}

export type StackProps = StackOwnProps &
  (AsChildProps<StackChildProps> | ({ asChild: never } & StackDistinctProps));

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(function Stack(props, ref) {
  const {
    spacing = "space-md",
    direction = "vertical",
    justify,
    align,
    wrap = true,
    asChild,
    className,
    children,
    ...extraProps
  } = props;

  const stackClassName = classNames(
    styles.stack,
    STACK_SPACES[spacing],
    justify != null ? STACK_JUSTIFICATION[justify] : undefined,
    align != null ? STACK_ALIGNMENT[align] : undefined,
    wrap === false ? styles.nowrap : undefined,
    DIRECTION_CLASSES[direction],
    className,
  );

  if (asChild) {
    const child = React.Children.only(children);
    return React.cloneElement(
      child,
      mergeProps(child.props, { className: stackClassName, ...extraProps }),
    );
  } else {
    return (
      <div ref={ref} className={stackClassName} {...extraProps}>
        {children}
      </div>
    );
  }
});

export interface SpacerProps {
  size?: Spacing;
  expand?: boolean;
}

export function Spacer(props: SpacerProps) {
  const { size = "space-none", expand = false } = props;

  return (
    <div
      className={classNames(styles.spacer, STACK_SPACES[size], {
        [styles["spacer-expand"]]: expand,
      })}
    />
  );
}
