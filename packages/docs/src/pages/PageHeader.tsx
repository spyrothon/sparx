import * as React from "react";
import { Header, Hero, Stack, Text } from "@spyrothon/sparx";

interface PageHeaderProps {
  name: string;
  tagline?: string;
}

export default function PageHeader(props: PageHeaderProps) {
  const { name, tagline } = props;

  return (
    <Hero type="primary">
      <Stack spacing="space-md">
        <Header tag="h1" variant="header-xxl/inherit" uppercase>
          {name}
        </Header>
        {tagline != null ? <Text variant="text-lg/inherit">{tagline}</Text> : null}
      </Stack>
    </Hero>
  );
}
