import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const PACKAGE_NAME = "@spyrothon/tokens";

const packageDir = path.resolve(path.join(fileURLToPath(import.meta.url), "..", ".."));
const templateDir = path.resolve(packageDir, "default");
const targetDir = path.resolve("./design");

fs.mkdirSync(targetDir, { recursive: true });

function copyAndReplacePackageImport(file) {
  const content = fs.readFileSync(file).toString().replace("../dist/src", PACKAGE_NAME);
  fs.writeFileSync(path.join(targetDir, path.basename(file)), content);
}

copyAndReplacePackageImport(path.resolve(templateDir, "tokens.ts"));
copyAndReplacePackageImport(path.resolve(templateDir, "generate.ts"));
