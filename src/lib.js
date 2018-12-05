const createHeading = function(title) {
  return '==> ' + title + ' <==';
}

const addHeading = function(headings, body) {
  return createHeading(headings.shift()) + '\n' + body;
}

const formatContents = function(contents, files) {
  if(files.length == 1) {
    return contents.join();
  }
  return contents.map( addHeading.bind(null, files) ).join('\n\n');
}

const fetchNLines = function(n, content) {
  return content.split('\n').slice(0, n).join('\n');
}

const fetchNCharacters = function(n, content) {
  return content.split('').slice(0,n).join('');
}

const fetchContents = function( filterContents, contents, length ) {
  return contents.map( filterContents.bind(null, length) );
}

const parse = function(details) {
  return { type : extractType(details[2]),
           length : extractLength(details.slice(2,4)),
           files : extractFiles(details.slice(2)) 
         };
}

const extractLength = function(details) {
  if( !details[0].startsWith('-') ) return 10;
  if( details[0].length == 2 ) {
    return +details[1];
  } 
  return +details[0].split("").slice(2).join("");
}

const extractType = function(type) {
  if( !type.startsWith('-') ) return '-n';
  return type.slice(0,2);
}

const extractFiles = function(details) {
  if( !details[0].startsWith('-') ) return details.slice();
  if(details[0].length == 2) {
    return details.slice(2);
  }
  return details.slice(1);
}

const getFilterFunction = function(type) {
  if(type == '-c') return fetchNCharacters;
  return fetchNLines;
}

module.exports = { createHeading,
                   addHeading,
                   formatContents,
                   fetchNLines,
                   fetchNCharacters,
                   extractLength,
                   extractType,
                   parse,
                   fetchContents,
                   extractType,
                   getFilterFunction,
                   extractFiles };
