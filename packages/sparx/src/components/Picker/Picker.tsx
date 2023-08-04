import * as React from "react";
import classNames from "classnames";
import type { ComboBoxState, SelectState } from "react-stately";

import { getInputClassNames, InputColor, InputSize } from "../Input/Input";

import styles from "./Picker.module.css";

export interface PickerStyleProps {
  color?: InputColor;
  size?: InputSize;
  className?: string;
}

interface PickerProps<Item extends object> extends PickerStyleProps {
  state: SelectState<Item> | ComboBoxState<Item>;
  children: React.ReactNode;
}

export function Picker<Item extends object>(props: PickerProps<Item>) {
  const { color = "accent", size = "medium", state, className, children } = props;

  const handleBlur = React.useCallback(
    (event: React.FocusEvent) => {
      // If focus is still within the input container, don't actually blur.
      if (event.currentTarget.contains(event.relatedTarget)) return;

      state.close();
    },
    [state],
  );

  return (
    <div
      className={classNames(styles.container, className, ...getInputClassNames(color, size))}
      onBlur={handleBlur}
      data-open={state.isOpen}>
      {children}
    </div>
  );
}
