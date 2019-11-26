const assert = require("assert");
const save = require("./../src/saveTransaction").saveTransaction;

const validations = require("./../src/validatingInputs");

const {
  getObjectFromArray,
  getNumeric,
  getConvertedInput,
  inputValidation
} = validations;

describe("getObjectFromArray", function() {
  it("should give an object by taking alternative elements as keys and value", function() {
    assert.deepStrictEqual(getObjectFromArray(["a", "A", "b", "B", "c", "C"]), {
      a: "A",
      b: "B",
      c: "C"
    });
  });

  it("it should return an empty object if the given array is empty", function() {
    assert.deepStrictEqual(getObjectFromArray([]), {});
  });
});

describe("getNumeric", function() {
  it("should return the numeric value of the given string", function() {
    assert.strictEqual(getNumeric("1111"), 1111);
  });
});

describe("getConvertedInput", function() {
  it("should return an array by converting the operation to corresponding func references and qty to numeric", function() {
    let date = new Date();
    let convertedDate = date.toJSON();
    assert.deepStrictEqual(
      getConvertedInput(
        ["--save", "--empId", "1111", "--beverage", "orange", "--qty", "2"],
        date
      ),
      [
        save,
        {
          "--empId": "1111",
          "--beverage": "orange",
          "--qty": 2,
          "--date": convertedDate
        }
      ]
    );
  });
});
