const assert = require('assert');
const { createHeading,
        addHeading,
        formatContents,
        fetchNLines,
        fetchNCharacters,
        extractLength,
        getFilterFunction,
        extractFiles,
        extractDetails } = require('../src/lib.js'); 

const { apply } = require('../src/util.js'); 

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
    assert.deepEqual(fetchNCharacters(content, 0), '');
  })

  it('should return content of provided number of characters', function() {
    let expectedOutput = 'abc';
    assert.deepEqual(fetchNCharacters(content, 3), expectedOutput);
  })

  it('should return content of provided number of characters, it consider \'\\n\' as a new character.', function() {
    let expectedOutput = 'abcd\nd';
    assert.deepEqual(fetchNCharacters(content, 6), expectedOutput);
  })
})

describe('apply', function() {
  it('should return modified list after applying the function over the list.', function() {
    assert.deepEqual(apply(x => x+1, [1, 2]), [2, 3]);
  })
})

describe('extractLength', function() {
  it('should return length when it is passed as the 1st element of the input array', function() {
    assert.deepEqual(extractLength(['-n4', 'file1']), 4);
  })

  it('should return length when it is passed as the 2st element of the input array', function() {
    assert.deepEqual(extractLength(['-c', '5']), 5);
  })

  it('should return 10 when no length is provided', function() {
    assert.deepEqual(extractLength(['file1', 'file2']), 10);
  })
})

describe('getFilterFunction', function() {
  it('should return fetchNLines() when input contain \'-n\'.', function() {
    assert.deepEqual(getFilterFunction('-n4'), fetchNLines);
  })

  it('should return fetchNCharacters() when input contain \'-c\'.', function() {
    assert.deepEqual(getFilterFunction('-c'), fetchNCharacters);
  })

  it('should return fetchNLines() if it contain any other input than \'-c\' or \'-n\' ', function() {
    assert.deepEqual(getFilterFunction('-p'), fetchNLines);
  })
})

describe('extractFiles', function() {
  it('should return only file names when there is 2 other arguments at begining before file names.', function() {
    let input = [ '-n', '5', 'f1', 'f2' ];
    let expectedOutput = ['f1', 'f2'];
    assert.deepEqual(extractFiles(input), expectedOutput);
  })

  it('should return only file names when there is 1 other arguments at begining file names.', function() {
    let input = [ '-n5', 'f1', 'f2' ];
    let expectedOutput = ['f1', 'f2'];
    assert.deepEqual(extractFiles(input), expectedOutput);
  })

  it('should return only file names when there no other arguments at begining file names.', function() {
    let input = [ 'f1', 'f2' ];
    let expectedOutput = ['f1', 'f2'];
    assert.deepEqual(extractFiles(input), expectedOutput);
  })
})

describe('extractDetails return object of all required details from the provided input array.', function() {
  it('should return fetchNLines() in filterContents field when the user input is \'-n\' ', function() {
    let input = [ 0, 0, '-n', '5', 'f1', 'f2' ];
    let expectedOutput = { filterContents : fetchNLines,
                           length : 5,
                           files : ['f1', 'f2'] };
    assert.deepEqual(extractDetails(input), expectedOutput);
  })

  it('should return fetchNCharacters() in filterContents field when the user input is \'-c\'', function() {
    let input = [ 0, 0, '-c5', 'f1', 'f2' ];
    let expectedOutput = { filterContents : fetchNCharacters,
                           length : 5,
                           files : ['f1', 'f2'] };
    assert.deepEqual(extractDetails(input), expectedOutput);
  })

  it('should return fetchNLines as filterContents and 10 as length when only file names are provide as input.', function() {
    let input = [ 0, 0, 'f1', 'f2' ];
    let expectedOutput = { filterContents : fetchNLines,
                           length : 10,
                           files : ['f1', 'f2'] };
    assert.deepEqual(extractDetails(input), expectedOutput);
  })
})
