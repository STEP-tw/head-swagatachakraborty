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

const fetchNLines = function(n, content) {
  if(!content) return content;
  return content.split('\n').slice(0, n).join('\n');
}

const fetchNCharacters = function(n, content) {
  if(!content) return content;
  return content.split('').slice(0,n).join('');
}

const fetchContents = function( filterContents, contents, length ) {
  return contents.map( filterContents.bind(null, length) );
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
  return givenData.startsWith('-') && givenData[1].match(/[0-9]/);
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
                   hasInvalidLength }
