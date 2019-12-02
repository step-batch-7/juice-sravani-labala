const utilities = require("../src/utilities");
let {
  addNewTransaction,
  splitByTab,
  isEqual,
  isInclude,
  isNumeric,
  getNumeric,
  isPositiveNumeric,
  getPreviousTxns
} = utilities;
const chai = require("chai");
const assert = chai.assert;

describe("getPreviousTxns", function() {
  it("should give previous txns database if it exists", function() {
    const readFile = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileForSave.json",
        path
      );
      return "[123]";
    };
    const isFileExist = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileForSave.json",
        path
      );
      return true;
    };
    assert.deepStrictEqual(
      getPreviousTxns(
        isFileExist,
        readFile,
        "./../dataFiles/testingTransactionFileForSave.json"
      ),
      [123]
    );
  });
  it("should give empty array if previous txns database doesn't exists", function() {
    const readFile = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileForSave.json",
        path
      );
      return "";
    };
    const isFileExist = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileForSave.json",
        path
      );
      return false;
    };
    assert.deepStrictEqual(
      getPreviousTxns(
        isFileExist,
        readFile,
        "./../dataFiles/testingTransactionFileForSave.json"
      ),
      []
    );
  });
});

describe("getNumeric", function() {
  it("should give the corresponding number if it is numeric", function() {
    assert.strictEqual(getNumeric("2"), 2);
  });
  it("should give 'not a number' if it is not a numeric", function() {
    assert.isNaN(getNumeric("a"), NaN);
  });
});

describe("isPositiveNumeric", function() {
  it("should give true if it a positve numeric number", function() {
    assert.ok(isPositiveNumeric(2));
  });
  it("should give false if the value is less than zero", function() {
    assert.notOk(isPositiveNumeric(-2));
  });
});

describe("isInclude", function() {
  it("should give true if the value is present in the array", function() {
    assert.ok(isInclude([1, 2], 2));
  });
  it("should give false if the value is not included in the array", function() {
    assert.notOk(isInclude([1, 2], 3));
  });
});

describe("isEqual", function() {
  it("should give true if both the values are equal", function() {
    assert.ok(isEqual("1", "1"));
  });
  it("should give false if both values are not equal", function() {
    assert.notOk(isEqual("1", 1));
  });
});

describe("isNumeric", function() {
  it("should give true if the value is string of numeric", function() {
    assert.ok(isNumeric(2));
  });
  it("should give false if the value is not numeric in the form of string", function() {
    assert.notOk(isNumeric("2w"));
  });
});

describe("splitByTab", function() {
  it("should split the content by tab", function() {
    assert.deepStrictEqual(splitByTab("123\torange\t3"), [
      "123",
      "orange",
      "3"
    ]);
  });
});

describe("addNewTransaction", function() {
  it("should add a new employ id to transaction data", function() {
    let date = "1-2-3";
    let newRecord = { empId: "1", beverage: "orange", qty: "2", date: date };
    assert.deepStrictEqual(addNewTransaction(newRecord, []), [
      { empId: "1", beverage: "orange", qty: "2", date: date }
    ]);
  });
  it("should update an existing employ id with given transactions", function() {
    let data = [{ empId: "1", beverage: "orange", qty: "1", date: "123" }];
    let date = "1-2-3";
    let newRecord = { empId: "1", beverage: "apple", qty: "2", date: date };
    assert.deepStrictEqual(addNewTransaction(newRecord, data), [
      { empId: "1", beverage: "orange", qty: "1", date: "123" },
      { empId: "1", beverage: "apple", qty: "2", date: date }
    ]);
  });
});
