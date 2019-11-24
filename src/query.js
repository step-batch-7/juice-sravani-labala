const fs = require("fs");
const isPresent = function(transactionData, empId) {
  return Object.keys(transactionData).includes(empId);
};
const stringToObject = function(stringData) {
  return JSON.parse(stringData);
};
const readTransactionData = function(path) {
  let transactionData = fs.readFileSync(path, "utf8");
  return transactionData;
};
const sum = function(firstValue, secondValue) {
  return firstValue + secondValue;
};
const getStrigifiedData = function(stringDataSum, data) {
  stringDataSum["transactionData"] +=
    data["beverage"] + "\t" + data["quantity"] + "\t" + data["date"] + "\n";
  stringDataSum["totalSum"] += data["quantity"];
  return stringDataSum;
};
const getEmployeeTransaction = function(empId, transactionData) {
  //if (transactionData[empId] == undefined) {
  if (!isPresent(transactionData, empId)) {
    return [];
  }
  return transactionData[empId];
};
const stringToNumber = function(stringData) {
  return +Number(stringData);
};
const split = function(data) {
  return data.split("\t");
};
const queryRecords = function(data) {
  let juiceRecords = data["totalSum"];
  let transactionData = data["transactionData"];
  juiceRecords = juiceRecords.split("");
  juiceRecords = juiceRecords.map(stringToNumber);
  juiceRecords = juiceRecords.reduce(sum, 0);
  transactionData = transactionData.split("\n");
  transactionData = transactionData.map(split);
  transactionData.pop();
  // console.log(transactionData);
  return { totalJuice: juiceRecords, transactionData: transactionData };
};
const queryOutput = function(empId, data) {
  let detailsOfTransaction = data["transactionData"];
  let strigifiedData =
    "empid" + "\t" + "beverage" + "\t" + "quantity" + "\t" + "time" + "\n";
  for (let index = 0; index < detailsOfTransaction.length; index++) {
    strigifiedData =
      strigifiedData +
      empId +
      "\t" +
      detailsOfTransaction[index][0] +
      "\t\t" +
      detailsOfTransaction[index][1] +
      "\t\t" +
      detailsOfTransaction[index][2] +
      "\n";
  }
  strigifiedData =
    strigifiedData + "total juices: " + "\t" + data["totalJuice"];
  return strigifiedData;
};
const query = function(userInput, path) {
  let empId = userInput[2];
  let data = readTransactionData(path);
  data = stringToObject(data);
  data = getEmployeeTransaction(empId, data);
  data = data.reduce(getStrigifiedData, { transactionData: "", totalSum: 0 });
  let records = queryRecords(data);
  let output = queryOutput(empId, records);
  return output;
};
/*const main = function() {
  let userInput = process.argv.slice(2);
  let path = "./file.json";
  console.log(query(userInput, path));
};
main();
*/
exports.query = query;
