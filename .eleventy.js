module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("scripts");

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