const { existsSync, readFileSync } = require('fs');
const { parse } = require('./src/lib/parse');
const { tail } = require('./src/lib/fileHandler');
const { formatTail } = require('./src/lib/format');

const main = function() {
  let { files, option, count } = parse( process.argv.slice(2) );
  let fileDetails = tail(count, option, files, existsSync, readFileSync);
  console.log( formatTail( fileDetails ) );
}

main();
