const {
  isEqual,
  isInclude,
  isNumeric,
  isPositiveNumeric
} = require("./utilities");

const validateSave = function(userInputs, length) {
  const { isEmpIdExists, isBeverageExists, isQuantityExists } = optionsExist(
    userInputs
  );
  const { isEmpIdValid, isQuantityValid, isBeverageValid } = optionsValid(
    userInputs
  );
  const expectedLengthForSave = 7;
  const isLengthMatchesSave = isEqual(expectedLengthForSave, length);
  return (
    isLengthMatchesSave &&
    isEmpIdExists &&
    isBeverageExists &&
    isQuantityExists &&
    isEmpIdValid &&
    isQuantityValid &&
    isBeverageValid
  );
};

const validateQuery = function(userInputs, length) {
  const { isEmpIdExists, isBeverageExists, isDateExists } = optionsExist(
    userInputs
  );
  const { isEmpIdValid, isBeverageValid } = optionsValid(userInputs);
  const expectedLengthForQuery = [3, 5, 7];
  const isLengthMatchesQuery = isInclude(expectedLengthForQuery, length);
  return (
    isLengthMatchesQuery &&
    ((isEmpIdExists && isEmpIdValid) ||
      (isBeverageExists && isBeverageValid) ||
      isDateExists)
  );
};

const isInputsValid = function(userInputs) {
  const operation = userInputs[0];
  const isValidOperation = ["--query", "--save"].includes(operation);
  if (!isValidOperation) {
    return false;
  }
  const length = userInputs.length;
  const action = { "--save": validateSave, "--query": validateQuery };
  return action[operation](userInputs, length);
};

const optionsExist = function(userInputs) {
  const inputOptions = [userInputs[1], userInputs[3], userInputs[5]];
  const isEmpIdExists = isInclude(inputOptions, "--empId");
  const isBeverageExists = isInclude(inputOptions, "--beverage");
  const isQuantityExists = isInclude(inputOptions, "--qty");
  const isDateExists = isInclude(inputOptions, "--date");
  return {
    isEmpIdExists: isEmpIdExists,
    isBeverageExists: isBeverageExists,
    isQuantityExists: isQuantityExists,
    isDateExists: isDateExists
  };
};
const optionsValid = function(userInputs) {
  const indexOfEmpId = userInputs.indexOf("--empId");
  const indexOfBeverage = userInputs.indexOf("--beverage");
  const indexOfQuantity = userInputs.indexOf("--qty");
  const isEmpIdValid = isPositiveNumeric(userInputs[indexOfEmpId + 1]);
  const isQuantityValid = isPositiveNumeric(userInputs[indexOfQuantity + 1]);
  const isBeverageValid = !isNumeric(userInputs[indexOfBeverage + 1]);
  return {
    isEmpIdValid: isEmpIdValid,
    isQuantityValid: isQuantityValid,
    isBeverageValid: isBeverageValid
  };
};

module.exports = {
  isInputsValid,
  validateSave,
  validateQuery,
  optionsExist,
  optionsValid
};
