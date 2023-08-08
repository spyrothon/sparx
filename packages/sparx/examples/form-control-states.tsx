import * as React from "react";

import { FormControl, InputState, TextInput } from "../dist";

export default function Component() {
  const [state, setState] = React.useState<InputState>("default");
  const [error, setError] = React.useState<string | undefined>(undefined);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    if (text.includes(" ")) {
      setState("danger");
      setError("Spaces are not allowed in the name");
    } else if (text.length > 20) {
      setState("danger");
      setError("Your username is too long :(");
    } else if (text.length > 10) {
      setState("warning");
      setError("Getting close to the maximum length!");
    } else {
      setState("default");
      setError(undefined);
    }
  }

  return (
    <FormControl
      state={state}
      error={error}
      prefix="@"
      label="Username"
      note="Usernames may only contain letters and numbers.">
      <TextInput state={state} placeholder="ripto" onChange={handleChange} />
    </FormControl>
  );
}
