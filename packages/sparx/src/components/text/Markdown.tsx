import * as React from "react";
import { useRemark } from "react-remark";

import { Anchor, Header, Text } from "@sparx/index";

const REHYPE_OPTIONS = {
  components: {
    h1: (props: any) => <Header tag="h1" variant="header-xl" {...props} />,
    h2: (props: any) => <Header tag="h2" variant="header-lg" {...props} />,
    h3: (props: any) => <Header tag="h3" variant="header-md" {...props} />,
    h4: (props: any) => <Header tag="h4" variant="header-sm" {...props} />,
    h5: (props: any) => <Header tag="h5" variant="header-xs" {...props} />,
    p: (props: any) => <Text {...props} />,
    a: (props: any) => <Anchor {...props} />,
  },
};

export interface MarkdownProps {
  children: string;
}

export function Markdown(props: MarkdownProps) {
  const { children } = props;
  const [renderedContent, setContent] = useRemark({ rehypeReactOptions: REHYPE_OPTIONS });

  React.useEffect(() => {
    setContent(children);
  }, [children, setContent]);

  return <>{renderedContent}</>;
}
