const assert = require("assert");
const {
  addHeading,
  formatHead,
  formatTail,
  getContent
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

describe("getContent", function () {
  it("should return file content in array when there is only one file", function () {
    let fileLogs = [{ file: '1', content: '1', exist: true }];
    let expectedOutput = ['1'];
    assert.deepEqual(getContent('head', fileLogs), expectedOutput);
  });

  it("should return error in array for missing when there is only one file", function () {
    let fileLogs = [{ file: '1', content: '1', exist: false }];
    let expectedOutput = ['head: 1: No such file or directory'];
    assert.deepEqual(getContent('head', fileLogs), expectedOutput);
  });

  it("should add headings when there is multiple files", function () {
    let fileLogs = [{ file: '1', content: '1', exist: false }];
    let expectedOutput = ['tail: 1: No such file or directory'];
    assert.deepEqual(getContent('tail', fileLogs), expectedOutput);
  });

  it("should return the array of content for multiple files", function () {
    let fileLogs = [
      { file: '1', content: '1', exist: true },
      { file: '2', content: '2', exist: true }
    ]
    let expectedOutput = ['1', '2'];
    assert.deepEqual(getContent('tail', fileLogs), expectedOutput);
  })

  it("should return the array of content and error messages for multiple files, for content - head", function () {
    let fileLogs = [
      { file: '1', content: '1', exist: true },
      { file: '2', content: '2', exist: false },
      { file: '3', content: '3', exist: true }
    ];
    let expectedOutput = ['1', 'head: 2: No such file or directory', '3'];
    assert.deepEqual(getContent('head', fileLogs), expectedOutput);
  })

  it("should return the array of content and error messages for multiple files, for content - tail", function () {
    let fileLogs = [
      { file: '1', content: '1', exist: true },
      { file: '2', content: '2', exist: true },
      { file: '3', content: '3', exist: false }
    ];
    let expectedOutput = ['1', '2', 'tail: 3: No such file or directory'];
    assert.deepEqual(getContent('tail', fileLogs), expectedOutput);
  })
});
