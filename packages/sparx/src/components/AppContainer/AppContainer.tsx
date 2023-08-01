import * as React from "react";
import classNames from "classnames";

import { Layers } from "../Layer/Layers";
import {
  Accent,
  getThemeClass,
  Theme,
  ThemeContext,
  ThemeProvider,
} from "../ThemeProvider/ThemeProvider";

import "@sparx/styles.css";
import styles from "./AppContainer.module.css";

interface AppInnerProps {
  children: React.ReactNode;
  className?: string;
}

function AppInner(props: AppInnerProps) {
  const { children, className } = props;
  const { theme, accent } = React.useContext(ThemeContext);

  return (
    <div className={classNames(getThemeClass(theme, accent), styles.appContainer)}>
      <div className={className}>{children}</div>
      <Layers />
    </div>
  );
}

export interface AppContainerProps {
  theme?: Theme;
  accent?: Accent;
  children: React.ReactNode;
  className?: string;
}

export function AppContainer(props: AppContainerProps) {
  const { theme, accent, children, className } = props;
  return (
    <ThemeProvider theme={theme} accent={accent}>
      <AppInner className={className}>{children}</AppInner>
    </ThemeProvider>
  );
}
