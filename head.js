const fs = require('fs');
const { parse } = require('./src/lib/parse');
const { getHead } = require('./src/lib/fileHandler');

const main = function() {
  let { files, option, count } = parse(process.argv.slice(2));
  console.log(getHead( count, option, files, fs.existsSync, fs.readFileSync));
}
main();
