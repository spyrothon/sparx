import * as React from "react";
import {
  Button,
  Callout,
  Card,
  Checkbox,
  CurrencyInput,
  DurationInput,
  FormControl,
  FormSwitch,
  Header,
  RadioGroup,
  Section,
  SelectInput,
  Stack,
  Text,
  TextArea,
  TextInput,
  Theme,
  ThemeContext,
} from "@spyrothon/sparx";
import ExclamationOctagon from "@spyrothon/sparx/dist/icons/ExclamationOctagon";
import ExclamationTriangle from "@spyrothon/sparx/dist/icons/ExclamationTriangle";
import InfoCircle from "@spyrothon/sparx/dist/icons/InfoCircle";

import PageHeader from "./PageHeader";

function Introduction() {
  return (
    <Stack spacing="space-lg">
      <Text>
        Forms are the primary way that users interact on a page. Text inputs, switches, buttons,
        radio groups, and more all provide ways for a user to perform an action, change settings, or
        fill in information.
      </Text>
      <Text>
        Sparx's form system is built in two layers: Inputs and Controls. Inputs are low-level
        primitives that manage the user interaction, like <code>TextInput</code> and{" "}
        <code>Checkbox</code>. While these are styled to match the current theme, they are normally
        not meant to be used directly as they don't provide labels or other presentational features
        that most forms should have. Instead, Controls wrap around Inputs, and handle all of the
        presentational attributes, including labels, notes, prefixes and suffixes, errors, and more.
      </Text>
      <Text>
        The form system currently only provides the presentation layer for content and does not
        handle any state management. However, using standard props for values and action handlers
        make it easy to integrate any kind of state management (hooks, context or global state),
        just like using native elements.
      </Text>
      <Callout type="info">
        <Text>
          Future versions of this system will likely provide a hook-based interface for more quickly
          defining forms and their associated state in a single step.
        </Text>
      </Callout>
    </Stack>
  );
}

function Example() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">Example</Header>
      <Stack as={Card} spacing="space-lg">
        <FormControl label="Username">
          <TextInput placeholder="ripto" />
        </FormControl>
        <FormControl
          label="Password"
          note="Pick something secure. Or better yet, use a password manager.">
          <TextInput type="password" />
        </FormControl>
        <FormSwitch
          label="Give something to me"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
          note="Selecting this will give something to the monitor"
        />
        <Stack direction="horizontal">
          <Button variant="primary">Login</Button>
          <Button variant="default">Sign up</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

function TextInputComponent() {
  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">TextInput</Header>
      <Text>
        <code>TextInput</code> is the simplest text input, great for receiving short-form text from
        a user, such as a username, password, email address, or any other single-sentence content.
        TextInput also handles numeric inputs with the <code>type="number"</code> prop.
      </Text>
      <Stack as={Card} spacing="space-md">
        <TextInput placeholder="Enter some text" />
        <TextInput type="password" placeholder="Password" />
        <TextInput type="number" defaultValue={0.0} />
        <TextInput type="email" defaultValue="someone@example.com" />
        <TextInput type="datetime-local" defaultValue="4155550000" />
      </Stack>
      <Text>
        <code>TextInput</code> is distinguished from other content using a thin border and a
        darkened interior.
      </Text>
      <Callout type="warning">
        <Text>
          While <code>TextInput</code> provides a <code>placeholder</code> prop for showing some
          hint text, placeholders <em>should not</em> use them for labeling the name of the input.
          Instead, use a <code>FormControl</code> with a <code>label</code> or <code>note</code> to
          provide context for the intent of the input. Placeholders are meant for showing example
          input only and should generally be avoided where not necessary.
        </Text>
      </Callout>
      <Text>
        Informational states about a <code>TextInput</code> can use the <code>color</code> prop,
        which adjusts the border color of the input. This works well for small spaces where no other
        information explaining the state can be added, but generally prefer <code>FormControl</code>{" "}
        to automatically format these states and provide more contextual information like an error
        message.
      </Text>
      <Stack as={Card} spacing="space-md">
        <TextInput color="success" placeholder="Success state" />
        <TextInput color="warning" placeholder="Warning state" />
        <TextInput color="danger" placeholder="Danger state" />
        <TextInput color="info" placeholder="Info state" />
        <TextInput color="default" placeholder="Default state" />
      </Stack>
    </Stack>
  );
}

