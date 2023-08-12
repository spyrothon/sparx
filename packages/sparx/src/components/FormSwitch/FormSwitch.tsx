import * as React from "react";
import classNames from "classnames";
import { AriaSwitchProps, usePress, useSwitch } from "react-aria";
import { useToggleState } from "react-stately";
import { Check } from "@spyrothon/sparx-icons/icons/Check";

import { animated, config, useSpring } from "@react-spring/web";
import { Text } from "@sparx/index";
import { useSetRef } from "@sparx/utils/RefUtils";

import { ControlInputProps } from "../FormControl/Control";
import { getInputClassNames, InputStatus, useInputColorToken } from "../Input/Input";
import { useResolvedColorToken } from "../ThemeProvider/ThemeProvider";

import styles from "./FormSwitch.module.css";

function Switch(props: { isSelected: boolean; isPressed: boolean; status: InputStatus }) {
  const { isSelected, isPressed, status } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);

  const inputColor = useInputColorToken(status, "color");
  const resolvedColor = inputColor === "transparent" ? inputColor : inputColor.hsla;
  const resolvedBackground = useResolvedColorToken("CONTROL_BACKGROUND").hsla;

  const { progress, pressProgress } = useSpring({
    progress: isSelected ? (isPressed ? 0.7 : 1) : isPressed ? 0.3 : 0,
    pressProgress: isPressed ? 1 : 0,
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

export interface FormSwitchProps extends Omit<AriaSwitchProps, "isSelected">, ControlInputProps {
  checked: boolean;
}

export const FormSwitch = React.forwardRef<HTMLInputElement, FormSwitchProps>(
  function FormSwitch(props, ref) {
    const {
      checked,
      label,
      description,
      errorMessage,
      status = "default",
      size = "medium",
    } = props;
    const innerRef = React.useRef<HTMLInputElement>(null);
    const setRef = useSetRef(innerRef, ref);

    const transformedProps = {
      ...props,
      isSelected: checked,
      children: label,
    };
    const state = useToggleState(transformedProps);
    const { inputProps } = useSwitch(props, state, innerRef);
    const { pressProps, isPressed } = usePress({});

    return (
      <div className={classNames(styles.container, ...getInputClassNames(status, size))}>
        <label className={styles.mainRow} {...pressProps}>
          <input ref={setRef} {...inputProps} style={{ display: "none" }} />
          <Text variant="header-sm/normal" className={styles.label}>
            {label}
          </Text>
          <Switch isSelected={state.isSelected} isPressed={isPressed} status={status} />
        </label>
        {description != null ? <Text variant="text-sm/secondary">{description}</Text> : null}
        {errorMessage != null ? <Text variant="header-xs/danger">{errorMessage}</Text> : null}
      </div>
    );
  },
);
