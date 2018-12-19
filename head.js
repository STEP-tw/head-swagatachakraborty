const { existsSync, readFileSync } = require('fs');
const { parse } = require('./src/lib/parse');
const { headInputsValidator } = require('./src/lib/errorHandler');
const { head } = require('./src/lib/fileHandler');
const { formatHead } = require('./src/lib/format');

const main = function() {
  let { files, option, count } = parse( process.argv.slice(2) );
  let { hasError, error } = headInputsValidator(option, count);
  if( hasError ) return error;
  let fileDetails = head(count, option, files, existsSync, readFileSync);
  return formatHead( fileDetails );
}

console.log( main() );