function TextInputVariations() {
  const [duration, setDuration] = React.useState(0);
  const [currency, setCurrency] = React.useState<number>(1505);

  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">TextInput Variations</Header>
      <Text>
        The design system provides a number of wrapping components around <code>TextInput</code> to
        facilitate common types of structured input beyond plain text and numbers. These components
        have mostly the same interface as <code>TextInput</code>, but with adjusted{" "}
        <code>value</code> and <code>onChange</code> props to match the appropriate type of
        information being gathered.
      </Text>
      <Text>
        Structured input is a step beyond an input mask, where the value of the input is transformed
        from one type to another before being passed to the change handler.
      </Text>
      <Header tag="h3" variant="header-md/normal">
        DurationInput
      </Header>
      <Text>
        <code>DurationInput</code> handles inputting time spans in a human-readable format,
        providing a plain <code>number</code> to the consumer representing the entered duration as a
        number of seconds.
      </Text>
      <Stack as={Card} spacing="space-md">
        <DurationInput value={duration} onChange={setDuration} />
        <Text>Duration value is {duration} seconds</Text>
      </Stack>
      <Header tag="h3" variant="header-md/normal">
        CurrencyInput
      </Header>
      <Text>
        <code>CurrencyInput</code> handles currency values and works with any base-10 currency, as
        configured through the <code>locale</code> (default <code>en-US</code>) and{" "}
        <code>currency</code> (default <code>USD</code>) props. <code>value</code> is interpreted as
        a number of cents (hundredths of a unit), and is automatically formatted with separators
        according to the given locale.
      </Text>
      <Text>
        Users type the number as they would on an ATM, where inputting more numbers adds them to the
        right hand side of the value. Typing in a value of $5 would be done as <code>5</code>,{" "}
        <code>0</code>, <code>0</code>.
      </Text>
      <Stack as={Card} spacing="space-md">
        <CurrencyInput value={currency} onChange={setCurrency} />
        <Text>Currency value is {currency}</Text>
      </Stack>
    </Stack>
  );
}

function TextAreaComponent() {
  const [value, setValue] = React.useState("");
  const [limitedValue, setLimitedValue] = React.useState("");

  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">TextArea</Header>
      <Text>
        For textual input that is longer than just a few words, <code>TextArea</code> provides a
        larger, multi-line, resizable input area for users to write out content of any length.
      </Text>
      <Card>
        <TextArea
          placeholder="Enter a paragraph"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Card>
      <Text>
        By default, <code>TextArea</code> will render 5 rows of text before scrolling, and the user
        can resize the input vertically. Both of these can be overridden with the <code>rows</code>{" "}
        and <code>resize</code> props.
      </Text>
      <Text>
        <code>TextArea</code> also accepts a <code>maxLength</code> prop to show a progressive
        visual indication for a maximum input length as the user's types.
      </Text>
      <Card>
        <TextArea
          maxLength={100}
          value={limitedValue}
          onChange={(event) => setLimitedValue(event.target.value)}
        />
      </Card>
    </Stack>
  );
}

const SELECT_INPUT_OPTIONS = [
  { name: "Option One", value: "one", subtext: "Description for option one", icon: InfoCircle },
  {
    name: "Option Two",
    value: "two",
    subtext: "Description for option two",
    icon: ExclamationTriangle,
  },
  {
    name: "Option Three",
    value: "three",
    subtext: "Description for option three",
    icon: ExclamationOctagon,
  },
];

