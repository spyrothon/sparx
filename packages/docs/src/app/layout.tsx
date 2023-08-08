"use client";

import * as React from "react";

import "./globals.css";

import { Sidebar } from "../components/Sidebar";
import { AppContainer } from "./theming";

import styles from "./layout.module.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={styles.body}>
        <a href="#main" className={styles.skipLink}>
          Skip to main content
        </a>

        <AppContainer className={styles.container} accent={"pink"}>
          <Sidebar className={styles.navigation} />
          <div className={styles.content}>
            <main id="main" className={styles.contentWidthContainer}>
              {children}
            </main>
          </div>
        </AppContainer>
      </body>
    </html>
  );
}
