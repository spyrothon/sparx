import * as React from "react";
import {
  Accent,
  Button,
  Callout,
  Card,
  Clickable,
  Header,
  Image,
  Interactive,
  ProgressBar,
  Section,
  Stack,
  Tag,
  Text,
  Theme,
  ThemeProvider,
  useThemeClass,
} from "@spyrothon/sparx";

import usePageAccent from "../usePageAccent";
import PageHeader from "./PageHeader";

function Introduction() {
  return (
    <Stack spacing="space-lg">
      <Text>
        This section covers some basic components that don't really fit into other categories. Most
        of these are very low-level primitives that will often be combined with others to create
        more complex elements.
      </Text>
    </Stack>
  );
}

function ImageComponent() {
  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">Image</Header>
      <Text>
        <code>Image</code> is a basic wrapper around an HTML <code>img</code> tag that will
        automatically handle loading states and, when given an explicit width and height, will
        ensure that the space is reserved in the layout while loading so that content does not shift
        around it.
      </Text>
      <Stack as={Card} spacing="space-md">
        <Image src="https://i.ytimg.com/vi/D8Pk4WrL7S0/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDNM-SaXvTlz-C7k87_3IQEjwYyBg" />
      </Stack>
      <Text>
        <code>Image</code> also provides a fallback in case the requested <code>src</code> image
        cannot be loaded. The fallback will try to be appropriate for the reason the image could not
        be loaded, showing either a question if the image couldn't be found, or an error if the
        image was rejected for some reason. In this case, <code>Image</code> will still show the alt
        text if any was given, so that the intent of the image can be kept even if it doesn't load.
      </Text>
      <Card>
        <Image
          src="//badimageurl"
          width={320}
          height={240}
          alt="This image intentionally didn't load. Alt text still shows."
        />
      </Card>
    </Stack>
  );
}

function ClickableComponent() {
  const [clicked, setClicked] = React.useState(false);

  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">Clickable</Header>
      <Text>
        <code>Clickable</code> is a generic mechanism for making arbitrary content on a page
        interactive. While <code>Button</code> and other form elements all have an implicit style
        associated with them, <code>Clickable</code> implements the bare functionality, leaving the
        styling up to the consumer.
      </Text>
      <Text>
        <code>Clickable</code> also handles keyboard support for handling spacebar and the enter key
        as methods for emulating a click action without a mouse. Because of this, consumers should
        always prefer using <code>Clickable</code> instead of <code>onClick</code> handlers attached
        directly to DOM elements.
      </Text>
      <Card>
        <Clickable onClick={() => setClicked(!clicked)}>
          <Card>
            <Text>
              This card is clickable. Click anywhere within it with a mouse or a keyboard to toggle
              the clicked state.
            </Text>
            {clicked ? (
              <Text variant="text-md/success">The card has been clicked.</Text>
            ) : (
              <Text variant="text-md/secondary">The card is not clicked.</Text>
            )}
          </Card>
        </Clickable>
      </Card>
      <Text>
        When the user interacts with a <code>Clickable</code>, the cursor will automatically be
        changed to <code>pointer</code>, but this can be prevented by using the{" "}
        <code>noCursor</code> prop.
      </Text>
      <Callout type="danger">
        <Text>
          <code>Clickable</code> is not appropriate for actions that link users to other pages on
          the web, whether internal or external. For links, use <code>Anchor</code> instead.
        </Text>
      </Callout>
      <Header tag="h3">Interactive</Header>
      <Text>
        While <code>Clickable</code> provides the semantics for creating interactive elements,{" "}
        <code>Interactive</code> can provide some default visual styling to convey hover, focus, and
        active states when appropriate.
      </Text>
      <Card>
        <Interactive>
          <Text variant="text-md/inherit">
            This text is wrapped with an <code>Interactive</code> and will have it's background
            color changed when interacted with.
          </Text>
        </Interactive>
      </Card>
      <Text>
        When used with <code>Text</code> components, be sure to use the <code>/inherit</code>{" "}
        variants so that the interactive colors can change.
      </Text>
      <Text>
        In cases where preserving text color is important, the <code>background</code> prop can be
        used to instead change the background color on interactions.
      </Text>
      <Card>
        <Interactive background>
          <Text>
            This text is wrapped with an <code>Interactive</code> and will have it's background
            color changed when interacted with.
          </Text>
        </Interactive>
      </Card>
    </Stack>
  );
}

function ThemeExample() {
  const themeClass = useThemeClass();

  return (
    <div className={themeClass}>
      <Stack as={Card} spacing="space-lg" direction="horizontal" align="center">
        <Button variant="primary">Submit</Button>
        <Text>Here's some text as well</Text>
        <Text variant="text-md/accent">And with the accent color.</Text>
      </Stack>
    </div>
  );
}

