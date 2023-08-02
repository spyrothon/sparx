import { Document } from "@/components/Document";

import { Config as MarkdocConfig, Tag, nodes } from "@markdoc/markdoc";
import { headingNode, Heading } from "./schema/Heading.markdoc";
import { paragraphNode, Paragraph } from "./schema/Paragraph.markdoc";

import { CalloutTag } from "./tags/CalloutTag";
import { ShowcaseTag, ShowcaseFileTag } from "./tags/ShowcaseTag";

export const config: MarkdocConfig = {
  nodes: {
    heading: headingNode,
    paragraph: paragraphNode,
    document: {
      ...nodes.document,
      render: "Document",
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
  Document,
};
