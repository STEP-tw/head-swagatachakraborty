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

const fetchNLines = function(n, content ) {
  return content.split('\n').slice(0, n).join('\n');
}

module.exports = { createHeading,
                   addHeading,
                   formatContents,
                   fetchNLines };
