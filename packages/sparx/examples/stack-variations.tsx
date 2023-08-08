import * as React from "react";

import { Button, Stack } from "../dist";

export default function Component() {
  const elements = (
    <>
      <Button>One Element</Button>
      <Button>
        Two Element
        <br />
        Forced to a second line
      </Button>
      <Button>Three Elements</Button>
    </>
  );

  return (
    <Stack spacing="space-lg">
      <Stack direction="horizontal">{elements}</Stack>
      <Stack direction="horizontal" justify="stretch">
        {elements}
      </Stack>
      <Stack direction="horizontal" justify="stretch" align="end">
        {elements}
      </Stack>
      <Stack direction="horizontal" justify="space-around" align="end">
        {elements}
      </Stack>
    </Stack>
  );
}
