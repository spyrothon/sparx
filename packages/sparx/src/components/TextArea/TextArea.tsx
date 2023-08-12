import * as React from "react";
import classNames from "classnames";
import { AriaTextFieldProps, useTextField } from "react-aria";

import { useSetRef } from "@sparx/utils/RefUtils";

import { Control, ControlInputProps } from "../Control/Control";

import styles from "./TextArea.module.css";

function renderMaxLengthIndicator(length?: number, maxLength?: number) {
  if (length == null || maxLength == null) return null;

  const limitRatio = length / maxLength;

  const nearLimit = limitRatio > 0.8 && limitRatio < 1.0;
  const overLimit = limitRatio >= 1.0;

  return (
    <div
      className={classNames(styles.lengthLimit, {
        [styles.nearLimit]: nearLimit,
        [styles.overLimit]: overLimit,
      })}>
      <span className={styles.length}>{length}</span> /
      <span className={styles.limit}>{maxLength}</span>
    </div>
  );
}

const RESIZE_CLASSES = {
  horizontal: styles.resizeHorizontal,
  vertical: styles.resizeVertical,
  both: styles.resizeBoth,
  none: styles.resizeNone,
};

type TextAreaResizeType = keyof typeof RESIZE_CLASSES;

export interface TextAreaProps extends AriaTextFieldProps, ControlInputProps {
  rows?: number;
  resize?: TextAreaResizeType;
  inputClassName?: string;
}

export const TextArea = React.forwardRef(function TextArea(
  props: TextAreaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const { value, maxLength, rows = 3, resize = "vertical", inputClassName } = props;
  const areaRef = React.useRef<HTMLTextAreaElement>(null);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    { ...props, inputElementType: "textarea" },
    areaRef,
  );
  const setRef = useSetRef(areaRef, ref);

  const [length, setLength] = React.useState(
    () => areaRef.current?.value.length ?? value?.toString().length ?? 0,
  );

  React.useEffect(() => {
    // For controlled inputs, just use the value's serialized length.
    if (value != null) {
      setLength(value.toString().length);
      return;
    }

    // Otherwise, for uncontrolled inputs, set up a direct event handler to
    // measure the length on change.
    const area = areaRef.current;
    if (area == null) return;

    function measureLength(this: HTMLTextAreaElement) {
      setLength(this.value.length);
    }

    area.addEventListener("input", measureLength);
    return () => area.removeEventListener("input", measureLength);
  }, [value]);

  return (
    <Control
      {...props}
      labelProps={labelProps}
      descriptionProps={descriptionProps}
      errorMessageProps={errorMessageProps}>
      <div className={styles.container}>
        <textarea
          ref={setRef}
          rows={rows}
          {...inputProps}
          className={classNames(styles.input, inputClassName, RESIZE_CLASSES[resize])}></textarea>
        {renderMaxLengthIndicator(length, maxLength)}
      </div>
    </Control>
  );
});
