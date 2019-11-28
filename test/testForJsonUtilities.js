//const assert = require("assert");
const chai = require("chai");
const assert = chai.assert;
const jsonUtilities = require("../src/jsonUtiities");
let { stringToObject, objectToString, dateAndTime } = jsonUtilities;

describe("dateAndTime", function() {
  it("should return the  date and time", function() {
    const actual = dateAndTime();
    const expected = new Date().toJSON();
    assert.strictEqual(actual, expected);
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
