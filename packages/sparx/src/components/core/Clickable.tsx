import * as React from "react";

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

type ClickableTag = React.ElementType;

export interface ClickableOwnProps<Tag extends ClickableTag> {
  as?: Tag;
  role?: InteractiveARIARole;
  disabled?: boolean;
  tabIndex?: -1 | 0;
  children: React.ReactNode;
}

type NativeProps<Tag extends ClickableTag> = React.ComponentPropsWithoutRef<Tag>;

export type ClickableProps<Tag extends ClickableTag> = ClickableOwnProps<Tag> &
  Omit<NativeProps<Tag>, keyof ClickableOwnProps<Tag>>;

export const Clickable = React.forwardRef(function Clickable<Tag extends ClickableTag = "div">(
  props: ClickableProps<Tag> & NativeProps<Tag>,
  ref: React.ForwardedRef<HTMLElement>,
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
