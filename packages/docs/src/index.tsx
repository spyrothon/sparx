import * as React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "../.design_system/generated/DesignSystem.css";
import "@spyrothon/sparx/dist/style.css";

const root = createRoot(document.getElementById("app-container")!);
root.render(<App />);
