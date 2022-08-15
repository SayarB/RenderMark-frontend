const removeImports = require("next-remove-imports")();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = (_phase, { defaultConfig }) => {
  return withBundleAnalyzer(
    removeImports({
      ...defaultConfig,

      images: {
        domains: ["images.unsplash.com", "res.cloudinary.com"],
      },
    })
  );
};
