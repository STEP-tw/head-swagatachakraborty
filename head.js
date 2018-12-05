const { readFileSync, existsSync } = require('fs'); 
const { checkAndApply } = require('./src/util.js');
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
  let contents = checkAndApply(existsSync, readFileSync, files);
  contents = fetchContents(filterContents, contents, length);
  console.log( formatContents(contents, files) );
}

const checkValidation = function(type, length) {
  if(hasInvalidType(type)) {
    console.log('head: illegal option --',type[1],'\nusage: head [-n lines | -c bytes] [file ...]');
    process.exit();
  }
  if(hasInvalidLength(length)) {
    let count = 'line';
    if(type == '-c') count = 'byte';
    console.log('head: illegal',count,'count --',length);
    process.exit();
  }
  return;
}

main();
