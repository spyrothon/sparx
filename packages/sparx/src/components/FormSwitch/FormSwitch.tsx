import * as React from "react";
import classNames from "classnames";
import * as uuid from "uuid";
import Check from "@spyrothon/sparx-icons/dist/icons/Check";

import { animated, config, useSpring } from "@react-spring/web";
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

function Switch(props: { checked: boolean }) {
  const { checked } = props;

  const { left, filter } = useSpring({
    left: checked ? 24 : 0,
    filter: `grayscale(${checked ? 0 : 100}%)`,
    config: { ...config.stiff, clamp: true },
  });

  const { opacity } = useSpring({
    opacity: checked ? 1 : 0,
    config: config.gentle,
  });

  return (
    <animated.div className={styles.switch} style={{ filter }}>
      <animated.div className={styles.knob} style={{ left }}>
        <animated.div style={{ opacity }}>
          <Check size={18} />
        </animated.div>
      </animated.div>
    </animated.div>
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
        <Switch checked={checked} />
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
