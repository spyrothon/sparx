import * as React from "react";
import classNames from "classnames";
import CheckboxCircleChecked from "@spyrothon/sparx-icons/dist/icons/CheckboxCircleChecked";

import { Text } from "@sparx/components/Text/Text";

import { usePickerContext } from "../usePickerContext";

import styles from "./DropdownItem.module.css";

export interface DropdownItemProps<T> extends React.PropsWithChildren {
  item: T;
  index: number;
  highlight?: boolean;
  hideCheck?: boolean;
  icon?: React.ReactNode;
  description?: React.ReactNode;
}

export function DropdownItem<T extends object>(props: DropdownItemProps<T>) {
  const { item, index, highlight = true, hideCheck = false, icon, description, children } = props;

  const { getItemProps, highlightedIndex, values } = usePickerContext<T>();
  const isSelected = values.has(item);

  return (
    <li
      {...getItemProps({ item, index })}
      className={classNames(styles.itemContainer, {
        [styles.itemHighlighted]: highlight && highlightedIndex === index,
      })}>
      {icon != null ? <DropdownItemIcon>{icon}</DropdownItemIcon> : null}
      <DropdownItemLabel description={description}>{children}</DropdownItemLabel>
      {!hideCheck ? <DropdownItemCheck isSelected={isSelected} /> : null}
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

interface DropdownItemCheckProps {
  isSelected: boolean;
}

function DropdownItemCheck(props: DropdownItemCheckProps) {
  return (
    <div className={styles.itemCheck}>
      {props.isSelected ? <CheckboxCircleChecked size={20} /> : null}
    </div>
  );
}

DropdownItem.Label = DropdownItemLabel;
DropdownItem.Icon = DropdownItemIcon;
DropdownItem.Check = DropdownItemCheck;
