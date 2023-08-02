"use client";

import * as React from "react";
import { Accent, AppContainer } from "@spyrothon/sparx";

import "./globals.css";

import styles from "./layout.module.css";

import { Sidebar } from "./sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={styles.body}>
        <a href="#main" className={styles.skipLink}>
          Skip to main content
        </a>

        <AppContainer className={styles.container} accent={Accent.PINK}>
          <Sidebar className={styles.sidebar} />
          <div className={styles.content}>
            <div className={styles.contentWidthContainer}>
              {/* each page template should have a <main id="main"> which does not include navigation */}
              <div>{children}</div>
            </div>
          </div>
        </AppContainer>
      </body>
    </html>
  );
}
