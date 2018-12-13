const checkAndApply = function(conditionChecker, functionToApply, list) {
  return list.map(function(element) {
    if(conditionChecker(element))  return functionToApply(element);
    return null;
  });
}

const toString = function (elements) {
  return elements.toString();
}

const isNotNull = function (element) {
  return element != null;
};

module.exports = { checkAndApply, toString, isNotNull }; 
