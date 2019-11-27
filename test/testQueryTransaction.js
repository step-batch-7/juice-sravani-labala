const assert = require("assert");
const query = require("./../src/queryTransaction");
let {
  queryTransaction,
  queryTransactionRecords,
  getQueryTransactionDetails,
  queryMessageFormatter
} = query;

describe("queryTransaction", function() {
  it("should give the empid transaction details if it is present", function() {
    "Employee ID, Beverage, Quantity, Date, Time\n1, apple, 2, 01-01-2019\nTotal: 2 Juices";
    let expected = [
      "1",
      { totalJuice: 2, transactionDetails: [["apple", "2", "01-01-2019"]] }
    ];
    assert.deepStrictEqual(
      queryTransaction(
        { "--empId": "1" },
        "./test/testingTransactionFileQuery.json"
      ),
      expected
    );
  });
});

describe("getQueryTransactionDetails", function() {
  it("should give all the transaction details as a single string format as well as number of juices", function() {
    let details = [{ beverage: "apple", quantity: "2", date: "123" }];
    assert.deepStrictEqual(
      details.reduce(getQueryTransactionDetails, {
        transactionDetails: "",
        totalSum: 0
      }),
      { transactionDetails: "apple\t2\t123\n", totalSum: "02 " }
    );
  });
});

describe("queryTransactionRecords", function() {
  let details = {
    transactionDetails: "apple\t2\t123\n",
    totalSum: "02 3 4 5 "
  };
  it("should return the total number of juices they have taken and transaction in formatted way", function() {
    assert.deepStrictEqual(queryTransactionRecords(details), {
      totalJuice: 14,
      transactionDetails: [["apple", "2", "123"]]
    });
  });
});

describe("queryMessageFormatter", function() {
  let details = { totalJuice: 14, transactionDetails: [["apple", "2", "123"]] };
  let expectedInput = [123, details];
  it("should return all the transactions as a single string format", function() {
    assert.strictEqual(
      queryMessageFormatter(expectedInput),
      "Employee ID, Beverage, Quantity, Date, Time\n123, apple, 2, 123\nTotal: 14 Juices"
    );
  });
});
