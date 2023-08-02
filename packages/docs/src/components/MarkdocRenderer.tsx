"use client";

import * as React from "react";
import Markdoc from "@markdoc/markdoc";
import path from "path";

import { config, components } from "@/markdoc/config";

export function MarkdocRenderer({ sourcePath, source }: { source?: string; sourcePath?: string }) {
  const resolvedSource = React.useMemo(() => {
    if (source != null) return source;

    if (sourcePath != null) {
      try {
        return require(`!raw-loader!../../../sparx/src/${sourcePath}`).default;
      } catch (e) {}
    }

    return "No documentation exists for this page yet :(";
  }, [source, sourcePath]);

  const rendered = React.useMemo(() => {
    const ast = Markdoc.parse(resolvedSource);
    const content = Markdoc.transform(ast, config);
    return Markdoc.renderers.react(content, React, { components });
  }, [resolvedSource]);

  return <>{rendered}</>;
}
