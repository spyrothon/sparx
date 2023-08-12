import * as React from "react";
import classNames from "classnames";
import { AriaCheckboxProps, useCheckbox } from "react-aria";
import { useToggleState } from "react-stately";
import { Check } from "@spyrothon/sparx-icons/icons/Check";

import { animated, useSpring } from "@react-spring/web";
import { Text } from "@sparx/index";
import { useSetRef } from "@sparx/utils/RefUtils";

import { ControlInputProps } from "../FormControl/Control";
import { getInputClassNames, useInputColorToken } from "../Input/Input";
import { useResolvedColorToken } from "../ThemeProvider/ThemeProvider";

import styles from "./Checkbox.module.css";

export interface CheckboxProps extends Omit<AriaCheckboxProps, "isSelected">, ControlInputProps {
  checked?: boolean;
}

const AnimatedCheck = animated(Check);

const CHECK_SPRING_CONFIG = {
  tension: 400,
  friction: 20,
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
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
    const { inputProps } = useCheckbox(transformedProps, state, innerRef);

    const containerRef = React.useRef<HTMLLabelElement>(null);
    const inputColor = useInputColorToken(status, "color");
    const defaultBackgroundColor = useResolvedColorToken("BACKGROUND_ACCENT").rgba;
    const resolvedColor = inputColor === "transparent" ? inputColor : inputColor.rawColor;
    const [{ opacity, transform, backgroundColor }] = useSpring(() => {
      return {
        backgroundColor: checked ? resolvedColor : defaultBackgroundColor,
        opacity: checked ? 1 : 0,
        transform: `scale(${checked ? 1 : 1.5})`,
        config: (key) => ({
          ...CHECK_SPRING_CONFIG,
          friction:
            key === "backgroundColor"
              ? CHECK_SPRING_CONFIG.friction - 15
              : CHECK_SPRING_CONFIG.friction,
          clamp: key === "backgroundColor",
        }),
      };
    }, [checked, defaultBackgroundColor, resolvedColor]);

    const labelNode =
      typeof label === "string" ? (
        <Text className={styles.label}>{label}</Text>
      ) : (
        <div className={styles.label}>{label}</div>
      );

    return (
      <label
        ref={containerRef}
        className={classNames(styles.checkbox, ...getInputClassNames(status, size))}>
        <input ref={setRef} {...inputProps} style={{ display: "none" }} />
        <animated.div className={styles.iconContainer} style={{ backgroundColor }}>
          <AnimatedCheck style={{ opacity, transform }} className={styles.icon} size={18} />
        </animated.div>
        <div className={styles.label}>
          {labelNode}
          {description != null ? <Text variant="text-sm/secondary">{description}</Text> : null}
          {errorMessage != null ? <Text variant="header-xs/danger">{errorMessage}</Text> : null}
        </div>
      </label>
    );
  },
);
