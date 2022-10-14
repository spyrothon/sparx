import * as React from "react";

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

  return (
    <div className={styles.container} onClick={closeOnBackdrop ? handleContainerClick : undefined}>
      <div ref={contentRef} className={styles.positioner}>
        {render({ onClose: close })}
      </div>
    </div>
  );
}
