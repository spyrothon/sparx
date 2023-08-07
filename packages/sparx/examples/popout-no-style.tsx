import * as React from "react";

import { Box, Button, Text, usePopout } from "../dist";

export default function Component() {
  const openerRef = React.useRef<HTMLButtonElement>(null);
  const [open, isOpen] = usePopout(
    () => (
      <Box border="strong" background="tertiary" elevation="high">
        <Text>This is a Popout with custom styling.</Text>
      </Box>
    ),
    openerRef,
    {
      attach: "right",
      align: "start",
      noStyle: true,
    },
  );

  return (
    <Button ref={openerRef} variant="primary" onPress={isOpen ? undefined : open}>
      Open Popout
    </Button>
  );
}
