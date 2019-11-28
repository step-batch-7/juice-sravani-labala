const utilities = require("../src/utilities");
let {
  createTransactionDetails,
  sum,
  addNewTransaction,
  stringToNumber,
  isOdd,
  splitByTab,
  isEqual,
  isInclude,
  isNumeric,
  getNumeric,
  isPositiveNumeric
} = utilities;
const chai = require("chai");
const assert = chai.assert;
//const assert = require("assert");

describe("getNumeric", function() {
  it("should return the corresponding number if it is numeric", function() {
    assert.strictEqual(getNumeric("2"), 2);
  });
  it("should return 'not a number' if it is not a numeric", function() {
    assert.isNaN(getNumeric("a"), NaN);
  });
});

describe("isPositiveNumeric", function() {
  it("should return true if it a positve numeric number", function() {
    assert.ok(isPositiveNumeric(2));
  });
  it("should return false if the value is less than zero", function() {
    assert.notOk(isPositiveNumeric(-2));
  });
});

describe("isInclude", function() {
  it("should return true if the value is present in the array", function() {
    assert.ok(isInclude([1, 2], 2));
  });
  it("should return false if the value is not included in the array", function() {
    assert.notOk(isInclude([1, 2], 3));
  });
});

describe("isEqual", function() {
  it("should return true if both the values are equal", function() {
    assert.ok(isEqual("1", "1"));
  });
  it("should return false if both values are not equal", function() {
    assert.notOk(isEqual("1", 1));
  });
});

describe("isNumeric", function() {
  it("should return true if the value is string of numeric", function() {
    assert.ok(isNumeric(2));
  });
  it("should return false if the value is not numeric in the form of string", function() {
    assert.notOk(isNumeric("2w"));
  });
});

describe("sum", function() {
  it("should return the sum of two values", function() {
    assert.strictEqual(sum(2, 3), 5);
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

describe("splitByTab", function() {
  it("should split the content by tab", function() {
    assert.deepStrictEqual(splitByTab("123\torange\t3"), [
      "123",
      "orange",
      "3"
    ]);
  });
});

describe("createTransactionDetails", function() {
  it("should format the given Details to object", function() {
    let date = "123";
    assert.deepStrictEqual(createTransactionDetails(1, "orange", 2, date), {
      empId: 1,
      beverage: "orange",
      quantity: 2,
      date: date
    });
  });
  it("should return an empty valued object if the Details is not given", function() {
    assert.deepStrictEqual(createTransactionDetails(), {
      empId: undefined,
      beverage: undefined,
      quantity: undefined,
      date: undefined
    });
  });
});

describe("addNewTransaction", function() {
  it("should add a new employ id to transaction data", function() {
    //let date = new Date();
    let date = "1-2-3";
    assert.deepStrictEqual(addNewTransaction(1, "orange", 1, date, []), [
      { empId: 1, beverage: "orange", quantity: 1, date: date }
    ]);
  });
  it("should update an existing employ id with given transactions", function() {
    let data = [{ empId: 1, beverage: "orange", quantity: 1, date: "123" }];
    //let date = new Date();
    let date = "1-2-3";
    assert.deepStrictEqual(addNewTransaction(1, "apple", 2, date, data), [
      { empId: 1, beverage: "orange", quantity: 1, date: "123" },
      { empId: 1, beverage: "apple", quantity: 2, date: date }
    ]);
  });
});
