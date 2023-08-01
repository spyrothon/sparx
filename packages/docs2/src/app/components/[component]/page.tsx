import * as React from "react";
import Markdoc from "@markdoc/markdoc";

import { MarkdocRenderer } from "@/components/MarkdocRenderer";

export default async function Page({ params }: { params: { component: string } }) {
  const { component } = params;

  const docs =
    require(`!raw-loader!../../../../../sparx/src/components/${component}/${component}.mdoc?raw`).default;

  return <MarkdocRenderer source={docs} />;
}
