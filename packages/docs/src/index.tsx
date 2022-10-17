import * as React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "@spyrothon/sparx/dist/style.css";
import "@spyrothon/sparx/dist/default.css";

const root = createRoot(document.getElementById("app-container")!);
root.render(<App />);
