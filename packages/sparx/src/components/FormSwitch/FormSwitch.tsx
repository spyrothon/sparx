import * as React from "react";
import classNames from "classnames";
import * as uuid from "uuid";
import CheckboxCircleChecked from "@spyrothon/sparx-icons/dist/icons/CheckboxCircleChecked";
import RadioBlank from "@spyrothon/sparx-icons/dist/icons/RadioBlank";

import { Clickable, Text } from "@sparx/index";

import { getInputClassNames, InputColor } from "../Input/Input";

import styles from "./FormSwitch.module.css";

export interface FormSwitchProps {
  checked: boolean;
  disabled?: boolean;
  color?: InputColor;
  label?: React.ReactNode;
  note?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
}

function renderSwitch() {
  return (
    <div className={styles.switch}>
      <div className={styles.iconContainer}>
        <CheckboxCircleChecked className={classNames(styles.icon, styles.iconChecked)} size={20} />
        <RadioBlank className={classNames(styles.icon, styles.iconUnchecked)} size={20} />
      </div>
    </div>
  );
}

export const FormSwitch = React.forwardRef<HTMLInputElement, FormSwitchProps>(function FormSwitch(
  props,
  ref,
) {
  const { checked, disabled = false, color = "accent", label, note, onChange } = props;
  const [inputId] = React.useState(() => uuid.v4());

  return (
    <div
      className={classNames(styles.container, ...getInputClassNames(color), {
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
          ref={ref}
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
});
