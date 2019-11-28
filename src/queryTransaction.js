const utilities = require("./utilities");
let { stringToNumber, sum, splitByTab } = utilities;

const jsonUtilities = require("./jsonUtiities");
let { stringToObject } = jsonUtilities;

const getQueryTransactionDetails = function(queryTransactionList, transaction) {
  queryTransactionList.transactionDetails += `${transaction.empId}\t${transaction.beverage}\t${transaction.quantity}\t${transaction.date}\n`;
  queryTransactionList.totalSum += transaction.quantity + " ";
  return queryTransactionList;
};

const queryTransactionRecords = function(data) {
  let juiceRecords = data.totalSum;
  let transactionDetails = data.transactionDetails;

  juiceRecords = juiceRecords.split(" ");
  juiceRecords.pop();
  juiceRecords = juiceRecords.map(stringToNumber);
  juiceRecords = juiceRecords.reduce(sum, 0);
  transactionDetails = transactionDetails.split("\n");
  transactionDetails = transactionDetails.map(splitByTab);
  transactionDetails.pop();
  return { totalJuice: juiceRecords, transactionDetails: transactionDetails };
};

const queryMessageFormatter = function(transactionDatabase) {
  if (!transactionDatabase) {
    return `records not found`;
  }
  console.log(transactionDatabase);
  const totalJuice = transactionDatabase.totalJuice;
  const values = transactionDatabase.transactionDetails;
  const strigifiedData = `Employee ID, Beverage, Quantity, Date, Time\n${values.join(
    "\n"
  )}\nTotal:${totalJuice} Juices`;
  return strigifiedData;
};

const isGivenDate = function(date) {
  return function(obj) {
    let length = date.length;
    const trDate = obj.date.slice(0, length);
    return date == trDate;
  };
};

const isGivenEmployee = function(empId) {
  return function(obj) {
    const trEmpId = obj.empId;
    return empId == trEmpId;
  };
};

const isGivenBeverage = function(beverage) {
  return function(obj) {
    const trBeverage = obj.beverage;
    return beverage == trBeverage;
  };
};

const queryTransaction = function(userInput, path, isFileExist, readFile) {
  if (!isFileExist(path)) {
    return 0;
  }
  const transactionFile = readFile(path);
  let transactionDatabase = stringToObject(transactionFile);

  const indexOfEmpId = userInput.indexOf("--empId");
  const indexOfBeverage = userInput.indexOf("--beverage");
  const indexOfDate = userInput.indexOf("--date");

  const employeeId = userInput[indexOfEmpId + 1];
  const beverage = userInput[indexOfBeverage + 1];
  const date = userInput[indexOfDate + 1];
  if (userInput.includes("--empId")) {
    transactionDatabase = transactionDatabase.filter(
      isGivenEmployee(employeeId)
    );
  }

  if (userInput.includes("--beverage")) {
    transactionDatabase = transactionDatabase.filter(isGivenBeverage(beverage));
  }

  if (userInput.includes("--date")) {
    transactionDatabase = transactionDatabase.filter(isGivenDate(date));
  }

  const concattedEmployeeTransactions = transactionDatabase.reduce(
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
