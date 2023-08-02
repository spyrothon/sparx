const withMarkdoc = require("@markdoc/next.js");

/** @type {import('next').NextConfig} */
const nextConfig = withMarkdoc()({
  transpilePackages: ["../../../../sparx/examples"],
  pageExtensions: ["md", "mdoc", "js", "jsx", "ts", "tsx"],
});

module.exports = nextConfig;
