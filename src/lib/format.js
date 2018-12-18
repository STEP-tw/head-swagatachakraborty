const { missingFileError } = require("./errorHandler");

const createHeading = function(title) {
  return "==> " + title + " <==";
};

const addHeading = function(context, files) {
  let headings = files.slice();
  return function(content) {
    if (content == null) return missingFileError(headings.shift())[context];
    return createHeading(headings.shift()) + "\n" + content;
  };
};

const formatContents = function(context, fileLog) {
  if ( fileLog.exist ) return fileLog.content;
  return missingFileError( fileLog.file )[context];
};

const formatHead = formatContents.bind(null, 'head');
const formatTail = formatContents.bind(null, 'tail');

module.exports = {
  formatHead,
  formatTail,
  addHeading,
  createHeading,
  formatHead,
  formatTail
};
