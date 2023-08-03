import * as React from "react";
import classNames from "classnames";
import { useMultipleSelection, useSelect } from "downshift";

import { Clickable, defaultSelectItemToString, Stack, Tag } from "@sparx/index";

import { getInputClassNames, InputColor, InputSize } from "../Input/Input";
import { DropdownChevron } from "./components/DropdownChevron";
import { DropdownMenu } from "./components/DropdownMenu";
import { defaultRenderItem, DropdownItemState, ItemToString } from "./PickerTypes";
import { PickerContextProvider, PickerContextState } from "./usePickerContext";

import inputStyles from "../Input/Input.module.css";
import styles from "./Select.module.css";

export interface MultiSelectProps<Item> {
  items: Item[];
  initialSelectedItems?: Item[];
  placeholder?: string;
  color?: InputColor;
  size?: InputSize;
  disabled?: boolean;
  maxHeight?: number;
  className?: string;
  itemToString?: ItemToString<Item>;
  onSelect: (items: Item[]) => unknown;
  children?: (item: Item, index: number, state: DropdownItemState) => React.ReactNode;
}

export function MultiSelect<Item extends object>(props: MultiSelectProps<Item>) {
  const {
    items,
    initialSelectedItems = [],
    placeholder = "Select an Option",
    disabled = false,
    color = "accent",
    size = "medium",
    className,
    itemToString = defaultSelectItemToString,
    onSelect,
    children = defaultRenderItem,
  } = props;

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({
    initialSelectedItems,
    onSelectedItemsChange({ selectedItems }) {
      onSelect(selectedItems ?? []);
    },
  });

  const { isOpen, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
    items,
    selectedItem: null,
    stateReducer: (_state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
          };
      }
      return changes;
    },
    onStateChange: ({ type, selectedItem: newSelectedItem }) => {
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
        case useSelect.stateChangeTypes.ToggleButtonBlur:
          if (newSelectedItem == null) break;
          if (selectedItems.includes(newSelectedItem)) {
            removeSelectedItem(newSelectedItem);
          } else {
            addSelectedItem(newSelectedItem);
          }
          break;
        default:
          break;
      }
    },
  });

  const pickerContextValue: PickerContextState<Item> = React.useMemo(
    () => ({
      color,
      size,
      values: new Set(selectedItems),
      highlightedIndex,
      itemToString,
      getMenuProps,
      getItemProps,
    }),
    [color, size, selectedItems, highlightedIndex, itemToString, getMenuProps, getItemProps],
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
          {selectedItems.length > 0 ? (
            <Stack direction="horizontal" spacing="space-sm">
              {selectedItems.map((item, index) => (
                <Clickable
                  key={`${itemToString(item)}${index}`}
                  {...getSelectedItemProps({ selectedItem: item })}>
                  <Tag>{itemToString(item)}</Tag>
                </Clickable>
              ))}
            </Stack>
          ) : (
            <div className={classNames(styles.placeholder, inputStyles.inputText)}>
              {placeholder}
            </div>
          )}
          <DropdownChevron
            isOpen={isOpen}
            {...getToggleButtonProps(getDropdownProps({ preventKeyAction: isOpen }))}
            className={styles.chevron}
          />
        </Clickable>
        <DropdownMenu isOpen={isOpen} items={items}>
          {children}
        </DropdownMenu>
      </div>
    </PickerContextProvider>
  );
}
