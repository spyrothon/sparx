import * as React from "react";

import { Button, Header, Stack, Text } from "@sparx/index";

import { ButtonVariantColor } from "../Button/Button";
import { ModalRenderProps } from "./Modal";

import styles from "./ConfirmModal.module.css";

export interface ConfirmModalProps extends ModalRenderProps {
  title: React.ReactNode;
  body?: React.ReactNode;
  color?: ButtonVariantColor;
  confirmText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onConfirm: () => unknown;
  onCancel?: () => unknown;
}

export function ConfirmModal(props: ConfirmModalProps) {
  const {
    title,
    body,
    color = "danger",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    onClose,
  } = props;

  function handleConfirm() {
    onConfirm();
    onClose();
  }

  function handleCancel() {
    onCancel?.();
    onClose();
  }

  return (
    <Stack spacing="space-lg" className={styles.container}>
      <Header tag="h2">{title}</Header>
      {body != null ? <Text>{body}</Text> : null}
      <Stack spacing="space-md" direction="reverse-horizontal">
        <Button variant={color} onPress={handleConfirm} autoFocus>
          {confirmText}
        </Button>
        {onCancel != null ? (
          <Button variant="link" onPress={handleCancel}>
            {cancelText}
          </Button>
        ) : null}
      </Stack>
    </Stack>
  );
}
