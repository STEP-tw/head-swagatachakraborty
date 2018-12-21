const assert = require('assert');
const { fetchNLines,
  fetchNBytes,
  getFilterFunction,
  getHeadBounds,
  getTailBounds } = require('../../src/lib/fileHandler'); 


describe('fetchNLines', function() {
  let content = 'abcd\ndef\nghi\njFkl\n5\n6\n7\n8\n9\n10\n11';

  it('should return empty string if the number of line to fetch is 0.', function() {
    assert.equal(fetchNLines({ lower : 0, upper : 0 }, content), '');
  })

  it('should return content of provided number of lines', function() {
    let expectedOutput = 'abcd\ndef\nghi';
    assert.equal(fetchNLines({ lower : 0, upper : 3 }, content), expectedOutput);
  })
})

describe('fetchNBytes', function() {
  let content = 'abcd\ndef\nghi\njkl';
 
  it('should return empty string if the number of character to fetch is 0.', function() {
    assert.equal(fetchNBytes({ lower : 0, upper : 0 }, content), '');
  })

  it('should return null if the content of the file is null .', function() {
    assert.equal(fetchNBytes({ lower : 0, upper : 2 }, null), null);
  })

  it('should return content of provided number of characters', function() {
    let expectedOutput = 'abc';
    assert.equal(fetchNBytes({ lower : 0, upper : 3 }, content), expectedOutput);
  })

  it('should return content of provided number of characters, it consider \'\\n\' as a new character.', function() {
    let expectedOutput = 'abcd\nd';
    assert.equal(fetchNBytes({ lower : 0, upper : 6 }, content), expectedOutput);
  })
})

describe('getFilterFunction', function() {
  it('should return fetchNLines() when input contain \'-n\'.', function() {
    assert.deepEqual(getFilterFunction('line'), fetchNLines);
  })

  it('should return fetchNBytes() when input contain \'-c\'.', function() {
    assert.deepEqual(getFilterFunction('byte'), fetchNBytes);
  })

  it('should return fetchNBytes() when input contain \'-c\'.', function() {
    assert.deepEqual(getFilterFunction('-p'), fetchNLines);
  })
})

describe('getHeadBounds', function() {
  it('should return an object that contain the lower and upper bounds of the file length ', function() {
    assert.deepEqual(getHeadBounds(2), {lower : 0, upper : 2});
  })
})

describe('getTailBounds', function() {
  it('should return an object that contain the lower and upper bounds equal to the file length, when length is 0', function() {
    assert.deepEqual(getTailBounds(0), {upper : 0, lower : 0});
  })

  it('should return an object that contain lower bound of the negetive file length, when length is positive ', function() {
    assert.deepEqual(getTailBounds(2), {lower : -2});
  })

  it('should return an object that contain the lower bound of the negetive file length, when length is negetive ', function() {
    assert.deepEqual(getTailBounds(-2), {lower : -2});
  })
})
