import * as React from "react";

export type Attach = "left" | "right" | "top" | "bottom";
export type Align = "start" | "middle" | "end";

type PositionProperties = { top: number; left: number };

function getVerticalPosition(targetRect: DOMRect, height: number, align: Align) {
  switch (align) {
    case "start":
      return { top: targetRect.top };
    case "middle":
      return { top: targetRect.top + (targetRect.height - height) / 2 };
    case "end":
      return { top: targetRect.top + targetRect.height - height };
  }
}

function getHorizontalPosition(targetRect: DOMRect, width: number, align: Align) {
  switch (align) {
    case "start":
      return { left: targetRect.left };
    case "middle":
      return { left: targetRect.left + (targetRect.width - width) / 2 };
    case "end":
      return { left: targetRect.left + targetRect.width - width };
  }
}

function getPositionProperties(
  targetRect: DOMRect,
  contentRect: DOMRect,
  attach: Attach,
  align: Align,
  offset: number,
): PositionProperties {
  switch (attach) {
    case "left":
      return {
        ...getVerticalPosition(targetRect, contentRect.height, align),
        left: targetRect.left - contentRect.width - offset,
      };
    case "right":
      return {
        ...getVerticalPosition(targetRect, contentRect.height, align),
        left: targetRect.left + targetRect.width + offset,
      };
    case "top":
      return {
        ...getHorizontalPosition(targetRect, contentRect.width, align),
        top: targetRect.top - contentRect.height - offset,
      };
    case "bottom":
      return {
        ...getHorizontalPosition(targetRect, contentRect.width, align),
        top: targetRect.bottom + offset,
      };
  }
}

function getBounds(offset: number) {
  return {
    top: offset,
    right: window.innerWidth - offset,
    bottom: window.innerHeight - offset,
    left: offset,
  };
}

/**
 * Find the best-fitting `attach` value that fits the content in the viewport,
 * trying to stay as similar as possible to the requested position.
 * Returns both the resolved `attach` value and the position styles for that
 * attachment.
 */
function getAttachedPosition(
  targetRect: DOMRect,
  contentRect: DOMRect,
  attach: Attach,
  align: Align,
  offset: number,
): [Attach, PositionProperties] {
  const bounds = getBounds(offset);
  function fitsBounds(position: PositionProperties, direction: Attach) {
    switch (direction) {
      case "left":
        return position.left > bounds.left;
      case "right":
        return position.left + contentRect.width < bounds.right;
      case "top":
        return position.top > bounds.top;
      case "bottom":
        return position.top + contentRect.height < bounds.bottom;
    }
  }

  function invertTo(newAttach: Attach) {
    return getPositionProperties(targetRect, contentRect, newAttach, align, offset);
  }

  function getFirstFittingAttachment(attachments: Attach[]): [Attach, PositionProperties] {
    for (let i = 0; i < attachments.length; i++) {
      const direction = attachments[i];
      const position = invertTo(direction);
      if (fitsBounds(position, direction)) return [direction, position];
    }

    return [attachments[0], invertTo(attachments[0])];
  }

  switch (attach) {
    case "left":
      return getFirstFittingAttachment(["left", "right", "bottom", "top"]);
    case "right":
      return getFirstFittingAttachment(["right", "left", "bottom", "top"]);
    case "top":
      return getFirstFittingAttachment(["top", "bottom", "right", "left"]);
    case "bottom":
      return getFirstFittingAttachment(["bottom", "top", "right", "left"]);
  }
}

/**
 * Adjust the inline position (e.g. vertical position when attached `left`) to
 * try to fit the content within the viewport.
 */
function nudgeAlignment(
  contentRect: DOMRect,
  position: PositionProperties,
  attach: Attach,
  offset: number,
): PositionProperties {
  const bounds = getBounds(offset);

  switch (attach) {
    case "left":
    case "right":
      if (position.top < bounds.top) return { ...position, top: bounds.top };
      if (position.top + contentRect.height > bounds.bottom)
        return { ...position, top: bounds.bottom - contentRect.height };
      return position;
    case "top":
    case "bottom":
      if (position.left < bounds.left) return { ...position, left: bounds.left };
      if (position.left + contentRect.width > bounds.right)
        return { ...position, left: bounds.right - contentRect.width };
      return position;
  }
}

export interface UsePositionedLayerOptions {
  target: Element;
  attach: Attach;
  align: Align;
  offset: number;
}

/**
 * Return a set of CSS style properties to position an element next to the
 * given `targetRef`.
 */
export function usePositionedLayer(
  options: UsePositionedLayerOptions,
  targetRef: React.RefObject<Element>,
): React.CSSProperties {
  const { target, attach, align, offset } = options;

  const [positionStyle, setPositionStyle] = React.useState<React.CSSProperties>({
    position: "absolute",
  });

  React.useLayoutEffect(() => {
    const content = targetRef.current;
    if (content == null) return;

    const targetRect = target.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const [resolvedAttach, styles] = getAttachedPosition(
      targetRect,
      contentRect,
      attach,
      align,
      offset,
    );
    const nudgedStyles = nudgeAlignment(contentRect, styles, resolvedAttach, offset);

    setPositionStyle((state) => ({ ...state, ...nudgedStyles }));
    // Only calculate the position once. Afterward, anything can move freely
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetRef]);

  return positionStyle;
}

export interface PositionedLayerProps
  extends UsePositionedLayerOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const PositionedLayer = React.forwardRef(function PositionedLayer(
  props: PositionedLayerProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { children, style, ...passthroughProps } = props;

  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const positionStyle = usePositionedLayer(props, contentRef);

  function setRef(element: HTMLDivElement | null) {
    contentRef.current = element;
    if (typeof ref === "function") {
      ref(element);
    } else if (ref != null) {
      ref.current = element;
    }
  }

  return (
    <div ref={setRef} {...passthroughProps} style={{ ...style, ...positionStyle }}>
      {children}
    </div>
  );
});
