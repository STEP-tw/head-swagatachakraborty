const assert = require('assert');
const { createHeading,
        addHeading,
        formatContents,
        fetchNLines,
        hasInvalidLength,
        hasInvalidType,
        fetchNCharacters,
        getFilterFunction,
        fetchContents,
        parse,
        generateLengthError,
        generateTypeError,
        getHeadBounds,
        getTailBounds } = require('../src/lib.js'); 

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

  it('should return error messege if the second arg is null provided ', function() {
    let expectedOutput = 'head: file2: No such file or directory';
    assert.deepEqual(addHeading(headings, null), expectedOutput);
  })

  it('should return only heading followed by a new line when the file body does not contain any text', function() {
    let expectedOutput = '==> file3 <==\n';
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
    assert.deepEqual(fetchNLines({ lower : 0, upper : 0 }, content), '');
  })

  it('should return content of provided number of lines', function() {
    let expectedOutput = 'abcd\ndef\nghi';
    assert.deepEqual(fetchNLines({ lower : 0, upper : 3 }, content), expectedOutput);
  })
})

describe('fetchNCharacters', function() {
  let content = 'abcd\ndef\nghi\njkl';
 
  it('should return empty string if the number of character to fetch is 0.', function() {
    assert.deepEqual(fetchNCharacters({ lower : 0, upper : 0 }, content), '');
  })

  it('should return null if the content of the file is null .', function() {
    assert.deepEqual(fetchNCharacters({ lower : 0, upper : 2 }, null), null);
  })

  it('should return content of provided number of characters', function() {
    let expectedOutput = 'abc';
    assert.deepEqual(fetchNCharacters({ lower : 0, upper : 3 }, content), expectedOutput);
  })

  it('should return content of provided number of characters, it consider \'\\n\' as a new character.', function() {
    let expectedOutput = 'abcd\nd';
    assert.deepEqual(fetchNCharacters({ lower : 0, upper : 6 }, content), expectedOutput);
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

describe('parse return object of all required details from the provided input array.', function() {
  it('should return object of details when the user input is [ -n, 5, f1, f2 ] ', function() {
    let input = [ '-n', '5', 'f1', 'f2' ];
    let expectedOutput = { type : '-n',
                           length : '5',
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })

  it('should return object of details when the user input is [ -n, 5x, f1, f2 ] ', function() {
    let input = [ '-n', '5x', 'f1', 'f2' ];
    let expectedOutput = { type : '-n',
                           length : '5x',
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })

  it('should return object of details when the user input is [ -n, f0, f1, f2 ] ', function() {
    let input = [ '-n', 'f0', 'f1', 'f2' ];
    let expectedOutput = { type : '-n',
                           length : 'f0',
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })

  it('should return object of details when the user input is [ -c, 5, f1, f2 ] ', function() {
    let input = [ '-c', '5', 'f1', 'f2' ];
    let expectedOutput = { type : '-c',
                           length : '5',
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })

  it('should return object of details when the user input is [ -p, 5, f1, f2 ] ', function() {
    let input = [ '-p', '5', 'f1', 'f2' ];
    let expectedOutput = { type : '-p',
                           length : '5',
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })

  it('should return object of details when the user input is [ -s, 5s, f1, f2 ] ', function() {
    let input = [ '-s', '5s', 'f1', 'f2' ];
    let expectedOutput = { type : '-s',
                           length : '5s',
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })

  it('should return object of details when the user input is [ -n5, f1, f2 ] ', function() {
    let input = [ '-n5', 'f1', 'f2' ];
    let expectedOutput = { type : '-n',
                           length : '5',
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })

  it('should return object of details when the user input is [ -c5, f1, f2 ] ', function() {
    let input = [ '-c5', 'f1', 'f2' ];
    let expectedOutput = { type : '-c',
                           length : '5',
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })

  it('should return object of details when the user input is [ -c5x, f1, f2 ] ', function() {
    let input = [ '-c5x', 'f1', 'f2' ];
    let expectedOutput = { type : '-c',
                           length : '5x',
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })

  it('should return object of details when the user input is [ f1, f2 ] ', function() {
    let input = [ 'f1', 'f2' ];
    let expectedOutput = { type : '-n',
                           length : '10',
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })

  it('should return object of details when the user input is [ -5, f1, f2 ] ', function() {
    let input = [ '-5', 'f1', 'f2' ];
    let expectedOutput = { type : '-n',
                           length : '5',
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })

  it('should return object of details when the user input is [ -5x, f1, f2 ] ', function() {
    let input = [ '-5x', 'f1', 'f2' ];
    let expectedOutput = { type : '-n',
                           length :  '5x',
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })

  it('should return object of details when the user input is [ -px, f1, f2 ] ', function() {
    let input = [ '-px', 'f1', 'f2' ];
    let expectedOutput = { type : '-p',
                           length :  'x',
                           files : ['f1', 'f2'] };
    assert.deepEqual(parse(input), expectedOutput);
  })
})

describe('fetchContents', function() {
  let bounds = { lower : 0, upper : 2 };

  it('should fetching the required lines content from the contents, when fetchNLines is passed. ', function() {
    let contents = ['abcd\nmnop\nqrst', '123\n456'];
    let expectedOutput = ['abcd\nmnop', '123\n456']
    assert.deepEqual(fetchContents(fetchNLines, contents, bounds), expectedOutput);
  })

  it('should return null if the contents of the file is null. ', function() {
    let contents = [null];
    let expectedOutput = [null]
    assert.deepEqual(fetchContents(fetchNLines, contents, bounds), expectedOutput);
  })

  it('should fetching the required character content from the contents, when fetchNCharacters is passed. ', function() {
    let contents = ['abcd\nmnop\nqrst', '123\n456'];
    let expectedOutput = ['ab', '12']
    assert.deepEqual(fetchContents(fetchNCharacters, contents, bounds), expectedOutput);
  })
})

describe('hasInvalidLength', function() {
  it('should return false in both head and tail if the length is greater than 0.', function() {
    assert.deepEqual(hasInvalidLength('2'), { head : false, tail : false });
  })

  it('should return true in both head and tail if the length contain any symbol other than number.', function() {
    assert.deepEqual(hasInvalidLength('2x'), { head : true, tail : true });
  })

  it('should return true in head and false in tail if the length is equal to 0.', function() {
    assert.deepEqual(hasInvalidLength('0'), { head : true, tail : false });
  })

  it('should return true in head and false in tail if the length is negetive.', function() {
    assert.deepEqual(hasInvalidLength('-1'), { head : true, tail : false });
  })
})

describe('hasInvalidType', function() {
  it('should return false if the type is \'-n\' or \'-c\'.', function() {
    assert.deepEqual(hasInvalidType('-n'), false);
    assert.deepEqual(hasInvalidType('-c'), false);
  })

  it('should return true if the type is not \'-n\' or \'-c\'.', function() {
    assert.deepEqual(hasInvalidType('-p'), true);
  })
})

describe('generateLengthError ', function() {
  it('should return the error with error message with the provided lenght', function() {
    let expectedOutput = {
      head : {
        "-n" : 'head: illegal line count -- 2x',
        "-c" : 'head: illegal byte count -- 2x'
      },
      tail : {
        "-c": "head: illegal offset -- 2x",
        "-n": "tail: illegal offset -- 2x"
      }
    };
    assert.deepEqual(generateLengthError ('2x'), expectedOutput);
  })
})

describe('generateTypeError', function() {
  let expectedOutput = {
    head : 'head: illegal option -- p\nusage: head [-n lines | -c bytes] [file ...]',
    tail : 'head: illegal option -- p\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]'
  };
  it('should return the error message with the provided type ', function() {
    assert.deepEqual(generateTypeError ('-p'), expectedOutput);
  })
})

describe('getHeadBounds', function() {
  it('should return an object that contain the lower and upper bounds of the file length ', function() {
    assert.deepEqual(getHeadBounds(2), {lower : 0, upper : 2});
  })
})

describe('getTailBounds', function() {
  it('should return an object that contain the lower and upper bounds of the file length, when length is 0', function() {
    assert.deepEqual(getTailBounds(0), {lower : -1, upper : -1});
  })

  it('should return an object that contain the lower and upper bounds of the file length, when length is positive ', function() {
    assert.deepEqual(getTailBounds(2), {lower : -3, upper : -1});
  })

  it('should return an object that contain the lower and upper bounds of the file length, when length is positive ', function() {
    assert.deepEqual(getTailBounds(-2), {lower : -3, upper : -1});
  })
})
