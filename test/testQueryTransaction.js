const chai = require("chai");
const assert = chai.assert;

const {
  queryTransaction,
  queryTransactionRecords,
  getQueryTransactionDetails,
  queryMessageFormatter,
  isGivenOption
} = require("./../src/queryTransaction");

describe("isGivenOption", function() {
  it("should give the filtered option transactions", function() {
    let txnData = [
      { empId: "1", beverage: "apple", qty: "2" },
      { empId: "2", beverage: "orange", qty: "1" }
    ];
    assert.deepStrictEqual(txnData.filter(isGivenOption("empId", "1")), [
      { empId: "1", beverage: "apple", qty: "2" }
    ]);
  });
});

describe("queryTransaction", function() {
  it("should give the empid transaction details if it is present", function() {
    const isFileExist = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return true;
    };
    const readFile = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return '[{"empId":"1","beverage": "apple", "qty": "2", "date": "01-01-2019" }]';
    };
    let expected = {
      totalJuice: 2,
      transactionDetails: ["1,apple,2,01-01-2019"]
    };
    assert.deepStrictEqual(
      queryTransaction(
        ["--empId", "1"],
        "./../dataFiles/testingTransactionFileQuery.json",
        isFileExist,
        readFile
      ),
      expected
    );
  });
  it("should give the beverage transaction details if it is present", function() {
    const isFileExist = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return true;
    };
    const readFile = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return '[{"empId":"1","beverage": "apple", "qty": "2", "date": "01-01-2019" }]';
    };
    let expected = {
      totalJuice: 2,
      transactionDetails: ["1,apple,2,01-01-2019"]
    };
    assert.deepStrictEqual(
      queryTransaction(
        ["--beverage", "apple"],
        "./../dataFiles/testingTransactionFileQuery.json",
        isFileExist,
        readFile
      ),
      expected
    );
  });
  it("should give the date transaction details if it is present", function() {
    const isFileExist = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return true;
    };
    const readFile = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return '[{"empId":"1","beverage": "apple", "qty": "2", "date": "01-01-2019" }]';
    };
    let expected = {
      totalJuice: 2,
      transactionDetails: ["1,apple,2,01-01-2019"]
    };
    assert.deepStrictEqual(
      queryTransaction(
        ["--date", "01-01-2019"],
        "./../dataFiles/testingTransactionFileQuery.json",
        isFileExist,
        readFile
      ),
      expected
    );
  });
});

describe("getQueryTransactionDetails", function() {
  it("should give all the transaction details as a single string format as well as number of juices", function() {
    let details = { empId: "1", beverage: "apple", qty: "2", date: "123" };
    let emptyTransaction = { transactionDetails: "", totalJuices: 0 };
    let actual = getQueryTransactionDetails(emptyTransaction, details);
    assert.deepStrictEqual(actual, {
      transactionDetails: "1,apple,2,123\n",
      totalJuices: 2
    });
  });
});

describe("queryTransactionRecords", function() {
  let details = {
    transactionDetails: "1,apple,2,123\n",
    totalJuices: 14
  };
  it("should give the total number of juices they have taken and transaction in formatted way", function() {
    assert.deepStrictEqual(queryTransactionRecords(details), {
      totalJuice: 14,
      transactionDetails: ["1,apple,2,123"]
    });
  });
});

describe("queryMessageFormatter", function() {
  let details = {
    totalJuice: 14,
    transactionDetails: [["123", "apple", "2", "1-2-3"]]
  };
  it("should format given transactions if the transactions are given", function() {
    assert.strictEqual(
      queryMessageFormatter(details),
      "Employee ID, Beverage, Quantity, Date\n123,apple,2,1-2-3\nTotal: 14 Juices"
    );
  });
  it("should give 'records not found' if no transactions are present", function() {
    assert.strictEqual(queryMessageFormatter(0), "records not found");
  });
});
