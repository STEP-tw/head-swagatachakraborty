const { missingFileError } = require("./errorHandler");

const formatContent = function ( context, fileLogs ) {
  if(fileLogs.length == 1) return getContent(context, fileLogs[0]);
  return fileLogs.map( format.bind(null, context) ).join('\n\n');
};

const addHeading = function(title, content) {
  return "==> " + title + " <==\n" + content;
};

const format = function (context, fileLog) {
  if(fileLog.exist) return addHeading(fileLog.file,  getContent(context, fileLog) );
  return getContent(context, fileLog);
};

const getContent = function(context, fileLog) {
  if ( fileLog.exist ) return fileLog.content;
  return missingFileError( fileLog.file )[context];
};

const formatHead = formatContent.bind(null, 'head');
const formatTail = formatContent.bind(null, 'tail');

module.exports = {
  getContent,
  addHeading,
  format,
  formatHead,
  formatTail
};
