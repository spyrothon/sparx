import * as React from "react";

import { MarkdocRenderer } from "@/components/MarkdocRenderer";
import { NavigationItem, getItemSlug, sidebarItems } from "@/app/sidebarItems";

export default async function Page({ params }: { params: { componentPath: string[] } }) {
  const { componentPath } = params;

  let items = sidebarItems;
  let item: NavigationItem | undefined;
  for (const segment of componentPath) {
    item = items.find((item) => getItemSlug(item) === segment);
    // If no item was found, it doesn't exist
    if (item == null) break;
    // If there are no children, we've either found the leaf or it doesn't exist.
    if (!("children" in item)) break;

    items = item.children;
  }

  const fallback = <MarkdocRenderer source="No documentation exists for this page yet :(" />;

  if (item == null) return fallback;

  try {
    const { default: docs } = await import(
      `!raw-loader!../../../../../sparx/src/${item.sourcePath}`
    );
    return <MarkdocRenderer source={docs} />;
  } catch (e) {
    return fallback;
  }
}
