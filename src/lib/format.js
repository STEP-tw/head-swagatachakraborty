const { missingFileError } = require("./errorHandler");

const addHeading = function(title, content) {
  return "==> " + title + " <==\n" + content;
};

const format = function (context, fileLog) {
  if(fileLog.exist) return addHeading(fileLog.file,  mapFileContent(context, fileLog) );
  return mapFileContent(context, fileLog);
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
  format,
  formatHead,
  formatTail
};
