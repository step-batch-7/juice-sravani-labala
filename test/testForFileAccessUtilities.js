const chai = require("chai");
const assert = chai.assert;

const fileUtilities = require("../src/fileAccessUtility");
let { readFile, writeFile, isFileExist } = fileUtilities;

describe("readFile", function() {
  it("should give the contents present in the file in the form of the object", function() {
    assert.strictEqual(readFile("./dataFiles/testFileForRead.json"), "hello\n");
  });
});

describe("writeFile", function() {
  it("should write the given contents to the file in the form of string", function() {
    writeFile("./dataFiles/testFileForWrite.json", "hi");
    assert.strictEqual(readFile("./dataFiles/testFileForWrite.json"), "hi");
  });
});

describe("isFileExists", function() {
  it("should give true if the given file exist", function() {
    assert.ok(isFileExist("./dataFiles/testFileForRead.json"));
  });
  it("should give false if the file doesn't exist", function() {
    assert.notOk(isFileExist("./src/transact"));
  });
});
