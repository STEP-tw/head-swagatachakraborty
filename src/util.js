const checkAndApply = function(conditionChecker, functionToApply, list) {
  return list.map(function(element) {
    if(conditionChecker(element))  return functionToApply(element);
    return null;
  });
}

module.exports = { checkAndApply }; 
