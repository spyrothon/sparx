"use client";

import * as React from "react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import {
  Accent,
  BrandLogo,
  Card,
  defaultSelectItemToString,
  Divider,
  FormControl,
  SelectInput,
  Stack,
  Tabs,
  Text,
  Theme,
  ThemeContext,
} from "@spyrothon/sparx";

import { getFlatSidebarItems, FlatNavigationItem } from "./sidebarItems";

const THEME_OPTIONS = [
  { name: "Dark", value: Theme.DARK },
  { name: "Light", value: Theme.LIGHT },
];

const ACCENT_OPTIONS = [
  { name: "Purple", value: Accent.PURPLE },
  { name: "Pink", value: Accent.PINK },
];

export function Sidebar(props: { className: string }) {
  const { className } = props;
  const { theme, accent, setTheme, setAccent } = React.useContext(ThemeContext);

  const router = useRouter();
  const segments = useSelectedLayoutSegments().map((segment) => segment.toLowerCase());

  function renderSidebarItem(item: FlatNavigationItem) {
    const isSelected = segments.every((segment, index) => segment === item.urlParts[index]);

    switch (item.type) {
      case "page":
        return (
          <Tabs.Tab
            label={item.title}
            selected={isSelected}
            onClick={() => router.push(`/components/${item.urlParts.join("/")}`)}
          />
        );
      case "category":
        return <Tabs.Header label={item.title} />;
      default:
        return <></>;
    }
  }

  return (
    <Card className={className}>
      <Stack spacing="space-lg">
        <div>
          <BrandLogo color="var(--text-normal)" width="100%" />
          <Text variant="text-sm/normal">
            Spyrothon's Design System for React-based web applications.
          </Text>
        </div>
        <Divider />
        <FormControl label="Theme" size="small">
          <SelectInput
            items={THEME_OPTIONS}
            itemToString={defaultSelectItemToString}
            selectedItem={THEME_OPTIONS.find(({ value }) => value === theme)}
            onSelect={(item) => (item != null ? setTheme(item.value) : null)}
          />
        </FormControl>
        <FormControl label="Accent Color" size="small">
          <SelectInput
            items={ACCENT_OPTIONS}
            itemToString={defaultSelectItemToString}
            selectedItem={ACCENT_OPTIONS.find(({ value }) => value === accent)}
            onSelect={(item) => (item != null ? setAccent(item.value) : null)}
          />
        </FormControl>
        <Divider />
        <Tabs.Group>{getFlatSidebarItems().map(renderSidebarItem)}</Tabs.Group>
      </Stack>
    </Card>
  );
}
