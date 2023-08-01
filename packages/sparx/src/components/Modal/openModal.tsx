import * as React from "react";
import * as uuid from "uuid";

import { createLayer, removeLayer } from "@sparx/index";

import { Modal, ModalProps, ModalRenderProps } from "./Modal";

export function openModal(
  render: (props: ModalRenderProps) => React.ReactNode,
  options: Omit<ModalProps, "close" | "render"> = {},
): string {
  const name = `modal-${uuid.v4()}`;

  createLayer({
    name,
    render: () => (
      <Modal {...options} render={(props) => render(props)} close={() => removeLayer(name)} />
    ),
  });

  return name;
}
