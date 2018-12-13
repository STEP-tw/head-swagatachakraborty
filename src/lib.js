const { checkAndApply, toString, isNotNull } = require('./util');

const getContents = function(context, length, type, files, checker, applier) {
  if(hasInvalidType(type)) return typeError(type)[context];
  if(hasInvalidLength(length)[context]) return lengthError(length)[context][type];
  let contents = checkAndApply(checker, applier, files);
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

const lengthError = function(length) { 
  return {
    head : generateHeadLengthError(length),
    tail : generateTailLengthError(length)
  };
}
  
const generateHeadLengthError = function(length) {
  return {
    "-n": 'head: illegal line count -- ' + length,
    "-c": 'head: illegal byte count -- ' + length
  };
}

const generateTailLengthError = function(length) {
  return {
    "-n": 'tail: illegal offset -- ' + length,
    "-c": 'tail: illegal offset -- ' + length
  };
}

const typeError = function( type ){
  return {
    head : 'head: illegal option -- ' + type[1] + '\nusage: head [-n lines | -c bytes] [file ...]',
    tail : 'tail: illegal option -- ' + type[1] + '\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]'
  }
}

const missingFileError = function( file ) {
  return {
    head : 'head: ' + file + ': No such file or directory',
    tail : 'tail: ' + file + ': No such file or directory'
  };
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

const parse = function(details) {
  //for -5 f1 f1
  if( isOnlyLengthProvided(details[0]) ) {
    return { files : details.slice(1), length : details[0].slice(1), type : '-n' };
  }
  //for -n 5 f1 f1
  if( areTypeAndLengthGivenSeparately(details[0]) ) {
    return { files : details.slice(2), length : details[1], type : details[0] };
  }
  //for -n5 f1 f1
  if( areTypeAndLengthGivenTogather(details[0]) ) {
    return { files : details.slice(1), length : details[0].slice(2), type : details[0].slice(0,2) };
  }
  return { files : details.slice(), length : '10', type : '-n' };
}

const isOnlyLengthProvided = function(givenData) {
  return givenData.startsWith('-') && givenData[1].match(/[0-9]/) ;
}

const areTypeAndLengthGivenSeparately = function(givenData) {
  return givenData.startsWith('-') && givenData[1].match(/[A-z]/) && givenData.length == 2;
}

const areTypeAndLengthGivenTogather = function(givenData) {
  return givenData.startsWith('-') && givenData[1].match(/[A-z]/);
}

const getFilterFunction = function(type) {
  return (type == '-c') ? fetchNCharacters : fetchNLines;
}

const hasInvalidLength = function(length) {
  return {
    head : length < 1 || isNaN(length - length) ,
    tail : isNaN(length - length) 
  };
}

const hasInvalidType = function(type) {
  return type != '-c' && type != '-n';
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