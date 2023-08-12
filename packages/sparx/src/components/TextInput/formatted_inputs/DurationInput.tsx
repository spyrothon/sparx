import * as React from "react";

import { TextInput, TextInputProps } from "@sparx/index";
import { formatDuration, parseDuration } from "@sparx/utils/DurationUtils";

export interface DurationInputProps extends Omit<TextInputProps, "type" | "value" | "onChange"> {
  value?: number;
  onChange?: (value: number) => unknown;
}

export const DurationInput = React.forwardRef<HTMLInputElement, DurationInputProps>(
  function DurationInput(props, ref) {
    const { name, value, onChange, placeholder = "hh:mm:ss", ...otherProps } = props;

    // This is a formatted input, so it can't _actually_ be uncontrolled. This
    // local value acts as the default `value` and allows `onChange` to still
    // function even when uncontrolled.
    const [localValue, setLocalValue] = React.useState(value ?? 0);
    React.useEffect(() => {
      setLocalValue(value ?? 0);
    }, [value]);

    const [formattedValue, setFormattedValue] = React.useState(() =>
      formatDuration(localValue, true),
    );
    React.useEffect(() => {
      setFormattedValue(formatDuration(localValue, true));
    }, [localValue]);

    // This only updates on blur because the string representation of the time
    // doesn't line up with the numeric representation, meaning updating the
    // value on every change will cause unusable formatting.
    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
      const duration = parseDuration(event.target.value);
      setLocalValue(duration);
      onChange?.(duration);
    }

    return (
      <>
        <TextInput
          ref={ref}
          {...otherProps}
          type="text"
          value={formattedValue}
          placeholder={placeholder}
          // @ts-expect-error react-aria types this as FocusEvent<Element>, but
          // we know it'll be an HTMLInputElement.
          onBlur={handleBlur}
          onChange={setFormattedValue}
          // We don't want the text input to have a name, otherwise it could
          // clobber the value for uncontrolled inputs.
          name={undefined}
        />
        {name != null ? (
          // When a name is given, render a hidden input with the numeric value
          // of the currency so that uncontrolled forms are still able to
          // function as expected.
          <input type="hidden" name={name} value={localValue} />
        ) : null}
      </>
    );
  },
);
