import * as React from "react";
import classNames from "classnames";
import filterInvalidDOMProps from "filter-invalid-dom-props";
import { AriaButtonProps, useButton } from "react-aria";

import { useSetRef } from "@sparx/utils/RefUtils";

import styles from "./Clickable.module.css";

export interface ClickableProps<Tag extends React.ElementType = "div">
  extends AriaButtonProps<Tag> {
  role?: React.AriaRole;
  noCursor?: boolean;
  as?: Tag;
  className?: string;
  htmlFor?: string;
}

export const Clickable = React.forwardRef(function Clickable<Tag extends React.ElementType = "div">(
  props: ClickableProps<Tag>,
  ref: React.ComponentPropsWithRef<Tag>["ref"],
) {
  const {
    as: Component = "div",
    noCursor = false,
    className,
    children,
    isDisabled: _isDisabled,
    excludeFromTabOrder: _excludeFromTabOrder,
  } = props;

  const innerRef = React.useRef<HTMLElement | null>(null);
  const { buttonProps } = useButton({ ...props, elementType: Component }, innerRef);
  const setRef = useSetRef(innerRef, ref);

  return (
    <Component
      {...filterInvalidDOMProps(props)}
      {...buttonProps}
      ref={setRef}
      className={noCursor ? className : classNames(styles.clickableCursor, className)}>
      {children}
    </Component>
  );
});
