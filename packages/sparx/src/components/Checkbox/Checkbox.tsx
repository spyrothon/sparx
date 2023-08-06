import * as React from "react";
import classNames from "classnames";
import * as uuid from "uuid";
import Check from "@spyrothon/sparx-icons/dist/icons/Check";

import { animated, useSpring } from "@react-spring/web";
import { Clickable, Text } from "@sparx/index";
import { useResolvedPropertyAtElement } from "@sparx/utils/TokenUtils";

import { getInputClassNames, InputColor } from "../Input/Input";

import styles from "./Checkbox.module.css";

export interface CheckboxProps {
  checked: boolean;
  label?: string | React.ReactNode;
  color?: InputColor;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
}

const AnimatedCheck = animated(Check);

const CHECK_SPRING_CONFIG = {
  tension: 400,
  friction: 16,
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const { checked, label, color = "accent", disabled = false, onChange } = props;
    const [inputId] = React.useState(() => uuid.v4());

    const containerRef = React.useRef<HTMLLabelElement>(null);
    const resolvedColor = useResolvedPropertyAtElement(
      "--_input-color",
      containerRef,
      "transparent",
      [color],
    );

    const [{ opacity, transform }] = useSpring(() => {
      return {
        borderWidth: checked ? 0 : 1,
        opacity: checked ? 1 : 0,
        transform: `scale(${checked ? 1 : 0.7})`,
        config: (key) => ({
          ...CHECK_SPRING_CONFIG,
          friction:
            key === "backgroundColor"
              ? CHECK_SPRING_CONFIG.friction + 15
              : CHECK_SPRING_CONFIG.friction,
          clamp: key === "backgroundColor",
        }),
      };
    }, [checked, resolvedColor]);

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
        aria-checked={checked}
        className={classNames(styles.checkbox, ...getInputClassNames(color), {
          [styles.disabled]: disabled,
        })}
        htmlFor={inputId}>
        <input
          ref={ref}
          type="checkbox"
          style={{ display: "none" }}
          id={inputId}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        <div className={styles.iconContainer}>
          <AnimatedCheck style={{ opacity, transform }} className={styles.icon} size={18} />
        </div>
        {labelNode}
      </Clickable>
    );
  },
);
