import * as React from "react";

import type { InputSize } from "../Input/Input";
import { Text, TextVariantSize } from "../Text/Text";

export type ItemToString<T> = (item: T | null | undefined) => string;

export type RenderItem<T> = (
  item: T,
  size: InputSize,
  itemToString: ItemToString<T>,
) => React.ReactNode;

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

export function defaultRenderItem<Item>(
  item: Item,
  size: InputSize,
  itemToString: (item: Item | null | undefined) => string,
) {
  const variantSize = getTextSizeVariant(size);
  return <Text variant={`${variantSize}/normal`}>{itemToString(item)}</Text>;
}
