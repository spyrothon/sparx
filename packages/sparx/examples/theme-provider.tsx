import * as React from "react";

import { Accent, Button, Card, Stack, Text, Theme, ThemeProvider, useThemeClass } from "../dist";

export default function Component() {
  function SampleContent() {
    const themeClass = useThemeClass();
    return (
      <Stack
        className={themeClass}
        as={Card}
        spacing="space-lg"
        direction="horizontal"
        align="center">
        <Button variant="primary">Submit</Button>
        <Text>Here's some text as well</Text>
        <Text variant="text-md/accent">And with the accent color.</Text>
      </Stack>
    );
  }

  return (
    <Stack>
      <ThemeProvider theme={Theme.DARK} accent={Accent.PINK}>
        <SampleContent />
      </ThemeProvider>
      <ThemeProvider theme={Theme.LIGHT} accent={Accent.PURPLE}>
        <SampleContent />
      </ThemeProvider>
    </Stack>
  );
}
