import * as React from "react";

import { Button, Stack, Text, useTooltip } from "../dist";
import ImageQuestion from "../src/icons/ImageQuestion";

export default function Component() {
  const [customTooltipProps] = useTooltip<HTMLButtonElement>(
    <Stack direction="horizontal" spacing="space-md" align="center">
      <ImageQuestion size={24} />
      <div>
        <Text variant="header-xs/normal">This one has an icon</Text>
        <Text variant="text-sm/secondary">And some descriptive text</Text>
      </div>
    </Stack>,
  );

  return (
    <Button variant="primary" {...customTooltipProps}>
      Hover for Custom Tooltip
    </Button>
  );
}
