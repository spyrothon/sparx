import React from "react";
import * as sparx from "@spyrothon/sparx";

export function CalloutTag({ type, children }: { type: string; children: React.ReactNode }) {
  return (
    <sparx.Callout type={type as sparx.CalloutType}>
      <sparx.Stack>{children}</sparx.Stack>
    </sparx.Callout>
  );
}
