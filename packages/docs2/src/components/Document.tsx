"use client";

import { Stack } from "@spyrothon/sparx";

interface DocumentProps {
  children: React.ReactNode;
}

export function Document(props: DocumentProps) {
  const { children } = props;
  return <Stack spacing="space-md">{children}</Stack>;
}
