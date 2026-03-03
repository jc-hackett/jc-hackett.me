module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("script.js");

  // Copy src/images/* to _site/images/*
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
  };
};