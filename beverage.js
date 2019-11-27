const isInputsValid = require("./src/inputChecking").isInputsValid;

const inputValidation = require("./src/processOperation").inputValidation;
const main = function() {
  let userInputs = process.argv.slice(2);
  let path = "./juiceTransactionDetails.json";
  let validatyFlag = isInputsValid(userInputs);

  console.log(inputValidation(userInputs, path, validatyFlag));
};
main();
