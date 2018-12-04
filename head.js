const { readFileSync } = require('fs'); 
const { apply } = require('./src/util.js');
const { extractDetails, formatContents, fetchContents } = require('./src/lib.js');

const main = function() {
  let { files, filterContents, length } = extractDetails(process.argv);
  let contents = apply(readFileSync, files);
  contents = fetchContents(filterContents, contents, length);
  console.log( formatContents(contents, files) );
}

main();
