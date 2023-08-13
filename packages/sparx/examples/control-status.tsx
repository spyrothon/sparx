import * as React from "react";

import { InputStatus, TextInput } from "../dist";

export default function Component() {
  const [status, setStatus] = React.useState<InputStatus>("default");
  const [error, setError] = React.useState<string | undefined>(undefined);

  function handleChange(text: string) {
    if (text.includes(" ")) {
      setStatus("danger");
      setError("Spaces are not allowed in the name");
    } else if (text.length > 20) {
      setStatus("danger");
      setError("Your username is too long :(");
    } else if (text.length > 10) {
      setStatus("warning");
      setError("Getting close to the maximum length!");
    } else {
      setStatus("default");
      setError(undefined);
    }
  }

  return (
    <TextInput
      status={status}
      errorMessage={error}
      label="Username"
      prefix="@"
      description="Type a long username to see the state change"
      placeholder="ripto"
      onChange={handleChange}></TextInput>
  );
}
