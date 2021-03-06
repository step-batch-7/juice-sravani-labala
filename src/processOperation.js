const { saveMessageFormatter, saveTransaction } = require("./saveTransaction");
const {
  queryMessageFormatter,
  queryTransaction
} = require("./queryTransaction");

const displayMessage = function(
  userInputs,
  date,
  path,
  validityFlag,
  isFileExist,
  readFile,
  writeFile
) {
  if (!validityFlag) {
    return `request failed`;
  }
  const option = userInputs[0];
  const availableOperations = {
    "--save": saveTransaction,
    "--query": queryTransaction
  };
  const operation = availableOperations[option];
  const transactionDetails = userInputs.slice(1);
  const operationOutput = operation(
    transactionDetails,
    path,
    isFileExist,
    readFile,
    writeFile,
    date
  );

  return generateMsg(option, operationOutput);
};

const generateMsg = function(option, operationOutput) {
  const messageFormatter = {
    "--save": saveMessageFormatter,
    "--query": queryMessageFormatter
  };

  return messageFormatter[option](operationOutput);
};

exports.displayMessage = displayMessage;
exports.generateMsg = generateMsg;
