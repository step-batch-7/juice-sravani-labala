//const assert = require("assert");
const chai = require("chai");
const assert = chai.assert;
//const fs = require("fs");

const fileUtilities = require("../src/fileAccessUtility");
let { readFile, writeFile, isFileExist } = fileUtilities;

describe("readFile", function() {
  it("should return the contents present in the file in the form of the object", function() {
    assert.strictEqual(readFile("./dataFiles/testFileForRead.json"), "hello\n");
  });
});

describe("writeFile", function() {
  it("should write the given contents to the file in the form of string", function() {
    writeFile("./src/testFileForWrite.json", "hi");
    assert.strictEqual(readFile("./dataFiles/testFileForWrite.json"), "hi");
  });
});

describe("isFileExists", function() {
  it("should validate existing file", function() {
    assert.ok(isFileExist("./dataFiles/testFileForRead.json"));
  });
  it("should validate if the file doesn't exist", function() {
    assert.notOk(isFileExist("./src/transact"));
  });
});
