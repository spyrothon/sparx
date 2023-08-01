import { Config as MarkdocConfig, Tag, nodes } from "@markdoc/markdoc";
import { headingNode, Heading } from "./schema/Heading.markdoc";
import { paragraphNode, Paragraph } from "./schema/Paragraph.markdoc";
import { ShowcaseTag } from "./tags/ShowcaseTag";
import { Document } from "@/components/Document";

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
  },
};

export const components = { Heading, Paragraph, ShowcaseTag, Document };
