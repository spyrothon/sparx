import * as React from "react";
import { Stack, Text } from "@spyrothon/sparx";

import PageHeader from "./PageHeader";

export default function Layout() {
  return (
    <Stack spacing="space-lg" align="stretch">
      <PageHeader name="Layout" tagline="Components for structuring pieces together" />
      <Text>
        Layout components provide utilities for managing how multiple components get positioned
        together and affect the flow of content.
      </Text>
    </Stack>
  );
}
