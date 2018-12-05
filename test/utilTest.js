const assert = require('assert');
const { apply } = require('../src/util.js'); 

describe('apply', function() {
  it('should return modified list after applying the function over the list.', function() {
    assert.deepEqual(apply(x => x+1, [1, 2]), [2, 3]);
  })
})

