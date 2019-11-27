const assert = require("assert");
const save = require("../src/saveTransaction").saveTransaction;

const fileAccess = require("./../src/fileAccessUtility");
let { readFile, writeFile, isFileExist } = fileAccess;

const validations = require("../src/processOperation");

const {
  getObjectFromArray,
  getNumeric,
  getConvertedInput,
  inputValidation
} = validations;

describe("inputValidation", function() {
  it("should return 'request failed' if the inputs are not valid", function() {
    assert.strictEqual(
      inputValidation([], "", false, isFileExist, readFile, writeFile),
      "request failed"
    );
  });
  it("should return the message formatted for the operation if the inputs are valid", function() {
    assert.strictEqual(
      inputValidation(
        ["--query", "--empId", "1"],
        "./test/testingTransactionFileQuery.json",
        true,
        isFileExist,
        readFile,
        writeFile
      ),
      "Employee ID, Beverage, Quantity, Date, Time\n1, apple, 2, 01-01-2019\nTotal: 2 Juices"
    );
  });
});

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
