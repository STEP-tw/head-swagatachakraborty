const checkAndApply = function(conditionChecker, functionToApply, list) {
  return list.map(function(element) {
    if(conditionChecker(element))  return functionToApply(element, 'utf8');
    return null;
  });
}

module.exports = { checkAndApply }; 
