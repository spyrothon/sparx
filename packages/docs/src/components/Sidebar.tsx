"use client";

import * as React from "react";
import classNames from "classnames";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { BrandLogo, Card, Clickable, Divider, Stack, TabGroup, Text } from "@spyrothon/sparx";

import { getFlatSidebarItems, FlatNavigationItem } from "../app/sidebarItems";
import { MobileSidebar } from "./MobileSidebar";
import { ThemeSelector } from "./ThemeSelector";

import styles from "./Sidebar.module.css";

export function Sidebar(props: { className: string }) {
  const { className } = props;

  const router = useRouter();
  const segments = (useSelectedLayoutSegments()[1] ?? "")
    .split("/")
    .map((segment) => segment.toLowerCase());

  function renderSidebarItem(item: FlatNavigationItem) {
    const isSelected = segments.every((segment, index) => segment === item.urlParts[index]);

    switch (item.type) {
      case "page":
        return (
          <TabGroup.Tab
            key={item.title}
            label={item.title}
            selected={isSelected}
            onPress={() => router.push(`/components/${item.urlParts.join("/")}`)}
          />
        );
      case "category":
        return <TabGroup.Header key={item.title} label={item.title} />;
      default:
        return null;
    }
  }

  return (
    <>
      <MobileSidebar className={classNames(styles.mobile, className)} />
      <Card className={classNames(styles.desktop, className)}>
        <Stack spacing="space-lg">
          <Clickable onPress={() => router.push("/")}>
            <BrandLogo color="var(--interactive-normal)" width="100%" />
            <Text variant="text-sm/normal">
              Spyrothon's Design System for React-based web applications.
            </Text>
          </Clickable>
          <Divider />
          <Stack spacing="space-md">
            <ThemeSelector />
          </Stack>
          <Divider />
          <TabGroup.Group>{getFlatSidebarItems().map(renderSidebarItem)}</TabGroup.Group>
        </Stack>
      </Card>
    </>
  );
}
