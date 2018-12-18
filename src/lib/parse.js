const { toNumber } = require('../util/util');

const generateDetails = function (files, count, option) {
  return { files : files, count : toNumber( count ), option : option };
};

const parse = function(userInput) {
  //for -5 f1 f1
  if (isOnlyCountProvided(userInput[0])) {
    return generateDetails( userInput.slice(1), userInput[0].slice(1), "-n" );
  }
  //for -n 5 f1 f1
  if (areOptionAndCountGivenSeparately(userInput[0])) {
    return generateDetails( userInput.slice(2), userInput[1], userInput[0] );
  }
  //for -n5 f1 f1
  if (areOptionAndCountGivenTogather(userInput[0])) {
    return generateDetails ( userInput.slice(1), userInput[0].slice(2), userInput[0].slice(0, 2) );
  }
  return generateDetails( userInput.slice(), 10, "-n" );
};

const isOnlyCountProvided = function(givenData) {
  return givenData.startsWith("-") && givenData[1].match(/[0-9]/);
};

const areOptionAndCountGivenSeparately = function(givenData) {
  return (
    givenData.startsWith("-") &&
    givenData[1].match(/[A-z]/) &&
    givenData.length == 2
  );
};

const areOptionAndCountGivenTogather = function(givenData) {
  return givenData.startsWith("-") && givenData[1].match(/[A-z]/);
};

module.exports = { parse };
