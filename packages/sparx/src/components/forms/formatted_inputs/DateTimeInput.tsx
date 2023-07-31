import * as React from "react";

import { TextInput, TextInputProps } from "@sparx/index";
import { formatDateTimeLocalToString } from "@sparx/utils/DateTimeUtils";

export interface DateTimeInputProps extends Omit<TextInputProps, "type" | "value" | "onChange"> {
  value?: Date;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: Date) => unknown;
}

export const DateTimeInput = React.forwardRef<HTMLInputElement, DateTimeInputProps>(
  function DateTimeInput(props, ref) {
    const { value, onChange, ...otherProps } = props;

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const value = new Date(event.target.value);
      onChange(event, value);
    }

    return (
      <TextInput
        ref={ref}
        {...otherProps}
        type="datetime-local"
        value={formatDateTimeLocalToString(value)}
        onChange={handleChange}
      />
    );
  },
);
