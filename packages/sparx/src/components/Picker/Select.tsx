import * as React from "react";
import classNames from "classnames";
import { AriaSelectProps, HiddenSelect, useSelect } from "react-aria";
import { useSelectState } from "react-stately";

import { Clickable } from "../Clickable/Clickable";
import { Stack } from "../Stack/Stack";
import { DropdownChevron } from "./dropdown/DropdownChevron";
import { DropdownListBox } from "./dropdown/DropdownListBox";
import { Picker, PickerPublicProps } from "./Picker";

import inputStyles from "../Input/Input.module.css";
import styles from "./Picker.module.css";

export interface SelectProps<Item extends object>
  extends PickerPublicProps,
    Omit<AriaSelectProps<Item>, "onSelectionChange"> {
  inputClassName?: string;
  onSelect: (itemKey: string) => void;
}

export function Select<Item extends object>(props: SelectProps<Item>) {
  const { selectedKey, placeholder = "Select an option", name, inputClassName, onSelect } = props;

  const controlState = useSelectState({
    ...props,
    defaultSelectedKey: selectedKey ?? undefined,
    onSelectionChange(key) {
      // React.Key can be a number, but we're restricting that to only strings
      // for simplicity.
      onSelect?.(key as string);
    },
  });

  const ref = React.useRef<HTMLDivElement>(null);
  const { triggerProps, valueProps, menuProps, labelProps, descriptionProps, errorMessageProps } =
    useSelect(
      {
        ...props,
        defaultSelectedKey: selectedKey ?? undefined,
      },
      controlState,
      ref,
    );

  const selectedElement =
    controlState.selectedItem != null ? controlState.selectedItem.rendered : placeholder;

  return (
    <Picker
      {...props}
      labelProps={labelProps}
      descriptionProps={descriptionProps}
      errorMessageProps={errorMessageProps}
      controlState={controlState}>
      <HiddenSelect state={controlState} triggerRef={ref} name={name} />
      <Stack
        asChild
        direction="horizontal"
        align="center"
        justify="space-between"
        spacing="space-md"
        wrap={false}>
        <Clickable
          {...triggerProps}
          ref={ref}
          className={classNames(inputStyles.inputBackdrop, styles.inputRow, inputClassName)}>
          <div
            className={classNames(styles.input, {
              [styles.inputPadding]: typeof selectedElement === "string",
            })}
            {...valueProps}>
            {selectedElement}
          </div>
          <DropdownChevron isOpen={controlState.isOpen} className={styles.chevron} />
        </Clickable>
      </Stack>
      {controlState.isOpen && <DropdownListBox {...menuProps} state={controlState} />}
    </Picker>
  );
}
