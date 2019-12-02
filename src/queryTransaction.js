const utilities = require("./utilities");
let { splitByTab } = utilities;
const getPreviousTxns = require("./utilities").getPreviousTxns;
const jsonUtilities = require("./jsonUtiities");
let { stringToObject } = jsonUtilities;

const getQueryTransactionDetails = function(queryTransactionList, transaction) {
  queryTransactionList.transactionDetails += [
    transaction.empId,
    transaction.beverage,
    transaction.qty,
    transaction.date,
    "\n"
  ];
  queryTransactionList.totalSum += +transaction.qty;
  return queryTransactionList;
};

const queryTransactionRecords = function(data) {
  let juiceRecords = data.totalSum;
  let transactionDetails = data.transactionDetails;
  transactionDetails = transactionDetails.split(",\n");
  transactionDetails = transactionDetails.map(splitByTab);
  transactionDetails.pop();
  return { totalJuice: juiceRecords, transactionDetails: transactionDetails };
};

const queryMessageFormatter = function(transactionDatabase) {
  if (!transactionDatabase) {
    return `records not found`;
  }
  const totalJuice = transactionDatabase.totalJuice;
  const values = transactionDatabase.transactionDetails;
  const juiceString = totalJuice == 1 ? "Juice" : "Juices";
  const strigifiedData = `Employee ID, Beverage, Quantity, Date\n${values.join(
    "\n"
  )}\nTotal: ${totalJuice} ${juiceString}`;
  return strigifiedData;
};

const isGivenOption = function(searchKey, searchedFor) {
  return function(obj) {
    let txnOption = obj[searchKey];
    if (searchKey == "date") {
      txnOption = txnOption.slice(0, 10);
    }
    return searchedFor == txnOption;
  };
};
const getFilteredEmpTxns = function(userInput, transactionDatabase) {
  const indexOfEmpId = userInput.indexOf("--empId");
  const employeeId = userInput[indexOfEmpId + 1];
  let filteredEmpTxns = transactionDatabase;
  if (userInput.includes("--empId")) {
    filteredEmpTxns = transactionDatabase.filter(
      isGivenOption("empId", employeeId)
    );
  }
  return filteredEmpTxns;
};

const getFilteredBeverageTxns = function(userInput, filteredEmpTxns) {
  const indexOfBeverage = userInput.indexOf("--beverage");
  const beverageName = userInput[indexOfBeverage + 1];
  let filteredBeverageTxns = filteredEmpTxns;
  if (userInput.includes("--beverage")) {
    const beverageFinder = isGivenOption("beverage", beverageName);
    filteredBeverageTxns = filteredEmpTxns.filter(beverageFinder);
  }
  return filteredBeverageTxns;
};

const getFilteredDateTxns = function(userInput, filteredBeverageTxns) {
  const indexOfDate = userInput.indexOf("--date");
  const date = userInput[indexOfDate + 1];
  let filteredDateTxns = filteredBeverageTxns;
  if (userInput.includes("--date")) {
    dateFinder = isGivenOption("date", date);
    filteredDateTxns = filteredBeverageTxns.filter(dateFinder);
  }
  return filteredDateTxns;
};

const queryTransaction = function(userInput, path, isFileExist, readFile) {
  let transactionDatabase = getPreviousTxns(isFileExist, readFile, path);

  const filteredEmpTxns = getFilteredEmpTxns(userInput, transactionDatabase);
  const filteredBeverageTxns = getFilteredBeverageTxns(
    userInput,
    filteredEmpTxns
  );
  const filteredDateTxns = getFilteredDateTxns(userInput, filteredBeverageTxns);

  const concattedEmployeeTransactions = filteredDateTxns.reduce(
    getQueryTransactionDetails,
    {
      transactionDetails: "",
      totalSum: 0
    }
  );

  const records = queryTransactionRecords(concattedEmployeeTransactions);
  return records;
};

exports.queryTransaction = queryTransaction;
exports.queryMessageFormatter = queryMessageFormatter;
exports.getQueryTransactionDetails = getQueryTransactionDetails;
exports.queryTransactionRecords = queryTransactionRecords;