function SelectInputComponent() {
  const [selectedItem, setSelectedItem] = React.useState(SELECT_INPUT_OPTIONS[0]);
  const [renderedItem, setRenderedItem] = React.useState(SELECT_INPUT_OPTIONS[0]);

  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">SelectInput</Header>
      <Callout type="info">
        <Text>
          <code>SelectInput</code> does not currently support multiple selections nor combobox
          (options + search) functionality, but these will be added in the future.
        </Text>
      </Callout>
      <Text>
        <code>SelectInput</code> is a choice-selection input that lets users choose options out of a
        list.
      </Text>
      <Card>
        <SelectInput
          items={SELECT_INPUT_OPTIONS}
          selectedItem={selectedItem}
          // @ts-expect-error Item should know that it can have extra properties
          onSelect={(item) => item != null && setSelectedItem(item)}
        />
      </Card>
      <Text>
        <code>SelectInput</code> is good for medium to large lists of options. In certain cases with
        a very limited number of options, a <code>RadioGroup</code> may provide a better experience
        for the user.
      </Text>
      <Text>
        Items can choose how they get rendered in the dropdown list using the{" "}
        <code>renderItem</code> prop. This will change both how the item appears in the dropdown
        list, as well as in the input row itself.
      </Text>
      <Card>
        <SelectInput
          items={SELECT_INPUT_OPTIONS}
          selectedItem={renderedItem}
          renderItem={(item) => (
            <Stack direction="horizontal" spacing="space-md">
              {/* @ts-expect-error Item should know that it can have extra properties */}
              <item.icon
                color="var(--text-normal)"
                size={20}
                style={{ marginTop: 2, marginLeft: 2 }}
              />
              <div>
                <Text>{item.name}</Text>
                {/* @ts-expect-error Item should know that it can have extra properties */}
                <Text variant="text-xs/normal">{item.subtext}</Text>
              </div>
            </Stack>
          )}
          // @ts-expect-error Item should know that it can have extra properties
          onSelect={(item) => item != null && setRenderedItem(item)}
        />
      </Card>
    </Stack>
  );
}

function CheckboxComponent() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">Checkbox</Header>
      <Text>
        Checkboxes are boolean inputs that a user can toggle between enabled and disabled states.
        The <code>Checkbox</code> component is a low-level primitive that represents just a checkbox
        and an optional label together.
      </Text>
      <Card>
        <Checkbox
          checked={checked}
          label="Remember Me"
          onChange={(event) => setChecked(event.target.checked)}
        />
      </Card>
      <Text>
        While a <code>Checkbox</code> on it's own is perfectly functional, forms should generally
        prefer <code>FormSwitch</code> for longer lists of selectable items, as they flow more
        consistently with other form elements in a group. <code>Checkbox</code> is better suited for
        small spaces and other inputs where the user is accepting or acknowledging some content,
        while <code>FormSwitch</code> is more fit for toggling settings that likely have more
        descriptive context to go along with them.
      </Text>
    </Stack>
  );
}

