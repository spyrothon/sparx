import * as React from "react";
import { ConfigType, RenderableTreeNode, Schema, Tag, nodes } from "@markdoc/markdoc";

import { Header } from "@spyrothon/sparx";

function generateID(children: RenderableTreeNode[], attributes: any): string {
  if (attributes.id && typeof attributes.id === "string") {
    return attributes.id;
  }

  return children
    .map((child) => {
      if (!child) return "";

      if (typeof child === "string") {
        return child;
      } else if (isTag(child)) {
        return generateID(child.children, {});
      }
    })
    .join(" ")
    .replace(/[?]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export function isTag(thing: any): thing is Tag {
  return typeof thing === "object" && thing.children;
}

interface HeadingProps {
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className: string;
  children: React.ReactNode;
}

export const headingNode: Schema<ConfigType, string> = {
  ...nodes.heading,
  render: "Heading",
  children: ["inline"],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
    className: { type: String },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const id = generateID(children, attributes);

    return new Tag(this.render, { ...attributes, id }, children);
  },
};

export function Heading(props: HeadingProps) {
  const { id, level, className, children } = props;

  const tag = `h${level}` as const;
  const variant = (() => {
    switch (tag) {
      case "h1":
        return "header-xl/normal";
      case "h2":
        return "header-lg/normal";
      case "h3":
        return "header-md/normal";
      case "h4":
        return "header-sm/normal";
      case "h5":
      case "h6":
      default:
        return "header-xs/normal";
    }
  })();
  return (
    <Header tag={tag} variant={variant} id={id} className={className}>
      {children}
    </Header>
  );
}
