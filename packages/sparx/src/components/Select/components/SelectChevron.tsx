import * as React from "react";
import classNames from "classnames";

import ChevronDown from "@sparx/icons/ChevronDown";
import ChevronUp from "@sparx/icons/ChevronUp";
import { Clickable, ClickableProps } from "@sparx/index";

import styles from "./SelectComponents.module.css";

interface SelectChevronProps extends ClickableProps {
  isOpen: boolean;
}

export function SelectChevron(props: SelectChevronProps) {
  const { isOpen, ...passthroughProps } = props;

  const ChevronIcon = isOpen ? ChevronUp : ChevronDown;

  return (
    <Clickable className={classNames(styles.chevronContainer)} {...passthroughProps}>
      <ChevronIcon size={24} className={styles.chevron} />
    </Clickable>
  );
}
