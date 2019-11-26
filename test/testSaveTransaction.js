const assert = require("assert");
const saveTransaction = require("./../src/saveTransaction").saveTransaction;
describe("saveTransaction", function() {
  it("should add the new transaction to the existing transaction", function() {
    let expected =
      "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date, Time\n1, apple, 2, " +
      (new Date()).toJSON();
    assert.strictEqual(
      saveTransaction(
        ["--save", "empid", "1", "beverage", "apple", "quantity", "2"],
        "./test/testingTransactionFileForSave.json"
      ),
      expected
    );
  });
});

