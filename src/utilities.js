const fs = require("fs");

const isEmployeeIdPresent = function(transactionDatabase, employeeId) {
  return Object.keys(transactionDatabase).includes(employeeId);
};

const stringToObject = function(stringifiedData) {
  return JSON.parse(stringifiedData);
};

const objectToString = function(objectTypeData) {
  return JSON.stringify(objectTypeData);
};

const readFile = function(path) {
  let transactionDatabase = fs.readFileSync(path, "utf8");
  return transactionDatabase;
};

const writeFile = function(path, transactionDatabase) {
  fs.writeFileSync(path, transactionDatabase, "utf8");
};

const createTransactionDetails = function(beverage, quantity, date) {
  return { beverage: beverage, quantity: quantity, date: date };
};

const addNewTransaction = function(
  employeeId,
  beverage,
  quantity,
  date,
  transactionDatabase
) {
  if (!isEmployeeIdPresent(transactionDatabase, employeeId)) {
    transactionDatabase[employeeId] = [];
  }
  transactionDatabase[employeeId].push(
    createTransactionDetails(beverage, quantity, date)
  );
  return transactionDatabase;
};

const getStrigifiedOutput = function(data) {
  let stringifiedData = "Transaction Recorded:\n";
  stringifiedData =
    stringifiedData + "Employee ID, Beverage, Quantity, Date, Time\n";
  stringifiedData =
    stringifiedData +
    data[0] +
    ", " +
    data[1] +
    ", " +
    data[2] +
    ", " +
    data[3].toJSON();
  return stringifiedData;
};

const sum = function(firstValue, secondValue) {
  return firstValue + secondValue;
};

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

const getEmployeeTransaction = function(employeeId, transactionDetails) {
  if (!isEmployeeIdPresent(transactionDetails, employeeId)) {
    return [];
  }
  return transactionDetails[employeeId];
};

const stringToNumber = function(stringifiedData) {
  return +Number(stringifiedData);
};

const splitByTab = function(data) {
  return data.split("\t");
};

const queryTransactionRecords = function(data) {
  let juiceRecords = data["totalSum"];
  let transactionDetails = data["transactionDetails"];
  console.log(juiceRecords);
  juiceRecords = juiceRecords.split(" ");
  juiceRecords.pop();
  juiceRecords = juiceRecords.map(stringToNumber);
  juiceRecords = juiceRecords.reduce(sum, 0);
  transactionDetails = transactionDetails.split("\n");
  transactionDetails = transactionDetails.map(splitByTab);
  transactionDetails.pop();
  return { totalJuice: juiceRecords, transactionDetails: transactionDetails };
};

const queryStrigifiedOutput = function(employeeId, data) {
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

const isOdd = function(number) {
  return number % 2;
};

exports.isOdd = isOdd;
exports.isEmployeeIdPresent = isEmployeeIdPresent;
exports.stringToObject = stringToObject;
exports.objectToString = objectToString;
exports.readFile = readFile;
exports.writeFile = writeFile;
exports.createTransactionDetails = createTransactionDetails;
exports.addNewTransaction = addNewTransaction;
exports.getStrigifiedOutput = getStrigifiedOutput;
exports.sum = sum;
exports.getQueryTransactionDetails = getQueryTransactionDetails;
exports.getEmployeeTransaction = getEmployeeTransaction;
exports.stringToNumber = stringToNumber;
exports.splitByTab = splitByTab;
exports.queryTransactionRecords = queryTransactionRecords;
exports.queryStrigifiedOutput = queryStrigifiedOutput;
