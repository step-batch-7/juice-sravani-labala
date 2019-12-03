const chai = require("chai");
const assert = chai.assert;

const isInputsValid = require("./../src/inputChecking").isInputsValid;

describe("isInputsValid", function() {
  it("should give false if the operation is not valid", function() {
    assert.notOk(
      isInputsValid(["save", "empId", "1", "beverage", "apple", "qty", "2"])
    );
  });

  it("should give true if the user inputs are valid for save", function() {
    assert.ok(
      isInputsValid([
        "--save",
        "--empId",
        "1",
        "--beverage",
        "apple",
        "--qty",
        "1"
      ])
    );
  });

  it("should give true if the user inputs consisting of empId is valid for query", function() {
    assert.ok(isInputsValid(["--query", "--empId", "1"]));
  });

  it("should give true if the user inputs consisting of beverage is valid for query", function() {
    assert.ok(isInputsValid(["--query", "--beverage", "apple"]));
  });

  it("should give false if query operation inputs are not valid", function() {
    assert.notOk(isInputsValid(["--query", "--empId", "-123"]));
  });

  it("should give false if save operation inputs are not valid", function() {
    assert.notOk(
      isInputsValid([
        "--save",
        "--qty",
        "-2",
        "--empId",
        "2",
        "--beverage",
        "apple"
      ])
    );
  });
});
