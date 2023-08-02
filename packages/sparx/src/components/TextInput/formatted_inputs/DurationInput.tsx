import * as React from "react";

import { TextInput, TextInputProps } from "@sparx/index";
import { formatDuration, parseDuration } from "@sparx/utils/DurationUtils";

export interface DurationInputProps extends Omit<TextInputProps, "type" | "value" | "onChange"> {
  value?: number;
  onChange?: (event: React.SyntheticEvent<HTMLInputElement>, value: number) => unknown;
  onValueChange?: (value: number) => unknown;
}

export const DurationInput = React.forwardRef<HTMLInputElement, DurationInputProps>(
  function DurationInput(props, ref) {
    const { value, onChange, onValueChange, placeholder = "hh:mm:ss", ...otherProps } = props;
    const [renderedValue, setRenderedValue] = React.useState(() => formatDuration(value));

    React.useEffect(() => {
      setRenderedValue(formatDuration(value));
    }, [value]);

    // This only updates on blur because the string representation of the time
    // doesn't line up with the numeric representation, meaning updating the
    // value on every change will cause unusable formatting.
    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
      const duration = parseDuration(event.target.value);
      onChange?.(event, duration);
      onValueChange?.(duration);
    }

    return (
      <TextInput
        ref={ref}
        {...otherProps}
        type="text"
        value={renderedValue}
        placeholder={placeholder}
        onBlur={handleBlur}
        onChange={(event) => setRenderedValue(event.target.value)}
      />
    );
  },
);