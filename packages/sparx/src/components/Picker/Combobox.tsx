import * as React from "react";
import classNames from "classnames";
import { useCombobox } from "downshift";

import { defaultSelectItemToString, TextInput } from "@sparx/index";

import { getInputClassNames, InputColor, InputSize } from "../Input/Input";
import { DropdownChevron } from "./components/DropdownChevron";
import { DropdownMenu } from "./components/DropdownMenu";
import {
  defaultEmptyState,
  defaultRenderItem,
  DropdownItemState,
  ItemToString,
} from "./PickerTypes";
import { PickerContextProvider, PickerContextState } from "./usePickerContext";

import styles from "./Combobox.module.css";

export interface ComboboxProps<Item> {
  items: Item[];
  selectedItem: Item | null | undefined;
  placeholder?: string;
  color?: InputColor;
  size?: InputSize;
  disabled?: boolean;
  maxHeight?: number;
  className?: string;
  itemToString?: ItemToString<Item>;
  renderEmptyState?: (query: string | undefined) => React.ReactNode;
  onSelect: (item?: Item) => unknown;
  onSearch: (query: string | undefined) => void;
  children?: (item: Item, index: number, state: DropdownItemState) => React.ReactNode;
}

export function Combobox<Item extends object>(props: ComboboxProps<Item>) {
  const {
    items,
    selectedItem,
    placeholder,
    disabled = false,
    color = "accent",
    size = "medium",
    className,
    itemToString = defaultSelectItemToString,
    renderEmptyState = defaultEmptyState,
    onSelect,
    onSearch,
    children = defaultRenderItem,
  } = props;

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    inputValue,
  } = useCombobox({
    items,
    selectedItem: selectedItem,
    itemToString,
    onInputValueChange: ({ inputValue }) => {
      onSearch(inputValue);
    },
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
      inputClassNames: [],
      getMenuProps,
      getItemProps,
    }),
    [color, size, values, highlightedIndex, getMenuProps, getItemProps],
  );

  return (
    <PickerContextProvider value={pickerContextValue}>
      <div
        className={classNames(styles.container, className, ...getInputClassNames(color, size), {
          [styles.open]: isOpen,
          [styles.disabled]: disabled,
        })}>
        <TextInput
          className={styles.input}
          placeholder={placeholder}
          {...getInputProps()}
          color={color}
          size={size}
          disabled={disabled}
        />
        <DropdownChevron {...getToggleButtonProps()} className={styles.chevron} />
        <DropdownMenu
          isOpen={isOpen}
          items={items}
          renderEmptyState={() => renderEmptyState(inputValue)}>
          {children}
        </DropdownMenu>
      </div>
    </PickerContextProvider>
  );
}
