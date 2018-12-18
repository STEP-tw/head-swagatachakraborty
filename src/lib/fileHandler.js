const { checkAndApply } = require("../util/util");
const {
  hasInvalidOption,
  hasInvalidCount,
  countError,
  optionError } = require("./errorHandler");

const utf8Reader = function (reader) {
  return function(element){
    return reader(element, 'utf8');
  };
};

const generateFileLogs = function(context, count, option, files, isExist, reader) {
  if (hasInvalidOption(option)) return optionError(option)[context];
  if (hasInvalidCount(count)[context]) return countError(count)[context][option];
  let filter = getContentFilter( getFilterFunction(option), getBounds(count)[context] );
  return files.map( getFilelog.bind(null, filter, isExist, utf8Reader(reader)) );
};

const getFilelog = function (getContent, isExist, reader, file ) {
  return {
    file : file,
    content : getContent( checkAndApply( isExist, reader, file ) ),
    exist : isExist(file)
  };
};

const getContentFilter = function ( filterContent, bounds ) {
  return function ( content ) {
    return filterContent( bounds, content );
  };
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

const getFilterFunction = function(option) {
  return option == "-c" ?  fetchNCharacters : fetchNLines ;
};

const fetchNLines = fetchUptoCount.bind(null, '\n');
const fetchNCharacters = fetchUptoCount.bind(null, '');
const head = generateFileLogs.bind(null, "head");
const tail = generateFileLogs.bind(null, "tail");

module.exports = {
  fetchNLines,
  fetchNCharacters,
  getFilterFunction,
  head,
  getHeadBounds,
  getTailBounds,
  tail
};
