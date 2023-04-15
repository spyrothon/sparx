import path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: path.resolve(__dirname, "../../"),
  },
  resolve: {
    alias: {
      "@sparx": path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "Sparx Design System",
      // this is a modern package, meant to be bundled.
      formats: ["es"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        preserveModules: true,
        entryFileNames: (entry) => {
          const { name, facadeModuleId } = entry;
          const fileName = `${name}.js`;
          if (!facadeModuleId) {
            return fileName;
          }
          const localName = `${path.basename(name)}.js`;
          const here = path.resolve(__dirname, "src");
          if (!facadeModuleId.startsWith(here)) {
            return fileName;
          }
          const relativeDir = path.relative(here, path.dirname(facadeModuleId));
          return path.join(relativeDir, localName);
        },
      },
    },
  },
});
