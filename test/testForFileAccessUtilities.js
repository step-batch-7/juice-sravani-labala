const chai = require("chai");
const assert = chai.assert;

const {
  readFile,
  writeFile,
  isFileExist
} = require("../src/fileAccessUtility");

describe("readFile", function() {
  it("Should read given File", function() {
    writeFile("./dataFiles/testFileForRead.json", "hello");
    assert.strictEqual(readFile("./dataFiles/testFileForRead.json"), "hello");
  });
});

describe("writeFile", function() {
  it("Should write to the given file", function() {
    writeFile("./dataFiles/testFileForWrite.json", "hello");
    assert.strictEqual(readFile("./dataFiles/testFileForWrite.json"), "hello");
  });
});

describe("isFileExist", function() {
  it("Should validate if file is present", function() {
    assert.ok(isFileExist("./beverage.js"));
  });
  it("Should validate if file is not present", function() {
    assert.notOk(isFileExist("./noFile"));
  });
});
