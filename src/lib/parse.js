const { toNumber } = require('../util/util');

const generateDetails = function (files, count, optionArg) {
  return { files : files, count : toNumber( count ), option : determineOption(optionArg) };
};

const determineOption = function (optionArg) {
  if(optionArg == '-n') return 'line';
  if(optionArg == '-c') return 'byte';
  return optionArg;
};

const parse = function(userInput) {
  //for -5 file1 file2
  if (isOnlyCountProvided(userInput[0])) {
    return generateDetails( userInput.slice(1), userInput[0].slice(1), "-n" );
  }
  //for -n 5 file1 file2
  if (areOptionAndCountGivenSeparately(userInput[0])) {
    return generateDetails( userInput.slice(2), userInput[1], userInput[0] );
  }
  //for -n5 file1 file2
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

module.exports = { parse, determineOption };
