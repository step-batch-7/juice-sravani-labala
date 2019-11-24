const save = require("./save").save;
const query = require("./query").query;
const option = function(userInputs, path) {
  let option = save;
  if (userInputs[0] == "--query") {
    option = query;
  }
  return option(userInputs, path);
};
exports.option = option;
