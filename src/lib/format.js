const { missingFileError } = require("./errorHandler");

const addHeading = function(title, content) {
  return "==> " + title + " <==\n" + content;
};

const getContent = function (context, fileLogs) {
  return fileLogs.map( mapFileContent.bind( null, context ) );
};

const mapFileContent = function(context, fileLog) {
  if ( fileLog.exist ) return fileLog.content;
  return missingFileError( fileLog.file )[context];
};

const formatHead = mapFileContent.bind(null, 'head');
const formatTail = mapFileContent.bind(null, 'tail');

module.exports = {
  formatHead,
  formatTail,
  addHeading,
  getContent,
  formatHead,
  formatTail
};
