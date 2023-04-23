import * as React from "react";
import classNames from "classnames";

import styles from "./Interactive.module.css";

export interface InteractiveProps {
  as?: React.ElementType<{ className: string }>;
  background?: boolean;
  className?: string;
  children: React.ReactElement;
}

export function Interactive(props: InteractiveProps) {
  const { as: Tag = "div", background = false, className, children } = props;
  const resolvedClassName = classNames(
    background ? styles.interactiveBackground : styles.interactive,
    className,
  );

  return <Tag className={resolvedClassName}>{children}</Tag>;
}
