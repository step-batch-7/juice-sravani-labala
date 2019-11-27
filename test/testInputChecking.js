const isInputsValid = require("./../src/inputChecking").isInputsValid;
const assert = require("assert");

describe("isInputsValid", function() {
  it("should return false if the operation is not valid", function() {
    assert.strictEqual(
      isInputsValid(["save", "empId", "1", "beverage", "apple", "qty", "2"]),
      false
    );
  });

  it("should return true if the user inputs are valid for save", function() {
    assert.strictEqual(
      isInputsValid([
        "--save",
        "--empId",
        "1",
        "--beverage",
        "apple",
        "--qty",
        "1"
      ]),
      true
    );
  });

  it("should return true if the user inputs are valid for query", function() {
    assert.strictEqual(isInputsValid(["--query", "--empId", "1"]), true);
  });

  it("should return false if query operation inputs are not valid", function() {
    assert.strictEqual(isInputsValid(["--query", "--empId", "-123"]), false);
  });

  it("should return false if save operation inputs are not valid", function() {
    assert.strictEqual(
      isInputsValid([
        "--save",
        "--qty",
        "-2",
        "--empId",
        "2",
        "--beverage",
        "apple"
      ]),
      false
    );
  });
});
