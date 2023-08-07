import * as React from "react";

import { animated, config, useTransition } from "@react-spring/web";

import styles from "./Modal.module.css";

export interface ModalRenderProps {
  onClose: () => unknown;
}

export interface ModalProps {
  render: (props: ModalRenderProps) => React.ReactNode;
  close: () => unknown;
  closeOnBackdrop?: boolean;
}

export function Modal(props: ModalProps) {
  const { render, close, closeOnBackdrop = true } = props;
  const contentRef = React.useRef<HTMLDivElement>(null);

  function handleContainerClick(event: React.MouseEvent<HTMLElement>) {
    const content = contentRef.current;
    if (content == null) return;
    if (content.contains(event.target as HTMLElement)) return;

    close();
  }

  const transitions = useTransition(render, {
    from: { opacity: 0, transform: `scale(0.8)` },
    enter: { opacity: 1, transform: `scale(1)` },
    leave: { opacity: 0, transform: `scale(0.8)` },
    config: config.stiff,
  });

  return transitions((style, _item) => (
    <animated.div
      style={{ opacity: style.opacity }}
      className={styles.container}
      onClick={closeOnBackdrop ? handleContainerClick : undefined}>
      <animated.div
        ref={contentRef}
        className={styles.positioner}
        style={{ transform: style.transform }}>
        {render({ onClose: close })}
      </animated.div>
    </animated.div>
  ));
}
