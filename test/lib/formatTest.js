const assert = require("assert");
const {
  createHeading,
  addHeading,
  formatHead,
  formatTail,
  getContent
} = require("../../src/lib/format");
describe("createHeading", function() {
  it("should return heading as file names are provided ", function() {
    let expectedOutput = "==> file1 <==";
    assert.deepEqual(createHeading("file1"), expectedOutput);

    expectedOutput = "==> file2 <==";
    assert.deepEqual(createHeading("file2"), expectedOutput);
  });
});

describe("addHeading - will take file names and return a function that will add heading of file names ", function() {
  let headings = ["file1", "file2", "file3"];
  describe("for context - head", function() {
    let addHeadingWith = addHeading("head", headings);
    it("should add heading  to the body as headings and body provided for head context", function() {
      let expectedOutput = "==> file1 <==\nabcd";
      assert.deepEqual(addHeadingWith("abcd"), expectedOutput);
    });

    it("should return error messege if the second arg is null provided for head context", function() {
      let expectedOutput = "head: file2: No such file or directory";
      assert.deepEqual(addHeadingWith(null), expectedOutput);
    });

    it("should return only heading followed by a new line when the file body does not contain any text for head context", function() {
      let expectedOutput = "==> file3 <==\n";
      assert.deepEqual(addHeadingWith(""), expectedOutput);
    });
  });

  describe("for context - tail", function() {
    let addHeadingWith = addHeading("tail", headings);

    it("should add heading  to the body as headings and body provided for tail context", function() {
      let expectedOutput = "==> file1 <==\nabcd";
      assert.deepEqual(addHeadingWith("abcd"), expectedOutput);
    });

    it("should return error messege if the second arg is null provided for tail context", function() {
      let expectedOutput = "tail: file2: No such file or directory";
      assert.deepEqual(addHeadingWith(null), expectedOutput);
    });

    it("should return only heading followed by a new line when the file body does not contain any text tail context", function() {
      let expectedOutput = "==> file3 <==\n";
      assert.deepEqual(addHeadingWith(""), expectedOutput);
    });
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
