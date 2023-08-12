import * as React from "react";
import classNames from "classnames";
import type { ComboBoxState, SelectState } from "react-stately";

import { Control, ControlInputProps, ControlNestedElementProps } from "../Control/Control";

import styles from "./Picker.module.css";

export interface PickerManagedProps<Item extends object> extends ControlNestedElementProps {
  controlState: SelectState<Item> | ComboBoxState<Item>;
  children: React.ReactNode;
}

export interface PickerPublicProps extends ControlInputProps {}

export interface PickerProps<Item extends object>
  extends PickerPublicProps,
    PickerManagedProps<Item> {}

export function Picker<Item extends object>(props: PickerProps<Item>) {
  const { controlState, className, children } = props;

  const handleBlur = React.useCallback(
    (event: React.FocusEvent) => {
      // If focus is still within the input container, don't actually blur.
      if (event.currentTarget.contains(event.relatedTarget)) return;

      controlState.close();
    },
    [controlState],
  );

  return (
    <Control {...props}>
      <div
        className={classNames(styles.container, className)}
        onBlur={handleBlur}
        data-open={controlState.isOpen}>
        {children}
      </div>
    </Control>
  );
}
