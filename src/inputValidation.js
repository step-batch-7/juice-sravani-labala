const saveTransaction = require("./saveTransaction").saveTransaction;
const queryTransaction = require("./queryTransaction").queryTransaction;
const isOdd = require("./utilities").isOdd;

const options = function(userInputs, path) {
  let categories = { "--query": queryTransaction, "--save": saveTransaction };
  let validOptions = Object.keys(categories);
  if (!isOdd(userInputs.length) || !validOptions.includes(userInputs[0])) {
    return "request failed";
  }
  let option = categories[userInputs[0]];
  return option(userInputs, path);
};
exports.option = options;
