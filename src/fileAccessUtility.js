const fs = require("fs");

const readFile = function(path) {
  let transactionDatabase = fs.readFileSync(path, "utf8");
  return transactionDatabase;
};

const writeFile = function(path, transactionDatabase) {
  fs.writeFileSync(path, transactionDatabase, "utf8");
};

exports.readFile = readFile;
exports.writeFile = writeFile;
