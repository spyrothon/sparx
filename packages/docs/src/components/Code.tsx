import * as React from "react";
import { toH } from "hast-to-hyperscript";
import { refractor } from "refractor";
import tsx from "refractor/lang/tsx";
import bash from "refractor/lang/bash";
import css from "refractor/lang/css";

import styles from "./Code.module.css";

import "./syntaxHighlighting.css";

refractor.register(bash);
refractor.register(css);
refractor.register(tsx);

interface CodeProps {
  source: string;
  language: string;
}

export function Code(props: CodeProps) {
  const { source, language = "tsx" } = props;
  const highlighted = React.useMemo(
    () => toH(React.createElement, refractor.highlight(source, language)),
    [source, language],
  );

  return (
    <pre className={styles.source + ` refractor-highlight language-${language}`}>
      <code>{highlighted}</code>
    </pre>
  );
}
