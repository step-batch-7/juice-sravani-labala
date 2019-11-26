const utilities = require("./utilities");
let {
  getEmployeeTransaction,
  queryTransactionRecords,
  queryStrigifiedOutput,
  getQueryTransactionDetails
} = utilities;

const jsonUtilities = require("./jsonUtiities");
let { stringToObject } = jsonUtilities;

const fileAccess = require("./fileAccessUtility");
let { readFile } = fileAccess;

const queryTransaction = function(userInput, path) {
  //let employeeId = userInput[2];
  let employeeId = userInput["--empId"];

  let transactionFile = readFile(path);
  let transactionDatabase = stringToObject(transactionFile);
  let currentEmployeeTransactions = getEmployeeTransaction(
    employeeId,
    transactionDatabase
  );
  let concattedEmployeeTransactions = currentEmployeeTransactions.reduce(
    getQueryTransactionDetails,
    {
      transactionDetails: "",
      totalSum: 0
    }
  );
  let records = queryTransactionRecords(concattedEmployeeTransactions);
  let messageFormatted = queryStrigifiedOutput(employeeId, records);
  return messageFormatted;
};

exports.queryTransaction = queryTransaction;
