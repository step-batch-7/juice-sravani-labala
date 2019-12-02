const chai = require("chai");
const assert = chai.assert;
const jsonUtilities = require("../src/jsonUtiities");
let { stringToObject, objectToString } = jsonUtilities;

describe("stringToObject", function() {
  it("should convert the given string to object", function() {
    assert.deepStrictEqual(stringToObject('{"a":1}'), { a: 1 });
  });
});

describe("objectToString", function() {
  it("should convert the given object to string", function() {
    assert.deepStrictEqual(objectToString({ a: 1 }), '{"a":1}');
  });
});
