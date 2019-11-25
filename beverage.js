const option = require("./src/inputValidation").option;
const main = function() {
  let userInputs = process.argv.slice(2);
  let path = "./juiceTransactionDetails.json";
  console.log(option(userInputs, path));
};
main();
