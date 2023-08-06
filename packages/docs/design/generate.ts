import fs from "fs";
import path from "path";

import { formatters, generators, source } from "@spyrothon/tokens";
import definitions from "./tokens";

const TARGET_DIR = path.resolve(__dirname, "./generated");
fs.mkdirSync(TARGET_DIR, { recursive: true });

const files = {
  COLORS: "colors.css",
  THEMES: "themes.css",
  FONTS: "fonts.css",
  SPACING: "spacing.css",
  RADII: "radii.css",
};

source(definitions)
  .out(path.join(TARGET_DIR, files.COLORS), generators.CSS.generateColors, {
    formatter: formatters.runPrettier,
  })
  .out(path.join(TARGET_DIR, files.THEMES), generators.CSS.generateThemeColors, {
    formatter: formatters.runPrettier,
  })
  .out(path.join(TARGET_DIR, files.FONTS), generators.CSS.generateFonts, {
    formatter: formatters.runPrettier,
  })
  .out(path.join(TARGET_DIR, files.SPACING), generators.CSS.generateSpacing, {
    formatter: formatters.runPrettier,
  })
  .out(path.join(TARGET_DIR, files.RADII), generators.CSS.generateRadii, {
    formatter: formatters.runPrettier,
  })
  .out(
    path.join(TARGET_DIR, "system.css"),
    () => generators.CSS.generateSystem(Object.values(files)),
    {
      formatter: formatters.runPrettier,
    },
  )
  .flow();
