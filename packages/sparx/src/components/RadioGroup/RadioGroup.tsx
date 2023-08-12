import * as React from "react";
import { AriaRadioGroupProps, AriaRadioProps, useRadio, useRadioGroup } from "react-aria";
import { RadioGroupState, useRadioGroupState } from "react-stately";

import { animated, useSpring } from "@react-spring/web";

import { Clickable } from "../Clickable/Clickable";
import { Control, ControlInputProps } from "../Control/Control";
import { InputStatus, useInputColorToken } from "../Input/Input";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { useResolvedColorToken } from "../ThemeProvider/ThemeProvider";

import styles from "./RadioGroup.module.css";

const DOT_SPRING_CONFIG = {
  tension: 400,
  friction: 20,
};

interface RadioGroupContextState {
  state: RadioGroupState | undefined;
  status: InputStatus;
}

const RadioGroupContext = React.createContext<RadioGroupContextState>({
  state: undefined,
  status: "default",
});

export interface RadioItemProps extends AriaRadioProps {
  status?: InputStatus;
}

export function RadioItem(props: RadioItemProps) {
  const context = React.useContext(RadioGroupContext)!;
  const { status = context.status, children } = props;

  const ref = React.useRef<HTMLInputElement>(null);
  const { inputProps, isSelected } = useRadio(props, context.state!, ref);

  const inputColor = useInputColorToken(status, "color");
  const defaultBackgroundColor = useResolvedColorToken("BACKGROUND_ACCENT").rgba;
  const resolvedColor = inputColor === "transparent" ? inputColor : inputColor.rawColor;
  const [{ opacity, transform, backgroundColor }] = useSpring(
    () => ({
      backgroundColor: isSelected ? resolvedColor : defaultBackgroundColor,
      opacity: isSelected ? 1 : 0,
      transform: `scale(${isSelected ? 1 : 1.5})`,
      config: (key) => ({
        ...DOT_SPRING_CONFIG,
        friction:
          key === "backgroundColor" ? DOT_SPRING_CONFIG.friction - 15 : DOT_SPRING_CONFIG.friction,
        clamp: key === "backgroundColor",
      }),
    }),
    [isSelected, defaultBackgroundColor, resolvedColor],
  );

  const labelNode =
    typeof children === "string" ? (
      <Text className={styles.label}>{children}</Text>
    ) : (
      <div className={styles.label}>{children}</div>
    );

  return (
    <Clickable as="label" className={styles.radioItem}>
      <input {...inputProps} style={{ display: "none" }} />
      <animated.div className={styles.icon} style={{ backgroundColor }}>
        <animated.div className={styles.dot} style={{ opacity, transform }} />
      </animated.div>
      {labelNode}
    </Clickable>
  );
}

export interface RadioGroupProps extends AriaRadioGroupProps, ControlInputProps {
  status?: InputStatus;
  children: React.ReactElement<RadioItemProps> | React.ReactElement<RadioItemProps>[];
}

export function RadioGroup(props: RadioGroupProps) {
  const { status = "default", children } = props;

  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps, descriptionProps, errorMessageProps } = useRadioGroup(
    props,
    state,
  );

  const context = React.useMemo(() => ({ state, status }), [state, status]);

  return (
    <Control
      {...props}
      labelProps={labelProps}
      descriptionProps={descriptionProps}
      errorMessageProps={errorMessageProps}>
      <RadioGroupContext.Provider value={context}>
        <Stack {...radioGroupProps} spacing="space-md">
          {children}
        </Stack>
      </RadioGroupContext.Provider>
    </Control>
  );
}
