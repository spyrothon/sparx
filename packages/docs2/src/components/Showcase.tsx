"use client";

import { Card, Stack, Text } from "@spyrothon/sparx";

import styles from "./Showcase.module.css";

interface ShowcaseProps {
  content: React.ReactNode;
  source: string;
}

export function Showcase(props: ShowcaseProps) {
  const { content, source } = props;
  return (
    <Stack className={styles.showcase} spacing="space-none">
      <div className={styles.content}>{content}</div>
      <Text variant="text-sm/normal" className={styles.source}>
        <pre>{source}</pre>
      </Text>
    </Stack>
  );
}
