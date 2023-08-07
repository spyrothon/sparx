"use client";

import * as React from "react";
import { Box, Stack } from "@spyrothon/sparx";
import { toH } from "hast-to-hyperscript";
import { refractor } from "refractor";
import tsx from "refractor/lang/tsx";
import bash from "refractor/lang/bash";
import css from "refractor/lang/css";

import styles from "./Showcase.module.css";

import "./syntaxHighlighting.css";

refractor.register(bash);
refractor.register(css);
refractor.register(tsx);

interface ShowcaseProps {
  content: React.ReactNode;
  source: string;
  language: "tsx" | "jsx" | "bash";
}

export function Showcase(props: ShowcaseProps) {
  const { content, source, language = "tsx" } = props;
  const highlighted = React.useMemo(
    () => toH(React.createElement, refractor.highlight(source, language)),
    [source, language],
  );

  return (
    <Stack
      as={Box}
      className={styles.showcase}
      spacing="space-none"
      background="floating"
      border="subtle"
      radius="large"
      elevation="low">
      <div className={styles.content}>{content}</div>
      <pre className={styles.source + ` refractor-highlight language-${language}`}>
        <code>{highlighted}</code>
      </pre>
    </Stack>
  );
}