function ButtonComponent() {
  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">Button</Header>
      <Text>Buttons are the main way that users perform an action on a page.</Text>
      <Stack as={Card} spacing="space-md" direction="horizontal">
        <Button variant="primary">Primary</Button>
        <Button variant="default">Default</Button>
        <Button variant="success">Success</Button>
        <Button variant="info">Info</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="link">Link</Button>
      </Stack>
      <Text>
        When using multiple buttons on a page, consider how they draw attention and the hierarchy of
        actions that can be performed. In general, use a <code>primary</code> Button for the main
        action in a form, and have all other actions use either <code>default</code> or{" "}
        <code>link</code>. Depending on the context of the action, other variants may be more
        appropriate, like <code>danger</code> for destructive actions, or <code>success</code> for
        indicating agreement.
      </Text>
      <Text>
        The general hierarchy for Buttons in a form should be <code>primary</code> for a submit
        action, then <code>default</code> for auxiliary actions (like Learn More or View Item), then{" "}
        <code>link</code> for canceling actions.
      </Text>
      <Stack as={Card} spacing="space-md" direction="horizontal">
        <Button variant="primary">Submit</Button>
        <Button variant="default">Learn More</Button>
        <Button variant="link">Cancel</Button>
      </Stack>
      <Header tag="h3" variant="header-md/normal">
        Looks
      </Header>
      <Text>
        <code>Button</code> provides multiple different looks to accommodate different situations.
        In most cases, the default <code>filled</code> variant should be preferred, but other looks
        may better suit different contexts.
      </Text>
      <Stack as={Card} spacing="space-md" direction="horizontal">
        <Button variant="primary">Filled</Button>
        <Button variant="info/outline">Outline</Button>
      </Stack>
      <Header tag="h3" variant="header-md/normal">
        Sizes
      </Header>
      <Text>
        <code>Button</code> provides multiple sizes as well to work in various contexts where color
        and look are not enough to differentiate, and to better match surrounding elements, like
        headers with large text or forms with many buttons within them. In most cases, the{" "}
        <code>md</code> variant should be preferred.
      </Text>
      <Stack as={Card} spacing="space-md" direction="horizontal" align="end">
        <Button variant="primary/filled/sm" icon={ExclamationOctagon}>
          Small (sm)
        </Button>
        <Button variant="primary/filled/md" icon={ExclamationTriangle}>
          Medium (md, default)
        </Button>
        <Button variant="primary/filled/lg" icon={InfoCircle}>
          Large (lg)
        </Button>
      </Stack>
    </Stack>
  );
}

const RADIO_GROUP_OPTIONS = [
  { label: "Option One", value: "one" },
  { label: "Option Two", value: "two" },
  { label: "Option Three", value: "three" },
];

const RADIO_GROUP_THEME_OPTIONS = [
  { label: "Light Theme", value: Theme.LIGHT },
  { label: "Dark Theme", value: Theme.DARK },
];

function RadioGroupComponent() {
  const [selectedRadio, setSelectedRadio] = React.useState(RADIO_GROUP_OPTIONS[0].value);
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">RadioGroup</Header>
      <Text>
        <code>RadioGroup</code> is similar to a <code>SelectInput</code>, but intended for showing a
        small number of equally-prominent options. Where a <code>SelectInput</code> requires the
        user to interact with the component to see all of the available options
      </Text>
      <Card>
        <RadioGroup
          options={RADIO_GROUP_OPTIONS}
          value={selectedRadio}
          onChange={(event) => setSelectedRadio(event.target.value)}
        />
      </Card>
      <Text>
        <code>RadioGroup</code> should generally be avoided when there are more than 4 or 5 options
        to choose from. At that point, a <code>SelectInput</code> often becomes easier to comprehend
        and greatly reduces the footprint. Exceptions to this pattern could be where the only
        component on a page is the <code>RadioGroup</code> (for example, a language selector on it's
        own settings page, where each language is a radio item).
      </Text>
      <Text>
        Similarly, with only 2 options, <code>RadioGroup</code> can be a good alternative to a{" "}
        <code>Checkbox</code> or <code>FormSwitch</code> when the options aren't toggles like On/Off
        or Enabled/Disabled.
      </Text>
      <Card>
        <RadioGroup
          options={RADIO_GROUP_THEME_OPTIONS}
          value={theme}
          onChange={(event) => setTheme(event.target.value as Theme)}
        />
      </Card>
    </Stack>
  );
}

