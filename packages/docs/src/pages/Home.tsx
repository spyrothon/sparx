import * as React from "react";
import { Accent, Callout, Card, Header, Stack, Text } from "@spyrothon/sparx";

import usePageAccent from "../usePageAccent";
import PageHeader from "./PageHeader";

export default function Home() {
  usePageAccent(Accent.BLUE);

  return (
    <Stack spacing="space-lg" align="stretch">
      <PageHeader
        name="Sparx Design System"
        tagline="Spyrothon's Design System for React-based web applications."
      />
      <Text>
        Welcome to the Sparx Design System documentation. The design system is currently defined as
        a React-based JavaScript package, built to provide a sharp, clear, and consistent look and
        feel across all of the applications that Spyrothon operates.
      </Text>
      <Callout type="warning">
        <Header tag="h3" variant="header-sm/normal" withMargin>
          This system is still in development!
        </Header>
        <Text>
          Not all of the planned components for the design system have been implemented yet. As
          progress is made, interfaces may change
        </Text>
      </Callout>
      <Header tag="h2">Installation</Header>
      <Text>To get started, install the design system using your package manager of choice.</Text>
      <Card>
        <Text>
          <code>npm install @spyrothon/sparx</code>
        </Text>
        <Text>
          <code>yarn add @spyrothon/sparx</code>
        </Text>
      </Card>
    </Stack>
  );
}
