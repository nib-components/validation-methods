# validation-methods

[![Build Status](https://travis-ci.org/nib-components/validation-methods.png?branch=master)](https://travis-ci.org/nib-components/validation-methods)

  Various methods for validating objects

## Installation

    $ component install nib-components/validation-methods

## API

    var methods = require('validation-methods');
    methods.required('foo'); // true
    methods.equals(1,1); // true;
    methods.email('foo@mail.com'); // true
    methods.string(1); // false;
    methods.number('string'); // false

## License

  MIT
