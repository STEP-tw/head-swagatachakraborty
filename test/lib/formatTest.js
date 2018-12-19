const assert = require("assert");
const {
  addHeading,
  getContent,
  format,
  formatHead,
  formatTail
} = require("../../src/lib/format");

describe("addHeading", function() {
  it("should add heading to the content when title and content is provided", function () {
    let expectedOutput = "==> name <==\ncontent";
    assert.equal( addHeading('name', 'content'), expectedOutput );
  });
});

describe("getContent", function() {
  it("should return the content if there is only one existing file", function() {
    let fileLogs = { file : 'a', content : 'abc', exist : true };
    let expectedOutput = 'abc';
    assert.deepEqual( getContent('head', fileLogs), expectedOutput );
  });
  
  it("should return error if there is missing file, for context - head", function() {
    let fileLogs = { file : '1', content : '1', exist : false };
    let expectedOutput = 'head: 1: No such file or directory'
    assert.deepEqual( getContent('head', fileLogs), expectedOutput );
  });

  it("should return error if there is missing file, for context - tail", function() {
    let fileLogs = { file : 'a', content : 'abc', exist : true };
    let expectedOutput = 'abc';
    assert.deepEqual( getContent('tail', fileLogs), expectedOutput );
  });
});

describe("format", function () {
  it("should return file content when the file exist", function () {
    let fileLogs = { file: '1', content: '1', exist: true };
    let expectedOutput = '==> 1 <==\n1';
    assert.equal(format('head', fileLogs), expectedOutput);
  });

  it("should return error for missing file, in context - head", function () {
    let fileLogs = { file: '1', content: '1', exist: false };
    let expectedOutput = 'head: 1: No such file or directory';
    assert.equal(format('head', fileLogs), expectedOutput);
  });

  it("should return error for missing file, in context - tail", function () {
    let fileLogs = { file: '1', content: '1', exist: false };
    let expectedOutput = 'tail: 1: No such file or directory';
    assert.equal(format('tail', fileLogs), expectedOutput);
  });
});

describe('formatHead', function() {
  it('should give content of file when there is only one existing file', function() {
    let fileLogs = [ { file : '1', content : '1', exist : true } ];
    let expectedOutput = '1';
    assert.equal(formatHead(fileLogs), expectedOutput);
  });

  it('should give missing file error when missing filelog is provided', function() {
    let fileLogs = [ { file : '1', content : '1', exist : false } ];
    let expectedOutput = 'head: 1: No such file or directory'
    assert.equal(formatHead(fileLogs), expectedOutput);
  });

  it('should give content with heading when all files in fileLogs exist', function() {
    let fileLogs = [ 
      { file : '1', content : '1', exist : true },
      { file : '2', content : '2', exist : true },
      { file : '3', content : '3', exist : true } 
    ];
    let expectedOutput = '==> 1 <==\n1\n\n==> 2 <==\n2\n\n==> 3 <==\n3';
    assert.equal(formatHead(fileLogs), expectedOutput);
  });

  it('should give formated content of files with heading when some file in fileLogs does not exist', function() {
    let fileLogs = [ 
      { file : '1', content : '1', exist : true },
      { file : 'a', content : 'a', exist : false },
      { file : '3', content : '3', exist : true } 
    ];
    let expectedOutput = '==> 1 <==\n1\n\nhead: a: No such file or directory\n\n==> 3 <==\n3';
    assert.equal(formatHead(fileLogs), expectedOutput);
  });
});

describe('formatTail', function() {
  it('should give content of file when there is only one existing file', function() {
    let fileLogs = [ { file : '1', content : '1', exist : true } ];
    let expectedOutput = '1';
    assert.equal(formatTail(fileLogs), expectedOutput);
  });

  it('should give missing file error when missing filelog is provided', function() {
    let fileLogs = [ { file : '1', content : '1', exist : false } ];
    let expectedOutput = 'tail: 1: No such file or directory';
    assert.equal(formatTail(fileLogs), expectedOutput);
  });

  it('should give content with heading when all files in fileLogs exist', function() {
    let fileLogs = [ 
      { file : '1', content : '1', exist : true },
      { file : '2', content : '2', exist : true },
      { file : '3', content : '3', exist : true } 
    ];
    let expectedOutput = '==> 1 <==\n1\n\n==> 2 <==\n2\n\n==> 3 <==\n3';
    assert.equal(formatTail(fileLogs), expectedOutput);
  });

  it('should give formated content of files with heading when some file in fileLogs does not exist', function() {
    let fileLogs = [ 
      { file : '1', content : '1', exist : true },
      { file : 'a', content : 'a', exist : false },
      { file : '3', content : '3', exist : true } 
    ];
    let expectedOutput = '==> 1 <==\n1\n\ntail: a: No such file or directory\n\n==> 3 <==\n3';
    assert.equal(formatTail(fileLogs), expectedOutput);
  });
});