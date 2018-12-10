const fs = require('fs');
const { parse, getHead } = require('./src/lib.js');

const main = function() {
  let { files, type, length } = parse(process.argv.slice(2));
  console.log(getHead(length, type, files, fs.existsSync, fs.readFileSync));
}
main();