function FormControlComponent() {
  const [selectedRadio, setSelectedRadio] = React.useState(RADIO_GROUP_OPTIONS[0].value);

  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">FormControl</Header>
      <Text>
        <code>FormControl</code> is a wrapper for all kinds of standard input elements like{" "}
        <code>TextInput</code>, <code>SelectInput</code>, and others that provides presentational
        attributes like labels, notes, and exception states to wrap the inner input in a consistent
        fashion.
      </Text>
      <Stack as={Card} spacing="space-lg">
        <FormControl label="Username" note="Usernames may only contain letters and numbers.">
          <TextInput placeholder="ripto" />
        </FormControl>
        <FormControl
          label="Select an Option"
          note="Selecting an option won't do anything on this page">
          <RadioGroup
            options={RADIO_GROUP_OPTIONS}
            value={selectedRadio}
            onChange={(event) => setSelectedRadio(event.target.value)}
          />
        </FormControl>
      </Stack>
      <Text>
        <code>FormControl</code> also provides props for attaching <code>prefix</code> and{" "}
        <code>suffix</code> elements onto the input row, providing additional information for inputs
        that might have structure that the user is not sure if they should add or not, such as URL
        hostnames for links.
      </Text>
      <Card>
        <FormControl label="Twitch URL" prefix="twitch.tv/">
          <TextInput />{" "}
        </FormControl>
      </Card>
    </Stack>
  );
}

function FormSwitchComponent() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">FormSwitch</Header>
      <Text>
        <code>FormSwitch</code> is an "improved" checkbox variation that provides more room for
        label text and an additional note underneath, better matching the look of other{" "}
        <code>FormControl</code> elements and maintaining a more constant rhythm on the page.
      </Text>
      <Card>
        <FormSwitch
          label="Enable a super secret setting"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
          note="Do something super secret. Doesn't actually do anything, but you can pretend that it does."
        />
      </Card>
    </Stack>
  );
}

function DisabledStates() {
  const [selectedItem, setSelectedItem] = React.useState(SELECT_INPUT_OPTIONS[0]);
  const [textValue, setTextValue] = React.useState("");
  const [checked, setChecked] = React.useState(true);
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [selectedRadio, setSelectedRadio] = React.useState(RADIO_GROUP_OPTIONS[0].value);

  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">Disabled States</Header>
      <Text>
        All Form components have a <code>disabled</code> prop that prevents users from interacting
        with the component.
      </Text>
      <Stack as={Card} spacing="space-lg">
        <TextInput disabled placeholder="no typing here" />
        <TextArea
          disabled
          placeholder="Can't type here either"
          value={textValue}
          onChange={(event) => setTextValue(event.target.value)}
        />
        <SelectInput
          disabled
          items={SELECT_INPUT_OPTIONS}
          selectedItem={selectedItem}
          // @ts-expect-error Item should know that it can have extra properties
          onSelect={(item) => item != null && setSelectedItem(item)}
        />
        <Checkbox
          disabled
          checked={checked}
          label="Remember Me"
          onChange={(event) => setChecked(event.target.checked)}
        />
        <RadioGroup
          disabled
          options={RADIO_GROUP_OPTIONS}
          value={selectedRadio}
          onChange={(event) => setSelectedRadio(event.target.value)}
        />
        <FormControl
          disabled
          label="Form Control"
          note={
            <>
              The contained also needs to have <code>disabled</code> set to become non-interactive.
            </>
          }>
          <TextInput disabled placeholder="ripto" />
        </FormControl>
        <FormSwitch
          label="Enable a super secret setting"
          disabled
          checked={switchChecked}
          onChange={(event) => setSwitchChecked(event.target.checked)}
          note="Do something super secret. Doesn't actually do anything, but you can pretend that it does."
        />
        <Button disabled variant="primary">
          Submit
        </Button>
      </Stack>
      <Text>
        When building forms with disabled components, remember that disabled items are not included
        in the tab order of the page, and screenreaders may skip over them entirely, depending on
        the type of item. As such, use additional information where possible to indicate why a
        component is disabled, like realtime error messages on inputs to explain a disabled submit
        button.
      </Text>
    </Stack>
  );
}

export default function Forms() {
  return (
    <Stack spacing="space-lg" align="stretch">
      <PageHeader name="Forms" tagline="Get input from and provide options for users" />
      <Introduction />
      <Example />
      <TextInputComponent />
      <TextInputVariations />
      <TextAreaComponent />
      <SelectInputComponent />
      <CheckboxComponent />
      <ButtonComponent />
      <RadioGroupComponent />
      <FormControlComponent />
      <FormSwitchComponent />
      <DisabledStates />
    </Stack>
  );
}
