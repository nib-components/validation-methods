var type = require('type');
var equals = require('equals');

/*
  These methods are the validation methods
  that are available in the forms. Addding a new
  validation method is as easy as exporting another
  function. The function must be lowercase as the
  backend likes to lower case all attributes on HTML
  elements so when we try to do validation via data
  attributes it will lowercase them.
 */
var patterns = {
  email: /^([a-zA-Z0-9_\.\-\+]+)@([\da-zA-Z\.\-]+)\.([a-zA-Z\.]{2,6})$/,
  url: /^(https?:\/\/)?([\da-z\.\-]+)\.([a-z\.]{2,6})([\/\w \.\-]*)*\/?$/,
  alphanumeric: /^[A-Za-z0-9]+$/,
  hex: /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
  dateofbirth: /^\d{1,2}\/\d{1,2}\/\d{4}$/,
  numbersOnly: /^\d+$/
};

/**
 * Simple required method. We add this as a validation
 * method so that we don't have to do anything special
 * to check for required fields in the validator
 * @param  {String} val
 * @return {Boolean}
 */
exports.required = function(val) {
  return val != null && val !== "";
};

/**
 * Check to see if the value submit matches to required value
 * @param  {String} val
 * @param  {String} ruleValue Value from the form submit
 * @return {Boolean}
 */
exports.equals = equals;

/**
 * Check if a string is an email address
 * @param  {String}   val
 * @return {Boolean}
 */
exports.email = function(val) {
  if(val) {
    return type(val) === 'string' && patterns.email.test(val);
  }
};

/**
 * Check if a string is a valid URL
 * @param  {String} val
 * @return {Boolean}
 */
exports.url = function(val) {
  if(val) {
    return val && patterns.url.test(val);
  }
};

/**
 * Check if a string is alphanumeric
 * @param  {String} val
 * @return {Boolean}
 */
exports.alphanumeric = function(val) {
  if(val) {
    return type(val) === 'string' && patterns.alphanumeric.test(val);
  }
};

/**
 * Check if a string is hexidecimal
 * @param  {String} val
 * @return {Boolean}
 */
exports.hex = function(val) {
  if(val){
    return type(val) === 'string' && patterns.hex.test(val);
  }
};

/**
 * Check if the value is a string
 * @param  val
 * @return {Boolean}
 */
exports.string = function(val) {
  if(val) {
    return type(val) === 'string';
  }
};

/**
 * Check if a value is number. Converts value to a number
 * and checks to see if it is a valid number
 * @param  {String} val
 * @return {Boolean}
 */
exports.number = function(val) {
  if(val) {
    if( type(val) === 'string' && !isNaN(parseFloat(val)) ) {
      return true;
    }
    else {
      return type(val) === 'number';
    }
  }
};

/**
 * Check if a value is an array
 * @param  {Any} val
 * @return {Boolean}
 */
exports.array = function(val) {
  if(val) {
    return type(val) === 'array';
  }
};

/**
 * Check if passed in value is, or can be converted
 * to, a valid date
 * @param  {Any} val
 * @return {Boolean}
 */
exports.date = function(val) {
  if(val) {
    return val && ( type(val) === 'date' || !isNaN(Date.parse(val)) );
  }
};

/**
 * Check if the value is a valid boolean
 * @param  {Any} val
 * @return {Boolean}
 */
exports.boolean = function(val) {
  if(val != null) {
    return val === true || val === false;
  }
};

/**
 * Check if a number is below a value
 * @param  {String|Number} val
 * @param  {Number} num Maximum value
 * @return {Boolean}
 */
exports.max = function(num) {
  return function(val, data) {
    if(exports.number(val)) {
      return num && num <= val;
    }
  };
};

/**
 * Check if a val is a at least num
 * @param  {String|Number} val
 * @param  {Number} num
 * @return {Boolean}
 */
exports.min = function(num) {
  return function(val, data) {
    if(exports.number(val)) {
      return num && num >= val;
    }
  };
};

/**
 * Check the length of the value
 * @param  {String|Array} val
 * @param  {Number} length
 * @return {Boolean}
 */
exports.length = function(length) {
  return function(val, data) {
    if(val) {
      return val.length && val.length === length;
    }
  };
};


/**
 * Check the minimum length of a string or array
 * @param  {String|Array} val
 * @param  {Number} length
 * @return {Boolean}
 */
exports.minlength = function(length) {
  return function(val, data) {
    if(val) {
      return val && val.length && val.length >= length;
    }
  };
};

/**
 * Check the minimum length
 * @param  {String|Array} val
 * @param  {Number} length
 * @return {Boolean}
 */
exports.maxlength = function(length) {
  return function(val, data) {
    if(val) {
      return val && val.length && val.length <= length;
    }
  };
};

/**
 * Check if a value is within a range
 * @param  {String|Number} val
 * @param  {Object} options Requires a from and to
 * @return {Boolean}
 */
exports.range = function(from, to) {
  return function(val, data) {
    if(val) {
      return val && (from <= val && val <= to);
    }
  };
};

/**
 * Check if a value exists within an array
 * @param  {Any} val
 * @param  {Array} values
 * @return {Boolean}
 */
exports['in'] = function(values) {
  return function(val, data) {
    if(val) {
      return values.indexOf(val) > -1;
    }
  };
};

/**
 * Check if one field matches another
 * @param  {String} Value of field
 * @param  {String} field Field to match
 * @param   {Object} attributes All of the data
 * @return {Boolean}
 */
exports.matches = function(attr) {
  return function(val, data) {
    return val === data[attr];
  };
};

/**
 * Check if a value is only numbers
 * @param  {string} val
 * @return {boolean} return true if value is made up of numbers
 */
exports.numbersOnly = function(val) {
  return patterns.numbersOnly.test(val);
};

/**
 * Check if a value matches a regular expression
 * @param  {string} val
 * @param  {RegExp} regex
 * @return {Boolean}
 */
exports.matchesRegex = function(regex) {
  return function(val, data) {
    if(val) {
      return regex.test(val);
    }
  };
};