const assert = require('assert');
const { createHeading,
        addHeading,
        formatContents,
        fetchNLines,
        fetchNCharacters } = require('../src/lib.js'); 

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

describe('fetchNLines', function() {
  let content = 'abcd\ndef\nghi\njFkl\n5\n6\n7\n8\n9\n10\n11';

  it('should return 10 lines of the content when number of line is not specified.', function() {
    let expectedOutput = 'abcd\ndef\nghi\njFkl\n5\n6\n7\n8\n9\n10';
    assert.deepEqual(fetchNLines(content), expectedOutput);
  })

  it('should return empty string if the number of line to fetch is 0.', function() {
    assert.deepEqual(fetchNLines(content, 0), '');
  })

  it('should return content of provided number of lines', function() {
    let expectedOutput = 'abcd\ndef\nghi';
    assert.deepEqual(fetchNLines(content, 3), expectedOutput);
  })
})

describe('fetchNCharacters', function() {
  let content = 'abcd\ndef\nghi\njkl';

  it('should return empty string if the number of character to fetch is 0.', function() {
    assert.deepEqual(fetchNCharacters(0, content), '');
  })

  it('should return content of provided number of characters', function() {
    let expectedOutput = 'abc';
    assert.deepEqual(fetchNCharacters(3, content), expectedOutput);
  })

  it('should return content of provided number of characters, it consider \'\\n\' as a new character.', function() {
    let expectedOutput = 'abcd\nd';
    assert.deepEqual(fetchNCharacters(6, content), expectedOutput);
  })
})

