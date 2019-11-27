const utilities = require("./utilities");
let { getEmployeeTransaction, stringToNumber, sum, splitByTab } = utilities;

const jsonUtilities = require("./jsonUtiities");
let { stringToObject } = jsonUtilities;

//const fileAccess = require("./fileAccessUtility");
//let { readFile, isFileExist } = fileAccess;

const getQueryTransactionDetails = function(queryTransactionList, transaction) {
  queryTransactionList["transactionDetails"] +=
    transaction["beverage"] +
    "\t" +
    transaction["quantity"] +
    "\t" +
    transaction["date"] +
    "\n";
  queryTransactionList["totalSum"] += transaction["quantity"] + " ";
  return queryTransactionList;
};

const queryTransactionRecords = function(data) {
  let juiceRecords = data["totalSum"];
  let transactionDetails = data["transactionDetails"];

  juiceRecords = juiceRecords.split(" ");
  juiceRecords.pop();
  juiceRecords = juiceRecords.map(stringToNumber);
  juiceRecords = juiceRecords.reduce(sum, 0);
  transactionDetails = transactionDetails.split("\n");
  transactionDetails = transactionDetails.map(splitByTab);
  transactionDetails.pop();
  return { totalJuice: juiceRecords, transactionDetails: transactionDetails };
};

const queryMessageFormatter = function(transactionDetails) {
  if (!transactionDetails) {
    return "records not found";
  }
  let employeeId = transactionDetails[0];
  let data = transactionDetails[1];
  let detailsOfTransaction = data["transactionDetails"];
  let strigifiedData = "Employee ID, Beverage, Quantity, Date, Time\n";
  for (let index = 0; index < detailsOfTransaction.length; index++) {
    strigifiedData =
      strigifiedData +
      employeeId +
      ", " +
      detailsOfTransaction[index][0] +
      ", " +
      detailsOfTransaction[index][1] +
      ", " +
      detailsOfTransaction[index][2] +
      "\n";
  }
  strigifiedData = strigifiedData + "Total: " + data["totalJuice"] + " Juices";
  return strigifiedData;
};

const queryTransaction = function(userInput, path, isFileExist, readFile) {
  let employeeId = userInput["--empId"];
  if (!isFileExist(path)) {
    return 0;
  }
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
  return [employeeId, records];
};

exports.queryTransaction = queryTransaction;
exports.queryMessageFormatter = queryMessageFormatter;
exports.getQueryTransactionDetails = getQueryTransactionDetails;
exports.queryTransactionRecords = queryTransactionRecords;
