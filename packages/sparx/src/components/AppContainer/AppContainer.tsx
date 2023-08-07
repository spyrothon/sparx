import * as React from "react";
import classNames from "classnames";

import { Layers } from "../Layer/Layers";
import type { CreateThemeContextReturn } from "../ThemeProvider/ThemeProvider";

import "@sparx/styles.css";
import styles from "./AppContainer.module.css";

interface AppInnerProps {
  children: React.ReactNode;
  className?: string;
}

export function createAppContainer<
  const Theme extends string,
  const Accent extends string,
  const ThemeTokenName extends string,
>(themeContext: CreateThemeContextReturn<Theme, Accent, ThemeTokenName>) {
  const { getThemeClass, ThemeContext, ThemeProvider, themes, accents } = themeContext;

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

  return function AppContainer(props: {
    theme?: (typeof themes)[number];
    accent?: (typeof accents)[number];
    children: React.ReactNode;
    className?: string;
  }) {
    const { theme, accent, children, className } = props;
    return (
      <ThemeProvider theme={theme} accent={accent}>
        <AppInner className={className}>{children}</AppInner>
      </ThemeProvider>
    );
  };
}
