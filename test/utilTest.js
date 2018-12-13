const assert = require('assert');
const { checkAndApply, isNotNull, toString } = require('../src/util.js'); 

describe('checkAndApply', function() {
  let isNumber = function(x) { return typeof(x) == 'number'; } 
  it('should return modified list after check the condition and  applying the function over the list.', function() {
    assert.deepEqual(checkAndApply(isNumber, x => x+1, [1, 2]), [2, 3]);
  })

  it('should return null for element if the condition fail for that element.', function() {
    assert.deepEqual(checkAndApply(isNumber, x => x+1, [1, 'a']), [2, null]);
  })
})

describe('isNotNull', function() {
  it('should return false if the argument pass to it is null.', function() {
    assert.deepEqual(isNotNull(null), false);
  })

  it('should return false if the argument pass to it is a numeric value.', function() {
    assert.deepEqual(isNotNull(1), true);
  })

  it('should return false if the argument pass to it is a string.', function() {
    assert.deepEqual(isNotNull('a'), true);
  })
})

describe('toString', function() {
  it('should return string of the provided numeric value', function() {
    assert.deepEqual(toString(1), '1');
  })

  it('should return string if a string is provided', function() {
    assert.deepEqual(toString('1'), '1');
  })
})