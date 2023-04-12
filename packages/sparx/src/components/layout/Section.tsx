import * as React from "react";

import styles from "./Section.module.css";

export function Section(props: React.PropsWithChildren) {
  return <section className={styles.section} {...props} />;
}
