const assert = require('assert');
const { parse, determineOption } = require('../../src/lib/parse');

describe("parse return object of all required details from the provided input array.", function() {
  it("should return object of details when the user input is [ -n, 5, f1, f2 ] ", function() {
    let userArgs = ["-n", "5", "f1", "f2"];
    let expectedOutput = { option: "line", count: 5, files: ["f1", "f2"] };
    assert.deepEqual(parse(userArgs), expectedOutput);
  });

  it("should return object of details when the user input is [ -n, 5x, f1, f2 ] ", function() {
    let userArgs = ["-n", "5x", "f1", "f2"];
    let expectedOutput = { option: "line", count: "5x", files: ["f1", "f2"] };
    assert.deepEqual(parse(userArgs), expectedOutput);
  });

  it("should return object of details when the user input is [ -n, f0, f1, f2 ] ", function() {
    let userArgs = ["-n", "f0", "f1", "f2"];
    let expectedOutput = { option: "line", count: "f0", files: ["f1", "f2"] };
    assert.deepEqual(parse(userArgs), expectedOutput);
  });

  it("should return object of details when the user input is [ -c, 5, f1, f2 ] ", function() {
    let userArgs = ["-c", "5", "f1", "f2"];
    let expectedOutput = { option: "byte", count: 5, files: ["f1", "f2"] };
    assert.deepEqual(parse(userArgs), expectedOutput);
  });

  it("should return object of details when the user input is [ -p, 5, f1, f2 ] ", function() {
    let userArgs = ["-p", "5", "f1", "f2"];
    let expectedOutput = { option: "-p", count: 5, files: ["f1", "f2"] };
    assert.deepEqual(parse(userArgs), expectedOutput);
  });

  it("should return object of details when the user input is [ -s, 5s, f1, f2 ] ", function() {
    let userArgs = ["-s", "5s", "f1", "f2"];
    let expectedOutput = { option: "-s", count: "5s", files: ["f1", "f2"] };
    assert.deepEqual(parse(userArgs), expectedOutput);
  });

  it("should return object of details when the user input is [ -n5, f1, f2 ] ", function() {
    let userArgs = ["-n5", "f1", "f2"];
    let expectedOutput = { option: "line", count: 5, files: ["f1", "f2"] };
    assert.deepEqual(parse(userArgs), expectedOutput);
  });

  it("should return object of details when the user input is [ -c5, f1, f2 ] ", function() {
    let userArgs = ["-c5", "f1", "f2"];
    let expectedOutput = { option: "byte", count: 5, files: ["f1", "f2"] };
    assert.deepEqual(parse(userArgs), expectedOutput);
  });

  it("should return object of details when the user input is [ -c5x, f1, f2 ] ", function() {
    let userArgs = ["-c5x", "f1", "f2"];
    let expectedOutput = { option: "byte", count: "5x", files: ["f1", "f2"] };
    assert.deepEqual(parse(userArgs), expectedOutput);
  });

  it("should return object of details when the user input is [ f1, f2 ] ", function() {
    let userArgs = ["f1", "f2"];
    let expectedOutput = { option: "line", count: 10, files: ["f1", "f2"] };
    assert.deepEqual(parse(userArgs), expectedOutput);
  });

  it("should return object of details when the user input is [ -5, f1, f2 ] ", function() {
    let userArgs = ["-5", "f1", "f2"];
    let expectedOutput = { option: "line", count: "5", files: ["f1", "f2"] };
    assert.deepEqual(parse(userArgs), expectedOutput);
  });

  it("should return object of details when the user input is [ -5x, f1, f2 ] ", function() {
    let userArgs = ["-5x", "f1", "f2"];
    let expectedOutput = { option: "line", count: "5x", files: ["f1", "f2"] };
    assert.deepEqual(parse(userArgs), expectedOutput);
  });

  it("should return object of details when the user input is [ -px, f1, f2 ] ", function() {
    let userArgs = ["-px", "f1", "f2"];
    let expectedOutput = { option: "-p", count: "x", files: ["f1", "f2"] };
    assert.deepEqual(parse(userArgs), expectedOutput);
  });
});

describe('determineOption', function(){
  it('should return line if the option is -n ', function(){
    assert.equal( determineOption('-n'), 'line' );
  });

  it('should return byte if the option is -c ', function(){
    assert.equal( determineOption('-c'), 'byte' );
  });

  it('should return back the option given if it is neither -n nor -c ', function(){
    assert.equal( determineOption('-p'), '-p' );
  });
});