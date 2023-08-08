import * as React from "react";
import classNames from "classnames";
import type { ComboBoxState, SelectState } from "react-stately";

import { getInputClassNames, InputSize, InputState } from "../Input/Input";

import styles from "./Picker.module.css";

export interface PickerStyleProps {
  state?: InputState;
  size?: InputSize;
  className?: string;
}

interface PickerProps<Item extends object> extends PickerStyleProps {
  controlState: SelectState<Item> | ComboBoxState<Item>;
  children: React.ReactNode;
}

export function Picker<Item extends object>(props: PickerProps<Item>) {
  const { state = "default", size = "medium", controlState, className, children } = props;

  const handleBlur = React.useCallback(
    (event: React.FocusEvent) => {
      // If focus is still within the input container, don't actually blur.
      if (event.currentTarget.contains(event.relatedTarget)) return;

      controlState.close();
    },
    [controlState],
  );

  return (
    <div
      className={classNames(styles.container, className, ...getInputClassNames(state, size))}
      onBlur={handleBlur}
      data-open={controlState.isOpen}>
      {children}
    </div>
  );
}
