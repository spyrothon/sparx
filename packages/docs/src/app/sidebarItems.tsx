export interface PageType {
  type: "page";
  title: string;
  slug?: string;
  sourcePath?: string;
}

export interface SectionType {
  type: "section";
  title: string;
  slug?: string;
  children: NavigationItem[];
  defaultOpen?: boolean;
  sourcePath?: string;
}

export interface CategoryType {
  type: "category";
  title: string;
  children: NavigationItem[];
  sourcePath?: string;
}

export type NavigationItem = PageType | SectionType | CategoryType;

export type FlatNavigationItem = NavigationItem & {
  urlParts: string[];
  breadcrumbs: string[];
};

export const sidebarItems: NavigationItem[] = [
  {
    type: "page",
    title: "Usage",
  },
  {
    type: "category",
    title: "Layout",
    children: [
      { type: "page", title: "Stack", sourcePath: "components/Stack/Stack.mdoc" },
      { type: "page", title: "Box", sourcePath: "components/Box/Box.mdoc" },
      { type: "page", title: "Card", sourcePath: "components/Card/Card.mdoc" },
      { type: "page", title: "Divider", sourcePath: "components/Divider/Divider.mdoc" },
      { type: "page", title: "Section", sourcePath: "components/Section/Section.mdoc" },
    ],
  },
  {
    type: "category",
    title: "Forms",
    children: [
      {
        type: "page",
        title: "Forms Overview",
        sourcePath: "components/Forms.mdoc",
        slug: "overview",
      },
      { type: "page", title: "Control", sourcePath: "components/Control/Control.mdoc" },
      { type: "page", title: "Checkbox", sourcePath: "components/Checkbox/Checkbox.mdoc" },
      { type: "page", title: "FormSwitch", sourcePath: "components/FormSwitch/FormSwitch.mdoc" },
      { type: "page", title: "TextInput", sourcePath: "components/TextInput/TextInput.mdoc" },
      {
        type: "page",
        title: "CurrencyInput",
        sourcePath: "components/TextInput/formatted_inputs/CurrencyInput.mdoc",
      },
      {
        type: "page",
        title: "DateTimeInput",
        sourcePath: "components/TextInput/formatted_inputs/DateTimeInput.mdoc",
      },
      {
        type: "page",
        title: "DurationInput",
        sourcePath: "components/TextInput/formatted_inputs/DurationInput.mdoc",
      },
      { type: "page", title: "TextArea", sourcePath: "components/TextArea/TextArea.mdoc" },
      { type: "page", title: "Combobox", sourcePath: "components/Picker/Combobox.mdoc" },
      { type: "page", title: "Select", sourcePath: "components/Picker/Select.mdoc" },
      { type: "page", title: "RadioGroup", sourcePath: "components/RadioGroup/RadioGroup.mdoc" },
    ],
  },
  {
    type: "category",
    title: "Interactivity",
    children: [
      { type: "page", title: "Anchor", sourcePath: "components/Anchor/Anchor.mdoc" },
      { type: "page", title: "Button", sourcePath: "components/Button/Button.mdoc" },
      { type: "page", title: "Clickable", sourcePath: "components/Clickable/Clickable.mdoc" },
      { type: "page", title: "Interactive", sourcePath: "components/Interactive/Interactive.mdoc" },
      { type: "page", title: "Tabs", sourcePath: "components/Tabs/Tabs.mdoc" },
    ],
  },
  {
    type: "category",
    title: "Presentation",
    children: [
      { type: "page", title: "Callout", sourcePath: "components/Callout/Callout.mdoc" },
      { type: "page", title: "Image", sourcePath: "components/Image/Image.mdoc" },
      { type: "page", title: "Hero", sourcePath: "components/Hero/Hero.mdoc" },
      { type: "page", title: "ProgressBar", sourcePath: "components/ProgressBar/ProgressBar.mdoc" },
      { type: "page", title: "Table", sourcePath: "components/Table/Table.mdoc" },
      { type: "page", title: "Tag", sourcePath: "components/Tag/Tag.mdoc" },
    ],
  },
  {
    type: "category",
    title: "Typography",
    children: [
      { type: "page", title: "Header", sourcePath: "components/Text/Header.mdoc" },
      { type: "page", title: "Markdown", sourcePath: "components/Text/Markdown.mdoc" },
      { type: "page", title: "Text", sourcePath: "components/Text/Text.mdoc" },
    ],
  },
  {
    type: "category",
    title: "Layers",
    children: [
      { type: "page", title: "Layer", sourcePath: "components/Layer/Layer.mdoc" },
      { type: "page", title: "Tooltip", sourcePath: "components/Tooltip/Tooltip.mdoc" },
      { type: "page", title: "Popout", sourcePath: "components/Popout/Popout.mdoc" },
      { type: "page", title: "Modal", sourcePath: "components/Modal/Modal.mdoc" },
    ],
  },
  {
    type: "category",
    title: "Utilities",
    children: [
      {
        type: "page",
        title: "AppContainer",
        sourcePath: "components/AppContainer/AppContainer.mdoc",
      },
      { type: "page", title: "BrandLogo", sourcePath: "components/BrandLogo/BrandLogo.mdoc" },
      {
        type: "page",
        title: "ThemeProvider",
        sourcePath: "components/ThemeProvider/ThemeProvider.mdoc",
      },
    ],
  },
];

export function getItemSlug(item: NavigationItem) {
  if ("slug" in item) return item.slug!;
  return item.title.toLowerCase().replaceAll(" ", "-");
}

function flattenItem(
  item: NavigationItem,
  urlParts: string[] = [],
  breadcrumbs: string[] = [],
): FlatNavigationItem[] {
  const newUrlParts = [...urlParts, getItemSlug(item)];
  const newBreadcrumbs = [...breadcrumbs, item.title];

  const newItem = {
    ...item,
    urlParts: newUrlParts,
    breadcrumbs: newBreadcrumbs,
  };

  if ("children" in item) {
    return [
      newItem,
      ...item.children.flatMap((child) => flattenItem(child, newUrlParts, newBreadcrumbs)),
    ];
  }
  return [newItem];
}

export function getFlatSidebarItems() {
  return sidebarItems.flatMap((item) => flattenItem(item));
}
