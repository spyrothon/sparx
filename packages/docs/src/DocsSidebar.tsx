import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Accent,
  BrandLogo,
  Card,
  defaultSelectItemToString,
  Divider,
  FormControl,
  SelectInput,
  Stack,
  TabColor,
  Tabs,
  Text,
  Theme,
  ThemeContext,
} from "@spyrothon/sparx";
import { IconProps } from "@spyrothon/sparx/dist/icons/IconProps";

import Pages from "./Pages";

const THEME_OPTIONS = [
  { name: "Dark", value: Theme.DARK },
  { name: "Light", value: Theme.LIGHT },
];

const ACCENT_OPTIONS = [
  { name: "Purple", value: Accent.PURPLE },
  { name: "Pink", value: Accent.PINK },
];

type SidebarTab =
  | {
      type?: "tab";
      name: string;
      route: string;
      color?: TabColor;
      icon?: React.ComponentType<IconProps>;
    }
  | { type: "header"; name: string };

const SIDEBAR_TABS: SidebarTab[] = [
  { type: "header", name: "Guides" },
  { name: "Home", route: Pages.HOME },
  { name: "Usage", route: Pages.GUIDES_USAGE },
  { type: "header", name: "Components" },
  { name: "Common", route: Pages.COMPONENTS_COMMON },
  { name: "Forms", route: Pages.COMPONENTS_FORMS },
  { name: "Layers", route: Pages.COMPONENTS_LAYERS },
  { name: "Layout", route: Pages.COMPONENTS_LAYOUT },
  { name: "Typography", route: Pages.COMPONENTS_TYPOGRAPHY },
];

export default function DocsSidebar(props: { className: string }) {
  const { className } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const { theme, accent, setTheme, setAccent } = React.useContext(ThemeContext);

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
        <Tabs.Group>
          {SIDEBAR_TABS.map((tab) =>
            tab.type === "header" ? (
              <Tabs.Header key={tab.name} label={tab.name} />
            ) : (
              <Tabs.Tab
                key={tab.name}
                label={tab.name}
                onClick={() => navigate(tab.route)}
                color={tab.color}
                icon={tab.icon}
                selected={location.pathname === tab.route}
              />
            ),
          )}
        </Tabs.Group>
      </Stack>
    </Card>
  );
}
