const createTransactionDetails = function(
  employeeId,
  beverage,
  quantity,
  date
) {
  return {
    empId: employeeId,
    beverage: beverage,
    quantity: quantity,
    date: date
  };
};

const addNewTransaction = function(
  employeeId,
  beverage,
  quantity,
  date,
  transactionDatabase
) {
  transactionDatabase.push(
    createTransactionDetails(employeeId, beverage, quantity, date)
  );
  return transactionDatabase;
};

const sum = function(firstValue, secondValue) {
  return firstValue + secondValue;
};

const stringToNumber = function(stringifiedData) {
  return +Number(stringifiedData);
};

const splitByTab = function(data) {
  return data.split("\t");
};

const isOdd = function(number) {
  return number % 2;
};

const isEqual = function(value1, value2) {
  return value1 === value2;
};

const isInclude = function(array, value) {
  return array.includes(value);
};

const isNumeric = function(value) {
  return Number.isInteger(+value);
};

const getNumeric = function(value) {
  return Number(value);
};

const isPositiveNumeric = function(value) {
  return getNumeric(value) > 0;
};

exports.getNumeric = getNumeric;
exports.isPositiveNumeric = isPositiveNumeric;
exports.isNumeric = isNumeric;
exports.isEqual = isEqual;
exports.isInclude = isInclude;
exports.isOdd = isOdd;
exports.createTransactionDetails = createTransactionDetails;
exports.addNewTransaction = addNewTransaction;
exports.sum = sum;
exports.stringToNumber = stringToNumber;
exports.splitByTab = splitByTab;
