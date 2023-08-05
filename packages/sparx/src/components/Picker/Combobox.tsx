import * as React from "react";
import classNames from "classnames";
import { useComboBox, useFilter } from "react-aria";
import { useComboBoxState } from "react-stately";

import { CollectionChildren } from "@react-types/shared";

import { Clickable } from "../Clickable/Clickable";
import { Stack } from "../Stack/Stack";
import { DropdownChevron } from "./dropdown/DropdownChevron";
import { DropdownListBox } from "./dropdown/DropdownListBox";
import { Picker, PickerStyleProps } from "./Picker";

import inputStyles from "../Input/Input.module.css";
import styles from "./Picker.module.css";

export interface ComboboxProps<Item extends object> extends PickerStyleProps {
  items: Item[];
  selectedKey: string | undefined;
  allowsCustomValue?: boolean;
  allowsEmptyCollection?: boolean;
  placeholder?: string;
  children: CollectionChildren<Item>;
  onSelect: (itemKey: string) => void;
}

export function Combobox<Item extends object>(props: ComboboxProps<Item>) {
  const {
    items,
    selectedKey,
    color,
    size,
    allowsCustomValue = false,
    allowsEmptyCollection = false,
    placeholder,
    className,
    children,
    onSelect,
  } = props;
  const { contains } = useFilter({ sensitivity: "base" });
  const state = useComboBoxState({
    children,
    defaultItems: items,
    defaultSelectedKey: selectedKey,
    selectedKey,
    allowsCustomValue,
    allowsEmptyCollection,
    placeholder,
    defaultFilter: contains,
    onSelectionChange(key) {
      // React.Key can be a number, but we're restricting that to only strings
      // for simplicity.
      onSelect?.(key as string);
    },
  });

  const buttonRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listBoxRef = React.useRef<HTMLUListElement>(null);
  const { buttonProps, inputProps, listBoxProps } = useComboBox(
    {
      defaultItems: items,
      defaultSelectedKey: selectedKey,
      selectedKey,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef: listBoxRef,
    },
    state,
  );

  return (
    <Picker color={color} size={size} state={state} className={className}>
      <Stack
        direction="horizontal"
        align="center"
        spacing="space-md"
        wrap={false}
        className={classNames(inputStyles.inputBackdrop, styles.inputRow)}>
        <input
          {...inputProps}
          placeholder={placeholder}
          ref={inputRef}
          className={classNames(inputStyles.inputText, styles.input, styles.inputPadding)}
        />
        <Clickable {...buttonProps} ref={buttonRef}>
          <DropdownChevron isOpen={state.isOpen} className={styles.chevron} />
        </Clickable>
      </Stack>
      {state.isOpen && <DropdownListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />}
    </Picker>
  );
}
