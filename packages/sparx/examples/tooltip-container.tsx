import * as React from "react";

import { Button, Tooltip } from "../dist";

export default function Component() {
  return (
    <Tooltip<HTMLButtonElement> render="Some tooltip text">
      {(tooltipProps) => (
        <Button variant="primary" {...tooltipProps}>
          Hover for Tooltip
        </Button>
      )}
    </Tooltip>
  );
}
