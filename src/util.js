const apply = function(functionToApply, list) {
  return list.map(function(element) {
    return functionToApply(element, 'utf8');
  });
}

module.exports = { apply }; 
