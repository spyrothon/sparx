import * as React from "react";
import classNames from "classnames";
import ChevronDown from "@spyrothon/sparx-icons/dist/icons/ChevronDown";
import ChevronUp from "@spyrothon/sparx-icons/dist/icons/ChevronUp";

import styles from "./DropdownChevron.module.css";

interface DropdownChevronProps {
  isOpen: boolean;
  className?: string;
}

export function DropdownChevron(props: DropdownChevronProps) {
  const { isOpen, className } = props;
  const ChevronIcon = isOpen ? ChevronUp : ChevronDown;

  return <ChevronIcon className={classNames(styles.chevron, className)} />;
}
