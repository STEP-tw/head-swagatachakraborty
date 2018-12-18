const { checkAndApply } = require("../util/util");
const {
  hasInvalidOption,
  hasInvalidCount,
  countError,
  optionError } = require("./errorHandler");
const { formatContents } = require("./format");

const utf8Reader = function (reader) {
  return function(element){
    return reader(element, 'utf8');
  };
};

const getContents = function(context, count, option, files, isExist, reader) {
  if (hasInvalidOption(option)) return optionError(option)[context];
  if (hasInvalidCount(count)[context]) return countError(count)[context][option];
  let contents = checkAndApply(isExist, utf8Reader(reader), files);
  contents = fetchContents( getFilterFunction(option), contents, getBounds(count)[context] );
  return formatContents(context, contents, files);
};

const getBounds = function(count) {
  return {
    head: getHeadBounds(count),
    tail: getTailBounds(count)
  };
};

const getHeadBounds = function(count) {
  return { lower: 0, upper: count };
};

const getTailBounds = function(count) {
  if (!count) return { upper: count, lower: count };
  return { lower: -Math.abs(count) };
};

const fetchUptoCount= function(delimiter, bounds, content) {
  if (!content) return content;
  return content
    .split(delimiter)
    .slice(bounds.lower, bounds.upper)
    .join(delimiter);
};

const fetchContents = function(filterContents, contents, bounds) {
  return contents.map(filterContents.bind(null, bounds));
};

const getFilterFunction = function(option) {
  return option == "-c" ?  fetchNCharacters : fetchNLines ;
};

const fetchNLines = fetchUptoCount.bind(null, '\n');
const fetchNCharacters = fetchUptoCount.bind(null, '');
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
