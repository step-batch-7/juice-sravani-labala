const assert = require("assert");

const fs = require("fs");

const fileUtilities = require("../src/fileAccessUtility");
let { readFile, writeFile, isFileExist } = fileUtilities;

describe("readFile", function() {
  it("should return the contents present in the file in the form of the object", function() {
    assert.strictEqual(readFile("./src/testFileForRead.json"), "hello\n");
  });
});

describe("writeFile", function() {
  it("should write the given contents to the file in the form of string", function() {
    writeFile("./src/testFileForWrite.json", "hi");
    assert.strictEqual(readFile("./src/testFileForWrite.json"), "hi");
  });
});

describe("isFileExists", function() {
  it("should validate existing file", function() {
    assert.ok(isFileExist("./src/testFileForRead.json"));
  });
  it("should validate if the file doesn't exist", function() {
    assert.ok(!isFileExist("./src/transact"));
  });
});
