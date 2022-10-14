import * as React from "react";
import classNames from "classnames";
import { useSelect } from "downshift";

import ChevronDown from "@sparx/icons/ChevronDown";
import ChevronUp from "@sparx/icons/ChevronUp";
import { Clickable, Text } from "@sparx/index";

import styles from "./SelectInput.module.css";

interface SelectItem<T> {
  name: string;
  value: T;
}

function defaultRenderPlaceholder() {
  return (
    <Text variant="text-md/secondary" className={styles.placeholder}>
      Select an Option
    </Text>
  );
}

function defaultRenderItem<T>(item: SelectItem<T>) {
  return <Text className={styles.defaultItem}>{item.name}</Text>;
}

export interface SelectInputProps<T> {
  items: SelectItem<T>[];
  selectedItem?: SelectItem<T>;
  disabled?: boolean;
  className?: string;
  renderItem?: (item: SelectItem<T>) => React.ReactNode;
  renderPlaceholder?: () => React.ReactNode;
  onSelect: (item?: SelectItem<T>) => unknown;
}

export function SelectInput<T>(props: SelectInputProps<T>) {
  const {
    items,
    selectedItem,
    disabled = false,
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
      <Clickable className={styles.input} disabled={disabled} {...getToggleButtonProps()}>
        {selectedItem != null ? renderItem(selectedItem) : renderPlaceholder()}
        <ChevronIcon size={24} className={styles.chevron} />
      </Clickable>
      <ul
        {...getMenuProps()}
        className={classNames(styles.dropdown, { [styles.dropdownOpen]: isOpen })}>
        {items.map((item, index) => (
          <li
            key={`${item}${index}`}
            {...getItemProps({ item, index })}
            className={classNames(styles.itemContainer, {
              [styles.itemHighlighted]: highlightedIndex === index,
            })}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}
