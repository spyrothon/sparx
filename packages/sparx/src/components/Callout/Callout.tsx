import * as React from "react";
import classNames from "classnames";
import Check from "@spyrothon/sparx-icons/dist/icons/Check";
import Close from "@spyrothon/sparx-icons/dist/icons/Close";
import ExclamationOctagon from "@spyrothon/sparx-icons/dist/icons/ExclamationOctagon";
import ExclamationTriangle from "@spyrothon/sparx-icons/dist/icons/ExclamationTriangle";
import InfoCircle from "@spyrothon/sparx-icons/dist/icons/InfoCircle";

import { Clickable } from "../Clickable/Clickable";

import styles from "./Callout.module.css";

export type CalloutType = "success" | "info" | "warning" | "danger";

const TYPE_CLASSES = {
  success: styles.typeSuccess,
  info: styles.typeInfo,
  warning: styles.typeWarning,
  danger: styles.typeDanger,
};

function getIcon(type: CalloutType) {
  switch (type) {
    case "success":
      return Check;
    case "info":
      return InfoCircle;
    case "warning":
      return ExclamationTriangle;
    case "danger":
      return ExclamationOctagon;
  }
}

export interface CalloutProps {
  type: CalloutType;
  children: React.ReactNode;
  className?: string;
  onClose?: () => unknown;
}

export function Callout(props: CalloutProps) {
  const { type, children, className, onClose } = props;

  const Icon = getIcon(type);

  return (
    <div className={classNames(styles.callout, className, TYPE_CLASSES[type])}>
      <div className={styles.iconSidebar}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.content}>{children}</div>
      {onClose != null ? (
        <Clickable className={styles.dismissBar} onPress={onClose}>
          <Close className={styles.dismissIcon} />
        </Clickable>
      ) : null}
    </div>
  );
}
