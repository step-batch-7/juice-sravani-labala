const assert = require("assert");

const fs = require("fs");

const fileUtilities = require("../src/fileAccessUtility");
let { readFile, writeFile } = fileUtilities;

describe("readFile", function() {
  it("should return the contents present in the file in the form of the object", function() {
    assert.deepStrictEqual(
      readFile("./src/transaction.json"),
      fs.readFileSync("./src/transaction.json", "utf8")
    );
  });
});

describe("writeFile", function() {
  it("should write the given contents to the file in the form of string", function() {
    let transactionDetails = {
      1: [{ beverage: "apple", quantity: 2 }]
    };
    assert.strictEqual(
      writeFile("./src/transaction.json", JSON.stringify(transactionDetails)),
      undefined
    );
  });
});
