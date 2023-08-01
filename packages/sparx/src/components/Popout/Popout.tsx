import * as React from "react";

import { Align, Attach, PositionedLayer } from "../Layer/PositionedLayer";

import styles from "./Popout.module.css";

export interface PopoutRenderProps {
  onClose: () => unknown;
}

export interface PopoutProps {
  render: (props: PopoutRenderProps) => React.ReactNode;
  target: Element;
  attach?: Attach;
  align?: Align;
  close: () => unknown;
}

export function Popout(props: PopoutProps) {
  const { render, target, attach = "right", align = "start", close } = props;

  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    function handleClick(event: MouseEvent) {
      const content = contentRef.current;
      if (content == null) return;
      if (content.contains(event.target as HTMLElement)) return;
      close();
    }
    // For some reason this has to be delayed a tick, otherwise the handler receives
    // the event that _opens_ the Popout, and immediately closes it.
    setTimeout(() => document.body.addEventListener("click", handleClick), 1);
    return () => document.body.removeEventListener("click", handleClick);
  }, []);

  return (
    <PositionedLayer
      ref={contentRef}
      target={target}
      className={styles.popout}
      attach={attach}
      align={align}
      offset={8}>
      {render({ onClose: close })}
    </PositionedLayer>
  );
}
