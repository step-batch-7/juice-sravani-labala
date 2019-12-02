const jsonUtilities = require("./jsonUtiities");
let { stringToObject } = jsonUtilities;

const addNewTransaction = function(newRecord, transactionDatabase) {
  transactionDatabase.push(newRecord);
  return transactionDatabase;
};

const splitByTab = function(data) {
  return data.split("\t");
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

exports.getPreviousTxns = getPreviousTxns;
exports.getNumeric = getNumeric;
exports.isPositiveNumeric = isPositiveNumeric;
exports.isNumeric = isNumeric;
exports.isEqual = isEqual;
exports.isInclude = isInclude;
exports.addNewTransaction = addNewTransaction;
exports.splitByTab = splitByTab;
