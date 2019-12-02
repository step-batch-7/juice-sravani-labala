const chai = require("chai");
const assert = chai.assert;

const validations = require("../src/processOperation");
const { displayMessage } = validations;

describe("displayMessage", function() {
  it("should give 'request failed' if the inputs are not valid", function() {
    const readFile = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return '[{"empId":"1","beverage": "apple", "qty": "2", "date": "01-01-2019" }]';
    };
    const writeFile = function(path, data) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return "";
    };
    const isFileExist = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return false;
    };
    assert.strictEqual(
      displayMessage([], "", "1-2-3", false, isFileExist, readFile, writeFile),
      "request failed"
    );
  });

  it("should give the message formatted for the operation if the inputs are valid", function() {
    const readFile = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return '[{"empId":"1","beverage": "apple", "qty": "2", "date": "2019-01-01" }]';
    };
    const date = function() {
      return new Date("2019-01-01");
    };
    const isFileExist = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return true;
    };
    const writeFile = function(path, data) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return "";
    };
    assert.strictEqual(
      displayMessage(
        ["--query", "--empId", "1"],
        date,
        "./../dataFiles/testingTransactionFileQuery.json",
        true,
        isFileExist,
        readFile,
        writeFile
      ),
      "Employee ID, Beverage, Quantity, Date\n1,apple,2,2019-01-01\nTotal: 2 Juices"
    );
  });
  it("should give the message formatted for the operation if the inputs are valid", function() {
    const readFile = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return '[{"empId":"1","beverage": "apple", "qty": "1", "date": "2019-01-01" }]';
    };
    const date = function() {
      return new Date("2019-01-01");
    };
    const isFileExist = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return true;
    };
    const writeFile = function(path, data) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return "";
    };
    assert.strictEqual(
      displayMessage(
        ["--query", "--empId", "1"],
        date,
        "./../dataFiles/testingTransactionFileQuery.json",
        true,
        isFileExist,
        readFile,
        writeFile
      ),
      "Employee ID, Beverage, Quantity, Date\n1,apple,1,2019-01-01\nTotal: 1 Juice"
    );
  });
});
