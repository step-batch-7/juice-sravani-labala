const utilities = require("./utilities");
let {
  readTransactionDetails,
  stringToObject,
  getEmployeeTransaction,
  queryTransactionRecords,
  queryStrigifiedOutput,
  getQueryTransactionDetails
} = utilities;

const queryTransaction = function(userInput, path) {
  let employeeId = userInput[2];
  let transactionDetails = readTransactionDetails(path);
  transactionDetails = stringToObject(transactionDetails);
  transactionDetails = getEmployeeTransaction(employeeId, transactionDetails);
  transactionDetails = transactionDetails.reduce(getQueryTransactionDetails, {
    transactionDetails: "",
    totalSum: 0
  });
  let records = queryTransactionRecords(transactionDetails);
  let output = queryStrigifiedOutput(employeeId, records);
  return output;
};

exports.queryTransaction = queryTransaction;
