const option = require("./src/input").option;
const main = function() {
  let userInputs = process.argv.slice(2);
  let path = "./src/file.json";
  console.log(option(userInputs, path));
};
main();
