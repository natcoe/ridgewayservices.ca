const minifyAssets = require("./minify-assets.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.on("eleventy.after", minifyAssets);
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addWatchTarget("./images");

  eleventyConfig.addGlobalData(
    "isProduction",
    process.env.CONTEXT === "production"
  );

  eleventyConfig.addTemplateFormats("njk");

  eleventyConfig.addExtension("njk", {
    outputFileExtension: "html"
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};