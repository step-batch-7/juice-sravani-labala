const { timeStamp, getDataStorePath } = require("./src/config");
const { readFile, writeFile, isFileExist } = require("./src/fileAccessUtility");
const isInputsValid = require("./src/inputChecking").isInputsValid;
const displayMessage = require("./src/processOperation").displayMessage;

const main = function() {
  const path = getDataStorePath(process.env);
  const timeStampWithEnv = timeStamp.bind(null, process.env);
  let userInputs = process.argv.slice(2);
  let validatyFlag = isInputsValid(userInputs);

  console.log(
    displayMessage(
      userInputs,
      timeStampWithEnv,
      path,
      validatyFlag,
      isFileExist,
      readFile,
      writeFile
    )
  );
};
main();
