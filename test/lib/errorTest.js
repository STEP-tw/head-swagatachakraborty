const assert = require('assert');
const {
    hasInvalidLength,
    hasInvalidType,
    lengthError,
    typeError
} = require('../../src/lib/error');

describe("hasInvalidLength", function() {
  it("should return false in both head and tail if the length is greater than 0.", function() {
    assert.deepEqual(hasInvalidLength("2"), { head: false, tail: false });
  });

  it("should return true in both head and tail if the length contain any symbol other than number.", function() {
    assert.deepEqual(hasInvalidLength("2x"), { head: true, tail: true });
  });

  it("should return true in head and false in tail if the length is equal to 0.", function() {
    assert.deepEqual(hasInvalidLength("0"), { head: true, tail: false });
  });

  it("should return true in head and false in tail if the length is negetive.", function() {
    assert.deepEqual(hasInvalidLength("-1"), { head: true, tail: false });
  });
});

describe("hasInvalidType", function() {
  it("should return false if the type is '-n' or '-c'.", function() {
    assert.deepEqual(hasInvalidType("-n"), false);
    assert.deepEqual(hasInvalidType("-c"), false);
  });

  it("should return true if the type is not '-n' or '-c'.", function() {
    assert.deepEqual(hasInvalidType("-p"), true);
  });
});

describe("lengthError ", function() {
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
    assert.deepEqual(lengthError("2x"), expectedOutput);
  });
});

describe("typeError", function() {
  let expectedOutput = {
    head:
      "head: illegal option -- p\nusage: head [-n lines | -c bytes] [file ...]",
    tail:
      "tail: illegal option -- p\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
  };
  it("should return the error message with the provided type ", function() {
    assert.deepEqual(typeError("-p"), expectedOutput);
  });
});
