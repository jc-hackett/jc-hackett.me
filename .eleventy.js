/* ===== Eleventy Config ===== */
module.exports = function (eleventyConfig) {
  /* ===== Passthrough Copies ===== */
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/script.js": "script.js" });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  /* ===== Ignore Non-Site Files ===== */
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("_kernels/**");

  /* ===== Return Options ===== */
  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site",
    },
  };
};
/* ===== /Eleventy Config ===== */