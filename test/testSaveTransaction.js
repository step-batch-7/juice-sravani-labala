const chai = require("chai");
const assert = chai.assert;

const {
  saveTransaction,
  saveMessageFormatter,
  getNewTxnRecord
} = require("./../src/saveTransaction");

describe("saveTransaction", function() {
  it("should add the new transaction to the existing transaction if file present", function() {
    const readFile = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileForSave.json",
        path
      );
      return `[{"empId":"1","beverage":"orange","qty":"3","date":"2019-01-01"}]`;
    };
    const isFileExist = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileForSave.json",
        path
      );
      return true;
    };
    const writeFile = function(path, data) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileForSave.json",
        path
      );
      assert.strictEqual(
        data,
        `[{"empId":"1","beverage":"orange","qty":"3","date":"2019-01-01"},{"empId":"1","beverage":"apple","qty":"2","date":"${new Date(
          "1234-11-29"
        ).toJSON()}"}]`
      );
      return "";
    };
    let date = function() {
      return new Date("1234-11-29");
    };

    let expected = {
      beverage: "apple",
      date: new Date("1234-11-29"),
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
    const writeFile = function(path, data) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileForSave.json",
        path
      );
      assert.strictEqual(
        data,
        `[{"empId":"1","beverage":"apple","qty":"2","date":"${new Date(
          "1234-11-29"
        ).toJSON()}"}]`
      );
      return "";
    };
    let date = function() {
      return new Date("1234-11-29");
    };
    let expected = {
      beverage: "apple",
      date: new Date("1234-11-29"),
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
  let date = function() {
    return new Date("123");
  };
  it("should concatenate all values of keys", function() {
    let Details = { empId: 1, beverage: "orange", qty: 2, date: date() };
    assert.strictEqual(
      saveMessageFormatter(Details),
      "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date\n1,orange,2," +
        date().toJSON()
    );
  });
});

describe("getNewTxnRecord", function() {
  it("should give the new transaction details in the form of object", function() {
    let date = function() {
      return new Date("123");
    };
    let newTransaction = ["--empId", "2", "--qty", "3", "--beverage", "apple"];
    let expected = {
      empId: "2",
      beverage: "apple",
      qty: "3",
      date: date()
    };
    assert.deepStrictEqual(getNewTxnRecord(newTransaction, date), expected);
  });
});
