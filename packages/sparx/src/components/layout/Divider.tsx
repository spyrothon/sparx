import * as React from "react";
import classNames from "classnames";

import styles from "./Divider.module.css";

export interface DividerProps {
  vertical?: boolean;
}

export function Divider(props: DividerProps) {
  const { vertical } = props;
  return (
    <div className={classNames(vertical ? styles.dividerVertical : styles.dividerHorizontal)}></div>
  );
}
