const checkAndApply = function(conditionChecker, functionToApply, list) {
  return list.map(function(element) {
    if(conditionChecker(element))  return functionToApply(element);
    return null;
  });
}

const toNumber = function (element) {
  if( isNaN(+element) ){
    return element
  }
  return element;
};
module.exports = { checkAndApply, toNumber }; 
