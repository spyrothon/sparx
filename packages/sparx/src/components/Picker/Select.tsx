import * as React from "react";
import classNames from "classnames";
import { HiddenSelect, useSelect } from "react-aria";
import { useSelectState } from "react-stately";

import { CollectionChildren } from "@react-types/shared";

import { Clickable } from "../Clickable/Clickable";
import { Stack } from "../Stack/Stack";
import { DropdownChevron } from "./dropdown/DropdownChevron";
import { DropdownListBox } from "./dropdown/DropdownListBox";
import { Picker, PickerStyleProps } from "./Picker";

import inputStyles from "../Input/Input.module.css";
import styles from "./Picker.module.css";

export interface SelectProps<Item extends object> extends PickerStyleProps {
  items: Item[];
  selectedKey: string;
  placeholder?: string;
  name?: string;
  children: CollectionChildren<Item>;
  onSelect: (itemKey: string) => void;
}

export function Select<Item extends object>(props: SelectProps<Item>) {
  const {
    items,
    selectedKey,
    placeholder = "Select an option",
    name,
    state,
    size,
    className,
    children,
    onSelect,
  } = props;

  const controlState = useSelectState({
    children,
    items,
    selectedKey,
    defaultSelectedKey: selectedKey,
    onSelectionChange(key) {
      // React.Key can be a number, but we're restricting that to only strings
      // for simplicity.
      onSelect?.(key as string);
    },
  });

  const ref = React.useRef<HTMLDivElement>(null);
  const { triggerProps, valueProps, menuProps } = useSelect(
    {
      items,
      defaultSelectedKey: selectedKey,
      selectedKey,
    },
    controlState,
    ref,
  );

  const selectedElement =
    controlState.selectedItem != null ? controlState.selectedItem.rendered : placeholder;

  return (
    <Picker state={state} size={size} controlState={controlState} className={className}>
      <HiddenSelect state={controlState} triggerRef={ref} name={name} />
      <Stack
        as={Clickable}
        direction="horizontal"
        align="center"
        justify="space-between"
        spacing="space-md"
        wrap={false}
        {...triggerProps}
        ref={ref}
        className={classNames(inputStyles.inputBackdrop, styles.inputRow)}>
        <div
          className={classNames(styles.input, {
            [styles.inputPadding]: typeof selectedElement === "string",
          })}
          {...valueProps}>
          {selectedElement}
        </div>
        <DropdownChevron isOpen={controlState.isOpen} className={styles.chevron} />
      </Stack>
      {controlState.isOpen && <DropdownListBox {...menuProps} state={controlState} />}
    </Picker>
  );
}
