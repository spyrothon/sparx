import * as React from "react";
import { Anchor, Card, Header, Markdown, Section, Stack, Text } from "@spyrothon/sparx";

import PageHeader from "./PageHeader";

function Introduction() {
  return (
    <Stack spacing="space-lg">
      <Text>
        Typography components provide styling for all kinds of text on a page. Labels, notes,
        headers, body text, and anything else where text is being displayed outside of another
        design system component should be wrapped with one of these components to ensure consistent
        sizing, coloring, spacing, and more.
      </Text>
      <Text>
        Spyrothon uses two primary font faces for text: Encode Sans and Overlock. Overlock is a
        display font, used primarily for large headers and accent text (like button labels), while
        Encode Sans is suited for normal text like body copy, form labels and notes, and any other
        longer-form content.
      </Text>
      <Text>
        Selecting the right combination of font, size, and color is handled automatically through
        the use of <code>variant</code> props which safely ensure only readable combinations can be
        used.
      </Text>
    </Stack>
  );
}

function TextComponent() {
  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">Text</Header>
        <Text>
          <code>Text</code> is the primary long-form typography component. By default,{" "}
          <code>Text</code> renders at 18px with Encode Sans, in a high-contrast color for the
          theme's primary background.
        </Text>
        <Card>
          <Stack spacing="space-md">
            <Text variant="text-lg/normal">This is a large Text element</Text>
            <Text variant="text-md/normal">This is a medium Text element. The default.</Text>
            <Text variant="text-sm/normal">
              This is a small Text element. Good for notes and hint text.
            </Text>
            <Text variant="text-xs/normal">
              This is an extra-small Text element. These are rarely used outside of minor notes.
            </Text>
          </Stack>
        </Card>
        <Text>
          <code>Text</code> can also use the style variants that <code>Header</code> normally uses
          to achieve the same styles without the semantic implications of a header tag. This is good
          for hierarchical combinations of text, like a field name and a field value appearing next
          to each other, to indicate the distinction between the two.
        </Text>
        <Card>
          <Stack direction="vertical" spacing="space-md">
            <div>
              <Text variant="header-sm/normal">First name</Text>
              <Text>Melanija</Text>
            </div>
            <div>
              <Text variant="header-sm/normal">Last name</Text>
              <Text>Zion</Text>
            </div>
            <div>
              <Text variant="header-sm/normal">Birthday</Text>
              <Text>February 18, 1987</Text>
            </div>
          </Stack>
        </Card>
        <Text>
          Each font and size variation also has a number of color options, denoted in the variant
          name as <code>name/color</code>. <code>normal</code> and <code>secondary</code> are the
          most common colors across all instances of text, but the additional status colors can also
          be used to draw attention to a state in a way that is more subtle than a <code>Card</code>{" "}
          or <code>Callout</code> might be.
        </Text>
        <Card>
          <Text variant="text-md/normal">
            This text uses the <code>normal</code> color.
          </Text>
          <Text variant="text-md/secondary">
            This uses the <code>secondary</code> color.
          </Text>
          <Text variant="text-md/success">This is a successful status message.</Text>
          <Text variant="text-md/info">This is some information text.</Text>
          <Text variant="text-md/warning">The text might be risky using this warning color.</Text>
          <Text variant="text-md/danger">This text indicates dangerous actions.</Text>
        </Card>
        <Text>
          In some cases, the desired color for a <code>Text</code> element isn't known ahead of
          time, or is dependent on a parent component, like inside of a <code>Hero</code> block. In
          these cases, an <code>inherit</code> option is alo available for all variants to have the
          component inherit it's color from whatever is currently set by the context.
        </Text>
      </Stack>
    </Section>
  );
}

function HeaderComponent() {
  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">Header</Header>
        <Text>
          <code>Header</code> is distinct from <code>Text</code> in two ways. Most importantly, it
          requires the use of a <code>tag</code> prop that indicates which heading tag to use in the
          DOM (<code>h1</code> through <code>h6</code> are supported). Headers <em>must</em> be used
          instead of <code>Text</code> for defining sections of a page so that they retain their
          semantic structure. Secondly, <code>Header</code> uses a bold font weight in Overlock
          rather than Encode Sans to distinguish it from normal text regardless of styling.
        </Text>
        <Text>
          Like <code>Text</code>, <code>Header</code> also provides a <code>variant</code> prop to
          control the visual styling, and allows using styles that would normally apply to regular{" "}
          <code>Text</code> components. This should only be used to maintain a visual style as well
          as the semantic information of a header tag. Otherwise, prefer using <code>Text</code>{" "}
          instead.
        </Text>
        <Card>
          <Stack spacing="space-md">
            <Header tag="h1" variant="header-xxl/normal">
              This is an XXL Header
            </Header>
            <Header tag="h2" variant="header-xl/normal">
              This is an Extra Large Header
            </Header>
            <Header tag="h3" variant="header-lg/normal">
              This is a Large Header
            </Header>
            <Header tag="h4" variant="header-md/normal">
              This is a Medium Header
            </Header>
            <Header tag="h5" variant="header-sm/normal">
              This is a Small Header
            </Header>
            <Header tag="h6" variant="header-xs/normal">
              This is an Extra Small Header
            </Header>
          </Stack>
        </Card>
        <Text>
          <code>Header</code> also provides a separate prop, <code>uppercase</code>, to
          automatically transform the given text to ALL CAPS. This should be used sparingly, and
          only for short-length text, as longer text quickly becomes hard to read. Most often,{" "}
          <code>uppercase</code> works best as a primary page header (as shown at the tops of these
          Docs pages).
        </Text>
        <Card>
          <Header tag="h4" variant="header-lg/normal" uppercase>
            All Uppercase
          </Header>
          <Header tag="h4" variant="header-sm/secondary" uppercase>
            Also Uppercase
          </Header>
        </Card>
      </Stack>
    </Section>
  );
}

function MarkdownComponent() {
  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">Markdown</Header>
        <Text>
          <code>Markdown</code> is a component that enables rendering raw Markdown content into
          components that match the rest of the Design System.
        </Text>
        <Card>
          <Markdown>
            Here's a markdown component, it has **bold** and _italic_ support, [plus more](#).
          </Markdown>
        </Card>
      </Stack>
    </Section>
  );
}

function AnchorComponent() {
  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">Anchor</Header>
        <Text>
          <code>Anchor</code> is an inline component that renders links in a consistent style and
          handles both external links and page transitions within a single app. <code>Anchor</code>{" "}
          should generally not be used on it's own, and rather would exist within another component
          like <code>Text</code> or <code>Header</code>.
        </Text>
        <Card>
          <Text>
            <Anchor href="#">This is a link</Anchor>
          </Text>
        </Card>
        <Text>
          <code>Anchor</code> is only intended for actions that link the user to another navigable
          page, either internal or external to the current application. Other actions like revealing
          more content, or triggering a change in state should probably use <code>Clickable</code>{" "}
          or <code>Button</code> instead.
        </Text>
      </Stack>
    </Section>
  );
}

export default function Typography() {
  return (
    <Stack spacing="space-lg" align="stretch">
      <PageHeader
        name="Typography"
        tagline="Components and styles for rendering text on anywhere on a page."
      />
      <Introduction />
      <TextComponent />
      <HeaderComponent />
      <MarkdownComponent />
      <AnchorComponent />
    </Stack>
  );
}
