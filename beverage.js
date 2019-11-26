//const option = require("./src/inputValidation").option;
const inputValidation = require("./src/validatingInputs").inputValidation;
const main = function() {
  let userInputs = process.argv.slice(2);
  let path = "./juiceTransactionDetails.json";
  // console.log(option(userInputs, path));
  console.log(inputValidation(userInputs, path));
};
main();
