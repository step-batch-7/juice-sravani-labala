const assert = require("assert");

const jsonUtilities = require("../src/jsonUtiities");
let { stringToObject, objectToString } = jsonUtilities;

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
