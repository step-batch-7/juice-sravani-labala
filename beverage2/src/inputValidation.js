const saveTransaction = require("./saveTransaction").saveTransaction;
const queryTransaction = require("./queryTransaction").queryTransaction;
const option = function(userInputs, path) {
  let option = saveTransaction;
  if (userInputs[0] == "--query") {
    option = queryTransaction;
  }
  return option(userInputs, path);
};
exports.option = option;
