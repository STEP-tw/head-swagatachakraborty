const assert = require('assert');
const { createHeading,
        addHeading,
        formatContents } = require('../src/lib.js'); 

describe('createHeading', function() {
  it('should return heading as file names are provided ', function() {
    let expectedOutput = '==> file1 <==';
    assert.deepEqual(createHeading('file1'), expectedOutput);

    expectedOutput = '==> file2 <==';
    assert.deepEqual(createHeading('file2'), expectedOutput);
  })
})

describe('addHeading', function() {
    let headings = ['file1', 'file2', 'file3'];

  it('should add heading  to the body as headings and body provided ', function() {
    let expectedOutput = '==> file1 <==\nabcd';
    assert.deepEqual(addHeading(headings, 'abcd'), expectedOutput);
  })

  it('should return only heading followed by a new line when the file body does not contain any text', function() {
    let expectedOutput = '==> file2 <==\n';
    assert.deepEqual(addHeading(headings, ''), expectedOutput);
  })
})

describe('formatContents', function() {

  it('should return the contens if there is only one file', function() {
    let files = ['file1'];
    let contents = ['abcd'];
    let expectedOutput = contents.join();
    assert.deepEqual(formatContents(contents, files), expectedOutput);
  })

  it('should add headings as file names with the contents of respected files when there is multiple files ', function() {
    let files = ['file1', 'file2'];
    let contents = ['abcd', 'efgh'];
    let expectedOutput = "==> file1 <==\nabcd\n\n==> file2 <==\nefgh";
    assert.deepEqual(formatContents(contents, files), expectedOutput);
  })
})

