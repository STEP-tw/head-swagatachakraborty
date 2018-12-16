const assert = require('assert');
const { getHead } = require('../src/lib');

const checker = (x) => !isNaN(x);
const applier = (x) => x;

describe("getHead", function () {
    it("should return error message when invalid type is provided ", function () {
        let expectedOutput = "head: illegal option -- e\nusage: head [-n lines | -c bytes] [file ...]";
        assert.deepEqual(getHead(2, '-e', [], checker,applier ), expectedOutput);
    });
    
    it("should return error message when alphanumeric line count is provided", function () {
        let expectedOutput = 'head: illegal line count -- 2x';
        assert.deepEqual(getHead('2x', '-n', [], checker, applier), expectedOutput);
      });

    it("should return error message when alphanumeric byte count is provided", function () {
        let expectedOutput = 'head: illegal byte count -- 2x';
        assert.deepEqual(getHead('2x', '-c', [], checker, applier), expectedOutput);
    });

    it("should return error message when alphabetic byte count is provided", function () {
        let expectedOutput = 'head: illegal byte count -- x';
        assert.deepEqual(getHead('x', '-c', [], checker, applier), expectedOutput);
    });

    it("should return error message when provided byte count is 0", function () {  
        let expectedOutput = 'head: illegal byte count -- 0';
        assert.deepEqual(getHead(0, '-c', [], checker, applier), expectedOutput);
    });

    it("should return error message when provided line count is 0", function () {  
        let expectedOutput = 'head: illegal line count -- 0';
        assert.deepEqual(getHead(0, '-n', [], checker, applier), expectedOutput);
    });

    it("should return error message when provided line count is negetive", function () {  
        let expectedOutput = 'head: illegal line count -- -1';
        assert.deepEqual(getHead(-1, '-n', [], checker, applier), expectedOutput);
    });
  
    it("should return error message when provided byte count is negetive", function () {  
        let expectedOutput = 'head: illegal byte count -- -1';
        assert.deepEqual(getHead(-1, '-c', [], checker, applier), expectedOutput);
    });

    it("should return the content when single files are provided", function () {
        let files = ['1'];
        let expectedOutput = '1';
        assert.deepEqual(getHead(10, '-n', files, checker, applier), expectedOutput);
    });

    it("should return the contents with headings when multiple files are provided", function () {
        let files = ['1', '2', '3'];
        let expectedOutput = '==> 1 <==\n1\n\n==> 2 <==\n2\n\n==> 3 <==\n3'
        assert.deepEqual(getHead(10, '-n', files, checker, applier), expectedOutput);
    });
      
    it("should return error message when any provided file, among multiple files does not exists", function () {
        let files = ['1', 'a', '3'];
        let expectedOutput = '==> 1 <==\n1\n\nhead: a: No such file or directory\n\n==> 3 <==\n3'
        assert.deepEqual(getHead(10, '-n', files, checker, applier), expectedOutput);
    });

    it("should return error message when multiple provided files does not exists", function () {
        let files = ['b', '1', 'a', '3'];
        let expectedOutput = 'head: b: No such file or directory\n\n==> 1 <==\n1\n\nhead: a: No such file or directory\n\n==> 3 <==\n3'
        assert.deepEqual(getHead(10, '-n', files, checker, applier), expectedOutput);
    });

    it("should return error message when provided file does not exists", function () {
        let files = [ 'a' ];
        let expectedOutput = 'head: a: No such file or directory'
        assert.deepEqual(getHead(10, '-n', files, checker, applier), expectedOutput);
    });
  });