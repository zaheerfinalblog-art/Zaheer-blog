module.exports = function (eleventyConfig) {

  // ── Passthrough copies ─────────────────────────────────────────────────────
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy({ "src/content/uploads": "images/uploads" });

  // ── Date helpers ───────────────────────────────────────────────────────────
  function toDate(val) {
    if (!val) return new Date();
    if (val instanceof Date) return val;
    return new Date(val);
  }

  // ── Filters ────────────────────────────────────────────────────────────────
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const d = toDate(dateObj);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  });

  // ISO date string for datetime attribute
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    const d = toDate(dateObj);
    return d.toISOString().substring(0, 10);
  });

  eleventyConfig.addFilter("dateYear", (dateObj) => {
    return toDate(dateObj).getUTCFullYear().toString();
  });

  // Limit array to N items
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  // ── Collections ────────────────────────────────────────────────────────────
  eleventyConfig.addCollection("journal", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/content/journal/*.md")
      .sort((a, b) => b.date - a.date); // Newest first
  });

  // ── Directory config ───────────────────────────────────────────────────────
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
