const utilities = require("../src/utilities");
let {
  createTransactionDetails,
  sum,
  addNewTransaction,
   getStrigifiedOutput,
  getEmployeeTransaction,
   writeTransactionDetails,
   readTransactionDetails,
  stringToObject,
  objectToString,
  isEmployeeIdPresent,
  stringToNumber,
  isOdd,
  getDate,
  getQueryTransactionDetails,
  splitByTab,
  queryTransactionRecords,
  queryStrigifiedOutput
} = utilities;
const assert = require("assert");
const fs = require("fs");
describe("isEmployeeIdPresent", function() {
  it("should return true if the employee is present in the list", function() {
    assert.strictEqual(isEmployeeIdPresent({ 1: "present" }, "1"), true);
  });
  it("should return false if the employee is not present in the list", function() {
    assert.strictEqual(isEmployeeIdPresent({}, "1"), false);
  });
});
describe("stringToObject", function() {
  it("should convert string to object", function() {
    assert.deepStrictEqual(stringToObject('{"a":1}'), { a: 1 });
  });
});

describe("objectToString", function() {
  it("should convert object to string", function() {
    assert.deepStrictEqual(objectToString({ a: 1 }), '{"a":1}');
  });
});

describe("createTransactionDetails", function() {
  it("should format the given Details to object", function() {
    assert.deepStrictEqual(createTransactionDetails("orange", 2), {
      beverage: "orange",
      quantity: 2,
      date: new Date()
    });
  });
  it("should return an empty valued object if the Details is not given", function() {
    assert.deepStrictEqual(createTransactionDetails(), {
      beverage: undefined,
      quantity: undefined,
      date: new Date()
    });
  });
});

describe("sum", function() {
  it("should return the sum of two values", function() {
    assert.deepStrictEqual(sum(2, 3), 5);
  });
});

describe("getEmployeeTransactions", function() {
  it("should return a strigified Details value of given key", function() {
    assert.deepStrictEqual(
      getEmployeeTransaction("1", { 1: [{ beverage: "apple", quantity: 2 }] }),
      [{ beverage: "apple", quantity: 2 }]
    );
  });
  it("should return an empty array if the employee id is not there", function() {
    assert.deepStrictEqual(getEmployeeTransaction("1", {}), []);
  });
});
/*
describe("getStrigifiedOutput", function() {
  it("should concatenate all values of keys", function() {
    let Details = { beverage: "orange", quantity: 2, date: new Date() };
    assert.deepStrictEqual(
      getStrigifiedOutput({ transactionDetails: "", totalSum: 0 }, Details),
      {
        transactionDetails: "orange\t2" + new Date() + "\n",
        totalSum: 2
      }
    );
  });
});
*/
describe("getStrigifiedOutput", function() {
  it("should concatenate all values of keys", function() {
    let Details = [1,"orange",  2 ];
    assert.deepStrictEqual(
      getStrigifiedOutput(Details),'Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date, Time\n1, orange, 2, '+new Date()
    );
  });
});

describe("readTransactionDetails", function() {
  it("should return the contents present in the file in the form of the object", function() {
    assert.deepStrictEqual(
      readTransactionDetails("./src/transaction.json"),
      fs.readFileSync("./src/transaction.json", "utf8")
    );
  });
});

describe("writeTransactionDetails", function() {
  it("should write the given contents to the file in the form of string", function() {
    let transactionDetails = {
      1: [{ beverage: "apple", quantity: 2 }]
    };
    assert.strictEqual(
      writeTransactionDetails(
        "./src/transaction.json",
        JSON.stringify(transactionDetails)
      ),
      undefined
    );
  });
});

describe("stringToNumber", function() {
  it("should convert the strigified number to number", function() {
    assert.strictEqual(stringToNumber("5"), 5);
  });
});

describe("isOdd", function() {
  it("should return true if the number is true", function() {
    assert.strictEqual(isOdd(3), 1);
  });
  it("should return false if the number is even", function() {
    assert.strictEqual(isOdd(4), 0);
  });
});
describe("addNewTransaction", function() {
  it("should add a new employ id to transaction data", function() {
    assert.deepStrictEqual(addNewTransaction(1, "orange", 1, {}), {
      1: [{ beverage: "orange", quantity: 1, date: new Date() }]
    });
  });
  it("should update an existing employ id with given transactions", function() {
    let data = { 1: [{ beverage: "orange", quantity: 1, date: "123" }] };
    assert.deepStrictEqual(addNewTransaction("1", "apple", 2, data), {
      1: [
        { beverage: "orange", quantity: 1, date: "123" },
        { beverage: "apple", quantity: 2, date: new Date() }
      ]
    });
  });
});
describe("splitByTab", function() {
  it("should split the content by tab", function() {
    assert.deepStrictEqual(splitByTab("123\torange\t3"), [
      "123",
      "orange",
      "3"
    ]);
  });
});
describe("getQueryTransactionDetails", function() {
  it("should give all the transaction details as a single string format as well as number of juices", function() {
    let details = [{ beverage: "apple", quantity: "2" ,date: "123"}];
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
describe("queryStrigifiedOutput", function() {
  let details = { totalJuice: 14, transactionDetails: [["apple", "2", "123"]] };
  it("should return all the transactions as a single string format", function() {
    assert.strictEqual(
      queryStrigifiedOutput(123, details),
      "Employee ID, Beverage, Quantity, Date, Time\n123, apple, 2, 123\nTotal: 14 Juices"
    );
  });
});
