import * as React from "react";

import type { InputSize } from "../Input/Input";
import { TextVariantSize } from "../Text/Text";
import { DropdownEmptyStateText } from "./components/DropdownEmptyStateText";
import { DropdownItem } from "./components/DropdownItem";

export type ItemToString<T> = (item: T | null | undefined) => string;

export type RenderItem<T> = (
  item: T,
  size: InputSize,
  itemToString: ItemToString<T>,
) => React.ReactNode;

export interface DropdownItemState {
  isHighlighted: boolean;
  isSelected: boolean;
}

export function getTextSizeVariant(size: InputSize): TextVariantSize {
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

export function defaultEmptyState(query: string | undefined) {
  return (
    <DropdownEmptyStateText>
      No results{query != null ? ` for ${query}` : null}
    </DropdownEmptyStateText>
  );
}

export function defaultRenderItem<Item extends object>(item: Item, index: number) {
  return (
    <DropdownItem item={item} index={index}>
      <DropdownItem.Label>{defaultPickerItemToString(item)}</DropdownItem.Label>
    </DropdownItem>
  );
}

export function defaultPickerItemToString<Item extends object>(item: Item | null | undefined) {
  if (item == null) return "";
  if ("name" in item) return String((item as { name: any }).name);
  return "";
}
