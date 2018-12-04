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

const extractDetails = function(details) {
  return { filterContents : getFilterFunction(details[2]),
           length : extractLength(details.slice(2,4)),
           files : extractFiles(details.slice(2)) 
         };
}

const extractLength = function(details) {
  if( !details[0].match(/^-/) ) return 10;
  if( details[0].match(/[0-9]/g) ) {
    return +details[0].match(/[0-9]/g).join("");
  } 
  return +details[1].match(/[0-9]/g).join("");
}

const getFilterFunction = function(type) {
  return type.match(/-c/) ? fetchNCharacters : fetchNLines;
}

const extractFiles = function(details) {
  if( details[0].match(/^-/) && details[0].match(/[0-9]/) ) {
    return details.slice(1);
  }
  if( details[0].match(/^-/) && !details[0].match(/[0-9]/) ) {
    return details.slice(2);
  }
  return details;
}

module.exports = { createHeading,
                   addHeading,
                   formatContents,
                   fetchNLines,
                   fetchNCharacters,
                   extractLength,
                   getFilterFunction,
                   extractDetails,
                   fetchContents,
                   extractFiles };
