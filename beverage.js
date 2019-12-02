const isInputsValid = require("./src/inputChecking").isInputsValid;

const fileAccess = require("./src/fileAccessUtility");
let { readFile, writeFile, isFileExist } = fileAccess;
const { timeStamp, getDataStorePath } = require("./src/config");

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
