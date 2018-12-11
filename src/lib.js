const { checkAndApply } = require('./util');

const getHead = function(length, type, files, checker, applier) {
  if(hasInvalidType(type)) return generateTypeError(type);
  if(hasInvalidLength(length)) return generateLengthError(length)[type];
  let contents = checkAndApply(checker, applier, files);
  contents = fetchContents(getFilterFunction(type), contents, getHeadBounds(length));
  return formatContents(contents, files);
}

const getHeadBounds = function(length) {
  return { lower : 0, upper : length };
}

const getTailBounds = function(length) {
  return { lower : -(length + 1), upper : -1 };
}

const generateLengthError = function(length) { 
 return {
    "-n" : 'head: illegal line count -- ' + length,
    "-c" : 'head: illegal byte count -- ' + length
  };
}
  
const generateTypeError = function( type ){
  return 'head: illegal option -- ' + type[1] + '\nusage: head [-n lines | -c bytes] [file ...]';
}

const createHeading = function(title) {
  return '==> ' + title + ' <==';
}

const addHeading = function(headings, body) {
  if(body == null) return 'head: '+headings.shift()+': No such file or directory';
  return createHeading(headings.shift()) + '\n' + body;
}

const formatContents = function(contents, files) {
  if(files.length == 1 && contents[0] != null) return contents.join();
  return contents.map( addHeading.bind(null, files) ).join('\n\n');
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
  return length < 1 || length.split("").some( x => isNaN( +x ) ) ; 
}

const hasInvalidType = function(type) {
  return type != '-c' && type != '-n';
}

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
                   generateLengthError,
                   generateTypeError,
                   getHeadBounds,
                   getTailBounds };