const assert = require("assert");
const {
  addHeading,
  getContent,
  format
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
