import * as React from "react";
import classNames from "classnames";
import { useSelect } from "downshift";

import ChevronDown from "@sparx/icons/ChevronDown";
import ChevronUp from "@sparx/icons/ChevronUp";
import { Clickable, Text, TextVariantSize } from "@sparx/index";

import { getInputClassNames, InputColor, InputSize } from "./Input";

import styles from "./SelectInput.module.css";

interface SelectItem<T> {
  name: string;
  value: T;
}

function getTextSizeVariant(size: InputSize): TextVariantSize {
  switch (size) {
    case "small":
      return "text-sm";
    case "medium":
      return "text-md";
    case "large":
      return "text-lg";
    case "xlarge":
      return "text-lg";
  }
}

function defaultRenderPlaceholder(size: InputSize) {
  const variantSize = getTextSizeVariant(size);
  return (
    <Text variant={`${variantSize}/secondary`} className={styles.placeholder}>
      Select an Option
    </Text>
  );
}

function defaultRenderItem<T>(item: SelectItem<T>, size: InputSize) {
  const variantSize = getTextSizeVariant(size);
  return (
    <Text variant={`${variantSize}/normal`} className={styles.defaultItem}>
      {item.name}
    </Text>
  );
}

export interface SelectInputProps<T> {
  items: SelectItem<T>[];
  selectedItem?: SelectItem<T>;
  disabled?: boolean;
  color?: InputColor;
  size?: InputSize;
  className?: string;
  renderItem?: (item: SelectItem<T>, size: InputSize) => React.ReactNode;
  renderPlaceholder?: (size: InputSize) => React.ReactNode;
  onSelect: (item?: SelectItem<T>) => unknown;
}

export function SelectInput<T>(props: SelectInputProps<T>) {
  const {
    items,
    selectedItem,
    disabled = false,
    color = "accent",
    size = "medium",
    className,
    renderItem = defaultRenderItem,
    renderPlaceholder = defaultRenderPlaceholder,
    onSelect,
  } = props;
  const { isOpen, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
    items,
    selectedItem,
    onSelectedItemChange: ({ selectedItem }) => onSelect(selectedItem ?? undefined),
  });

  const ChevronIcon = isOpen ? ChevronUp : ChevronDown;

  return (
    <div
      className={classNames(styles.container, className, {
        [styles.open]: isOpen,
        [styles.disabled]: disabled,
      })}>
      <Clickable
        className={classNames(styles.input, ...getInputClassNames(color, size))}
        disabled={disabled}
        {...getToggleButtonProps()}>
        {selectedItem != null ? renderItem(selectedItem, size) : renderPlaceholder(size)}
        <ChevronIcon size={24} className={styles.chevron} />
      </Clickable>
      <ul
        {...getMenuProps()}
        className={classNames(styles.dropdown, ...getInputClassNames(color, size), {
          [styles.dropdownOpen]: isOpen,
        })}>
        {items.map((item, index) => (
          <li
            key={`${item}${index}`}
            {...getItemProps({ item, index })}
            className={classNames(styles.itemContainer, {
              [styles.itemHighlighted]: highlightedIndex === index,
            })}>
            {renderItem(item, size)}
          </li>
        ))}
      </ul>
    </div>
  );
}
