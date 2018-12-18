const fs = require('fs');
const { parse } = require('./src/lib/parse');
const { tail } = require('./src/lib/fileHandler');

const main = function() {
  let { files, option, count } = parse(process.argv.slice(2));
  console.log(tail( count, option, files, fs.existsSync, fs.readFileSync));
}
main();
