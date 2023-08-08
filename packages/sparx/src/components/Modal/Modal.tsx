import * as React from "react";
import { useInteractOutside } from "react-aria";

import { animated, useTransition } from "@react-spring/web";

import { Card } from "../Card/Card";

import styles from "./Modal.module.css";

const AnimatedModalContent = animated(Card);

export interface ModalRenderProps {
  onClose: () => unknown;
}

export interface ModalProps {
  render: (props: ModalRenderProps) => React.ReactNode;
  close: () => unknown;
  closeOnBackdrop?: boolean;
}

export function ModalContainer(props: ModalProps) {
  const { render, close, closeOnBackdrop = true } = props;
  const contentRef = React.useRef<HTMLDivElement>(null);
  useInteractOutside({ ref: contentRef, isDisabled: !closeOnBackdrop, onInteractOutside: close });

  const transitions = useTransition([0], {
    from: { opacity: 0, transform: `scale(0.8)` },
    enter: { opacity: 1, transform: `scale(1)` },
    leave: { opacity: 0, transform: `scale(0.8)` },
    config: { tension: 300, friction: 25 },
  });

  return transitions((style, _item) => (
    <animated.div style={{ opacity: style.opacity }} className={styles.container}>
      <AnimatedModalContent
        floating
        ref={contentRef}
        className={styles.content}
        style={{ transform: style.transform }}>
        {render({ onClose: close })}
      </AnimatedModalContent>
    </animated.div>
  ));
}
