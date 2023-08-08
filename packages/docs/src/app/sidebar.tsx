"use client";

import * as React from "react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import {
  BrandLogo,
  Card,
  Clickable,
  Divider,
  FormControl,
  Item,
  Select,
  Stack,
  Tabs,
  Text,
} from "@spyrothon/sparx";

import { getFlatSidebarItems, FlatNavigationItem } from "./sidebarItems";
import { ThemeContext, getThemeClass } from "./theming";
import type { Accent, Theme } from "../../design/generated/Tokens";

const THEME_OPTIONS = [
  { name: "Dark", value: "dark" },
  { name: "Light", value: "light" },
];

const ACCENT_OPTIONS = [
  { name: "Purple", value: "purple" },
  { name: "Pink", value: "pink" },
];

getThemeClass("dark", "pink");

export function Sidebar(props: { className: string }) {
  const { className } = props;
  const { theme, accent, setTheme, setAccent } = React.useContext(ThemeContext);

  const router = useRouter();
  const segments = (useSelectedLayoutSegments()[1] ?? "")
    .split("/")
    .map((segment) => segment.toLowerCase());

  function renderSidebarItem(item: FlatNavigationItem) {
    const isSelected = segments.every((segment, index) => segment === item.urlParts[index]);

    switch (item.type) {
      case "page":
        return (
          <Tabs.Tab
            key={item.title}
            label={item.title}
            selected={isSelected}
            onPress={() => router.push(`/components/${item.urlParts.join("/")}`)}
          />
        );
      case "category":
        return <Tabs.Header key={item.title} label={item.title} />;
      default:
        return null;
    }
  }

  return (
    <Card className={className}>
      <Stack spacing="space-lg">
        <Clickable onPress={() => router.push("/")}>
          <BrandLogo color="var(--text-normal)" width="100%" />
          <Text variant="text-sm/normal">
            Spyrothon's Design System for React-based web applications.
          </Text>
        </Clickable>
        <Divider />
        <FormControl label="Theme">
          <Select
            items={THEME_OPTIONS}
            selectedKey={theme}
            onSelect={(theme) => setTheme(theme as Theme)}>
            {(item) => <Item key={item.value}>{item.name}</Item>}
          </Select>
        </FormControl>
        <FormControl label="Accent Color">
          <Select
            items={ACCENT_OPTIONS}
            selectedKey={accent}
            onSelect={(accent) => setAccent(accent as Accent)}>
            {(item) => <Item key={item.value}>{item.name}</Item>}
          </Select>
        </FormControl>
        <Divider />
        <Tabs.Group>{getFlatSidebarItems().map(renderSidebarItem)}</Tabs.Group>
      </Stack>
    </Card>
  );
}
