"use client";

import * as React from "react";
import Markdoc from "@markdoc/markdoc";

import { config, components } from "@/markdoc/config";

export function MarkdocRenderer({ source }: { source: string }) {
  const ast = Markdoc.parse(source);
  const content = Markdoc.transform(ast, config);
  const rendered = Markdoc.renderers.react(content, React, { components });

  return <>{rendered}</>;
}
