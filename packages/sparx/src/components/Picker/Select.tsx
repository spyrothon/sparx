import * as React from "react";
import classNames from "classnames";
import { HiddenSelect, useSelect } from "react-aria";
import { useSelectState } from "react-stately";

import { CollectionChildren } from "@react-types/shared";

import { Clickable } from "../Clickable/Clickable";
import { getInputClassNames, InputColor, InputSize } from "../Input/Input";
import { Stack } from "../Stack/Stack";
import { DropdownChevron } from "./components/DropdownChevron";
import { DropdownListBox } from "./dropdown/DropdownListBox";

import inputStyles from "../Input/Input.module.css";
import styles from "./Picker.module.css";

export interface SelectProps<Item extends object> {
  items: Item[];
  selectedKey: string | undefined;
  placeholder?: string;
  name?: string;
  color?: InputColor;
  size?: InputSize;
  className?: string;
  children: CollectionChildren<Item>;
  onSelect: (itemKey: string) => void;
}

export function Select<Item extends object>(props: SelectProps<Item>) {
  const {
    items,
    selectedKey,
    placeholder = "Select an option",
    name,
    color = "accent",
    size = "medium",
    className,
    children,
    onSelect,
  } = props;
  const state = useSelectState({
    children,
    items,
    defaultSelectedKey: selectedKey,
    selectedKey,
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
    state,
    ref,
  );

  return (
    <div
      className={classNames(styles.container, className, ...getInputClassNames(color, size))}
      data-open={state.isOpen}>
      <HiddenSelect state={state} triggerRef={ref} name={name} />
      <Stack
        as={Clickable}
        direction="horizontal"
        align="center"
        justify="space-between"
        spacing="space-md"
        {...triggerProps}
        ref={ref}
        className={classNames(inputStyles.inputBackdrop, styles.inputRow)}>
        <div className={styles.input} {...valueProps}>
          {state.selectedItem != null ? state.selectedItem.rendered : placeholder}
        </div>
        <DropdownChevron isOpen={state.isOpen} className={styles.chevron} />
      </Stack>
      {state.isOpen && <DropdownListBox {...menuProps} state={state} />}
    </div>
  );
}
