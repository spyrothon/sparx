import * as React from "react";
import classNames from "classnames";
import * as uuid from "uuid";

import RadioSelected from "@sparx/icons/RadioSelected";
import RadioUnselected from "@sparx/icons/RadioUnselected";
import { Clickable, Text } from "@sparx/index";

import styles from "./FormSwitch.module.css";

export interface FormSwitchProps {
  checked: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  note?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
}

function renderSwitch() {
  return (
    <div className={styles.switch}>
      <div className={styles.iconContainer}>
        <RadioSelected className={classNames(styles.icon, styles.iconChecked)} size={20} />
        <RadioUnselected className={classNames(styles.icon, styles.iconUnchecked)} size={20} />
      </div>
    </div>
  );
}

export function FormSwitch(props: FormSwitchProps) {
  const { checked, disabled = false, label, note, onChange } = props;
  const [inputId] = React.useState(() => uuid.v4());

  return (
    <div
      className={classNames(styles.container, {
        [styles.checked]: checked,
        [styles.disabled]: disabled,
      })}>
      <Clickable
        as="label"
        disabled={disabled}
        tabIndex={0}
        aria-checked={checked}
        className={styles.mainRow}
        htmlFor={inputId}>
        <Text variant="header-sm/normal" className={styles.label}>
          {label}
        </Text>
        {renderSwitch()}
        <input
          type="checkbox"
          disabled={disabled}
          onChange={onChange}
          id={inputId}
          checked={checked}
          style={{ display: "none" }}
        />
      </Clickable>
      <Text variant="text-sm/normal" className={styles.note}>
        {note}
      </Text>
    </div>
  );
}
