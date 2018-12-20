const { checkAndApply } = require("../util/util");

const utf8Reader = function (reader) {
  return function(element){
    return reader(element, 'utf8');
  };
};

const generateFileLogs = function(context, count, option, files, isExist, reader) {
  let filter = getContentFilter( getFilterFunction(option), getBounds(count)[context] );
  return files.map( getFilelog.bind(null, filter, isExist, utf8Reader(reader)) );
};

const getFilelog = function (filterContent, isExist, reader, file ) {
  return {
    file : file,
    content : filterContent( checkAndApply( isExist, reader, file ) ),
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
  return option == "-c" ?  fetchNBytes : fetchNLines ;
};

const fetchNLines = fetchUptoCount.bind(null, '\n');
const fetchNBytes = fetchUptoCount.bind(null, '');
const head = generateFileLogs.bind(null, "head");
const tail = generateFileLogs.bind(null, "tail");

module.exports = {
  fetchNLines,
  fetchNBytes,
  getFilterFunction,
  head,
  getHeadBounds,
  getTailBounds,
  tail
};
