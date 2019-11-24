const fs = require("fs");

const isPresent = function(transactionData, empId) {
  return Object.keys(transactionData).includes(empId);
};
const stringToObject = function(stringData) {
  return JSON.parse(stringData);
};
const objectToString = function(objectData) {
  return JSON.stringify(objectData);
};
const readTransactionData = function(path) {
  let transactionData = fs.readFileSync(path, "utf8");
  return transactionData;
};
const writeTransactionData = function(path, transactionData) {
  fs.writeFileSync(path, transactionData, "utf8");
};
const createTransactionData = function(beverage, quantity) {
  return { beverage: beverage, quantity: quantity, date: new Date() };
};
const addTransaction = function(empId, beverage, quantity, transactionData) {
  //if (transactionData[empId] == undefined) {
  if (!isPresent(transactionData, empId)) {
    transactionData[empId] = [];
  }
  transactionData[empId].push(createTransactionData(beverage, quantity));
  return transactionData;
};
const getStrigifiedData = function(data) {
  let stringifyData = "transaction recorded" + "\n";
  stringifyData =
    stringifyData +
    "empId" +
    "\t" +
    "beverage" +
    "\t" +
    "quantity" +
    "\t" +
    "date and time" +
    "\n";
  stringifyData =
    stringifyData +
    data[0] +
    "\t" +
    data[1] +
    "\t\t" +
    data[2] +
    "\t\t" +
    new Date();
  return stringifyData;
};
const save = function(userInputs, path) {
  let empId = userInputs[2];
  let beverage = userInputs[4];
  let quantity = userInputs[6];
  let data = readTransactionData(path);
  data = stringToObject(data);
  addTransaction(empId, beverage, quantity, data);
  data = objectToString(data);
  writeTransactionData(path, data);
  return getStrigifiedData([empId, beverage, quantity]);
};
/*const main = function() {
  let userInputs = process.argv.slice(2);
  let path = "./file.json";
  console.log(save(userInputs, path));
};
main();
*/
exports.save = save;
