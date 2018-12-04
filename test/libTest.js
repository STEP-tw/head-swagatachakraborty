const assert = require('assert');
const { createHeading } = require('../src/lib.js'); 

describe('createHeading', function() {
  it('should return heading as file names are provided ', function() {
    let expectedOutput = '==> file1 <==';
    assert.deepEqual(createHeading('file1'),expectedOutput);

    expectedOutput = '==> file2 <==';
    assert.deepEqual(createHeading('file2'),expectedOutput);
  })
})

