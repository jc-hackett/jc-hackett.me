/* ===== Eleventy Config ===== */
module.exports = function (eleventyConfig) {
/* ===== Passthrough Copies ===== */
eleventyConfig.addPassthroughCopy("styles.css");
eleventyConfig.addPassthroughCopy("script.js");

<<<<<<< HEAD
// Copy component CSS to /css/*
eleventyConfig.addPassthroughCopy({ "src/css": "css" });

// Copy src/images/* to _site/images/*
eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  /* ===== Return Options ===== */
=======
  // Copy src/images/* to _site/images/*
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
eleventyConfig.ignores.add("README.md");
eleventyConfig.ignores.add("_kernels/**");
>>>>>>> 3aee847c3c606431dca33e5aeed32064a52b3a5b
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