const { checkAndApply } = require("./util");
const { hasInvalidType, hasInvalidLength, lengthError, typeError } = require("./error");
const { formatContents } = require("./format");

const utf8Reader = function (reader) {
  return function(element){
    return reader(element, 'utf8');
  };
};

const getContents = function(context, length, type, files, isExist, reader) {
  if (hasInvalidType(type)) return typeError(type)[context];
  if (hasInvalidLength(length)[context]) return lengthError(length)[context][type];
  let contents = checkAndApply(isExist, utf8Reader(reader) ,files);
  contents = fetchContents( getFilterFunction(type), contents, getBounds(length)[context] );
  return formatContents(context, contents, files);
};

const getBounds = function(length) {
  return {
    head: getHeadBounds(length),
    tail: getTailBounds(length)
  };
};

const getHeadBounds = function(length) {
  return { lower: 0, upper: length };
};

const getTailBounds = function(length) {
  if (!length) return { upper: length, lower: length };
  return { lower: -Math.abs(length) };
};

const fetchNLines = function(bounds, content) {
  if (!content) return content;
  return content
    .split("\n")
    .slice(bounds.lower, bounds.upper)
    .join("\n");
};

const fetchNCharacters = function(bounds, content) {
  if (!content) return content;
  return content
    .split("")
    .slice(bounds.lower, bounds.upper)
    .join("");
};

const fetchContents = function(filterContents, contents, bounds) {
  return contents.map(filterContents.bind(null, bounds));
};

const getFilterFunction = function(type) {
  return type == "-c" ? fetchNCharacters : fetchNLines;
};

const getHead = getContents.bind(null, "head");
const getTail = getContents.bind(null, "tail");

module.exports = {
  fetchNLines,
  fetchNCharacters,
  fetchContents,
  getFilterFunction,
  getHead,
  getHeadBounds,
  getTailBounds,
  getTail
};
