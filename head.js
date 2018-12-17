const fs = require('fs');
const { parse } = require('./src/lib/parse');
const { getHead } = require('./src/lib/lib.js');

const main = function() {
  let { files, type, length } = parse(process.argv.slice(2));
  console.log(getHead(length, type, files, fs.existsSync, fs.readFileSync));
}
main();
