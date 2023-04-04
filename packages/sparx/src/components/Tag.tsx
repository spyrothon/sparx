import * as React from "react";
import classNames from "classnames";

import { Text } from "@sparx/index";

import styles from "./Tag.module.css";

const TAG_COLORS = {
  normal: styles["color-normal"],
  secondary: styles["color-secondary"],
  accent: styles["color-accent"],
  success: styles["color-success"],
  info: styles["color-info"],
  warning: styles["color-warning"],
  danger: styles["color-danger"],
};

export type TagColor = keyof typeof TAG_COLORS;

export interface TagProps {
  color?: TagColor;
  solid?: boolean;
  children: React.ReactNode;
}

export function Tag(props: TagProps) {
  const { color = "normal", solid = false, children } = props;

  return (
    <div
      className={classNames(styles.tag, TAG_COLORS[color], {
        [styles.solid]: solid,
      })}>
      <Text variant={`text-sm/inherit`}>{children}</Text>
    </div>
  );
}
