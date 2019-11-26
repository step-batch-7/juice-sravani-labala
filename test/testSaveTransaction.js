const assert = require("assert");
const saveTransaction = require("./../src/saveTransaction").saveTransaction;
describe("saveTransaction", function() {
  it("should add the new transaction to the existing transaction", function() {
    let expected =
      "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date, Time\n1, apple, 2, " +
      new Date().toJSON();
    assert.strictEqual(
      saveTransaction(
        {
          "--empId": "1",
          "--beverage": "apple",
          "--qty": "2",
          "--date": new Date().toJSON()
        },
        "./test/testingTransactionFileForSave.json"
      ),
      expected
    );
  });
});
