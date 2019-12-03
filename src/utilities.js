const { stringToObject } = require("./jsonUtiities");

const addNewTransaction = function(newRecord, transactionDatabase) {
  transactionDatabase.push(newRecord);
  return transactionDatabase;
};

const isEqual = function(value1, value2) {
  return value1 === value2;
};

const isInclude = function(array, value) {
  return array.includes(value);
};

const isNumeric = function(value) {
  return Number.isInteger(+value);
};

const getNumeric = function(value) {
  return Number(value);
};

const isPositiveNumeric = function(value) {
  return getNumeric(value) > 0;
};

const getPreviousTxns = function(isFileExist, readFile, path) {
  let transactionDatabase = [];
  if (isFileExist(path)) {
    let transactionFile = readFile(path);
    transactionDatabase = stringToObject(transactionFile);
  }
  return transactionDatabase;
};

module.exports = {
  getPreviousTxns,
  getNumeric,
  isPositiveNumeric,
  isNumeric,
  isEqual,
  isInclude,
  addNewTransaction
};
