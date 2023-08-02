import React from "react";
import JSXParser from "react-jsx-parser";
import * as sparx from "@spyrothon/sparx";

import { Showcase } from "@/components/Showcase";

export function ShowcaseTag({ content }: { content: string }) {
  // @ts-expect-error JSXParser isn't up to date with node typings
  const Transformed = <JSXParser components={sparx} jsx={content} />;
  return <Showcase content={Transformed} source={content} language="tsx" />;
}
