const fs = require("fs");

const getDate = function() {
  let date = new Date();
  return date.toLocaleString();
};

const isEmployeeIdPresent = function(transactionDetails, employeeId) {
  return Object.keys(transactionDetails).includes(employeeId);
};

const stringToObject = function(stringifiedData) {
  return JSON.parse(stringifiedData);
};

const objectToString = function(objectTypeData) {
  return JSON.stringify(objectTypeData);
};

const readTransactionDetails = function(path) {
  let transactionDetails = fs.readFileSync(path, "utf8");
  return transactionDetails;
};

const writeTransactionDetails = function(path, transactionDetails) {
  fs.writeFileSync(path, transactionDetails, "utf8");
};

const createTransactionDetails = function(beverage, quantity) {
   return { beverage: beverage, quantity: quantity, date: new Date() };
  //return { beverage: beverage, quantity: quantity, date: getDate() };
};

const addNewTransaction = function(
  employeeId,
  beverage,
  quantity,
  transactionDetails
) {
  if (!isEmployeeIdPresent(transactionDetails, employeeId)) {
    transactionDetails[employeeId] = [];
  }
  transactionDetails[employeeId].push(
    createTransactionDetails(beverage, quantity)
  );
  return transactionDetails;
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
    new Date();
    //getDate();
  return stringifiedData;
};
/*
const getStrigifiedOutput = function(data) {
  let stringifiedData = "transaction recorded:\n";
  stringifiedData =
    stringifiedData +
    "employeeId\t" +
    "beverage\t" +
    "quantity\t" +
    "date and time\n";
  stringifiedData =
    stringifiedData +
    data[0] +
    "\t\t" +
    data[1] +
    "\t\t" +
    data[2] +
    "\t\t" +
    //new Date();
    getDate();
  return stringifiedData;
};
*/
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
  juiceRecords = juiceRecords.split(" ");
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
/*
const queryStrigifiedOutput = function(employeeId, data) {
  let detailsOfTransaction = data["transactionDetails"];
  let strigifiedData = "employeeId\t" + "beverage\t" + "quantity\t" + "time\n";
  for (let index = 0; index < detailsOfTransaction.length; index++) {
    strigifiedData =
      strigifiedData +
      employeeId +
      "\t\t" +
      detailsOfTransaction[index][0] +
      "\t\t" +
      detailsOfTransaction[index][1] +
      "\t\t" +
      detailsOfTransaction[index][2] +
      "\n";
  }
  strigifiedData = strigifiedData + "Total juices:\t" + data["totalJuice"];
  return strigifiedData;
};
*/
const isOdd = function(number) {
  return number % 2;
};

exports.isOdd = isOdd;
exports.isEmployeeIdPresent = isEmployeeIdPresent;
exports.stringToObject = stringToObject;
exports.objectToString = objectToString;
exports.readTransactionDetails = readTransactionDetails;
exports.writeTransactionDetails = writeTransactionDetails;
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
exports.getDate = getDate;
