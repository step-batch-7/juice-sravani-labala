const stringToObject = function(stringifiedData) {
  return JSON.parse(stringifiedData);
};

const objectToString = function(objectTypeData) {
  return JSON.stringify(objectTypeData);
};

const dateAndTime = function() {
  return new Date().toJSON();
};

exports.dateAndTime = dateAndTime;
exports.stringToObject = stringToObject;
exports.objectToString = objectToString;
