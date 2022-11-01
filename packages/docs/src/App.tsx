import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Accent, AppContainer } from "@spyrothon/sparx";

import Common from "./pages/Common";
import Forms from "./pages/Forms";
import Home from "./pages/Home";
import Layers from "./pages/Layers";
import Layout from "./pages/Layout";
import Typography from "./pages/Typography";
import DocsSidebar from "./DocsSidebar";
import Pages from "./Pages";

import styles from "./App.module.css";

export default function App() {
  return (
    <BrowserRouter>
      <AppContainer className={styles.container} accent={Accent.PINK}>
        <DocsSidebar className={styles.sidebar} />
        <main className={styles.content}>
          <div className={styles.contentWidthContainer}>
            <Routes>
              <Route path={Pages.HOME} element={<Home />} />
              <Route path={Pages.COMPONENTS_COMMON} element={<Common />} />
              <Route path={Pages.COMPONENTS_FORMS} element={<Forms />} />
              <Route path={Pages.COMPONENTS_LAYERS} element={<Layers />} />
              <Route path={Pages.COMPONENTS_LAYOUT} element={<Layout />} />
              <Route path={Pages.COMPONENTS_TYPOGRAPHY} element={<Typography />} />
            </Routes>
          </div>
        </main>
      </AppContainer>
    </BrowserRouter>
  );
}
