const validateInputs = function (context, option, count) {
  if (hasInvalidOption(option)) return { error : optionError(option)[context], hasError : true };
  if (hasInvalidCount(count)[context]) return { error : countError(count)[context][option], hasError : true };
  return { hasError : false };
};

const hasInvalidCount = function(count) {
  return {
    head: count < 1 || isNaN(count - count),
    tail: isNaN(count - count)
  };
};

const hasInvalidOption = function(option) {
  return option != "byte" && option != "line";
};

const countError = function(count) {
  return {
    head: generateHeadCountError(count),
    tail: generateTailCountError(count)
  };
};

const generateHeadCountError = function(count) {
  return {
    "line": "head: illegal line count -- " + count,
    "byte": "head: illegal byte count -- " + count
  };
};

const generateTailCountError = function(count) {
  return {
    "line": "tail: illegal offset -- " + count,
    "byte": "tail: illegal offset -- " + count
  };
};

const optionError = function(option) {
  return {
    head:
      "head: illegal option -- " +
      option[1] +
      "\nusage: head [-n lines | -c bytes] [file ...]",
    tail:
      "tail: illegal option -- " +
      option[1] +
      "\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
  };
};

const missingFileError = function(file) {
  return {
    head: "head: " + file + ": No such file or directory",
    tail: "tail: " + file + ": No such file or directory"
  };
};

headInputsValidator = validateInputs.bind(null, 'head');
tailInputsValidator = validateInputs.bind(null, 'tail');

module.exports = {
  countError,
  hasInvalidOption,
  hasInvalidCount,
  optionError,
  missingFileError,
  headInputsValidator,
  tailInputsValidator
};
