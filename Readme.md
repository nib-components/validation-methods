# validation-methods

[![Build Status](https://travis-ci.org/nib-health-funds/validation-methods.png?branch=master)](https://travis-ci.org/nib-health-funds/validation-methods)

  Various methods for validating objects

## Installation
    $ npm i @nib/validation-methods

## API

    var methods = require('validation-methods');
    methods.required('foo'); // true
    methods.equals(1,1); // true;
    methods.email('foo@mail.com'); // true
    methods.string(1); // false;
    methods.number('string'); // false

### Validating array contents
    var validateSubsetOf = methods.isSubsetOf([1,2,3]);
    validateSubsetOf([1]); // true
    validateSubsetOf([1,3]); // true
    validateSubsetOf([1,5]); // false

## License

  MIT
