import * as React from "react";

import { NumberFormatter } from "@internationalized/number";
import { TextInput, TextInputProps } from "@sparx/index";

export interface CurrencyInputProps extends Omit<TextInputProps, "type" | "value" | "onChange"> {
  /**
   * An integer value representing hundredths (cents) for the currency amount.
   */
  value: number;
  onChange: (value: number, event: React.SyntheticEvent<HTMLInputElement>) => unknown;
  locale?: string;
  currency?: string;
}

export function CurrencyInput(props: CurrencyInputProps) {
  const { value = 0, onChange, locale = "en-US", currency = "USD", ...otherProps } = props;
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
    onChange(newValue, event);
  }

  return <TextInput {...otherProps} type="text" value={formattedValue} onKeyDown={handleKeyDown} />;
}
