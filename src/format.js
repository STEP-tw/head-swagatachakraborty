const { missingFileError } = require("./Error");

const createHeading = function(title) {
  return "==> " + title + " <==";
};

const addHeading = function(context, files) {
  let headings = files.slice();
  return function(body) {
    if (body == null) return missingFileError(headings.shift())[context];
    return createHeading(headings.shift()) + "\n" + body;
  };
};

const formatContents = function(context, contents, files) {
  if (files.length == 1 && contents[0] != null) return contents.join();
  return contents.map(addHeading(context, files)).join("\n\n");
};

module.exports = {
  formatContents,
  addHeading,
  createHeading
};
