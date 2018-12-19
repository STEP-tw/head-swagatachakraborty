const assert = require("assert");
const {
  hasInvalidCount,
  hasInvalidOption,
  countError,
  optionError,
  headInputsValidator,
  tailInputsValidator
} = require("../../src/lib/errorHandler");

describe("hasInvalidCount", function() {
  it("should return false in both head and tail if the length is greater than 0.", function() {
    assert.deepEqual(hasInvalidCount("2"), { head: false, tail: false });
  });

  it("should return true in both head and tail if the length contain any symbol other than number.", function() {
    assert.deepEqual(hasInvalidCount("2x"), { head: true, tail: true });
  });

  it("should return true in head and false in tail if the length is equal to 0.", function() {
    assert.deepEqual(hasInvalidCount("0"), { head: true, tail: false });
  });

  it("should return true in head and false in tail if the length is negetive.", function() {
    assert.deepEqual(hasInvalidCount("-1"), { head: true, tail: false });
  });
});

describe("hasInvalidOption", function() {
  it("should return false if the type is '-n' or '-c'.", function() {
    assert.deepEqual(hasInvalidOption("-n"), false);
    assert.deepEqual(hasInvalidOption("-c"), false);
  });

  it("should return true if the type is not '-n' or '-c'.", function() {
    assert.deepEqual(hasInvalidOption("-p"), true);
  });
});

describe("countError ", function() {
  it("should return the error with error message with the provided lenght", function() {
    let expectedOutput = {
      head: {
        "-n": "head: illegal line count -- 2x",
        "-c": "head: illegal byte count -- 2x"
      },
      tail: {
        "-c": "tail: illegal offset -- 2x",
        "-n": "tail: illegal offset -- 2x"
      }
    };
    assert.deepEqual(countError("2x"), expectedOutput);
  });
});

describe("optionError", function() {
  let expectedOutput = {
    head:
      "head: illegal option -- p\nusage: head [-n lines | -c bytes] [file ...]",
    tail:
      "tail: illegal option -- p\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
  };
  it("should return the error message with the provided type ", function() {
    assert.deepEqual(optionError("-p"), expectedOutput);
  });
});

describe('headInputValidator', function(){
  it('should return the object hasError if there is any unvalid count', function() {
    let expectedOutput = { 
      hasError: true, 
      error: "head: illegal line count -- 2x"
    };
    assert.deepEqual(headInputsValidator('-n', '2x'), expectedOutput);
  });

  it('should return the object of error and hasError if there is any invalid option', function() {
    let expectedOutput = { 
      hasError: true, 
      error: "head: illegal option -- p\nusage: head [-n lines | -c bytes] [file ...]" 
    };
    assert.deepEqual(headInputsValidator('-p', 3), expectedOutput);
  });

  it('should return the object of error and hasError if there is any invalid count', function() {
    let expectedOutput = { 
      hasError: true, 
      error: "head: illegal line count -- 2x"
    };
    assert.deepEqual(headInputsValidator('-n', '2x'), expectedOutput);
  });

  it('should return the object of error and hasError if there is count 0', function() {
    let expectedOutput = { 
      hasError: true, 
      error: "head: illegal line count -- 0"
    };
    assert.deepEqual(headInputsValidator('-n', 0), expectedOutput);
  });

  it('should return the object of error and hasError if there is negetive count', function() {
    let expectedOutput = { 
      hasError: true, 
      error: "head: illegal line count -- -1"
    };
    assert.deepEqual(headInputsValidator('-n', -1), expectedOutput);
  });

  it('should return the object where hasError is false when there is no error', function() {
    let expectedOutput = { 
      hasError: false, 
    };
    assert.deepEqual(headInputsValidator('-n', 1), expectedOutput);
  });
});

describe('TailInputsValidator', function(){
  it('should return the object hasError if there is any unvalid count', function() {
    let expectedOutput = {
      hasError: true, 
      error: "tail: illegal offset -- 2x"
    };
    assert.deepEqual(tailInputsValidator('-n', '2x'), expectedOutput);
  });

  it('should return the object of error and hasError if there is any unvalid option', function() {
    let expectedOutput = {
      hasError: true, 
      error: "tail: illegal option -- p\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
    };
    assert.deepEqual(tailInputsValidator('-p', 3), expectedOutput);
  });

  it('should return the object of error and hasError if there is any unvalid count', function() {
    let expectedOutput = {
      hasError: true, 
      error: "tail: illegal offset -- 2x"
    };
    assert.deepEqual(tailInputsValidator('-n', '2x'), expectedOutput);
  });

  it('should return the object where hasError is false when there is no error', function() {
    let expectedOutput = { 
      hasError: false, 
    };
    assert.deepEqual(tailInputsValidator('-n', -1), expectedOutput);
  });
});