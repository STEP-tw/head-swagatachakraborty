const { existsSync, readFileSync } = require('fs');
const { parse } = require('./src/lib/parse');
const { tailInputsValidator } = require('./src/lib/errorHandler');
const { tail } = require('./src/lib/fileHandler');
const { formatTail } = require('./src/lib/format');

const main = function() {
  let { files, option, count } = parse( process.argv.slice(2) );
  let { hasError, error } = tailInputsValidator(option, count);
  if( hasError ) return error;
  let fileDetails = tail(count, option, files, existsSync, readFileSync);
  return formatTail( fileDetails );
}

console.log( main() );
