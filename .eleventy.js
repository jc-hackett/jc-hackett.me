/* ===== Eleventy Config ===== */
module.exports = function (eleventyConfig) {
/* ===== Passthrough Copies ===== */
eleventyConfig.addPassthroughCopy("styles.css");
eleventyConfig.addPassthroughCopy("script.js");

  // Copy src/images/* to _site/images/*
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
eleventyConfig.ignores.add("README.md");
eleventyConfig.ignores.add("_kernels/**");
  return {
    // Allow Nunjucks tags/includes inside Markdown (.md) files
    markdownTemplateEngine: "njk",

    // (Optional, but keeps behavior consistent if you use .html content files)
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site",
    },
  };
};
/* ===== /Eleventy Config ===== */