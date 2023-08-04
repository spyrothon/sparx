import * as React from "react";
import classNames from "classnames";
import { useButton } from "react-aria";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithRef,
} from "react-polymorphic-types";

import type { PolymorphicRef } from "@sparx/utils/TypeUtils";

import styles from "./Clickable.module.css";

type InteractiveARIARole =
  | "button"
  | "combobox"
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
  noCursor?: boolean;
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
      noCursor = false,
      disabled: isDisabled,
      className,
      children,
      onClick,
      ...extraProps
    } = props;

    const innerRef = React.useRef<HTMLElement | null>(null);

    const { buttonProps } = useButton(
      {
        ...extraProps,
        disabled: isDisabled,
        onPress: onClick,
        elementType: Component,
      },
      innerRef,
    );

    function setRef(element: HTMLElement | null) {
      innerRef.current = element;
      if (ref == null) return;
      if (typeof ref === "function") {
        ref(element);
      } else {
        ref.current = element;
      }
    }

    return (
      <Component
        {...buttonProps}
        ref={setRef}
        className={noCursor ? className : classNames(styles.clickableCursor, className)}>
        {children}
      </Component>
    );
  });
