const assert = require('assert');
const { checkAndApply, toNumber } = require('../../src/util/util'); 

describe('toNumber', function() {
  it('should return number if the argument given to it is number in string format', function() {
    assert.strictEqual(toNumber('1'), 1);
  })

  it('should return the element if the argument given to it is not a number in string format', function() {
    assert.strictEqual(toNumber('1a'), '1a');
  })
})

describe('checkAndApply', function() {
  let isNumber = function(x) { return typeof(x) == 'number'; } 
  it('should return modified list after check the condition and  applying the function over the list.', function() {
    assert.deepEqual(checkAndApply(isNumber, x => x+1, 1), 2);
  })

  it('should return null for element if the condition fail for that element.', function() {
    assert.deepEqual(checkAndApply(isNumber, x => x+1, 'a'), null);
  })
})
