import * as React from "react";

import { Button, Card, Stack, Text } from "../dist";
import { getInjectedThemeContext } from "./util/Theming";

const { ThemeProvider, useThemeClass } = getInjectedThemeContext();

export default function Component() {
  function SampleContent() {
    const themeClass = useThemeClass();
    return (
      <Stack asChild spacing="space-lg" direction="horizontal" align="center">
        <Card className={themeClass}>
          <Button variant="primary">Submit</Button>
          <Text>Here's some text as well</Text>
          <Text variant="text-md/accent">And with the accent color.</Text>
        </Card>
      </Stack>
    );
  }

  return (
    <Stack>
      <ThemeProvider theme="dark" accent="pink">
        <SampleContent />
      </ThemeProvider>
      <ThemeProvider theme="light" accent="purple">
        <SampleContent />
      </ThemeProvider>
    </Stack>
  );
}
