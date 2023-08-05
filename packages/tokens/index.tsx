import * as fs from "fs";
import * as path from "path";
import { formatters, source } from "token-pipeline";

import * as CSS from "./src/generators/CSS";

const [, , definitionPath = "./defaultTokens.tsx"] = process.argv;

const TARGET_DIR = path.resolve("./generated");
fs.mkdirSync(TARGET_DIR, { recursive: true });

(async function main() {
  const { default: definitions } = await import(path.resolve(definitionPath));

  const files = {
    COLORS: "colors.css",
    THEMES: "themes.css",
    FONTS: "fonts.css",
    SPACING: "spacing.css",
    RADII: "radii.css",
  };

  source(definitions)
    .out(path.join(TARGET_DIR, files.COLORS), CSS.generateColors, {
      formatter: formatters.runPrettier,
    })
    .out(path.join(TARGET_DIR, files.THEMES), CSS.generateThemeColors, {
      formatter: formatters.runPrettier,
    })
    .out(path.join(TARGET_DIR, files.FONTS), CSS.generateFonts, {
      formatter: formatters.runPrettier,
    })
    .out(path.join(TARGET_DIR, files.SPACING), CSS.generateSpacing, {
      formatter: formatters.runPrettier,
    })
    .out(path.join(TARGET_DIR, files.RADII), CSS.generateRadii, {
      formatter: formatters.runPrettier,
    })
    .out(path.join(TARGET_DIR, "system.css"), () => CSS.generateSystem(Object.values(files)), {
      formatter: formatters.runPrettier,
    })
    .flow();
})();
