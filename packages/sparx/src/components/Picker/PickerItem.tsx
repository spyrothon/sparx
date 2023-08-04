import * as React from "react";
import { IconProps } from "@spyrothon/sparx-icons";

import { Text } from "@sparx/components/Text/Text";

import styles from "./PickerItem.module.css";

export interface PickerItemProps extends React.PropsWithChildren {
  icon?: React.ElementType<IconProps>;
  description?: React.ReactNode;
}

export function PickerItem(props: PickerItemProps) {
  const { icon: Icon, description, children } = props;

  return (
    <div className={styles.itemContainer}>
      {Icon != null ? <div className={styles.itemIcon}>{<Icon size={20} />}</div> : null}
      <div className={styles.itemLabel}>
        <Text variant="text-md/normal">{children}</Text>
        {description != null ? <Text variant="text-sm/secondary">{description}</Text> : null}
      </div>
    </div>
  );
}
