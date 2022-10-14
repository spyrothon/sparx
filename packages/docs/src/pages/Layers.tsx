import * as React from "react";
import {
  Accent,
  Button,
  Card,
  ConfirmModal,
  Header,
  openModal,
  Section,
  Stack,
  Text,
  Tooltip,
  usePopout,
  useTooltip,
} from "@spyrothon/sparx";
import ImageQuestion from "@spyrothon/sparx/dist/icons/ImageQuestion";

import usePageAccent from "../usePageAccent";
import PageHeader from "./PageHeader";

function Introduction() {
  return (
    <Section>
      <Stack spacing="space-lg">
        <Text>
          Layers are a system of components and functions that allow for rendering content outside
          the normal flow of a page. The system is composed of 3 types of layers, each representing
          a different level of relevance to whatever element owns it. <code>Tooltip</code> is
          immediately attached to the target element, only showing when the target is being
          interacted with, and immediately disappearing afterward. <code>Popout</code> is one level
          higher, still attaching itself to a target element, but staying visible until the user
          performs another action to close it. And finally <code>Modal</code> is completely detached
          from it's source and appears as a full-screen takeover that must be interacted with before
          the rest of the page can be used again.
        </Text>
      </Stack>
    </Section>
  );
}

function ConfirmModalComponent() {
  function openConfirmModal() {
    openModal(
      (props) => (
        <ConfirmModal
          {...props}
          title="Hello"
          body="This is a confirm modal, with some body text as well. Pressing an action will log information to the console."
          onConfirm={() => console.log("hit the confirm button")}
          onCancel={() => console.log("hit the cancel button")}
        />
      ),
      { closeOnBackdrop: false },
    );
  }

  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">ConfirmModal</Header>
        <Text>
          <code>ConfirmModal</code> provides a simple, consistent way of getting user confirmation
          for an action. All that's required is a <code>title</code> and an <code>onConfirm</code>{" "}
          action, plus optional <code>body</code> text, an <code>onCancel</code> action, and color
          control.
        </Text>
        <Card>
          <Button variant="primary" onClick={openConfirmModal}>
            Open Confirm Modal
          </Button>
        </Card>
        <Text>
          To make sure that the user has to hit one of "Confirm" or "Cancel", pass the additional{" "}
          <code>closeOnBackdrop: false</code> option to <code>openModal</code>.
        </Text>
      </Stack>
    </Section>
  );
}

function PopoutComponent() {
  const openerRef = React.useRef<HTMLButtonElement>(null);
  const [open, isOpen] = usePopout(
    ({ onClose }) => (
      <Card level={1}>
        <div style={{ width: 300 }}>
          <Stack spacing="space-lg">
            <Header tag="h2">Popout</Header>
            <Text>This is a Popout. They tend to be taller rather than wide.</Text>
            <Text>And provide more information from the target.</Text>
            <Text>
              Close this by clicking anywhere outside of the content area, or directly with the
              button below.
            </Text>
            <Button onClick={onClose}>Do Something</Button>
          </Stack>
        </div>
      </Card>
    ),
    openerRef,
    {
      attach: "right",
      align: "start",
    },
  );

  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">Popout</Header>
        <Text>
          <code>Popout</code> is a contextual layer meant to provide additional information or
          details about some entity without taking up more space in the page flow. Unlike{" "}
          <code>Tooltip</code>, which is only visible as a user hovers the target,{" "}
          <code>Popout</code> is best for semi-permanent information that the user may want to
          interact with or keep visible as they continue to browse the rest of the page.
        </Text>
        <Card>
          <Button ref={openerRef} variant="primary" onClick={isOpen ? undefined : open}>
            Open Popout
          </Button>
        </Card>
        <Text>
          <code>Popout</code> has two props for positioning: <code>attach</code> and{" "}
          <code>align</code>. <code>attach</code> determines which side of the target element the
          popout should appear on (e.g., <code>left</code> or <code>top</code>), while{" "}
          <code>align</code> adjusts how the popout aligns itself with the target element (either{" "}
          <code>start</code>, <code>middle</code>, or <code>end</code>).
        </Text>
        <Text>
          If the popout is too large to fit within the viewport with the requested{" "}
          <code>attach</code> and <code>align</code> props, it will try to automatically invert and
          nudge the popout into a position that will fit. This can result in the popout not
          respecting the requested values, but ensures content isn't cut off when it could otherwise
          be visible.
        </Text>
      </Stack>
    </Section>
  );
}

function TooltipComponent() {
  const [customTooltipProps] = useTooltip<HTMLButtonElement>(
    <Stack direction="horizontal" spacing="space-md" align="center">
      <ImageQuestion size={24} />
      <div>
        <Text variant="header-xs/normal">This one has an icon</Text>
        <Text variant="text-sm/secondary">And some descriptive text</Text>
      </div>
    </Stack>,
  );

  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">Tooltip</Header>
        <Text>
          <code>Tooltip</code> is the lowest-level layer for providing supplemental information to
          the target element. They are only visible when the user is directly interacting with the
          target, either by hovering it with a pointer or focusing it with a keyboard.
        </Text>
        <Card>
          <Tooltip<HTMLButtonElement> render="Some tooltip text">
            {(tooltipProps) => (
              <Button variant="primary" {...tooltipProps}>
                Hover for Tooltip
              </Button>
            )}
          </Tooltip>
        </Card>
        <Text>
          As such an ephemeral layer, <code>Tooltip</code> should only be used for
          immediately-useful information, like a name for an icon, or a quick descriptive sentence
          to expand on a single word, and should <em>not</em> be used for any kind of interaction.
        </Text>
        <Text>
          The simplest method of rendering a <code>Tooltip</code> is just providing a string, but
          tooltips can render any kind of content just by providing a component or function as the
          render prop.
        </Text>
        <Card>
          <Button variant="primary" {...customTooltipProps}>
            Hover for Custom Tooltip
          </Button>
        </Card>
      </Stack>
    </Section>
  );
}

export default function Layers() {
  usePageAccent(Accent.BLUE);

  return (
    <Stack spacing="space-lg" align="stretch">
      <PageHeader name="Layers" tagline="Various components for modalized and layered content" />
      <Introduction />
      <ConfirmModalComponent />
      <PopoutComponent />
      <TooltipComponent />
    </Stack>
  );
}
