"use client";

import * as React from "react";
import { Box, Stack } from "@spyrothon/sparx";

import { Code } from "./Code";

import styles from "./Showcase.module.css";

interface ShowcaseProps {
  content: React.ReactNode;
  source: string;
  language: "tsx" | "jsx" | "bash";
}

export function Showcase(props: ShowcaseProps) {
  const { content, source, language = "tsx" } = props;

  return (
    <Stack asChild spacing="space-none">
      <Box
        className={styles.showcase}
        background="floating"
        border="subtle"
        radius="large"
        elevation="low">
        <div className={styles.content}>{content}</div>
        <Code source={source} language={language} />
      </Box>
    </Stack>
  );
}
