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

module.exports = { createHeading,
                   addHeading,
                   formatContents };
