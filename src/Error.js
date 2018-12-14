const hasInvalidLength = function(length) {
    return {
      head : length < 1 || isNaN(length - length) ,
      tail : isNaN(length - length) 
    };
  }
  
  const hasInvalidType = function(type) {
    return type != '-c' && type != '-n';
  }

  const lengthError = function(length) { 
    return {
      head : generateHeadLengthError(length),
      tail : generateTailLengthError(length)
    };
  }
    
  const generateHeadLengthError = function(length) {
    return {
      "-n": 'head: illegal line count -- ' + length,
      "-c": 'head: illegal byte count -- ' + length
    };
  }
  
  const generateTailLengthError = function(length) {
    return {
      "-n": 'tail: illegal offset -- ' + length,
      "-c": 'tail: illegal offset -- ' + length
    };
  }
  
  const typeError = function( type ){
    return {
      head : 'head: illegal option -- ' + type[1] + '\nusage: head [-n lines | -c bytes] [file ...]',
      tail : 'tail: illegal option -- ' + type[1] + '\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]'
    };
  }
  
  const missingFileError = function( file ) {
    return {
      head : 'head: ' + file + ': No such file or directory',
      tail : 'tail: ' + file + ': No such file or directory'
    };
  }

module.exports = {
    lengthError,
    hasInvalidType,
    hasInvalidLength,
    typeError,
    missingFileError
}