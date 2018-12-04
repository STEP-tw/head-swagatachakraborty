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

const fetchNLines = function(content, n=10) {
  return content.split('\n').slice(0, n).join('\n');
}

const fetchNCharacters = function(content, n) {
  return content.split('').slice(0,n).join('');
}

const extractLength = function(details) {
  if( !details[0].match(/^-/) ) return 10;
  if( details[0].match(/[0-9]/g) ) {
    return +details[0].match(/[0-9]/g).join("");
  } 
  return +details[1].match(/[0-9]/g).join("");
}

module.exports = { createHeading,
                   addHeading,
                   formatContents,
                   fetchNLines,
                   fetchNCharacters,
                   extractLength };
