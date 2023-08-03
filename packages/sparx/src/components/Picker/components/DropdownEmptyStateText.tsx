import * as React from "react";

import { Text } from "@sparx/components/Text/Text";

import styles from "./DropdownEmptyStateText.module.css";

export function DropdownEmptyStateText(props: React.PropsWithChildren) {
  return (
    <Text variant="text-md/secondary" className={styles.emptyState}>
      <em>{props.children}</em>
    </Text>
  );
}
