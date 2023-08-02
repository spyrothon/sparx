import * as React from "react";

import { Markdown } from "../dist";

export default function Component() {
  return (
    <Markdown>
      Here's a markdown component, it has **bold** and _italic_ support, [plus more](#).
    </Markdown>
  );
}
