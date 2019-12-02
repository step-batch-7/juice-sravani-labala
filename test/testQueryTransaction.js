//const assert = require("assert");
const chai = require("chai");
const assert = chai.assert;
const query = require("./../src/queryTransaction");
let {
  queryTransaction,
  queryTransactionRecords,
  getQueryTransactionDetails,
  queryMessageFormatter
} = query;

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
      return '[{"empId":"1","beverage": "apple", "quantity": "2", "date": "01-01-2019" }]';
    };
    let expected = {
      totalJuice: 2,
      transactionDetails: [["1,apple,2,01-01-2019"]]
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
  it("should validate if the file is not present", function() {
    const isFileExist = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return false;
    };
    const readFile = function(path) {
      assert.strictEqual(
        "./../dataFiles/testingTransactionFileQuery.json",
        path
      );
      return "";
    };

    assert.strictEqual(
      queryTransaction(
        { "--empId": "1" },
        "./../dataFiles/testingTransactionFileQuery.json",
        isFileExist,
        readFile
      ),
      0
    );
  });
});

describe("getQueryTransactionDetails", function() {
  it("should give all the transaction details as a single string format as well as number of juices", function() {
    let details = [{ empId: 1, beverage: "apple", quantity: "2", date: "123" }];
    assert.deepStrictEqual(
      details.reduce(getQueryTransactionDetails, {
        transactionDetails: "",
        totalSum: 0
      }),
      { transactionDetails: "1,apple,2,123,\n", totalSum: 2 }
    );
  });
});

describe("queryTransactionRecords", function() {
  let details = {
    transactionDetails: "1,apple,2,123,\n",
    totalSum: 14
  };
  it("should return the total number of juices they have taken and transaction in formatted way", function() {
    assert.deepStrictEqual(queryTransactionRecords(details), {
      totalJuice: 14,
      transactionDetails: [["1,apple,2,123"]]
    });
  });
});

describe("queryMessageFormatter", function() {
  let details = {
    totalJuice: 14,
    transactionDetails: [["123", "apple", "2", "1-2-3"]]
  };
  // let expectedInput = [details];
  it("should format given transactions if the transactions are given", function() {
    assert.strictEqual(
      queryMessageFormatter(details),
      "Employee ID, Beverage, Quantity, Date, Time\n123,apple,2,1-2-3\nTotal:14 Juices"
    );
  });
  it("should return 'records not found' if no transactions are present", function() {
    assert.strictEqual(queryMessageFormatter(0), "records not found");
  });
});
