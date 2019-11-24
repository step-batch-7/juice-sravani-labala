const utilities = require("./utilities");
let {
  readTransactionDetails,
  stringToObject,
  addNewTransaction,
  objectToString,
  writeTransactionDetails,
  getStrigifiedOutput
} = utilities;

const saveTransaction = function(userInputs, path) {
  let employeeId = userInputs[2];
  let beverage = userInputs[4];
  let quantity = userInputs[6];
  let transactionDetails = readTransactionDetails(path);
  transactionDetails = stringToObject(transactionDetails);
  addNewTransaction(employeeId, beverage, quantity, transactionDetails);
  transactionDetails = objectToString(transactionDetails);
  writeTransactionDetails(path, transactionDetails);
  return getStrigifiedOutput([employeeId, beverage, quantity]);
};

exports.saveTransaction = saveTransaction;
