const utilities = require("./utilities");
let { addNewTransaction, getStrigifiedOutput } = utilities;

const jsonUtilities = require("./jsonUtiities");
let { objectToString, stringToObject } = jsonUtilities;

const fileAccess = require("./fileAccessUtility");
let { readFile, writeFile } = fileAccess;

const saveTransaction = function(userInputs, path) {
  //let employeeId = userInputs[2];
  //let beverage = userInputs[4];
  //let quantity = userInputs[6];
  //let date = new Date();
  let employeeId = userInputs["--empId"];
  let beverage = userInputs["--beverage"];
  let quantity = userInputs["--qty"];
  let date = userInputs["--date"];

  let transactionFile = readFile(path);
  let transactionDatabase = stringToObject(transactionFile);
  addNewTransaction(employeeId, beverage, quantity, date, transactionDatabase);
  transactionDatabase = objectToString(transactionDatabase);
  writeFile(path, transactionDatabase);
  return getStrigifiedOutput([employeeId, beverage, quantity, date]);
};

exports.saveTransaction = saveTransaction;
