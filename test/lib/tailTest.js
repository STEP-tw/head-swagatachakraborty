const assert = require('assert');
const { getTail } = require('../../src/lib/fileHandler');

const checker = (x) => !isNaN(x);
const applier = (x) => x;

describe("getTail", function () {
    it("should return error message when invalid type is provided ", function () {
        let expectedOutput = "tail: illegal option -- e\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
        assert.deepEqual(getTail(2, '-e', [], checker,applier ), expectedOutput);
    });
    
    it("should return error message when alphanumeric offset is provided", function () {
        let expectedOutput = 'tail: illegal offset -- 2x';
        assert.deepEqual(getTail('2x', '-n', [], checker, applier), expectedOutput);
      });

    it("should return error message when alphabetic offset is provided", function () {
        let expectedOutput = 'tail: illegal offset -- x';
        assert.deepEqual(getTail('x', '-c', [], checker, applier), expectedOutput);
    });

    it("should return zero line provided offset is 0 provided single file", function () {  
        let files = ['1'];
        let expectedOutput = '';
        assert.deepEqual(getTail(0, '-n', files, checker, applier), expectedOutput);
    });

    it("should return zero line when provided offset is 0 and provided multiple files", function () {  
        let files = ['1', '2'];
        let expectedOutput = '==> 1 <==\n\n\n==> 2 <==\n'
        assert.deepEqual(getTail(0, '-n', files, checker, applier), expectedOutput);
    });

    it("should return lines with headings when multiple files provided and offset is positive", function () {  
        let files = ['1', '2'];
        let expectedOutput = '==> 1 <==\n1\n\n==> 2 <==\n2';
        assert.deepEqual(getTail(1, '-n', files, checker, applier), expectedOutput);
    });

    it("should return lines with headings when multiple files provided and offset is negetive", function () {  
        let files = ['1', '2'];
        let expectedOutput = '==> 1 <==\n1\n\n==> 2 <==\n2';
        assert.deepEqual(getTail(-1, '-n', files, checker, applier), expectedOutput);
    });
  
    it("should return the content when single files are provided and offset is positive and more than the lines of the file", function () {
        let files = ['1'];
        let expectedOutput = '1';
        assert.deepEqual(getTail(10, '-n', files, checker, applier), expectedOutput);
    });

    it("should return the contents with headings when multiple files are provided and offset is negetive and more than lines of files", function () {
        let files = ['1', '2', '3'];
        let expectedOutput = '==> 1 <==\n1\n\n==> 2 <==\n2\n\n==> 3 <==\n3'
        assert.deepEqual(getTail(-11, '-n', files, checker, applier), expectedOutput);
    });
      
    it("should return error message when any provided file, among multiple files does not exists", function () {
        let files = ['1', 'a', '3'];
        let expectedOutput = '==> 1 <==\n1\n\ntail: a: No such file or directory\n\n==> 3 <==\n3'
        assert.deepEqual(getTail(10, '-n', files, checker, applier), expectedOutput);
    });

    it("should return error message when multiple provided files does not exists", function () {
        let files = ['b', '1', 'a', '3'];
        let expectedOutput = 'tail: b: No such file or directory\n\n==> 1 <==\n1\n\ntail: a: No such file or directory\n\n==> 3 <==\n3'
        assert.deepEqual(getTail(10, '-n', files, checker, applier), expectedOutput);
    });

    it("should return error message when provided file does not exists", function () {
        let files = [ 'a' ];
        let expectedOutput = 'tail: a: No such file or directory'
        assert.deepEqual(getTail('10', '-n', files, checker, applier), expectedOutput);
    });
  });