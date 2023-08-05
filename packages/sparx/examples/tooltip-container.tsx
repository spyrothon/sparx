import * as React from "react";

import { Button, Stack, Tooltip } from "../dist";

export default function Component() {
  const [secondButton, setSecondButton] = React.useState(true);

  return (
    <Stack direction="horizontal">
      <Tooltip<HTMLButtonElement> render="Some tooltip text">
        {(tooltipProps) => (
          <Button variant="primary" {...tooltipProps} onPress={() => setSecondButton(true)}>
            Hover for Tooltip
          </Button>
        )}
      </Tooltip>
      {secondButton ? (
        <Tooltip<HTMLButtonElement> render="Some tooltip text">
          {(tooltipProps) => (
            <Button variant="primary" {...tooltipProps} onPress={() => setSecondButton(false)}>
              Click to remove
            </Button>
          )}
        </Tooltip>
      ) : null}
    </Stack>
  );
}
