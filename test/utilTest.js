const assert = require('assert');
const { checkAndApply } = require('../src/util.js'); 

describe('checkAndApply', function() {
  let isNumber = function(x) { return typeof(x) == 'number'; } 
  it('should return modified list after check the condition and  applying the function over the list.', function() {
    assert.deepEqual(checkAndApply(isNumber, x => x+1, [1, 2]), [2, 3]);
  })

  it('should return null for element if the condition fail for that element.', function() {
    assert.deepEqual(checkAndApply(isNumber, x => x+1, [1, 'a']), [2, null]);
  })
})
