const fs = require('fs');
const { parse, getTail } = require('./src/lib.js');

const main = function() {
  let { files, type, length } = parse(process.argv.slice(2));
  console.log(getTail(length, type, files, fs.existsSync, fs.readFileSync));
}
main();