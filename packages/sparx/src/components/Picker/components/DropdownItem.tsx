import * as React from "react";
import classNames from "classnames";

import { Text } from "@sparx/components/Text/Text";

import { usePickerContext } from "../usePickerContext";

import styles from "./DropdownItem.module.css";

export interface DropdownItemProps<T> extends React.PropsWithChildren {
  item: T;
  index: number;
  highlight?: boolean;
}

export function DropdownItem<T>(props: DropdownItemProps<T>) {
  const { item, index, highlight = true, children } = props;

  const { getItemProps, highlightedIndex } = usePickerContext<T>();

  return (
    <li
      {...getItemProps({ item, index })}
      className={classNames(styles.itemContainer, {
        [styles.itemHighlighted]: highlight && highlightedIndex === index,
      })}>
      {children}
    </li>
  );
}

interface DropdownItemLabelProps extends React.PropsWithChildren {
  description?: React.ReactNode;
}

function DropdownItemLabel(props: DropdownItemLabelProps) {
  const { description, children } = props;
  return (
    <div className={styles.itemLabel}>
      <Text variant="text-md/normal">{children}</Text>
      {description != null ? <Text variant="text-sm/secondary">{description}</Text> : null}
    </div>
  );
}

function DropdownItemIcon(props: React.PropsWithChildren) {
  return <div className={styles.itemIcon}>{props.children}</div>;
}

DropdownItem.Label = DropdownItemLabel;
DropdownItem.Icon = DropdownItemIcon;
