import * as React from "react";

import { Button, Card, Header, Stack, Text, usePopout } from "../dist";

function PopoutExample({ onClose }: { onClose: () => void }) {
  return (
    <Card floating>
      <div style={{ width: 300 }}>
        <Stack spacing="space-lg">
          <Header tag="h2">Popout</Header>
          <Text>This is a Popout. They tend to be taller rather than wide.</Text>
          <Text>And provide more information from the target.</Text>
          <Text>
            Close this by clicking anywhere outside of the content area, or directly with the button
            below.
          </Text>
          <Button onPress={onClose}>Do Something</Button>
        </Stack>
      </div>
    </Card>
  );
}

export default function Component() {
  const openerRef = React.useRef<HTMLButtonElement>(null);
  const [open, isOpen] = usePopout(
    ({ onClose }) => <PopoutExample onClose={onClose} />,
    openerRef,
    {
      attach: "right",
      align: "start",
    },
  );

  return (
    <Button ref={openerRef} variant="primary" onPress={isOpen ? undefined : open}>
      Open Popout
    </Button>
  );
}
