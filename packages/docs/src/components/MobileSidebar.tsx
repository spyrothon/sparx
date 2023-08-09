"use client";

import * as React from "react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import {
  Box,
  BrandLogo,
  Button,
  Clickable,
  Divider,
  Stack,
  Tabs,
  openModal,
} from "@spyrothon/sparx";
import { Bars } from "@spyrothon/sparx-icons/icons/Bars";

import { getFlatSidebarItems, FlatNavigationItem } from "../app/sidebarItems";
import { ThemeSelector } from "./ThemeSelector";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

function MobileNavigation(props: {
  onClose: () => unknown;
  segments: string[];
  router: AppRouterInstance;
}) {
  const { segments, router, onClose } = props;

  function renderSidebarItem(item: FlatNavigationItem) {
    const isSelected = segments.every((segment, index) => segment === item.urlParts[index]);

    switch (item.type) {
      case "page":
        return (
          <Tabs.Tab
            key={item.title}
            label={item.title}
            selected={isSelected}
            onPress={() => {
              router.push(`/components/${item.urlParts.join("/")}`);
              onClose();
            }}
          />
        );
      case "category":
        return <Tabs.Header key={item.title} label={item.title} />;
      default:
        return null;
    }
  }

  return (
    <Stack>
      <Stack direction="horizontal" justify="stretch">
        <ThemeSelector />
      </Stack>
      <Divider />
      <Tabs.Group>{getFlatSidebarItems().map(renderSidebarItem)}</Tabs.Group>
    </Stack>
  );
}

export function MobileSidebar({ className }: { className?: string }) {
  const router = useRouter();
  const segments = (useSelectedLayoutSegments()[1] ?? "")
    .split("/")
    .map((segment) => segment.toLowerCase());

  function openNav() {
    openModal((props) => <MobileNavigation {...props} segments={segments} router={router} />);
  }

  return (
    <Box background="secondary" elevation="low" border="none" radius="none" className={className}>
      <Stack
        spacing="space-md"
        justify="space-between"
        direction="horizontal"
        wrap={false}
        align="center">
        <Clickable onPress={() => router.push("/")}>
          <BrandLogo color="var(--interactive-normal)" height={48} />
        </Clickable>
        <Button variant="link" onPress={openNav}>
          <Bars size={24} />
        </Button>
      </Stack>
    </Box>
  );
}
