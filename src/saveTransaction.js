const { addNewTransaction, getPreviousTxns } = require("./utilities");
const { objectToString } = require("./jsonUtiities");

const saveMessageFormatter = function(data) {
  let stringifiedData = `Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date\n${
    data.empId
  },${data.beverage},${data.qty},${data.date.toJSON()}`;
  return stringifiedData;
};

const getNewTxnRecord = function(userInputs, date) {
  const indexOfEmpId = userInputs.indexOf("--empId");
  const indexOfBeverage = userInputs.indexOf("--beverage");
  const indexOfQuantity = userInputs.indexOf("--qty");
  const employeeId = userInputs[indexOfEmpId + 1];
  const beverage = userInputs[indexOfBeverage + 1];
  const quantity = userInputs[indexOfQuantity + 1];
  const transactionRecorded = {
    empId: employeeId,
    beverage: beverage,
    qty: quantity,
    date: date()
  };
  return transactionRecorded;
};

const updateTxnRecords = function(path, writeFile, transactionDatabase) {
  transactionDatabase = objectToString(transactionDatabase);
  writeFile(path, transactionDatabase);
};

const saveTransaction = function(
  userInputs,
  path,
  isFileExist,
  readFile,
  writeFile,
  date
) {
  let transactionDatabase = getPreviousTxns(isFileExist, readFile, path);
  let newRecord = getNewTxnRecord(userInputs, date);
  addNewTransaction(newRecord, transactionDatabase);
  updateTxnRecords(path, writeFile, transactionDatabase);
  return newRecord;
};

module.exports = { saveTransaction, saveMessageFormatter, getNewTxnRecord };
