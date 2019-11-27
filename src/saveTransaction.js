const utilities = require("./utilities");
let { addNewTransaction, createTransactionDetails } = utilities;

const jsonUtilities = require("./jsonUtiities");
let { objectToString, stringToObject } = jsonUtilities;

const fileAccess = require("./fileAccessUtility");
let { readFile, writeFile } = fileAccess;

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

const saveTransaction = function(userInputs, path) {
  let employeeId = userInputs["--empId"];
  let beverage = userInputs["--beverage"];
  let quantity = userInputs["--qty"];
  let date = userInputs["--date"];

  let transactionFile = readFile(path);
  let transactionDatabase = stringToObject(transactionFile);
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
