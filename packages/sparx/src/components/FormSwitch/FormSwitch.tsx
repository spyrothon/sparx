import * as React from "react";
import classNames from "classnames";
import * as uuid from "uuid";
import Check from "@spyrothon/sparx-icons/dist/icons/Check";

import { animated, config, useSpring } from "@react-spring/web";
import { Clickable, Text } from "@sparx/index";
import { useResolvedPropertyAtElement } from "@sparx/utils/TokenUtils";

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

function Switch(props: { checked: boolean; color: InputColor }) {
  const { checked, color } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const resolvedColor = useResolvedPropertyAtElement(
    "--_input-color",
    containerRef,
    "transparent",
    [color],
  );
  const resolvedBackground = useResolvedPropertyAtElement(
    "--control-background",
    containerRef,
    "transparent",
    [color],
  );
  const [{ opacity, trackColor }] = useSpring(
    () => ({
      trackColor: checked
        ? resolvedColor
        : // This ensures that `trackColor` won't be set if the background color
        // hasn't been resolved yet, allowing the CSS class to take precendence.
        resolvedBackground === "transparent"
        ? undefined
        : resolvedBackground,
      opacity: checked ? 1 : 0,
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
        <animated.div style={{ opacity, color: trackColor }}>
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
        <Switch checked={checked} color={color} />
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
