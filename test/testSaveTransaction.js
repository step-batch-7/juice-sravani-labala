//const assert = require("assert");
const chai = require("chai");
const assert = chai.assert;
const save = require("./../src/saveTransaction");
let { saveTransaction, saveMessageFormatter } = save;

describe("saveTransaction", function() {
  it("should add the new transaction to the existing transaction if file present", function() {
    const readFile = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileForSave.json",
        path
      );
      return "[]";
    };
    const isFileExist = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileForSave.json",
        path
      );
      return true;
    };
    const writeFile = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileForSave.json",
        path
      );
      return "";
    };
    let date = "123";
    let expected = {
      beverage: "apple",
      date: "123",
      empId: "1",
      qty: "2"
    };
    assert.deepStrictEqual(
      saveTransaction(
        ["--empId", "1", "--beverage", "apple", "--qty", "2", "--date", "123"],
        "./../dataFiles/testingTransactionFileForSave.json",
        isFileExist,
        readFile,
        writeFile,
        date
      ),
      expected
    );
  });
  it("should add the new transaction to the existing transaction if file not present", function() {
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
    const writeFile = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileForSave.json",
        path
      );
      return "";
    };
    let date = "123";
    let expected = {
      beverage: "apple",
      date: "123",
      empId: "1",
      qty: "2"
    };
    assert.deepStrictEqual(
      saveTransaction(
        ["--empId", "1", "--beverage", "apple", "--qty", "2"],
        "./../dataFiles/testingTransactionFileForSave.json",
        isFileExist,
        readFile,
        writeFile,
        date
      ),
      expected
    );
  });
});

describe("saveMessageFormatter", function() {
  let date = "123";
  it("should concatenate all values of keys", function() {
    let Details = { empId: 1, beverage: "orange", qty: 2, date: date };
    assert.strictEqual(
      saveMessageFormatter(Details),
      "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date, Time\n1, orange, 2, " +
        date
    );
  });
});
