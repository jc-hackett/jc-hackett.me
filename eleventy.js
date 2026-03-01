module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles.css");
  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
