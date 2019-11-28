const utilities = require("./utilities");
let { addNewTransaction } = utilities;

const jsonUtilities = require("./jsonUtiities");
let { objectToString, stringToObject } = jsonUtilities;

const saveMessageFormatter = function(data) {
  let stringifiedData = `Transaction Recorded:\nEmployee ID, Beverage, Quantity, Date, Time\n${data.empId}, ${data.beverage}, ${data.qty}, ${data.date}`;
  return stringifiedData;
};

const saveTransaction = function(
  userInputs,
  path,
  isFileExist,
  readFile,
  writeFile,
  date
) {
  const indexOfEmpId = userInputs.indexOf("--empId");
  const indexOfBeverage = userInputs.indexOf("--beverage");
  const indexOfQuantity = userInputs.indexOf("--qty");

  const employeeId = userInputs[indexOfEmpId + 1];
  const beverage = userInputs[indexOfBeverage + 1];
  const quantity = userInputs[indexOfQuantity + 1];

  let transactionDatabase = [];

  if (isFileExist(path)) {
    const transactionFile = readFile(path);
    transactionDatabase = stringToObject(transactionFile);
  }

  addNewTransaction(employeeId, beverage, quantity, date, transactionDatabase);
  transactionDatabase = objectToString(transactionDatabase);
  writeFile(path, transactionDatabase);
  const transactionRecorded = {
    empId: employeeId,
    beverage: beverage,
    qty: quantity,
    date: date
  };

  return transactionRecorded;
};

exports.saveTransaction = saveTransaction;
exports.saveMessageFormatter = saveMessageFormatter;
