"use client";

import * as React from "react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import {
  Box,
  BrandLogo,
  Button,
  Clickable,
  Divider,
  Header,
  Stack,
  Text,
  openModal,
} from "@spyrothon/sparx";
import { Bars } from "@spyrothon/sparx-icons/icons/Bars";

import { getFlatSidebarItems, FlatNavigationItem } from "../app/sidebarItems";
import { ThemeSelector } from "./ThemeSelector";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import styles from "./Sidebar.module.css";

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
          <Clickable
            key={item.title}
            className={styles.sidebarItem}
            aria-pressed={isSelected}
            onPress={() => router.push(`/components/${item.urlParts.join("/")}`)}>
            <Text>{item.title}</Text>
          </Clickable>
        );
      case "category":
        return (
          <Header key={item.title} tag="h3" variant="header-sm/normal" className={styles.header}>
            {item.title}
          </Header>
        );
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
      <Stack spacing="space-xs">{getFlatSidebarItems().map(renderSidebarItem)}</Stack>
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
