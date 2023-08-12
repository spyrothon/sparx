import * as React from "react";

import { NumberFormatter } from "@internationalized/number";
import { TextInput, TextInputProps } from "@sparx/index";

export interface CurrencyInputProps extends Omit<TextInputProps, "type" | "value" | "onChange"> {
  /**
   * An integer value representing hundredths (cents) for the currency amount.
   */
  value?: number;
  onChange?: (value: number) => unknown;
  locale?: string;
  currency?: string;
}

export const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  function CurrencyInput(props, ref) {
    const { name, value, onChange, locale = "en-US", currency = "USD", ...otherProps } = props;

    // This is a formatted input, so it can't _actually_ be uncontrolled. This
    // local value acts as the default `value` and allows `onChange` to still
    // function even when uncontrolled.
    const [localValue, setLocalValue] = React.useState(value ?? 0);
    React.useEffect(() => {
      setLocalValue(value ?? 0);
    }, [value]);

    const [formatter] = React.useMemo(
      () => [
        new NumberFormatter(locale, {
          style: "currency",
          currency,
          minimumIntegerDigits: 1,
          maximumFractionDigits: 2,
        }),
      ],
      [locale, currency],
    );
    const [formattedValue, setFormattedValue] = React.useState(() =>
      localValue != null ? formatter.format(localValue / 100) : "",
    );

    // TODO: Support number stepping with keyboard shortcuts. Up/Down for 1,
    // +Shift for 10, +Ctrl for 100.
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
      let newValue = localValue;
      if (event.key === "Backspace") {
        if (event.metaKey || event.ctrlKey) {
          newValue = 0;
        } else {
          newValue = Math.floor(localValue / 10);
        }
      } else if (!Number.isNaN(Number(event.key))) {
        newValue = localValue * 10 + Number(event.key);
      }

      setLocalValue(newValue);
      setFormattedValue(formatter.format(newValue / 100));
      onChange?.(newValue);
    }

    return (
      <>
        <TextInput
          ref={ref}
          {...otherProps}
          type="text"
          value={formattedValue}
          onKeyDown={handleKeyDown}
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
