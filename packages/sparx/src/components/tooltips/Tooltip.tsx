import * as React from "react";
import classNames from "classnames";
import * as uuid from "uuid";

import { Text } from "@sparx/index";

import { createLayer, removeLayer, useLayerSubscription } from "../layers/LayersStore";
import { Align, Attach, PositionedLayer } from "../layers/PositionedLayer";

import styles from "./Tooltip.module.css";

export interface TooltipTargetProps<Target extends Element = Element> {
  ref: React.RefObject<Target>;
  onMouseEnter: () => unknown;
  onMouseLeave: () => unknown;
  onFocus: () => unknown;
  onBlur: () => unknown;
  onContextMenu: () => unknown;
}

export interface TooltipOptions {
  attach?: Attach;
  align?: Align;
  offset?: number;
  className?: string;
}

/**
 * A hook for creating a Tooltip without having to wrap the target element with
 * another component, and for gaining more granular control over properties, like
 * imperatively opening/closing the Tooltip.
 */
export function useTooltip<Target extends Element = Element>(
  render: React.ReactNode,
  options?: TooltipOptions,
): [TooltipTargetProps<Target>, () => void, () => void, string] {
  const attach = options?.attach ?? "top";
  const align = options?.align ?? "middle";
  const offset = options?.offset ?? 8;
  const className = options?.className;

  const contentRef = React.useRef<HTMLDivElement>(null);
  const targetRef = React.useRef<Target>(null);
  const [name] = React.useState(() => uuid.v4());
  const exists = useLayerSubscription(name) != null;

  const openTooltip = React.useCallback(() => {
    if (exists) return;

    const target = targetRef.current;
    if (target == null) return;

    const inner =
      typeof render === "string" ? <Text variant="text-sm/normal">{render}</Text> : render;

    createLayer({
      name,
      render: () => (
        <PositionedLayer
          ref={contentRef}
          target={target}
          className={classNames(styles.tooltip, className)}
          attach={attach}
          align={align}
          offset={offset}>
          {inner}
        </PositionedLayer>
      ),
    });
  }, [exists, render, name, className, attach, align, offset]);

  const closeTooltip = React.useCallback(() => {
    if (!exists) return;
    removeLayer(name);
  }, [exists, name]);

  return [
    {
      ref: targetRef,
      onMouseEnter: openTooltip,
      onMouseLeave: closeTooltip,
      onFocus: openTooltip,
      onBlur: closeTooltip,
      onContextMenu: closeTooltip,
    },
    openTooltip,
    closeTooltip,
    name,
  ];
}

export interface TooltipProps<T extends Element = Element> extends TooltipOptions {
  render: React.ReactNode;
  children: (props: TooltipTargetProps<T>) => JSX.Element;
}

/**
 * Convenience component for rendering a Tooltip in non-hooks contexts.
 */
export function Tooltip<T extends Element = Element>(props: TooltipProps<T>) {
  const { render, attach, align, offset, children } = props;
  const [tooltipProps] = useTooltip<T>(render, { attach, align, offset });

  return children(tooltipProps);
}
