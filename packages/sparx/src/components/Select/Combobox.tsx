import * as React from "react";
import classNames from "classnames";
import { useCombobox } from "downshift";

import { Text, TextInput } from "@sparx/index";

import { getInputClassNames, InputColor, InputSize } from "../Input/Input";
import { SelectChevron } from "./components/SelectChevron";
import { SelectDropdownMenu } from "./components/SelectDropdownMenu";
import { ItemToString } from "./SelectTypes";
import { PickerContextProvider, PickerContextState } from "./usePickerContext";

import styles from "./components/SelectComponents.module.css";

function defaultEmptyState(query: string | undefined) {
  return (
    <Text variant="text-md/secondary">
      <em>No results {query != null ? ` for ${query}` : null}</em>
    </Text>
  );
}

export interface ComboboxProps<Item> {
  items: Item[];
  selectedItem: Item | null | undefined;
  color?: InputColor;
  size?: InputSize;
  disabled?: boolean;
  maxHeight?: number;
  className?: string;
  itemToString: ItemToString<Item>;
  renderItem?: (item: Item, size: InputSize, itemToString: ItemToString<Item>) => React.ReactNode;
  renderEmptyState: (query: string | undefined) => React.ReactNode;
  onSelect: (item?: Item) => unknown;
  onSearch: (query: string | undefined) => void;
  children: (item: Item, index: number) => React.ReactNode;
}

export function Combobox<Item extends object>(props: ComboboxProps<Item>) {
  const {
    items,
    selectedItem,
    disabled = false,
    color = "accent",
    size = "medium",
    className,
    itemToString,
    renderEmptyState = defaultEmptyState,
    onSelect,
    onSearch,
    children,
  } = props;

  const {
    isOpen,
    getComboboxProps,
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
      inputClassNames: getInputClassNames(color, size),
      getMenuProps,
      getItemProps,
    }),
    [color, size, values, highlightedIndex, getMenuProps, getItemProps],
  );

  return (
    <PickerContextProvider value={pickerContextValue}>
      <div
        {...getComboboxProps()}
        className={classNames(styles.container, className, {
          [styles.open]: isOpen,
          [styles.disabled]: disabled,
        })}>
        <TextInput
          className={styles.input}
          {...getInputProps()}
          color={color}
          size={size}
          disabled={disabled}
        />
        <SelectChevron isOpen={isOpen} {...getToggleButtonProps()} />
        <SelectDropdownMenu
          isOpen={isOpen}
          items={items}
          renderEmptyState={() => renderEmptyState(inputValue)}>
          {children}
        </SelectDropdownMenu>
      </div>
    </PickerContextProvider>
  );
}
