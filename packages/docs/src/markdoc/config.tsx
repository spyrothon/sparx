import { Config as MarkdocConfig, Tag, nodes } from "@markdoc/markdoc";
import { headingNode, Heading } from "./schema/Heading.markdoc";
import { itemNode, paragraphNode, ListItem, Paragraph } from "./schema/Paragraph.markdoc";

import { CalloutTag } from "./tags/CalloutTag";
import { Document } from "./tags/Document";
import { Fence } from "./tags/Fence";
import { ShowcaseTag, ShowcaseFileTag } from "./tags/ShowcaseTag";

export const config: MarkdocConfig = {
  nodes: {
    heading: headingNode,
    paragraph: paragraphNode,
    item: itemNode,
    document: {
      ...nodes.document,
      render: "Document",
    },
    fence: {
      ...nodes.fence,
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.children.length
          ? node.transformChildren(config)
          : [node.attributes.content];

        return new Tag("Fence", attributes, children);
      },
    },
  },
  tags: {
    showcase: {
      render: "ShowcaseTag",
      children: ["code"],
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const content = node.children[0].attributes["content"];

        return new Tag(this.render, { ...attributes, content });
      },
    },
    "showcase-file": {
      render: "ShowcaseFileTag",
      attributes: {
        example: { type: String, required: true },
      },
    },
    callout: {
      render: "CalloutTag",
      children: ["paragraph", "tag", "list"],
      attributes: {
        type: { type: String, required: true },
      },
    },
  },
};

export const components = {
  Heading,
  Paragraph,
  ShowcaseTag,
  ShowcaseFileTag,
  CalloutTag,
  ListItem,
  Document,
  Fence,
};
