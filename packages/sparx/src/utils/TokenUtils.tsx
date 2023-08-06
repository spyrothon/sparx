import * as React from "react";

import { ThemeContext } from "@sparx/components/ThemeProvider/ThemeProvider";

export function resolvePropertyAtElement(
  propertyName: string,
  element: Element,
  fallback: string = "",
) {
  if (window == null) return fallback;
  const style = window.getComputedStyle(element);
  const value = style.getPropertyValue(propertyName);
  console.log(typeof value, `"${value}"`);
  return value === "" ? fallback : value;
}

export function useResolvedPropertyAtElement(
  propertyName: string,
  ref: React.RefObject<Element>,
  fallback: string = "",
  deps: any[] = [],
) {
  return "";
}
