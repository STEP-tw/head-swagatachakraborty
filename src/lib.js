const { checkAndApply, toString, isNotNull } = require('./util');
const {  hasInvalidType, hasInvalidLength, lengthError, typeError, missingFileError} = require('./error');

const getContents = function(context, length, type, files, isExist, reader) {
  if(hasInvalidType(type)) return typeError(type)[context];
  if(hasInvalidLength(length)[context]) return lengthError(length)[context][type];
  let contents = checkAndApply(isExist, reader, files);
  contents = checkAndApply(isNotNull, toString, contents);
  contents = fetchContents(getFilterFunction(type), contents, getBounds(length)[context]);
  return formatContents(context, contents, files);
}

const getBounds = function (length) {
  return { 
    head : getHeadBounds(length),
    tail : getTailBounds(length)
  };
}

const getHeadBounds = function(length) {
  return { lower : 0, upper : length };
}

const getTailBounds = function(length) {
  if(! +length) return {upper : length, lower : length};
  return { lower : -Math.abs(length) };
}

const createHeading = function(title) {
  return '==> ' + title + ' <==';
}

const addHeading = function(context, files) {
  let headings = files.slice();
  return function(body) {
    if(body == null) return missingFileError(headings.shift())[context] ;
    return createHeading(headings.shift()) + '\n' + body;
  };
}

const formatContents = function(context, contents, files) {
  if(files.length == 1 && contents[0] != null) return contents.join();
  return contents.map( addHeading(context, files) ).join('\n\n');
}

const fetchNLines = function(bounds, content) {
  if(!content) return content;
  return content.split('\n')
        .slice(bounds.lower, bounds.upper)
        .join('\n');
}

const fetchNCharacters = function(bounds, content) {
  if(!content) return content;
  return content.split('')
        .slice(bounds.lower, bounds.upper)
        .join('');
}

const fetchContents = function( filterContents, contents, bounds ) {
  return contents.map( filterContents.bind(null, bounds) );
}

const getHead = getContents.bind(null, 'head');
const getTail = getContents.bind(null, 'tail');

module.exports = { createHeading,
                   addHeading,
                   formatContents,
                   fetchNLines,
                   fetchNCharacters,
                   parse,
                   fetchContents,
                   getFilterFunction,
                   hasInvalidType,
                   hasInvalidLength,
                   getHead,
                   lengthError,
                   typeError,
                   getHeadBounds,
                   getTailBounds,
                   getTail };