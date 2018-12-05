const { readFileSync } = require('fs'); 
const { apply } = require('./src/util.js');
const { parse,
        formatContents,
        fetchContents,
        getFilterFunction,
        hasInvalidType,
        hasInvalidLength } = require('./src/lib.js');

const main = function() {
  let { files, type, length } = parse(process.argv);
  checkValidation(type, length);
  let filterContents = getFilterFunction(type);
  let contents = apply(readFileSync, files);
  contents = fetchContents(filterContents, contents, length);
  console.log( formatContents(contents, files) );
}

const checkValidation = function(type, length) {
  if(hasInvalidType(type)) {
    console.log('head: illegal option --',type,'\nusage: head [-n lines | -c bytes] [file ...]');
    process.exit();
  }
  if(hasInvalidLength(length)) {
    console.log('head: illegal byte/line count --',length);
    process.exit();
  }
  return;
}

main();
