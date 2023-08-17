import * as React from "react";
import classNames from "classnames";
import { AriaComboBoxProps, useComboBox, useFilter } from "react-aria";
import { useComboBoxState } from "react-stately";

import { Clickable } from "../Clickable/Clickable";
import { InputWithAttachments, useInputStyleClasses } from "../Input/Input";
import { Stack } from "../Stack/Stack";
import { DropdownChevron } from "./dropdown/DropdownChevron";
import { Picker, PickerPublicProps } from "./Picker";

import styles from "./Picker.module.css";

export interface ComboboxProps<Item extends object>
  extends PickerPublicProps,
    Omit<AriaComboBoxProps<Item>, "onSelectionChange"> {
  // For some reason this isn't present on `AriaComboboxProps`, but is allowed
  // in `useComboBoxState`.
  allowsEmptyCollection?: boolean;
  inputClassName?: string;
  onSelect?: (itemKey: string) => void;
}

export function Combobox<Item extends object>(props: ComboboxProps<Item>) {
  const {
    items,
    selectedKey,
    allowsEmptyCollection = false,
    placeholder,
    inputClassName,
    onSelect,
  } = props;
  const inputStyles = useInputStyleClasses(props);

  const { contains } = useFilter({ sensitivity: "base" });
  const controlState = useComboBoxState({
    ...props,
    // We intentionally swap items and defaultItems so that the filters works
    // automatically. If this becomes a more controlled component in the future
    // then this should be undone or implemented differently so the consumer
    // can control the filtering.
    items: undefined,
    defaultItems: items,
    defaultSelectedKey: selectedKey ?? undefined,
    selectedKey,
    allowsEmptyCollection,
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
  const { buttonProps, inputProps, listBoxProps, labelProps, descriptionProps, errorMessageProps } =
    useComboBox(
      {
        ...props,
        items: undefined,
        defaultItems: items,
        defaultSelectedKey: selectedKey ?? undefined,
        selectedKey,
        inputRef,
        buttonRef,
        listBoxRef,
        popoverRef: listBoxRef,
        // @ts-expect-error onSelect isn't defined in these props, but it's a
        // valid DOM prop so it gets passed through, which causes selection to
        // be fired incorrectly
        onSelect: undefined,
      },
      controlState,
    );

  return (
    <Picker
      {...props}
      labelProps={labelProps}
      descriptionProps={descriptionProps}
      errorMessageProps={errorMessageProps}
      controlState={controlState}
      listBoxProps={listBoxProps}
      listBoxRef={listBoxRef}>
      <InputWithAttachments {...props}>
        <Stack
          direction="horizontal"
          align="center"
          spacing="space-md"
          wrap={false}
          className={classNames(styles.inputRow, inputClassName)}>
          <input
            {...inputProps}
            className={classNames(styles.input, inputStyles.inputPadding)}
            placeholder={placeholder}
            ref={inputRef}
          />
          <Clickable {...buttonProps} ref={buttonRef}>
            <DropdownChevron isOpen={controlState.isOpen} className={styles.chevron} />
          </Clickable>
        </Stack>
      </InputWithAttachments>
    </Picker>
  );
}
