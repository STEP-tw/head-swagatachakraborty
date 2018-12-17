const { checkAndApply } = require("../util/util");
const { hasInvalidType, hasInvalidLength, lengthError, typeError } = require("./errorHandler");
const { formatContents } = require("./format");

const utf8Reader = function (reader) {
  return function(element){
    return reader(element, 'utf8');
  };
};

const getContents = function(context, count, option, files, isExist, reader) {
  if (hasInvalidType(option)) return typeError(option)[context];
  if (hasInvalidLength(count)[context]) return lengthError(count)[context][option];
  let contents = checkAndApply(isExist, utf8Reader(reader) ,files);
  contents = fetchContents( getFilterFunction(option), contents, getBounds(count)[context] );
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
