import * as React from "react";

import { TextInput, TextInputProps } from "@sparx/index";
import { formatDateTimeLocalToString } from "@sparx/utils/DateTimeUtils";

export interface DateTimeInputProps extends Omit<TextInputProps, "type" | "value" | "onChange"> {
  value?: Date;
  onChange: (value: Date) => unknown;
}

export function DateTimeInput(props: DateTimeInputProps) {
  const { value, onChange, ...otherProps } = props;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = new Date(event.target.value);
    onChange(value);
  }

  return (
    <TextInput
      {...otherProps}
      type="datetime-local"
      value={formatDateTimeLocalToString(value)}
      onChange={handleChange}
    />
  );
}
