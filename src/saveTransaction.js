const utilities = require("./utilities");
let {
  readFile,
  stringToObject,
  addNewTransaction,
  objectToString,
  writeFile,
  getStrigifiedOutput
} = utilities;

const saveTransaction = function(userInputs, path) {
  let employeeId = userInputs[2];
  let beverage = userInputs[4];
  let quantity = userInputs[6];
  let date = new Date();
  let transactionDetails = readFile(path);
  transactionDetails = stringToObject(transactionDetails);
  addNewTransaction(employeeId, beverage, quantity, date, transactionDetails);
  transactionDetails = objectToString(transactionDetails);
  writeFile(path, transactionDetails);
  return getStrigifiedOutput([employeeId, beverage, quantity, date]);
};

exports.saveTransaction = saveTransaction;
