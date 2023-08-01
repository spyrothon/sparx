import * as React from "react";
import classNames from "classnames";
import { useSelect } from "downshift";

import ChevronDown from "@sparx/icons/ChevronDown";
import ChevronUp from "@sparx/icons/ChevronUp";
import { Clickable, Text, TextVariantSize } from "@sparx/index";

import { getInputClassNames, InputColor, InputSize } from "../Input/Input";

import styles from "./SelectInput.module.css";

const DEFAULT_MAX_HEIGHT = 440;

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

function defaultRenderItem<Item>(
  item: Item,
  size: InputSize,
  itemToString: (item: Item | null | undefined) => string,
) {
  const variantSize = getTextSizeVariant(size);
  return (
    <Text variant={`${variantSize}/normal`} className={styles.defaultItem}>
      {itemToString(item)}
    </Text>
  );
}

type ItemToString<T> = (item: T | null | undefined) => string;

export function defaultSelectItemToString<Item extends { name: string }>(
  item: Item | null | undefined,
) {
  return item?.name ?? "";
}

export interface SelectInputProps<Item> {
  items: Item[];
  selectedItem?: Item;
  color?: InputColor;
  size?: InputSize;
  disabled?: boolean;
  maxHeight?: number;
  className?: string;
  itemToString: ItemToString<Item>;
  renderItem?: (item: Item, size: InputSize, itemToString: ItemToString<Item>) => React.ReactNode;
  renderSelectedItem?: (
    item: Item,
    size: InputSize,
    itemToString: ItemToString<Item>,
  ) => React.ReactNode;
  renderPlaceholder?: (size: InputSize) => React.ReactNode;
  onSelect: (item?: Item) => unknown;
}

export function SelectInput<Item>(props: SelectInputProps<Item>) {
  const {
    items,
    selectedItem,
    disabled = false,
    color = "accent",
    size = "medium",
    maxHeight = DEFAULT_MAX_HEIGHT,
    className,
    itemToString,
    renderItem = defaultRenderItem,
    renderSelectedItem = renderItem,
    renderPlaceholder = defaultRenderPlaceholder,
    onSelect,
  } = props;
  const { isOpen, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
    items,
    selectedItem,
    itemToString,
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
        {selectedItem != null
          ? renderSelectedItem(selectedItem, size, itemToString)
          : renderPlaceholder(size)}
        <ChevronIcon size={24} className={styles.chevron} />
      </Clickable>
      <ul
        {...getMenuProps()}
        className={classNames(styles.dropdown, ...getInputClassNames(color, size), {
          [styles.dropdownOpen]: isOpen,
        })}
        style={{ "--_select-max-height": `${maxHeight}px` }}>
        {items.map((item, index) => (
          <li
            key={`${item}${index}`}
            {...getItemProps({ item, index })}
            className={classNames(styles.itemContainer, {
              [styles.itemHighlighted]: highlightedIndex === index,
            })}>
            {renderItem(item, size, itemToString)}
          </li>
        ))}
      </ul>
    </div>
  );
}
