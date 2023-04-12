import * as React from "react";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithRef,
} from "react-polymorphic-types";

import type { PolymorphicRef } from "@sparx/utils/TypeUtils";

type InteractiveARIARole =
  | "button"
  | "gridcell"
  | "link"
  | "listitem"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "option"
  | "radio"
  | "switch"
  | "tab"
  | "treeitem";

interface ClickableOwnProps {
  role?: InteractiveARIARole;
  disabled?: boolean;
  tabIndex?: -1 | 0;
}

export type ClickableProps<Tag extends React.ElementType = "div"> = PolymorphicPropsWithRef<
  ClickableOwnProps,
  Tag
>;

export const Clickable: PolymorphicForwardRefExoticComponent<ClickableOwnProps, "div"> =
  React.forwardRef(function Clickable<Tag extends React.ElementType = "div">(
    props: ClickableProps<Tag>,
    ref?: PolymorphicRef<Tag>,
  ) {
    const {
      as: Component = "div",
      role = "button",
      disabled = false,
      tabIndex = 0,
      children,
      className,
      onClick,
      ...extraProps
    } = props;

    const innerRef = React.useRef<HTMLElement | null>(null);

    function setRef(element: HTMLElement | null) {
      innerRef.current = element;
      if (ref == null) return;
      if (typeof ref === "function") {
        ref(element);
      } else {
        ref.current = element;
      }
    }

    function handleKeyDown(event: React.KeyboardEvent) {
      const element = innerRef.current;
      if (element == null) return;

      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        element.click();
      }
    }

    return (
      <Component
        {...extraProps}
        ref={setRef}
        role={role}
        tabIndex={disabled ? -1 : tabIndex}
        className={className}
        onClick={!disabled ? onClick : undefined}
        onKeyDown={!disabled ? handleKeyDown : undefined}>
        {children}
      </Component>
    );
  });
