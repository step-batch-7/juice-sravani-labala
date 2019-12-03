const { getPreviousTxns } = require("./utilities");

const getQueryTransactionDetails = function(queryTransactionList, transaction) {
  queryTransactionList.transactionDetails += [
    transaction.empId,
    transaction.beverage,
    transaction.qty,
    transaction.date + "\n"
  ];
  queryTransactionList.totalJuices += +transaction.qty;
  return queryTransactionList;
};

const queryTransactionRecords = function(data) {
  let juiceRecords = data.totalJuices;
  let transactionDetails = data.transactionDetails;
  transactionDetails = transactionDetails.split("\n");
  transactionDetails.pop();
  return { totalJuice: juiceRecords, transactionDetails: transactionDetails };
};

const queryMessageFormatter = function(transactionDatabase) {
  if (!transactionDatabase) {
    return `records not found`;
  }
  const totalJuice = transactionDatabase.totalJuice;
  const values = transactionDatabase.transactionDetails;
  const juiceString = totalJuice == 1 ? "Juice" : "Juices";
  const strigifiedData = `Employee ID, Beverage, Quantity, Date\n${values.join(
    "\n"
  )}\nTotal: ${totalJuice} ${juiceString}`;
  return strigifiedData;
};

const isGivenOption = function(searchKey, searchedFor) {
  return function(obj) {
    let txnOption = obj[searchKey];
    if (searchKey == "date") {
      txnOption = txnOption.slice(0, 10);
    }
    return searchedFor == txnOption;
  };
};

const queryTransaction = function(userInput, path, isFileExist, readFile) {
  let transactionDatabase = getPreviousTxns(isFileExist, readFile, path);
  let filteredTxns = transactionDatabase;
  for (let index = 0; index < userInput.length; index += 2) {
    filteredTxns = filteredTxns.filter(
      isGivenOption(userInput[index].slice(2), userInput[index + 1])
    );
  }
  const concattedEmployeeTransactions = filteredTxns.reduce(
    getQueryTransactionDetails,
    {
      transactionDetails: "",
      totalJuices: 0
    }
  );
  const records = queryTransactionRecords(concattedEmployeeTransactions);
  return records;
};

module.exports = {
  queryTransaction,
  queryMessageFormatter,
  getQueryTransactionDetails,
  queryTransactionRecords,
  isGivenOption
};
