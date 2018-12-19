const { missingFileError } = require("./errorHandler");

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

module.exports = {
  getContent,
  addHeading,
  format
};
