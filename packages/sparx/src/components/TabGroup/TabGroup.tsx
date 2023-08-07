import * as React from "react";
import classNames from "classnames";
import type { IconProps } from "@spyrothon/sparx-icons";

import type { ClickableProps } from "../Clickable/Clickable";
import { Clickable } from "../Clickable/Clickable";

import styles from "./TabGroup.module.css";

const TAB_COLORS = {
  default: styles["color-default"],
  accent: styles["color-accent"],
  success: styles["color-success"],
  info: styles["color-info"],
  warning: styles["color-warning"],
  danger: styles["color-danger"],
};

export type TabColor = keyof typeof TAB_COLORS;

export interface TabProps extends ClickableProps<"div"> {
  label: React.ReactNode;
  color?: TabColor;
  icon?: React.ComponentType<IconProps>;
  badge?: React.ReactNode;
  selected?: boolean;
}

export function Tab(props: TabProps) {
  const { label, color = "default", icon: Icon, badge, selected = false, ...extraProps } = props;

  return (
    <Clickable
      className={classNames(styles.tab, TAB_COLORS[color], { [styles.selected]: selected })}
      {...extraProps}>
      {Icon != null ? <Icon className={styles.icon} /> : null}
      <div className={styles.label}>{label}</div>
      {badge != null ? <div className={styles.badge}>{badge}</div> : null}
    </Clickable>
  );
}

export interface TabHeaderProps {
  label: React.ReactNode;
  color?: TabColor;
}

export function TabHeader(props: TabHeaderProps) {
  const { label, color = "default" } = props;

  return <div className={classNames(styles.header, TAB_COLORS[color])}>{label}</div>;
}

export interface TabGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function TabGroup(props: TabGroupProps) {
  const { children, className } = props;

  return <div className={classNames(styles.container, className)}>{children}</div>;
}

export const Tabs = { Group: TabGroup, Header: TabHeader, Tab: Tab };
