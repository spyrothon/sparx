import { ConfigType, Schema, nodes } from "@markdoc/markdoc";
import { Text } from "@spyrothon/sparx";

export const paragraphNode: Schema<ConfigType, string> = {
  ...nodes.paragraph,
  render: "Paragraph",
};

export function Paragraph({ children }: React.PropsWithChildren) {
  return <Text>{children}</Text>;
}
