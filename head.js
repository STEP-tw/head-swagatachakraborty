const { existsSync, readFileSync } = require('fs');
const { parse } = require('./src/lib/parse');
const { head } = require('./src/lib/fileHandler');
const { formatHead } = require('./src/lib/format');

const main = function() {
  let { files, option, count } = parse( process.argv.slice(2) );
  let fileDetails = head(count, option, files, existsSync, readFileSync);
  console.log( formatHead( fileDetails ) );
}

main();
