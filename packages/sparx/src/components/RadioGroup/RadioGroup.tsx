import * as React from "react";
import classNames from "classnames";
import * as uuid from "uuid";

import { animated, useSpring } from "@react-spring/web";
import { Stack, Text } from "@sparx/index";

import { Clickable } from "../Clickable/Clickable";
import { InputState, useInputColorToken } from "../Input/Input";
import { useResolvedColorToken } from "../ThemeProvider/ThemeProvider";

import styles from "./RadioGroup.module.css";

const DOT_SPRING_CONFIG = {
  tension: 400,
  friction: 20,
};

interface Option<T> {
  value: T;
  label: string | React.ReactNode;
  disabled?: boolean;
}

interface RadioItemProps<T> {
  selected: boolean;
  state: InputState;
  option: Option<T>;
  disabled: boolean;
  groupId: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
}

function RadioItem<T>(props: RadioItemProps<T>) {
  const { selected, state, option, disabled, groupId, onChange } = props;
  const { value, label } = option;

  const [inputId] = React.useState(() => uuid.v4());

  const containerRef = React.useRef<HTMLLabelElement>(null);
  const inputColor = useInputColorToken(state, "color");
  const defaultBackgroundColor = useResolvedColorToken("BACKGROUND_ACCENT").rgba;
  const resolvedColor = inputColor === "transparent" ? inputColor : inputColor.rawColor;
  const [{ opacity, transform, backgroundColor }] = useSpring(
    () => ({
      backgroundColor: selected ? resolvedColor : defaultBackgroundColor,
      opacity: selected ? 1 : 0,
      transform: `scale(${selected ? 1 : 1.5})`,
      config: (key) => ({
        ...DOT_SPRING_CONFIG,
        friction:
          key === "backgroundColor" ? DOT_SPRING_CONFIG.friction - 15 : DOT_SPRING_CONFIG.friction,
        clamp: key === "backgroundColor",
      }),
    }),
    [selected, defaultBackgroundColor, resolvedColor],
  );

  const labelNode =
    typeof label === "string" ? (
      <Text className={styles.label}>{label}</Text>
    ) : (
      <div className={styles.label}>{label}</div>
    );

  return (
    <Clickable
      ref={containerRef}
      as="label"
      isDisabled={disabled}
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
      <animated.div className={styles.icon} style={{ backgroundColor }}>
        <animated.div className={styles.dot} style={{ opacity, transform }} />
      </animated.div>
      {labelNode}
    </Clickable>
  );
}

export interface RadioGroupProps<T> {
  value: T | undefined;
  state?: InputState;
  options: Option<T>[];
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
}

export function RadioGroup<T>(props: RadioGroupProps<T>) {
  const { value, state = "default", options, disabled = false, onChange } = props;
  const [groupId] = React.useState(() => uuid.v4());

  return (
    <Stack spacing="space-md">
      {options.map((option) => (
        <RadioItem
          key={String(option.value)}
          selected={value === option.value}
          state={state}
          option={option}
          disabled={(disabled || option.disabled) ?? false}
          groupId={groupId}
          onChange={onChange}
        />
      ))}
    </Stack>
  );
}
