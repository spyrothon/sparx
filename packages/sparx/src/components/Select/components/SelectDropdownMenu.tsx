import * as React from "react";
import classNames from "classnames";

import { usePickerContext } from "../usePickerContext";

import styles from "./SelectComponents.module.css";

const DEFAULT_MAX_HEIGHT = 440;

interface DropdownItemChildrenProps {
  isHighlighted: boolean;
  isSelected: boolean;
}

interface SelectDropdownMenuProps<T> {
  items: T[];
  isOpen: boolean;
  maxHeight?: number;
  children: (item: T, index: number, state: DropdownItemChildrenProps) => React.ReactNode;
  renderEmptyState: () => React.ReactNode;
}

export function SelectDropdownMenu<T>(props: SelectDropdownMenuProps<T>) {
  const { items, isOpen, maxHeight = DEFAULT_MAX_HEIGHT, children, renderEmptyState } = props;

  const { highlightedIndex, values, inputClassNames, getMenuProps } = usePickerContext<T>();

  function getChildRenderProps(item: T, index: number): DropdownItemChildrenProps {
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
      {items.length === 0 ? <li className={styles.itemContainer}>{renderEmptyState()}</li> : null}

      {items.map((item, index) => children(item, index, getChildRenderProps(item, index)))}
    </ul>
  );
}
