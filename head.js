const fs = require('fs');
const { parse } = require('./src/lib/parse');
const { head } = require('./src/lib/fileHandler');

const main = function() {
  let { files, option, count } = parse(process.argv.slice(2));
  console.log(head( count, option, files, fs.existsSync, fs.readFileSync ));
}
main();
