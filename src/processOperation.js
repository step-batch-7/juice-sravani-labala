const saveTransaction = require("./saveTransaction").saveTransaction;
const queryMessageFormatter = require("./queryTransaction")
  .queryMessageFormatter;
const queryTransaction = require("./queryTransaction").queryTransaction;
const saveMessageFormatter = require("./saveTransaction").saveMessageFormatter;

const getObjectFromArray = function(array) {
  const length = array.length;
  let derrivedObject = {};
  for (let index = 0; index < length; index += 2) {
    let key = array[index];
    let value = array[index + 1];
    derrivedObject[key] = value;
  }
  return derrivedObject;
};

const getNumeric = function(string) {
  const numeric = Number(string);
  return numeric;
};

const getConvertedInput = function(userArgs, date) {
  const avilableOperations = {
    "--save": saveTransaction,
    "--query": queryTransaction
  };
  let convertedInputs = [];
  convertedInputs[0] = avilableOperations[userArgs[0]];
  convertedInputs[1] = getObjectFromArray(userArgs.slice(1));
  convertedInputs[1]["--qty"] = getNumeric(convertedInputs[1]["--qty"]);
  convertedInputs[1]["--date"] = date;
  return convertedInputs;
};

const inputValidation = function(
  userInputs,
  date,
  path,
  validityFlag,
  isFileExist,
  readFile,
  writeFile
) {
  const messageFormatter = {
    "--save": saveMessageFormatter,
    "--query": queryMessageFormatter
  };
  if (!validityFlag) {
    return `request failed`;
  }
  const option = userInputs[0];

  const availableOperations = {
    "--save": saveTransaction,
    "--query": queryTransaction
  };

  const operation = availableOperations[option];
  userInputs.shift();
  const transactionDetails = userInputs;
  const operationOutput = operation(
    transactionDetails,
    path,
    isFileExist,
    readFile,
    writeFile,
    date
  );
  return messageFormatter[option](operationOutput);
};

exports.getObjectFromArray = getObjectFromArray;
exports.getNumeric = getNumeric;
exports.getConvertedInput = getConvertedInput;
exports.inputValidation = inputValidation;
