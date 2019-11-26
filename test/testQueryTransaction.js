const assert = require("assert");
const queryTransaction = require("./../src/queryTransaction").queryTransaction;
describe("queryTransaction", function() {
  it("should give the empid transaction details if it is present", function() {
    let expected =
      "Employee ID, Beverage, Quantity, Date, Time\n1, apple, 2, 01-01-2019\nTotal: 2 Juices";
    assert.strictEqual(
      queryTransaction(["--query", "empid", "1"], "./test/testingTransactionFileQuery.json"),
      expected
    );
  });
});

