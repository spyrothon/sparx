import * as React from "react";

import { Button, ConfirmModal, openModal } from "../dist";

export default function Component() {
  function openConfirmModal() {
    openModal(
      (props) => (
        <ConfirmModal
          {...props}
          title="Hello"
          body="This is a confirm modal, with some body text as well. Pressing an action will log information to the console."
          onConfirm={() => console.log("hit the confirm button")}
          onCancel={() => console.log("hit the cancel button")}
        />
      ),
      { closeOnBackdrop: false },
    );
  }

  return (
    <Button variant="primary" onPress={openConfirmModal}>
      Open Confirm Modal
    </Button>
  );
}
