const utilities = require("./utilities");
const { isEqual, isInclude, isNumeric } = utilities;

const isInputsValid = function(userInputs) {
  let operation = userInputs[0];
  let length = userInputs.length;
  let expectedLengthForSave = 7;
  let expectedLengthForQuery = 3;
  let inputOptions = [userInputs[1], userInputs[3], userInputs[5]];

  let validOperation = ["--query", "--save"];
  let isValidOperation = isInclude(validOperation, operation);
  if (!isValidOperation) {
    return false;
  }

  let isOperationSave = isEqual("--save", operation);
  let isOpertionQuery = isEqual("--query", operation);
  let isLengthMatchesSave = isEqual(expectedLengthForSave, length);
  let isLengthMatchesQuery = isEqual(expectedLengthForQuery, length);
  let isEmpIdExists = isInclude(inputOptions, "--empId");
  let isBeverageExists = isInclude(inputOptions, "--beverage");
  let isQuantityExists = isInclude(inputOptions, "--qty");

  let indexOfEmpId = userInputs.indexOf("--empId");
  let indexOfBeverage = userInputs.indexOf("--beverage");
  let indexOfQuantity = userInputs.indexOf("--qty");

  let isEmpIdValid = isNumeric(userInputs[indexOfEmpId + 1]);
  let isBeverageValid = !isNumeric(userInputs[indexOfBeverage + 1]);
  let isQuantityValid = isNumeric(userInputs[indexOfQuantity + 1]);

  let saveFlag =
    isOperationSave &&
    isLengthMatchesSave &&
    isEmpIdExists &&
    isBeverageExists &&
    isQuantityExists &&
    isEmpIdValid &&
    isQuantityValid &&
    isBeverageValid;

  let queryFlag =
    isOpertionQuery && isLengthMatchesQuery && isEmpIdExists && isEmpIdValid;

  if (!(saveFlag || queryFlag)) {
    return false;
  }

  return true;
};

exports.isInputsValid = isInputsValid;
