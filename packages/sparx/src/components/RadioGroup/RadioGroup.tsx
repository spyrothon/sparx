import * as React from "react";
import classNames from "classnames";
import * as uuid from "uuid";
import RadioBlank from "@spyrothon/sparx-icons/dist/icons/RadioBlank";
import RadioSelected from "@spyrothon/sparx-icons/dist/icons/RadioSelected";

import { Stack, Text } from "@sparx/index";

import { Clickable } from "../Clickable/Clickable";

import styles from "./RadioGroup.module.css";

interface Option<T> {
  value: T;
  label: string | React.ReactNode;
  disabled?: boolean;
}

interface RadioItemProps<T> {
  selected: boolean;
  option: Option<T>;
  disabled: boolean;
  groupId: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
}

function RadioItem<T>(props: RadioItemProps<T>) {
  const { selected, option, disabled, groupId, onChange } = props;
  const { value, label } = option;

  const [inputId] = React.useState(() => uuid.v4());

  const Icon = selected ? RadioSelected : RadioBlank;
  const labelNode =
    typeof label === "string" ? (
      <Text className={styles.label}>{label}</Text>
    ) : (
      <div className={styles.label}>{label}</div>
    );

  return (
    <Clickable
      as="label"
      disabled={disabled}
      aria-selected={selected}
      className={classNames(styles.radioItem, { [styles.disabled]: disabled })}
      htmlFor={inputId}>
      <input
        type="radio"
        name={groupId}
        disabled={disabled}
        onChange={onChange}
        id={inputId}
        value={String(value)}
        style={{ display: "none" }}
      />
      <Icon className={styles.icon} size="24" />
      {labelNode}
    </Clickable>
  );
}

export interface RadioGroupProps<T> {
  value: T | undefined;
  options: Option<T>[];
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
}

export function RadioGroup<T>(props: RadioGroupProps<T>) {
  const { value, options, disabled = false, onChange } = props;
  const [groupId] = React.useState(() => uuid.v4());

  return (
    <Stack spacing="space-md">
      {options.map((option) => (
        <RadioItem
          key={String(option.value)}
          selected={value === option.value}
          option={option}
          disabled={(disabled || option.disabled) ?? false}
          groupId={groupId}
          onChange={onChange}
        />
      ))}
    </Stack>
  );
}
