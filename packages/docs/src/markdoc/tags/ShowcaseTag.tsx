"use client";

import React from "react";
import JSXParser from "react-jsx-parser";
import * as sparx from "@spyrothon/sparx";

import { Showcase } from "@/components/Showcase";

export function ShowcaseTag({ content }: { content: string }) {
  // @ts-expect-error JSXParser isn't up to date with node typings
  const Transformed = <JSXParser components={{ ...sparx }} jsx={content} />;
  return <Showcase content={Transformed} source={content} language="tsx" />;
}

// All content in the file after this line is included in the example, allowing
// more than just regular JSX to be shown and evaluated.
const DEFAULT_COMPONENT_STARTING_SENTINEL = "export default function Component() {";
// This ending sentinel is just to remove the last closing bracket.
const DEFAULT_COMPONENT_ENDING_SENTINEL = "}";

export const ShowcaseFileTag = React.memo(({ example }: { example: string }) => {
  const [[Component, source]] = React.useState(() => {
    return [
      // For some reason, using `React.lazy(() => import())` here causes an infinite loop
      require(`../../../../sparx/examples/${example}`).default,
      require(`!raw-loader!../../../../sparx/examples/${example}`).default,
    ];
  });

  // Only include content inside of the default exported Component in the code
  // sample area. This lets it skip imports that wouldn't match what consumers
  // use, and any extra boilerplate that isn't relevant.
  const lines = (source as string).split("\n");
  const firstLine = lines.indexOf(DEFAULT_COMPONENT_STARTING_SENTINEL);
  const lastLine = lines.lastIndexOf(DEFAULT_COMPONENT_ENDING_SENTINEL);
  const visibleSource = lines
    .slice(firstLine + 1, lastLine)
    .map((line) => line.slice(2))
    .join("\n");

  return <Showcase content={<Component />} source={visibleSource ?? ""} language="tsx" />;
});
