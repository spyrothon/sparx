import * as React from "react";

import { TextInput, TextInputProps } from "@sparx/index";
import DurationUtils from "@sparx/utils/DurationUtils";

export interface DurationInputProps extends Omit<TextInputProps, "type" | "value" | "onChange"> {
  value?: number;
  onChange: (value: number) => unknown;
}

export function DurationInput(props: DurationInputProps) {
  const { value, onChange, placeholder = "hh:mm:ss", ...otherProps } = props;
  const [renderedValue, setRenderedValue] = React.useState(() => DurationUtils.toString(value));

  React.useEffect(() => {
    setRenderedValue(DurationUtils.toString(value));
  }, [value]);

  // This only updates on blur because the string representation of the time
  // doesn't line up with the numeric representation, meaning updating the
  // value on every change will cause unusable formatting.
  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const duration = DurationUtils.fromString(event.target.value);
    onChange(duration);
  }

  return (
    <TextInput
      {...otherProps}
      type="text"
      value={renderedValue}
      placeholder={placeholder}
      onBlur={handleBlur}
      onChange={(event) => setRenderedValue(event.target.value)}
    />
  );
}
