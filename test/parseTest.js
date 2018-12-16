const assert = require('assert');
const { parse } = require('../src/parse');

describe("parse return object of all required details from the provided input array.", function() {
  it("should return object of details when the user input is [ -n, 5, f1, f2 ] ", function() {
    let input = ["-n", "5", "f1", "f2"];
    let expectedOutput = { type: "-n", length: 5, files: ["f1", "f2"] };
    assert.deepEqual(parse(input), expectedOutput);
  });

  it("should return object of details when the user input is [ -n, 5x, f1, f2 ] ", function() {
    let input = ["-n", "5x", "f1", "f2"];
    let expectedOutput = { type: "-n", length: "5x", files: ["f1", "f2"] };
    assert.deepEqual(parse(input), expectedOutput);
  });

  it("should return object of details when the user input is [ -n, f0, f1, f2 ] ", function() {
    let input = ["-n", "f0", "f1", "f2"];
    let expectedOutput = { type: "-n", length: "f0", files: ["f1", "f2"] };
    assert.deepEqual(parse(input), expectedOutput);
  });

  it("should return object of details when the user input is [ -c, 5, f1, f2 ] ", function() {
    let input = ["-c", "5", "f1", "f2"];
    let expectedOutput = { type: "-c", length: 5, files: ["f1", "f2"] };
    assert.deepEqual(parse(input), expectedOutput);
  });

  it("should return object of details when the user input is [ -p, 5, f1, f2 ] ", function() {
    let input = ["-p", "5", "f1", "f2"];
    let expectedOutput = { type: "-p", length: 5, files: ["f1", "f2"] };
    assert.deepEqual(parse(input), expectedOutput);
  });

  it("should return object of details when the user input is [ -s, 5s, f1, f2 ] ", function() {
    let input = ["-s", "5s", "f1", "f2"];
    let expectedOutput = { type: "-s", length: "5s", files: ["f1", "f2"] };
    assert.deepEqual(parse(input), expectedOutput);
  });

  it("should return object of details when the user input is [ -n5, f1, f2 ] ", function() {
    let input = ["-n5", "f1", "f2"];
    let expectedOutput = { type: "-n", length: 5, files: ["f1", "f2"] };
    assert.deepEqual(parse(input), expectedOutput);
  });

  it("should return object of details when the user input is [ -c5, f1, f2 ] ", function() {
    let input = ["-c5", "f1", "f2"];
    let expectedOutput = { type: "-c", length: 5, files: ["f1", "f2"] };
    assert.deepEqual(parse(input), expectedOutput);
  });

  it("should return object of details when the user input is [ -c5x, f1, f2 ] ", function() {
    let input = ["-c5x", "f1", "f2"];
    let expectedOutput = { type: "-c", length: "5x", files: ["f1", "f2"] };
    assert.deepEqual(parse(input), expectedOutput);
  });

  it("should return object of details when the user input is [ f1, f2 ] ", function() {
    let input = ["f1", "f2"];
    let expectedOutput = { type: "-n", length: 10, files: ["f1", "f2"] };
    assert.deepEqual(parse(input), expectedOutput);
  });

  it("should return object of details when the user input is [ -5, f1, f2 ] ", function() {
    let input = ["-5", "f1", "f2"];
    let expectedOutput = { type: "-n", length: "5", files: ["f1", "f2"] };
    assert.deepEqual(parse(input), expectedOutput);
  });

  it("should return object of details when the user input is [ -5x, f1, f2 ] ", function() {
    let input = ["-5x", "f1", "f2"];
    let expectedOutput = { type: "-n", length: "5x", files: ["f1", "f2"] };
    assert.deepEqual(parse(input), expectedOutput);
  });

  it("should return object of details when the user input is [ -px, f1, f2 ] ", function() {
    let input = ["-px", "f1", "f2"];
    let expectedOutput = { type: "-p", length: "x", files: ["f1", "f2"] };
    assert.deepEqual(parse(input), expectedOutput);
  });
});
