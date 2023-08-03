import * as React from "react";
import classNames from "classnames";
import { useSelect } from "downshift";

import { Clickable, defaultSelectItemToString } from "@sparx/index";

import { getInputClassNames, InputColor, InputSize } from "../Input/Input";
import { DropdownChevron } from "./components/DropdownChevron";
import { DropdownMenu } from "./components/DropdownMenu";
import { defaultRenderItem, DropdownItemState, ItemToString } from "./PickerTypes";
import { PickerContextProvider, PickerContextState } from "./usePickerContext";

import inputStyles from "../Input/Input.module.css";
import styles from "./Select.module.css";

export interface SelectProps<Item> {
  items: Item[];
  selectedItem: Item | null | undefined;
  placeholder?: string;
  color?: InputColor;
  size?: InputSize;
  disabled?: boolean;
  maxHeight?: number;
  className?: string;
  itemToString?: ItemToString<Item>;
  onSelect: (item?: Item) => unknown;
  children?: (item: Item, index: number, state: DropdownItemState) => React.ReactNode;
}

export function Select<Item extends object>(props: SelectProps<Item>) {
  const {
    items,
    selectedItem,
    placeholder = "Select an Option",
    disabled = false,
    color = "accent",
    size = "medium",
    className,
    itemToString = defaultSelectItemToString,
    onSelect,
    children = defaultRenderItem,
  } = props;

  const { isOpen, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
    items,
    selectedItem,
    itemToString,
    onSelectedItemChange: ({ selectedItem }) => onSelect(selectedItem ?? undefined),
  });

  const values = React.useMemo(
    () => (selectedItem != null ? new Set([selectedItem]) : new Set<Item>()),
    [selectedItem],
  );

  const pickerContextValue: PickerContextState<Item> = React.useMemo(
    () => ({
      color,
      size,
      values,
      highlightedIndex,
      itemToString,
      getMenuProps,
      getItemProps,
    }),
    [color, size, values, highlightedIndex, itemToString, getMenuProps, getItemProps],
  );

  return (
    <PickerContextProvider value={pickerContextValue}>
      <div
        className={classNames(styles.container, className, ...getInputClassNames(color, size), {
          [styles.open]: isOpen,
          [styles.disabled]: disabled,
        })}>
        <Clickable
          className={classNames(inputStyles.input, styles.input)}
          placeholder={placeholder}
          {...getToggleButtonProps()}
          disabled={disabled}>
          {selectedItem != null ? itemToString(selectedItem) : placeholder}
          <DropdownChevron {...getToggleButtonProps()} className={styles.chevron} />
        </Clickable>
        <DropdownMenu isOpen={isOpen} items={items}>
          {children}
        </DropdownMenu>
      </div>
    </PickerContextProvider>
  );
}
