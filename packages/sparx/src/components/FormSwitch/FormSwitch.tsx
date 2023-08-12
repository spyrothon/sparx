import * as React from "react";
import classNames from "classnames";
import * as uuid from "uuid";
import { Check } from "@spyrothon/sparx-icons/icons/Check";

import { animated, config, useSpring } from "@react-spring/web";
import { Clickable, Text } from "@sparx/index";

import { getInputClassNames, InputStatus, useInputColorToken } from "../Input/Input";
import { useResolvedColorToken } from "../ThemeProvider/ThemeProvider";

import styles from "./FormSwitch.module.css";

export interface FormSwitchProps {
  checked: boolean;
  disabled?: boolean;
  state?: InputStatus;
  label?: React.ReactNode;
  note?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
}

function Switch(props: { checked: boolean; pressed: boolean; state: InputStatus }) {
  const { checked, pressed, state } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);

  const inputColor = useInputColorToken(state, "color");
  const resolvedColor = inputColor === "transparent" ? inputColor : inputColor.hsla;
  const resolvedBackground = useResolvedColorToken("CONTROL_BACKGROUND").hsla;

  const { progress, pressProgress } = useSpring({
    progress: checked ? (pressed ? 0.7 : 1) : pressed ? 0.3 : 0,
    pressProgress: pressed ? 1 : 0,
    config: config.stiff,
  });

  const trackColor = progress.to([0, 1], [resolvedBackground, resolvedColor]);
  const transform = progress.to({
    extrapolate: "clamp",
    range: [0, 1],
    output: [`scale(0.5)`, `scale(1)`],
  });
  const left = progress.to({
    extrapolate: "clamp",
    range: [0, 0.3, 0.7, 1],
    output: [0, 0, 16, 24],
  });
  const width = pressProgress.to([0, 1], [20, 28]);

  return (
    <animated.div
      ref={containerRef}
      className={styles.switch}
      style={{ backgroundColor: trackColor, borderColor: trackColor }}>
      <animated.div className={styles.knob} style={{ left, width }}>
        <animated.div style={{ opacity: progress, color: trackColor, transform }}>
          <Check size={18} />
        </animated.div>
      </animated.div>
    </animated.div>
  );
}

export const FormSwitch = React.forwardRef<HTMLInputElement, FormSwitchProps>(
  function FormSwitch(props, ref) {
    const { checked, disabled = false, state = "default", label, note, onChange } = props;
    const [inputId] = React.useState(() => uuid.v4());
    const [isPressed, setIsPressed] = React.useState(false);

    return (
      <div
        className={classNames(styles.container, ...getInputClassNames(state), {
          [styles.disabled]: disabled,
        })}>
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          onChange={onChange}
          id={inputId}
          checked={checked}
          style={{ display: "none" }}
        />
        <Clickable
          as="label"
          onPressStart={() => setIsPressed(true)}
          onPressEnd={() => setIsPressed(false)}
          isDisabled={disabled}
          aria-pressed={checked}
          className={styles.mainRow}
          htmlFor={inputId}>
          <Text variant="header-sm/normal" className={styles.label}>
            {label}
          </Text>
          <Switch checked={checked} pressed={isPressed} state={state} />
        </Clickable>
        <Text variant="text-sm/normal" className={styles.note}>
          {note}
        </Text>
      </div>
    );
  },
);
