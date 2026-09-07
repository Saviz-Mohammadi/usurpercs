export default async function (eleventyConfig) {
  // Miscellaneous
  // ---------------------------------------------------------------------------
  eleventyConfig.setQuietMode(true);

  // Passthrough
  // ---------------------------------------------------------------------------
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

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
  };
}
