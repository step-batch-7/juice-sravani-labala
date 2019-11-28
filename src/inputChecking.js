const utilities = require("./utilities");
const { isEqual, isInclude, isNumeric, isPositiveNumeric } = utilities;

const isInputsValid = function(userInputs) {
  const operation = userInputs[0];
  const length = userInputs.length;
  const expectedLengthForSave = 7;
  const expectedLengthForQuery = [3, 5, 7];

  const inputOptions = [userInputs[1], userInputs[3], userInputs[5]];

  const validOperation = ["--query", "--save"];
  const isValidOperation = isInclude(validOperation, operation);
  if (!isValidOperation) {
    return false;
  }

  const isOperationSave = isEqual("--save", operation);
  const isOpertionQuery = isEqual("--query", operation);
  const isLengthMatchesSave = isEqual(expectedLengthForSave, length);
  const isLengthMatchesQuery = isInclude(expectedLengthForQuery, length);

  const isEmpIdExists = isInclude(inputOptions, "--empId");
  const isBeverageExists = isInclude(inputOptions, "--beverage");
  const isQuantityExists = isInclude(inputOptions, "--qty");
  const isDateExists = isInclude(inputOptions, "--date");

  const indexOfEmpId = userInputs.indexOf("--empId");
  const indexOfBeverage = userInputs.indexOf("--beverage");
  const indexOfQuantity = userInputs.indexOf("--qty");
  const indexOfDate = userInputs.indexOf("--date");

  const isEmpIdValid = isPositiveNumeric(userInputs[indexOfEmpId + 1]);
  const isQuantityValid = isPositiveNumeric(userInputs[indexOfQuantity + 1]);
  const isBeverageValid = !isNumeric(userInputs[indexOfBeverage + 1]);

  const saveFlag =
    isOperationSave &&
    isLengthMatchesSave &&
    isEmpIdExists &&
    isBeverageExists &&
    isQuantityExists &&
    isEmpIdValid &&
    isQuantityValid &&
    isBeverageValid;

  const queryFlag =
    isOpertionQuery && isLengthMatchesQuery && isEmpIdExists && isEmpIdValid;

  if (!(saveFlag || queryFlag)) {
    return false;
  }

  return true;
};

exports.isInputsValid = isInputsValid;
