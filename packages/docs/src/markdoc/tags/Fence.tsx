"use client";

import { Box } from "@spyrothon/sparx";

import { Code } from "@/components/Code";

import styles from "./Fence.module.css";

interface FenceProps {
  children: string;
  language: string;
}

export function Fence(props: FenceProps) {
  const { children, language } = props;

  return (
    <Box
      className={styles.box}
      background="floating"
      border="subtle"
      radius="large"
      elevation="none">
      <Code source={children} language={language} />
    </Box>
  );
}
