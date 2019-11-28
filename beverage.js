const isInputsValid = require("./src/inputChecking").isInputsValid;

const fileAccess = require("./src/fileAccessUtility");
let { readFile, writeFile, isFileExist } = fileAccess;

const dateAndTime = require("./src/jsonUtiities").dateAndTime;

const inputValidation = require("./src/processOperation").inputValidation;
const main = function() {
  let date = dateAndTime();
  let userInputs = process.argv.slice(2);
  let path = "./juiceTransactionDetails.json";
  let validatyFlag = isInputsValid(userInputs);

  console.log(
    inputValidation(
      userInputs,
      date,
      path,
      validatyFlag,
      isFileExist,
      readFile,
      writeFile
    )
  );
};
main();
