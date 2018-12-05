const { readFileSync } = require('fs'); 
const { apply } = require('./src/util.js');
const { parse, formatContents, fetchContents, getFilterFunction } = require('./src/lib.js');

const main = function() {
  let { files, type, length } = parse(process.argv);
  let filterContents = getFilterFunction(type);
  let contents = apply(readFileSync, files);
  contents = fetchContents(filterContents, contents, length);
  console.log( formatContents(contents, files) );
}

main();
