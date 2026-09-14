export default async function (eleventyConfig) {
  // Miscellaneous
  // ---------------------------------------------------------------------------
  eleventyConfig.setQuietMode(true);

  // Passthrough
  // ---------------------------------------------------------------------------
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  // Favicon
  eleventyConfig.addPassthroughCopy("src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/favicon-96x96.png");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("src/web-app-manifest-192x192.png");
  eleventyConfig.addPassthroughCopy("src/web-app-manifest-512x512.png");

  // Filters
  // ---------------------------------------------------------------------------
  eleventyConfig.addFilter("sortByOrder", function sortByOrder(items) {
    return [...items].sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
  });

  // Directory configurations
  // ---------------------------------------------------------------------------
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md"]
  };
}
