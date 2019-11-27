const assert = require("assert");
const save = require("./../src/saveTransaction");
let { saveTransaction, saveMessageFormatter } = save;

const fileAccess = require("./../src/fileAccessUtility");
let { readFile, writeFile, isFileExist } = fileAccess;

describe("saveTransaction", function() {
  it("should add the new transaction to the existing transaction", function() {
    let expected = {
      beverage: "apple",
      date: new Date().toJSON(),
      empId: "1",
      qty: "2"
    };
    assert.deepStrictEqual(
      saveTransaction(
        {
          "--empId": "1",
          "--beverage": "apple",
          "--qty": "2",
          "--date": new Date().toJSON()
        },
        "./test/testingTransactionFileForSave.json",
        isFileExist,
        readFile,
        writeFile
      ),
      expected
    );
  });
});

describe("saveMessageFormatter", function() {
  let date = new Date();
  it("should concatenate all values of keys", function() {
    let Details = { empId: 1, beverage: "orange", qty: 2, date: date.toJSON() };
    assert.deepStrictEqual(
      saveMessageFormatter(Details),
      "Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date, Time\n1, orange, 2, " +
        date.toJSON()
    );
  });
});
