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
  return value === "" ? fallback : value;
}

export function useResolvedPropertyAtElement(
  propertyName: string,
  ref: React.RefObject<Element>,
  fallback: string = "",
  deps: any[] = [],
) {
  const [resolved, setResolved] = React.useState<string>(fallback);
  const { theme, accent } = React.useContext(ThemeContext);
  React.useLayoutEffect(() => {
    const element = ref.current;
    if (element == null) return;

    const value = resolvePropertyAtElement(propertyName, element, fallback);
    setResolved(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyName, ref, theme, accent, ...deps]);

  return resolved;
}
