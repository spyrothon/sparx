import * as React from "react";

export function useHoverFocus() {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  const callbackProps = React.useMemo(
    () => ({
      onMouseEnter() {
        setHovered(true);
      },
      onMouseLeave() {
        setHovered(false);
      },
      onFocus() {
        setFocused(true);
      },
      onBlur() {
        setFocused(false);
      },
    }),
    [],
  );

  return [callbackProps, hovered || focused, { hovered, focused }] as const;
}
