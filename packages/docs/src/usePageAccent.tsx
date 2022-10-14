import * as React from "react";
import { Accent, ThemeContext } from "@spyrothon/sparx";

export default function usePageAccent(accent: Accent) {
  const theme = React.useContext(ThemeContext);

  React.useEffect(() => {
    theme.setAccent(accent);
  }, [theme, accent]);
}