function ThemeProviderComponent() {
  const themeExamples = [
    { theme: Theme.DARK, accent: Accent.PURPLE },
    { theme: Theme.LIGHT, accent: Accent.PURPLE },
  ];
  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">ThemeProvider</Header>
      <Text>
        <code>ThemeProvider</code> is the Context provider that powers a majority of the design
        system with colors, fonts, spacing, and more. The state of the <code>ThemeContext</code>{" "}
        that this component provides is defined by two properties: <code>theme</code> and{" "}
        <code>accent</code>. <code>theme</code> is the base coloration of the system, either{" "}
        <code>light</code> or <code>dark</code>, while <code>accent</code> defines the highlight
        color used across many components to bring a consistent color to otherwise plain and bland
        elements of the page.
      </Text>
      <Text>
        <code>ThemeProvider</code> can be used multiple times within an application to create mini
        sections of the page using different themes. All content within that provider will end up
        using that <code>theme</code> and <code>accent</code> instead of the parent values, unless
        another provider is rendered even closer to the content in question.
      </Text>
      <Stack as={Card} spacing="space-lg">
        {themeExamples.map(({ theme, accent }) => (
          <ThemeProvider key={`${theme}-${accent}`} theme={theme} accent={accent}>
            <ThemeExample />
          </ThemeProvider>
        ))}
      </Stack>
      <Text>
        However, <code>ThemeProvider</code> itself only provides the Context for the theme, and does
        not set up the DOM to actually use the new theme values within it. For that, use{" "}
        <code>AppContainer</code> to automatically apply appropriate classes to a containing{" "}
        <code>div</code>, or use <code>useThemeClass</code> to access and apply those classes
        manually.
      </Text>
    </Stack>
  );
}

function AppContainerComponent() {
  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">AppContainer</Header>
      <Text>
        <code>AppContainer</code> is a root-level component meant to wrap the entirety of an
        application using the design system. It sets up a <code>ThemeProvider</code> with a default
        theme and accent, as well as some defaults on a wrapper <code>div</code>, setting the
        background color and font for the page to ensure they match the requested theme.
      </Text>
      <Text>
        While <code>AppContainer</code> can be nested multiple times within a page, it makes the
        assumption that it will be at the root of an application and also sets some properties for
        filling the entire viewport of the page. As such, it should generally only be used once
        around the entire application, and any nested themes on the page can use{" "}
        <code>ThemeProvider</code> directly along with a call to <code>useThemeClass</code> to set
        up their own container element.
      </Text>
    </Stack>
  );
}

function ProgressBarComponent() {
  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">ProgressBar</Header>
      <Text>
        <code>ProgressBar</code> is a visual indicator of some percentage value. It supports
        multiple bars by providing an array of values for the <code>progress</code> prop, and each
        bar can be given an independent color.
      </Text>
      <Stack as={Card} spacing="space-lg">
        <ProgressBar progress={[{ value: 40 }]} />
        <ProgressBar
          progress={[
            { value: 30, color: "success" },
            { value: 30, color: "warning" },
            { value: 30, color: "danger" },
          ]}
        />
      </Stack>
      <Text>
        The size of the bars can also be controlled with the <code>size</code> prop, picking from
        one of <code>normal</code> or <code>large</code>
      </Text>
      <Stack as={Card} spacing="space-lg">
        <ProgressBar progress={[{ value: 50 }]} size="normal" />
        <ProgressBar progress={[{ value: 70 }]} size="large" />
      </Stack>
    </Stack>
  );
}

function TagComponent() {
  return (
    <Stack as={Section} spacing="space-lg">
      <Header tag="h2">Tag</Header>
      <Text>
        <code>Tag</code> provides badge-like indicators meant to appear inline next to other
        content. Tags support all of the default colors, and can contain any content within them.
      </Text>
      <Stack as={Card} direction="horizontal">
        <Tag color="default">Normal</Tag>
        <Tag color="accent">Accent</Tag>
        <Tag color="success">Success</Tag>
        <Tag color="info">Info</Tag>
        <Tag color="warning">Warning</Tag>
        <Tag color="danger">Danger</Tag>
      </Stack>
      <Text>
        Tags can also use the <code>solid</code> prop to get a more prominent appearance.
      </Text>
      <Stack as={Card} direction="horizontal">
        <Tag solid color="default">
          Normal
        </Tag>
        <Tag solid color="accent">
          Accent
        </Tag>
        <Tag solid color="success">
          Success
        </Tag>
        <Tag solid color="info">
          Info
        </Tag>
        <Tag solid color="warning">
          Warning
        </Tag>
        <Tag solid color="danger">
          Danger
        </Tag>
      </Stack>
    </Stack>
  );
}

export default function Common() {
  usePageAccent(Accent.PURPLE);

  return (
    <Stack spacing="space-lg" align="stretch">
      <PageHeader
        name="Common"
        tagline="Basic components that are often combined for more complex elements"
      />
      <Introduction />
      <ImageComponent />
      <ClickableComponent />
      <ThemeProviderComponent />
      <AppContainerComponent />
      <ProgressBarComponent />
      <TagComponent />
    </Stack>
  );
}
