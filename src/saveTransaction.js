const utilities = require("./utilities");
let { addNewTransaction, createTransactionDetails } = utilities;

const jsonUtilities = require("./jsonUtiities");
let { objectToString, stringToObject } = jsonUtilities;

//const fileAccess = require("./fileAccessUtility");
//let { readFile, writeFile, isFileExist } = fileAccess;

const saveMessageFormatter = function(data) {
  let stringifiedData = "Transaction Recorded:\n";
  stringifiedData =
    stringifiedData + "Employee ID, Beverage, Quantity, Date, Time\n";
  stringifiedData =
    stringifiedData +
    data["empId"] +
    ", " +
    data["beverage"] +
    ", " +
    data["qty"] +
    ", " +
    data["date"];
  return stringifiedData;
};

const saveTransaction = function(
  userInputs,
  path,
  isFileExist,
  readFile,
  writeFile
) {
  let employeeId = userInputs["--empId"];
  let beverage = userInputs["--beverage"];
  let quantity = userInputs["--qty"];
  let date = userInputs["--date"];
  let transactionDatabase = {};
  if (isFileExist(path)) {
    let transactionFile = readFile(path);
    transactionDatabase = stringToObject(transactionFile);
  }
  addNewTransaction(employeeId, beverage, quantity, date, transactionDatabase);
  transactionDatabase = objectToString(transactionDatabase);
  writeFile(path, transactionDatabase);
  let transactionRecorded = {
    empId: employeeId,
    beverage: beverage,
    qty: quantity,
    date: date
  };

  return transactionRecorded;
};

exports.saveTransaction = saveTransaction;
exports.saveMessageFormatter = saveMessageFormatter;
