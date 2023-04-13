import * as React from "react";
import { Card, Section, Stack, Tabs, Tag, Text } from "@spyrothon/sparx";

import PageHeader from "./PageHeader";

function TabsComponent() {
  return (
    <Stack as={Section} spacing="space-lg">
      <Card>
        <Tabs.Group>
          <Tabs.Header label="Group 1" />
          <Tabs.Tab label="Item 1" />
          <Tabs.Tab label="Item 2" />
          <Tabs.Tab label="Item 3" color="accent" />
          <Tabs.Header label="Group 2" />
          <Tabs.Tab label="Item 4" color="success" badge="15" />
          <Tabs.Tab label="Item 5" color="danger" badge={12} />
          <Tabs.Tab
            label="Item 6"
            badge={
              <Tag color="success" solid>
                New
              </Tag>
            }
          />
          <Tabs.Tab label="Item 7" />
        </Tabs.Group>
      </Card>
    </Stack>
  );
}

export default function Layout() {
  return (
    <Stack spacing="space-lg" align="stretch">
      <PageHeader name="Layout" tagline="Components for structuring pieces together" />
      <Text>
        Layout components provide utilities for managing how multiple components get positioned
        together and affect the flow of content.
      </Text>
      <TabsComponent />
    </Stack>
  );
}
