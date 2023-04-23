import * as React from "react";
import classNames from "classnames";

import styles from "./Interactive.module.css";

export interface InteractiveProps {
  as: React.ElementType<{ className: string }>;
  clone: boolean;
  className?: string;
  children: React.ReactElement;
}

export function Interactive(props: InteractiveProps) {
  const { as: Tag = "div", clone, className, children } = props;
  const resolvedClassName = classNames(styles.interactive, className);

  if (clone) {
    return React.cloneElement(children, { className: resolvedClassName });
  } else {
    return <Tag className={resolvedClassName}>{children}</Tag>;
  }
}
