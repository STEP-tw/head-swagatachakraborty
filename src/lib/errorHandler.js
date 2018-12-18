const hasInvalidCount = function(count) {
  return {
    head: count < 1 || isNaN(count - count),
    tail: isNaN(count - count)
  };
};

const hasInvalidOption = function(option) {
  return option != "-c" && option != "-n";
};

const countError = function(count) {
  return {
    head: generateHeadCountError(count),
    tail: generateTailCountError(count)
  };
};

const generateHeadCountError = function(count) {
  return {
    "-n": "head: illegal line count -- " + count,
    "-c": "head: illegal byte count -- " + count
  };
};

const generateTailCountError = function(count) {
  return {
    "-n": "tail: illegal offset -- " + count,
    "-c": "tail: illegal offset -- " + count
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

module.exports = {
  countError,
  hasInvalidOption,
  hasInvalidCount,
  optionError,
  missingFileError
};
