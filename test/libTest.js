const assert = require('assert');
const { createHeading,
        addHeading,
        extractType,
        formatContents,
        fetchNLines,
        isValidLength,
        isValidType,
        fetchNCharacters,
        extractLength,
        getFilterFunction,
        extractFiles,
        fetchContents,
        parse } = require('../src/lib.js'); 

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

  it('should return empty string if the number of line to fetch is 0.', function() {
    assert.deepEqual(fetchNLines(0, content), '');
  })

  it('should return content of provided number of lines', function() {
    let expectedOutput = 'abcd\ndef\nghi';
    assert.deepEqual(fetchNLines(3, content), expectedOutput);
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

describe('parse return object of all required details from the provided input array.', function() {
  it('should return object of details when the user input is [ 0, 0, -n, 5, f1, f2 ] ', function() {
    let input = [ 0, 0, '-n', '5', 'f1', 'f2' ];
    let expectedOutput = { type : '-n',
                           length : 5,
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })

  it('should return object of details when the user input is [ 0, 0, -n5, f1, f2 ] ', function() {
    let input = [ 0, 0, '-c5', 'f1', 'f2' ];
    let expectedOutput = { type : '-c',
                           length : 5,
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })

  it('should return object of details when the user input is [ 0, 0, f1, f2 ] ', function() {
    let input = [ 0, 0, 'f1', 'f2' ];
    let expectedOutput = { type : '-n',
                           length : 10,
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })

  it('should return object of details when the user input is [ 0, 0, -5, f1, f2 ] ', function() {
    let input = [ 0, 0, '-5', 'f1', 'f2' ];
    let expectedOutput = { type : '-n',
                           length : 5,
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })
})

describe('fetchContents', function() {
  it('should fetching the required lines content from the contents, when fetchNLines is passed. ', function() {
    let contents = ['abcd\nmnop\nqrst', '123\n456'];
    let expectedOutput = ['abcd\nmnop', '123\n456']
    assert.deepEqual(fetchContents(fetchNLines, contents, 2), expectedOutput);
  })

  it('should fetching the required character content from the contents, when fetchNCharacters is passed. ', function() {
    let contents = ['abcd\nmnop\nqrst', '123\n456'];
    let expectedOutput = ['ab', '12']
    assert.deepEqual(fetchContents(fetchNCharacters, contents, 2), expectedOutput);
  })
})

describe('extractType', function() {
  it('should return the type when it is provided in the argument.', function() {
    assert.deepEqual(extractType('-n4'), '-n');
    assert.deepEqual(extractType('-c4'), '-c');
  })

  it('should return the type as \'-n\' when no type is provided.', function() {
    assert.deepEqual(extractType('file1'), '-n');
  })

  it('should return the type as \'-n\' when the argument is only length.', function() {
    assert.deepEqual(extractType('-9'), '-n');
  })
})

describe('isValidLength', function() {
  it('should return true if the length is greater than 0.', function() {
    assert.deepEqual(isValidLength(2), true);
  })

  it('should return false if the length is less than or equal to 0.', function() {
    assert.deepEqual(isValidLength(0), false);
    assert.deepEqual(isValidLength(-1), false);
  })
})

describe('isValidType', function() {
  it('should return true if the type is \'-n\' or \'-c\'.', function() {
    assert.deepEqual(isValidType('-n'), true);
    assert.deepEqual(isValidType('-c'), true);
  })

  it('should return true if the type is not \'-n\' or \'-c\'.', function() {
    assert.deepEqual(isValidType('-p'), false);
  })
})

