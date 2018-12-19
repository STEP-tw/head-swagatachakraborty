const assert = require("assert");
const {
  addHeading,
  formatHead,
  formatTail,
  format
} = require("../../src/lib/format");

describe("addHeading", function() {
  it("should add heading to the content when title and content is provided", function () {
    let expectedOutput = "==> name <==\ncontent";
    assert.equal( addHeading('name', 'content'), expectedOutput );
  });
});

describe("formatHead", function() {
  it("should return the content if there is only one existing file", function() {
    let fileLogs = { file : 'a', content : 'abc', exist : true };
    let expectedOutput = 'abc';
    assert.deepEqual( formatHead(fileLogs), expectedOutput );
  });
  
  it("should add headings when there is multiple files", function() {
    let fileLogs = { file : '1', content : '1', exist : false };
    let expectedOutput = 'head: 1: No such file or directory'
    assert.deepEqual( formatHead(fileLogs), expectedOutput );
  });
});

describe("formatTail", function() {
  it("should return the content if there is only one existing file", function() {
    let fileLogs = { file : 'a', content : 'abc', exist : true };
    let expectedOutput = 'abc';
    assert.deepEqual( formatTail(fileLogs), expectedOutput );
  });
  
  it("should add headings when there is multiple files", function() {
    let fileLogs = { file : '1', content : '1', exist : false };
    let expectedOutput = 'tail: 1: No such file or directory'
    assert.deepEqual( formatTail(fileLogs), expectedOutput );
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
