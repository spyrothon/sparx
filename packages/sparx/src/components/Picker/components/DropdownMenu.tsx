import * as React from "react";
import classNames from "classnames";

import { DropdownItemState } from "../PickerTypes";
import { usePickerContext } from "../usePickerContext";

import styles from "./Dropdown.module.css";

const DEFAULT_MAX_HEIGHT = 440;

interface DropdownMenuProps<T> {
  items: T[];
  isOpen: boolean;
  maxHeight?: number;
  children: (item: T, index: number, state: DropdownItemState) => React.ReactNode;
  renderEmptyState?: () => React.ReactNode;
}

export function DropdownMenu<T>(props: DropdownMenuProps<T>) {
  const { items, isOpen, maxHeight = DEFAULT_MAX_HEIGHT, children, renderEmptyState } = props;

  const { highlightedIndex, values, inputClassNames, getMenuProps } = usePickerContext<T>();

  function getItemState(item: T, index: number): DropdownItemState {
    return {
      isHighlighted: index === highlightedIndex,
      isSelected: values.has(item),
    };
  }

  return (
    <ul
      {...getMenuProps()}
      className={classNames(styles.dropdown, ...inputClassNames, {
        [styles.dropdownOpen]: isOpen,
      })}
      style={{ "--_select-max-height": `${maxHeight}px` }}>
      {items.length === 0 && renderEmptyState != null ? (
        <li className={styles.itemContainer}>{renderEmptyState()}</li>
      ) : null}

      {items.map((item, index) => children(item, index, getItemState(item, index)))}
    </ul>
  );
}
