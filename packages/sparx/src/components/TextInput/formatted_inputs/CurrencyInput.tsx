import * as React from "react";

import { NumberFormatter } from "@internationalized/number";
import { TextInput, TextInputProps } from "@sparx/index";

export interface CurrencyInputProps extends Omit<TextInputProps, "type" | "value" | "onChange"> {
  /**
   * An integer value representing hundredths (cents) for the currency amount.
   */
  value: number;
  onChange?: (event: React.SyntheticEvent<HTMLInputElement>, value: number) => unknown;
  onValueChange?: (value: number) => unknown;
  locale?: string;
  currency?: string;
}

export const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  function CurrencyInput(props, ref) {
    const {
      value = 0,
      onChange,
      onValueChange,
      locale = "en-US",
      currency = "USD",
      ...otherProps
    } = props;
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

    const [formattedValue, setFormattedValue] = React.useState(() => formatter.format(value / 100));

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
      let newValue = value;
      if (event.key === "Backspace") {
        newValue = Math.floor(value / 10);
      } else if (!Number.isNaN(Number(event.key))) {
        newValue = value * 10 + Number(event.key);
      }

      setFormattedValue(formatter.format(newValue / 100));
      onChange?.(event, newValue);
      onValueChange?.(newValue);
    }

    return (
      <TextInput
        ref={ref}
        {...otherProps}
        type="text"
        value={formattedValue}
        onKeyDown={handleKeyDown}
        onChange={() => null}
      />
    );
  },
);
