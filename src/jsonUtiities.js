const stringToObject = function(stringifiedData) {
  return JSON.parse(stringifiedData);
};

const objectToString = function(objectTypeData) {
  return JSON.stringify(objectTypeData);
};

exports.stringToObject = stringToObject;
exports.objectToString = objectToString;
