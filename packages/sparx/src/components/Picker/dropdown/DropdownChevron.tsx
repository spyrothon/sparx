import * as React from "react";
import classNames from "classnames";
import ChevronDown from "@spyrothon/sparx-icons/dist/icons/ChevronDown";
import ChevronUp from "@spyrothon/sparx-icons/dist/icons/ChevronUp";

import { Clickable, ClickableProps } from "@sparx/index";

import styles from "./DropdownChevron.module.css";

interface DropdownChevronProps extends ClickableProps {
  isOpen: boolean;
}

export const DropdownChevron = React.forwardRef<HTMLDivElement, DropdownChevronProps>(
  function Chevron(props, ref) {
    const { isOpen, className, ...passthroughProps } = props;

    const ChevronIcon = isOpen ? ChevronUp : ChevronDown;

    return (
      <Clickable
        as={ChevronIcon}
        ref={ref}
        className={classNames(styles.chevron, className)}
        {...passthroughProps}
      />
    );
  },
);
