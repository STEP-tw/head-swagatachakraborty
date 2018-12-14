const parse = function(details) {
  //for -5 f1 f1
  if (isOnlyLengthProvided(details[0])) {
    return { files: details.slice(1), length: details[0].slice(1), type: "-n" };
  }
  //for -n 5 f1 f1
  if (areTypeAndLengthGivenSeparately(details[0])) {
    return { files: details.slice(2), length: details[1], type: details[0] };
  }
  //for -n5 f1 f1
  if (areTypeAndLengthGivenTogather(details[0])) {
    return {
      files: details.slice(1),
      length: details[0].slice(2),
      type: details[0].slice(0, 2)
    };
  }
  return { files: details.slice(), length: "10", type: "-n" };
};

const isOnlyLengthProvided = function(givenData) {
  return givenData.startsWith("-") && givenData[1].match(/[0-9]/);
};

const areTypeAndLengthGivenSeparately = function(givenData) {
  return (
    givenData.startsWith("-") &&
    givenData[1].match(/[A-z]/) &&
    givenData.length == 2
  );
};

const areTypeAndLengthGivenTogather = function(givenData) {
  return givenData.startsWith("-") && givenData[1].match(/[A-z]/);
};

module.exports = { parse };
