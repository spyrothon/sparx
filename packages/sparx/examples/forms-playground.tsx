import * as React from "react";

import {
  Checkbox,
  Combobox,
  CurrencyInput,
  Divider,
  DurationInput,
  FormSwitch,
  InputState,
  Item,
  PickerItem,
  RadioGroup,
  RadioItem,
  Select,
  Stack,
  TextArea,
  TextInput,
} from "../dist";
import { PICKER_OPTIONS } from "./util/PickerOptions";

export default function Component() {
  const [status, setStatus] = React.useState<InputState>("default");
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);

  const [selectedKey, setSelectedKey] = React.useState(PICKER_OPTIONS[0].value);
  const [comboboxSelectedKey, setComboboxSelectedKey] = React.useState(PICKER_OPTIONS[0].value);
  const [radioSelected, setRadioSelected] = React.useState("");

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
    <Stack>
      <TextInput
        label="Username"
        status={status}
        description="Usernames may only contain letters and numbers."
        errorMessage={error}
        placeholder="ripto"
        onChange={handleChange}
      />
      <Select
        label="Option Select"
        name="something"
        items={PICKER_OPTIONS}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}>
        {(item) => (
          <Item key={item.value} textValue={item.name}>
            <PickerItem icon={item.icon} description={item.subtext}>
              {item.name}
            </PickerItem>
          </Item>
        )}
      </Select>
      <Combobox
        label="Combobox Selection"
        allowsEmptyCollection
        items={PICKER_OPTIONS}
        selectedKey={comboboxSelectedKey}
        onSelect={(e) => (console.log(e), setComboboxSelectedKey(e))}>
        {(item) => (
          <Item key={item.value} textValue={item.name}>
            <PickerItem icon={item.icon} description={item.subtext}>
              {item.name}
            </PickerItem>
          </Item>
        )}
      </Combobox>
      <FormSwitch
        label="Enable a super secret setting"
        checked={switchChecked}
        onChange={setSwitchChecked}
        description="Do something super secret. Doesn't actually do anything, but you can pretend that it does."
      />
      <Divider />
      <RadioGroup
        label="Radio Options"
        description="Selecting an option animates the dot."
        status={status}
        value={radioSelected}
        onChange={setRadioSelected}>
        {[
          { label: "Option One", value: "one" },
          { label: "Option Two", value: "two" },
          { label: "Option Three", value: "three" },
        ].map((item) => (
          <RadioItem key={item.value} value={item.value}>
            {item.label}
          </RadioItem>
        ))}
      </RadioGroup>
      <Checkbox
        label="Agree to the Terms"
        description="Find more terms on the other website."
        checked={checkboxChecked}
        onChange={setCheckboxChecked}
      />
      <TextArea label="A big input" rows={5} maxLength={670} />
      <CurrencyInput
        label="Amount"
        status={status}
        description="How much is going towards this thing?"
        errorMessage={error}
        placeholder="ripto"
      />
      <DurationInput label="Estimate" status={status} errorMessage={error} placeholder="ripto" />
    </Stack>
  );
}
