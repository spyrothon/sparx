"use client";

import * as React from "react";

import "../../design/generated/system.css";
import "@spyrothon/sparx/style.css";

import "./globals.css";

import { Sidebar } from "../components/Sidebar";
import { AppContainer, ThemeContext, useThemeStore } from "./theming";

import styles from "./layout.module.css";

function RootThemeListener() {
  const { theme, accent } = React.useContext(ThemeContext);

  React.useEffect(() => {
    useThemeStore.getState().setTheme(theme, accent);
  }, [theme, accent]);

  return null;
}

function RootAppContainer(props: React.PropsWithChildren) {
  const stored = useThemeStore();
  const { children } = props;

  return (
    <AppContainer className={styles.container} theme={stored.theme} accent={stored.accent}>
      <RootThemeListener />
      {children}
    </AppContainer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={styles.body}>
        <a href="#main" className={styles.skipLink}>
          Skip to main content
        </a>

        <RootAppContainer>
          <Sidebar className={styles.navigation} />
          <div className={styles.content}>
            <main id="main" className={styles.contentWidthContainer}>
              {children}
            </main>
          </div>
        </RootAppContainer>
      </body>
    </html>
  );
}
