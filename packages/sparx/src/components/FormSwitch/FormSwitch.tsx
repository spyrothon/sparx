import * as React from "react";
import classNames from "classnames";
import * as uuid from "uuid";
import Check from "@spyrothon/sparx-icons/dist/icons/Check";

import { animated, config, useSpring } from "@react-spring/web";
import { Clickable, Text } from "@sparx/index";

import { getInputClassNames, InputState, useInputColorToken } from "../Input/Input";
import { useResolvedColorToken } from "../ThemeProvider/ThemeProvider";

import styles from "./FormSwitch.module.css";

export interface FormSwitchProps {
  checked: boolean;
  disabled?: boolean;
  state?: InputState;
  label?: React.ReactNode;
  note?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
}

function Switch(props: { checked: boolean; state: InputState }) {
  const { checked, state } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);

  const inputColor = useInputColorToken(state, "color");
  const resolvedColor = inputColor === "transparent" ? inputColor : inputColor.hsla;
  const resolvedBackground = useResolvedColorToken("CONTROL_BACKGROUND").hsla;

  const [{ opacity, transform, trackColor }] = useSpring(
    () => ({
      trackColor: checked ? resolvedColor : resolvedBackground,
      opacity: checked ? 1 : 0,
      transform: `scale(${checked ? 1 : 0.7})`,
      config: config.gentle,
    }),
    [checked, resolvedColor, resolvedBackground],
  );
  const { left } = useSpring({
    left: checked ? 24 : 0,
    config: { ...config.stiff, clamp: true },
  });

  return (
    <animated.div
      ref={containerRef}
      className={styles.switch}
      style={{ backgroundColor: trackColor, borderColor: trackColor }}>
      <animated.div className={styles.knob} style={{ left }}>
        <animated.div style={{ opacity, color: trackColor, transform }}>
          <Check size={18} />
        </animated.div>
      </animated.div>
    </animated.div>
  );
}

export const FormSwitch = React.forwardRef<HTMLInputElement, FormSwitchProps>(
  function FormSwitch(props, ref) {
    const { checked, disabled = false, state = "accent", label, note, onChange } = props;
    const [inputId] = React.useState(() => uuid.v4());

    return (
      <div
        className={classNames(styles.container, ...getInputClassNames(state), {
          [styles.disabled]: disabled,
        })}>
        <Clickable
          as="label"
          isDisabled={disabled}
          aria-checked={checked}
          className={styles.mainRow}
          htmlFor={inputId}>
          <Text variant="header-sm/normal" className={styles.label}>
            {label}
          </Text>
          <Switch checked={checked} state={state} />
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
  },
);
